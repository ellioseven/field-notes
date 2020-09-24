#!/usr/bin/env bash

set -e
set -u

CLUSTER_NAME=$1

gcloud beta container \
  clusters delete "${CLUSTER_NAME}"
