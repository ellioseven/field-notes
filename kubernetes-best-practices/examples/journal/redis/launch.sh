#!/bin/bash

PASSWORD=$(cat /etc/redis-passwd/passwd)

# Kubernetes sets hostname of master to `redis-0`, which is used to determine
# master/slave configuration.
if [[ "${HOSTNAME}" == "redis-0" ]]; then
  # Configure server as master.
  redis-server --requirepass ${PASSWORD}
else
  # Configure server as slave.
  redis-server \
    --slaveof redis-0.redis 6379 \
    --masterauth ${PASSWORD} \
    --requirepass ${PASSWORD}
fi
