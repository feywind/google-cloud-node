// Copyright 2022 Google LLC
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
//
// ** This file is automatically generated by gapic-generator-typescript. **
// ** https://github.com/googleapis/gapic-generator-typescript **
// ** All changes to this file may be overwritten. **

/* global window */
import type * as gax from 'google-gax';
import type {
  Callback,
  CallOptions,
  Descriptors,
  ClientOptions,
} from 'google-gax';

import * as protos from '../../protos/protos';
import jsonProtos = require('../../protos/protos.json');
/**
 * Client JSON configuration object, loaded from
 * `src/v2/service_controller_client_config.json`.
 * This file defines retry strategy and timeouts for all API methods in this library.
 */
import * as gapicConfig from './service_controller_client_config.json';
const version = require('../../../package.json').version;

/**
 *  [Service Control API
 *  v2](https://cloud.google.com/service-infrastructure/docs/service-control/access-control)
 *
 *  Private Preview. This feature is only available for approved services.
 *
 *  This API provides admission control and telemetry reporting for services
 *  that are integrated with [Service
 *  Infrastructure](https://cloud.google.com/service-infrastructure).
 * @class
 * @memberof v2
 */
export class ServiceControllerClient {
  private _terminated = false;
  private _opts: ClientOptions;
  private _providedCustomServicePath: boolean;
  private _gaxModule: typeof gax | typeof gax.fallback;
  private _gaxGrpc: gax.GrpcClient | gax.fallback.GrpcClient;
  private _protos: {};
  private _defaults: {[method: string]: gax.CallSettings};
  auth: gax.GoogleAuth;
  descriptors: Descriptors = {
    page: {},
    stream: {},
    longrunning: {},
    batching: {},
  };
  warn: (code: string, message: string, warnType?: string) => void;
  innerApiCalls: {[name: string]: Function};
  serviceControllerStub?: Promise<{[name: string]: Function}>;

  /**
   * Construct an instance of ServiceControllerClient.
   *
   * @param {object} [options] - The configuration object.
   * The options accepted by the constructor are described in detail
   * in [this document](https://github.com/googleapis/gax-nodejs/blob/main/client-libraries.md#creating-the-client-instance).
   * The common options are:
   * @param {object} [options.credentials] - Credentials object.
   * @param {string} [options.credentials.client_email]
   * @param {string} [options.credentials.private_key]
   * @param {string} [options.email] - Account email address. Required when
   *     using a .pem or .p12 keyFilename.
   * @param {string} [options.keyFilename] - Full path to the a .json, .pem, or
   *     .p12 key downloaded from the Google Developers Console. If you provide
   *     a path to a JSON file, the projectId option below is not necessary.
   *     NOTE: .pem and .p12 require you to specify options.email as well.
   * @param {number} [options.port] - The port on which to connect to
   *     the remote host.
   * @param {string} [options.projectId] - The project ID from the Google
   *     Developer's Console, e.g. 'grape-spaceship-123'. We will also check
   *     the environment variable GCLOUD_PROJECT for your project ID. If your
   *     app is running in an environment which supports
   *     {@link https://developers.google.com/identity/protocols/application-default-credentials Application Default Credentials},
   *     your project ID will be detected automatically.
   * @param {string} [options.apiEndpoint] - The domain name of the
   *     API remote host.
   * @param {gax.ClientConfig} [options.clientConfig] - Client configuration override.
   *     Follows the structure of {@link gapicConfig}.
   * @param {boolean | "rest"} [options.fallback] - Use HTTP fallback mode.
   *     Pass "rest" to use HTTP/1.1 REST API instead of gRPC.
   *     For more information, please check the
   *     {@link https://github.com/googleapis/gax-nodejs/blob/main/client-libraries.md#http11-rest-api-mode documentation}.
   * @param {gax} [gaxInstance]: loaded instance of `google-gax`. Useful if you
   *     need to avoid loading the default gRPC version and want to use the fallback
   *     HTTP implementation. Load only fallback version and pass it to the constructor:
   *     ```
   *     const gax = require('google-gax/build/src/fallback'); // avoids loading google-gax with gRPC
   *     const client = new ServiceControllerClient({fallback: 'rest'}, gax);
   *     ```
   */
  constructor(
    opts?: ClientOptions,
    gaxInstance?: typeof gax | typeof gax.fallback
  ) {
    // Ensure that options include all the required fields.
    const staticMembers = this.constructor as typeof ServiceControllerClient;
    const servicePath =
      opts?.servicePath || opts?.apiEndpoint || staticMembers.servicePath;
    this._providedCustomServicePath = !!(
      opts?.servicePath || opts?.apiEndpoint
    );
    const port = opts?.port || staticMembers.port;
    const clientConfig = opts?.clientConfig ?? {};
    const fallback =
      opts?.fallback ??
      (typeof window !== 'undefined' && typeof window?.fetch === 'function');
    opts = Object.assign({servicePath, port, clientConfig, fallback}, opts);

    // If scopes are unset in options and we're connecting to a non-default endpoint, set scopes just in case.
    if (servicePath !== staticMembers.servicePath && !('scopes' in opts)) {
      opts['scopes'] = staticMembers.scopes;
    }

    // Load google-gax module synchronously if needed
    if (!gaxInstance) {
      gaxInstance = require('google-gax') as typeof gax;
    }

    // Choose either gRPC or proto-over-HTTP implementation of google-gax.
    this._gaxModule = opts.fallback ? gaxInstance.fallback : gaxInstance;

    // Create a `gaxGrpc` object, with any grpc-specific options sent to the client.
    this._gaxGrpc = new this._gaxModule.GrpcClient(opts);

    // Save options to use in initialize() method.
    this._opts = opts;

    // Save the auth object to the client, for use by other methods.
    this.auth = this._gaxGrpc.auth as gax.GoogleAuth;

    // Set useJWTAccessWithScope on the auth object.
    this.auth.useJWTAccessWithScope = true;

    // Set defaultServicePath on the auth object.
    this.auth.defaultServicePath = staticMembers.servicePath;

    // Set the default scopes in auth client if needed.
    if (servicePath === staticMembers.servicePath) {
      this.auth.defaultScopes = staticMembers.scopes;
    }

    // Determine the client header string.
    const clientHeader = [`gax/${this._gaxModule.version}`, `gapic/${version}`];
    if (typeof process !== 'undefined' && 'versions' in process) {
      clientHeader.push(`gl-node/${process.versions.node}`);
    } else {
      clientHeader.push(`gl-web/${this._gaxModule.version}`);
    }
    if (!opts.fallback) {
      clientHeader.push(`grpc/${this._gaxGrpc.grpcVersion}`);
    } else if (opts.fallback === 'rest') {
      clientHeader.push(`rest/${this._gaxGrpc.grpcVersion}`);
    }
    if (opts.libName && opts.libVersion) {
      clientHeader.push(`${opts.libName}/${opts.libVersion}`);
    }
    // Load the applicable protos.
    this._protos = this._gaxGrpc.loadProtoJSON(jsonProtos);

    // Put together the default options sent with requests.
    this._defaults = this._gaxGrpc.constructSettings(
      'google.api.servicecontrol.v2.ServiceController',
      gapicConfig as gax.ClientConfig,
      opts.clientConfig || {},
      {'x-goog-api-client': clientHeader.join(' ')}
    );

    // Set up a dictionary of "inner API calls"; the core implementation
    // of calling the API is handled in `google-gax`, with this code
    // merely providing the destination and request information.
    this.innerApiCalls = {};

    // Add a warn function to the client constructor so it can be easily tested.
    this.warn = this._gaxModule.warn;
  }

  /**
   * Initialize the client.
   * Performs asynchronous operations (such as authentication) and prepares the client.
   * This function will be called automatically when any class method is called for the
   * first time, but if you need to initialize it before calling an actual method,
   * feel free to call initialize() directly.
   *
   * You can await on this method if you want to make sure the client is initialized.
   *
   * @returns {Promise} A promise that resolves to an authenticated service stub.
   */
  initialize() {
    // If the client stub promise is already initialized, return immediately.
    if (this.serviceControllerStub) {
      return this.serviceControllerStub;
    }

    // Put together the "service stub" for
    // google.api.servicecontrol.v2.ServiceController.
    this.serviceControllerStub = this._gaxGrpc.createStub(
      this._opts.fallback
        ? (this._protos as protobuf.Root).lookupService(
            'google.api.servicecontrol.v2.ServiceController'
          )
        : // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (this._protos as any).google.api.servicecontrol.v2.ServiceController,
      this._opts,
      this._providedCustomServicePath
    ) as Promise<{[method: string]: Function}>;

    // Iterate over each of the methods that the service provides
    // and create an API call method for each.
    const serviceControllerStubMethods = ['check', 'report'];
    for (const methodName of serviceControllerStubMethods) {
      const callPromise = this.serviceControllerStub.then(
        stub =>
          (...args: Array<{}>) => {
            if (this._terminated) {
              return Promise.reject('The client has already been closed.');
            }
            const func = stub[methodName];
            return func.apply(stub, args);
          },
        (err: Error | null | undefined) => () => {
          throw err;
        }
      );

      const descriptor = undefined;
      const apiCall = this._gaxModule.createApiCall(
        callPromise,
        this._defaults[methodName],
        descriptor,
        this._opts.fallback
      );

      this.innerApiCalls[methodName] = apiCall;
    }

    return this.serviceControllerStub;
  }

  /**
   * The DNS address for this API service.
   * @returns {string} The DNS address for this service.
   */
  static get servicePath() {
    return 'servicecontrol.googleapis.com';
  }

  /**
   * The DNS address for this API service - same as servicePath(),
   * exists for compatibility reasons.
   * @returns {string} The DNS address for this service.
   */
  static get apiEndpoint() {
    return 'servicecontrol.googleapis.com';
  }

  /**
   * The port for this API service.
   * @returns {number} The default port for this service.
   */
  static get port() {
    return 443;
  }

  /**
   * The scopes needed to make gRPC calls for every method defined
   * in this service.
   * @returns {string[]} List of default scopes.
   */
  static get scopes() {
    return [
      'https://www.googleapis.com/auth/cloud-platform',
      'https://www.googleapis.com/auth/servicecontrol',
    ];
  }

  getProjectId(): Promise<string>;
  getProjectId(callback: Callback<string, undefined, undefined>): void;
  /**
   * Return the project ID used by this class.
   * @returns {Promise} A promise that resolves to string containing the project ID.
   */
  getProjectId(
    callback?: Callback<string, undefined, undefined>
  ): Promise<string> | void {
    if (callback) {
      this.auth.getProjectId(callback);
      return;
    }
    return this.auth.getProjectId();
  }

  // -------------------
  // -- Service calls --
  // -------------------
  /**
   * Private Preview. This feature is only available for approved services.
   *
   * This method provides admission control for services that are integrated
   * with [Service
   * Infrastructure](https://cloud.google.com/service-infrastructure). It checks
   * whether an operation should be allowed based on the service configuration
   * and relevant policies. It must be called before the operation is executed.
   * For more information, see
   * [Admission
   * Control](https://cloud.google.com/service-infrastructure/docs/admission-control).
   *
   * NOTE: The admission control has an expected policy propagation delay of
   * 60s. The caller **must** not depend on the most recent policy changes.
   *
   * NOTE: The admission control has a hard limit of 1 referenced resources
   * per call. If an operation refers to more than 1 resources, the caller
   * must call the Check method multiple times.
   *
   * This method requires the `servicemanagement.services.check` permission
   * on the specified service. For more information, see
   * [Service Control API Access
   * Control](https://cloud.google.com/service-infrastructure/docs/service-control/access-control).
   *
   * @param {Object} request
   *   The request object that will be sent.
   * @param {string} request.serviceName
   *   The service name as specified in its service configuration. For example,
   *   `"pubsub.googleapis.com"`.
   *
   *   See
   *   [google.api.Service](https://cloud.google.com/service-management/reference/rpc/google.api#google.api.Service)
   *   for the definition of a service name.
   * @param {string} request.serviceConfigId
   *   Specifies the version of the service configuration that should be used to
   *   process the request. Must not be empty. Set this field to 'latest' to
   *   specify using the latest configuration.
   * @param {google.rpc.context.AttributeContext} request.attributes
   *   Describes attributes about the operation being executed by the service.
   * @param {number[]} request.resources
   *   Describes the resources and the policies applied to each resource.
   * @param {string} request.flags
   *   Optional. Contains a comma-separated list of flags.
   * @param {object} [options]
   *   Call options. See {@link https://googleapis.dev/nodejs/google-gax/latest/interfaces/CallOptions.html|CallOptions} for more details.
   * @returns {Promise} - The promise which resolves to an array.
   *   The first element of the array is an object representing [CheckResponse]{@link google.api.servicecontrol.v2.CheckResponse}.
   *   Please see the
   *   [documentation](https://github.com/googleapis/gax-nodejs/blob/master/client-libraries.md#regular-methods)
   *   for more details and examples.
   * @example <caption>include:samples/generated/v2/service_controller.check.js</caption>
   * region_tag:servicecontrol_v2_generated_ServiceController_Check_async
   */
  check(
    request?: protos.google.api.servicecontrol.v2.ICheckRequest,
    options?: CallOptions
  ): Promise<
    [
      protos.google.api.servicecontrol.v2.ICheckResponse,
      protos.google.api.servicecontrol.v2.ICheckRequest | undefined,
      {} | undefined
    ]
  >;
  check(
    request: protos.google.api.servicecontrol.v2.ICheckRequest,
    options: CallOptions,
    callback: Callback<
      protos.google.api.servicecontrol.v2.ICheckResponse,
      protos.google.api.servicecontrol.v2.ICheckRequest | null | undefined,
      {} | null | undefined
    >
  ): void;
  check(
    request: protos.google.api.servicecontrol.v2.ICheckRequest,
    callback: Callback<
      protos.google.api.servicecontrol.v2.ICheckResponse,
      protos.google.api.servicecontrol.v2.ICheckRequest | null | undefined,
      {} | null | undefined
    >
  ): void;
  check(
    request?: protos.google.api.servicecontrol.v2.ICheckRequest,
    optionsOrCallback?:
      | CallOptions
      | Callback<
          protos.google.api.servicecontrol.v2.ICheckResponse,
          protos.google.api.servicecontrol.v2.ICheckRequest | null | undefined,
          {} | null | undefined
        >,
    callback?: Callback<
      protos.google.api.servicecontrol.v2.ICheckResponse,
      protos.google.api.servicecontrol.v2.ICheckRequest | null | undefined,
      {} | null | undefined
    >
  ): Promise<
    [
      protos.google.api.servicecontrol.v2.ICheckResponse,
      protos.google.api.servicecontrol.v2.ICheckRequest | undefined,
      {} | undefined
    ]
  > | void {
    request = request || {};
    let options: CallOptions;
    if (typeof optionsOrCallback === 'function' && callback === undefined) {
      callback = optionsOrCallback;
      options = {};
    } else {
      options = optionsOrCallback as CallOptions;
    }
    options = options || {};
    options.otherArgs = options.otherArgs || {};
    options.otherArgs.headers = options.otherArgs.headers || {};
    options.otherArgs.headers['x-goog-request-params'] =
      this._gaxModule.routingHeader.fromParams({
        service_name: request.serviceName ?? '',
      });
    this.initialize();
    return this.innerApiCalls.check(request, options, callback);
  }
  /**
   * Private Preview. This feature is only available for approved services.
   *
   * This method provides telemetry reporting for services that are integrated
   * with [Service
   * Infrastructure](https://cloud.google.com/service-infrastructure). It
   * reports a list of operations that have occurred on a service. It must be
   * called after the operations have been executed. For more information, see
   * [Telemetry
   * Reporting](https://cloud.google.com/service-infrastructure/docs/telemetry-reporting).
   *
   * NOTE: The telemetry reporting has a hard limit of 1000 operations and 1MB
   * per Report call. It is recommended to have no more than 100 operations per
   * call.
   *
   * This method requires the `servicemanagement.services.report` permission
   * on the specified service. For more information, see
   * [Service Control API Access
   * Control](https://cloud.google.com/service-infrastructure/docs/service-control/access-control).
   *
   * @param {Object} request
   *   The request object that will be sent.
   * @param {string} request.serviceName
   *   The service name as specified in its service configuration. For example,
   *   `"pubsub.googleapis.com"`.
   *
   *   See
   *   [google.api.Service](https://cloud.google.com/service-management/reference/rpc/google.api#google.api.Service)
   *   for the definition of a service name.
   * @param {string} request.serviceConfigId
   *   Specifies the version of the service configuration that should be used to
   *   process the request. Must not be empty. Set this field to 'latest' to
   *   specify using the latest configuration.
   * @param {number[]} request.operations
   *   Describes the list of operations to be reported. Each operation is
   *   represented as an AttributeContext, and contains all attributes around an
   *   API access.
   * @param {object} [options]
   *   Call options. See {@link https://googleapis.dev/nodejs/google-gax/latest/interfaces/CallOptions.html|CallOptions} for more details.
   * @returns {Promise} - The promise which resolves to an array.
   *   The first element of the array is an object representing [ReportResponse]{@link google.api.servicecontrol.v2.ReportResponse}.
   *   Please see the
   *   [documentation](https://github.com/googleapis/gax-nodejs/blob/master/client-libraries.md#regular-methods)
   *   for more details and examples.
   * @example <caption>include:samples/generated/v2/service_controller.report.js</caption>
   * region_tag:servicecontrol_v2_generated_ServiceController_Report_async
   */
  report(
    request?: protos.google.api.servicecontrol.v2.IReportRequest,
    options?: CallOptions
  ): Promise<
    [
      protos.google.api.servicecontrol.v2.IReportResponse,
      protos.google.api.servicecontrol.v2.IReportRequest | undefined,
      {} | undefined
    ]
  >;
  report(
    request: protos.google.api.servicecontrol.v2.IReportRequest,
    options: CallOptions,
    callback: Callback<
      protos.google.api.servicecontrol.v2.IReportResponse,
      protos.google.api.servicecontrol.v2.IReportRequest | null | undefined,
      {} | null | undefined
    >
  ): void;
  report(
    request: protos.google.api.servicecontrol.v2.IReportRequest,
    callback: Callback<
      protos.google.api.servicecontrol.v2.IReportResponse,
      protos.google.api.servicecontrol.v2.IReportRequest | null | undefined,
      {} | null | undefined
    >
  ): void;
  report(
    request?: protos.google.api.servicecontrol.v2.IReportRequest,
    optionsOrCallback?:
      | CallOptions
      | Callback<
          protos.google.api.servicecontrol.v2.IReportResponse,
          protos.google.api.servicecontrol.v2.IReportRequest | null | undefined,
          {} | null | undefined
        >,
    callback?: Callback<
      protos.google.api.servicecontrol.v2.IReportResponse,
      protos.google.api.servicecontrol.v2.IReportRequest | null | undefined,
      {} | null | undefined
    >
  ): Promise<
    [
      protos.google.api.servicecontrol.v2.IReportResponse,
      protos.google.api.servicecontrol.v2.IReportRequest | undefined,
      {} | undefined
    ]
  > | void {
    request = request || {};
    let options: CallOptions;
    if (typeof optionsOrCallback === 'function' && callback === undefined) {
      callback = optionsOrCallback;
      options = {};
    } else {
      options = optionsOrCallback as CallOptions;
    }
    options = options || {};
    options.otherArgs = options.otherArgs || {};
    options.otherArgs.headers = options.otherArgs.headers || {};
    options.otherArgs.headers['x-goog-request-params'] =
      this._gaxModule.routingHeader.fromParams({
        service_name: request.serviceName ?? '',
      });
    this.initialize();
    return this.innerApiCalls.report(request, options, callback);
  }

  /**
   * Terminate the gRPC channel and close the client.
   *
   * The client will no longer be usable and all future behavior is undefined.
   * @returns {Promise} A promise that resolves when the client is closed.
   */
  close(): Promise<void> {
    if (this.serviceControllerStub && !this._terminated) {
      return this.serviceControllerStub.then(stub => {
        this._terminated = true;
        stub.close();
      });
    }
    return Promise.resolve();
  }
}