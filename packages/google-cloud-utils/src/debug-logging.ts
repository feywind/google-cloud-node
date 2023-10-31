// Copyright 2023 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

// This module was written as an ESM module, but we want it to work in
// a CJS context as well; so everything that's needed is here, but it's
// not exported as ESM.

import EventEmitter from 'node:events';
import * as process from 'node:process';
import * as util from 'node:util';

// Adds typings for event sinks.
export declare interface GcpDebugLogger {
  on(event: 'log', listener: (args: unknown[]) => void): this;
  on(event: string, listener: Function): this;
}

// Our logger instance. This actually contains the meat of dealing
// with log lines, including EventEmitter
export class GcpDebugLogger extends EventEmitter {
  // The function we'll call with new log lines.
  // Should be the built-in Node util stuff, or the "debug" package, or whatever.
  upstream: Promise<Function>;

  // Self-referential function wrapper that calls invoke() on us.
  func: GcpDebugLogFunction;

  constructor(upstream: Promise<Function>) {
    super();

    this.upstream = upstream;
    this.func = Object.assign(this.invoke.bind(this), {
      // Also add an instance pointer back to us.
      instance: this,

      // And pull over the EventEmitter functionality.
      on: (event: string, listener: (args: unknown[]) => void) =>
        this.on(event, listener),
    }) as unknown as GcpDebugLogFunction;
  }

  invoke(...args: unknown[]): void {
    // Push out any upstream logger first.
    this.upstream.then(func => {
      func(...args);
    });

    // Emit sink events. Do this async so that event sinks can't
    // inadvertantly mess up emitters.
    process.nextTick(() => this.emit('log', args));
  }
}

// Add typing info for the EventEmitter we're adding to the returned function.
export interface GcpDebugLogFunction extends Function {
  instance: GcpDebugLogger;
  on(event: 'log', listener: (args: unknown[]) => void): this;
}

// Keep a copy of all namespaced loggers so users can reliably .on() them.
const loggerCache = new Map<string, GcpDebugLogger>();

// True once we've imported any GCP logging variables into upstream loggers.
let varsSet = false;

export default function makeLogger(
  namespace: string
): GcpDebugLogFunction {
  // Reuse loggers so things like sinks are persistent.
  if (loggerCache.has(namespace)) {
    return loggerCache.get(namespace)!.func;
  }

  // Look for the GCP debug variable shared across languages.
  // This is governed by this draft AIP:
  // https://github.com/aip-dev/google.aip.dev/issues/1244
  const gcpEnv = (process.env['GOOGLE_CLOUD_DEBUG'] ?? '').split(',');

  // TODO: Also shim GRPC from our format to their envvars.

  // Are we plugging into any other popular frameworks? Note that as an ESM
  // module, we would need to use .then() on import() and pass that to the
  // logger. For CJS, require() is always sync, so just use Promise.resolve().
  // ESM: const debugPkg = (import('debug')).then(m => default);
  const debugPkg = require('debug').default;
  let logOutput: Promise<Function>;
  if (debugPkg) {
    logOutput = Promise.resolve(debugPkg(namespace));

    if (!varsSet) {
      // Also copy over any GCP global enables.
      const existingEnables = process.env['DEBUG'] ?? '';
      debugPkg.enable(
        `${existingEnables}${existingEnables ? ',' : ''}${gcpEnv}`
      );

      varsSet = true;
    }
  } else {
    logOutput = Promise.resolve(util.debuglog(namespace));

    if (!varsSet) {
      // Also copy over any GCP global enables.
      const existingEnables = process.env['NODE_DEBUG'] ?? '';
      process.env['NODE_DEBUG'] = `${existingEnables}${
        existingEnables ? ',' : ''
      }${gcpEnv}`;

      varsSet = true;
    }
  }

  const logger = new GcpDebugLogger(logOutput);
  loggerCache.set(namespace, logger);
  return logger.func;
}
