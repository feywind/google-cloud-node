#!/bin/bash

export OUTPUT=/tmp/nodejs-pubsub-test
export GOOGLEAPIS=/usr/local/google/home/mzp/git/googleapis

rm -rf "$OUTPUT"
mkdir -p "$OUTPUT"

bazelisk run //:gapic_generator_typescript -- \
	--output-dir "$OUTPUT" \
	-I "$GOOGLEAPIS" \
	--grpc-service-config "$GOOGLEAPIS/google/pubsub/v1/pubsub_grpc_service_config.json" \
	--service-yaml "$GOOGLEAPIS/google/pubsub/v1/pubsub_v1.yaml" \
	`find "$GOOGLEAPIS/google/pubsub/v1" -name '*.proto'` \
	"$GOOGLEAPIS/google/cloud/common_resources.proto"
