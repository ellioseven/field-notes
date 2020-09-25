# Requirements

- gcloud
- GCP Billing Account

## Getting a Billing Account ID

- Head to [Billing](https://console.cloud.google.com/billing) in GCP console
- Select "Organisation"
- Find "Billing Account ID"

# Installation

```sh
# Prepare SDK.
gcloud init
gcloud config set compute/zone <zone> # us-central1-a

# Link billing account.
gcloud beta billing projects link <project> \
  --billing-account <billing-account>

# Prepare project.
gcloud services enable serviceusage.googleapis.com
gcloud services enable cloudbilling.googleapis.com
gcloud services enable container.googleapis.com
gcloud services enable cloudbuild.googleapis.com

# Create Kubernetes cluster.
./scripts/create.sh <cluster-name>

# Connect to cluster.
gcloud container clusters get-credentials <cluster-name>

# Destroy Kubernetes cluster.
./scripts/destroy.sh <cluster-name>
```

# Usage

## Redis

```sh
cd redis

kubectl create configmap redis-config \
  --from-file=launch.sh=launch.sh

kubectl create secret generic redis-passwd \
  --from-literal=passwd=1234
```

## Frontend

### Set Configuration

```sh
kubectl create configmap frontend-config \
  --from-literal=journalEntries=10
```

### Build Image

```sh
# https://cloud.google.com/cloud-build/docs/building/build-containers
gcloud builds submit ./frontend \
  --tag gcr.io/<project>/<image>
```

## Resources

- [Frontend Sample](https://github.com/brendandburns/kbp-sample/blob/master/server.js)
