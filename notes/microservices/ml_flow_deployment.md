---
title: "Serving Machine Learning Model on Kubernetes"
date: "2025-02-17"
slug: "mlflow_on_kube"
---

<!-- ## Run Container for mlflow models
### Create Image
```
mlflow models build-docker --m "runs:/{run_id}/my-model" --name {image_name} 
```
### Run Container
```
docker run -p {local_port}:{image_port} {image_name}
``` -->

## Local Environment

```
kind create cluster --name {cluster_name}
```

## Set up Seldon Core

```
kubectl create namespace {namespace}

helm install seldon-core seldon-core-operator \
    --repo https://storage.googleapis.com/seldon-charts \
    --set usageMetrics.enabled=true \
    --namespace {namespace} \
    --set istio.enabled=true
    # You can set ambassador instead with --set ambassador.enabled=true
```

### Check the namespace
```
kubectl get ns
```

## Use docker image
```
mlflow models build-docker -m runs:/<run_id>/model -n <your_dockerhub_user_name>/{image_tag} --enable-mlserver
```

## How to do it locally

First run docker desktop, then create a cluster using `kind`. Then, set up a seldon-core namespace.
Next, build the model image.
Then apply the config onto the namespace.
```
kubectl apply -f config.yaml
```

## Simple local deployment

After using `mlflow.log_model()`, the model will have some `model_uri`. Using this, you can deploy the model locally with the following command

### Add pyenv
```
curl https://pyenv.run | bash
python -m  pip install virtualenv

export PATH="$HOME/.pyenv/bin:$PATH"
```