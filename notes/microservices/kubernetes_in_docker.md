---
title: "Kubernetes in Docker"
date: "2025-02-11"
slug: "kind"
---

## Download kubernetes in docker (kind)

```
brew install kind
```

## Download kubernetes command line tool (kubectl)

```
brew install kubectl
```

### Create cluster

```
kind create cluster --name {cluster_name}
```

### List clusters

```
kind get clusters
```

### Delete cluster

```
kind delete cluster --name {cluster_name}
```