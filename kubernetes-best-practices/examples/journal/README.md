# Requirements

- kubectl
- gcloud
- helm
- GCP Billing Account

## Getting a Billing Account ID

- Head to [Billing](https://console.cloud.google.com/billing) in GCP console
- Select "Organisation"
- Find "Billing Account ID"

# Installation

```
docker-compose run --rm frontend yarn install
docker-compose run --rm api yarn install
docker-compose up
```

# Deployment

```sh
# Prepare SDK.
# Ensure project and default zone are set.
gcloud init

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

# Deploy services.
# NOTE: Ensure builds have been submitted and that versions match `appVersion`
# in .helm/values.yaml
cd .helm
helm install -f values.yaml . --generate-name

# List deployed applications.
helm list

# Uninstall deployed application.
helm uninstall <release-name>
```

# Usage

## Frontend

```sh
# https://cloud.google.com/cloud-build/docs/building/build-containers
gcloud builds submit ./services/frontend \
  --tag gcr.io/<project>/<image>
```

## API

```sh
# Build image.
# https://cloud.google.com/cloud-build/docs/building/build-containers
gcloud builds submit ./api \
  --tag gcr.io/<project>/<image>
```

## Resources

- [Frontend Sample](https://github.com/brendandburns/kbp-sample/blob/master/server.js)

# Notes

- Domains `api.journal.example` and `journal.example` need to be added to your
  `/etc/hosts` files, where the IP is the ingress external IP.
