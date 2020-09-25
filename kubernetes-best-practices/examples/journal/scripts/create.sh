#!/usr/bin/env bash

set -e
set -u

CLUSTER_NAME=$1

gcloud beta container \
  clusters create "${CLUSTER_NAME}" \
    --machine-type "g1-small" \
    --image-type "COS" \
    --disk-type "pd-standard" \
    --disk-size "30" \
    --num-nodes "3"
