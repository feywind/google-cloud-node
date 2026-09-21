#!/bin/bash

export OUTPUT=/usr/local/google/home/mzp/git/nodejs-bigtable/owl-bot-staging
export GOOGLEAPIS=/usr/local/google/home/mzp/git/googleapis

rm -rf "$OUTPUT"
mkdir -p "$OUTPUT/v2" "$OUTPUT/admin/v2"

bazelisk run //:gapic_generator_typescript -- \
	--output-dir "$OUTPUT/admin/v2" \
	-I "$GOOGLEAPIS" \
	--grpc-service-config "$GOOGLEAPIS/google/bigtable/admin/v2/bigtableadmin_grpc_service_config.json" \
	--service-yaml "$GOOGLEAPIS/google/bigtable/admin/v2/bigtableadmin_v2.yaml" \
	`find "$GOOGLEAPIS/google/bigtable/admin/v2" -name '*.proto'` \
	"$GOOGLEAPIS/google/cloud/common_resources.proto"

bazelisk run //:gapic_generator_typescript -- \
	--output-dir "$OUTPUT/v2" \
	-I "$GOOGLEAPIS" \
	--grpc-service-config "$GOOGLEAPIS/google/bigtable/v2/bigtable_grpc_service_config.json" \
	--service-yaml "$GOOGLEAPIS/google/bigtable/v2/bigtable_v2.yaml" \
	`find "$GOOGLEAPIS/google/bigtable/v2" -name '*.proto'` \
	"$GOOGLEAPIS/google/cloud/common_resources.proto"
