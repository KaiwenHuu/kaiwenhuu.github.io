---
title: "Retrieval"
date: "2025-08-02"
slug: "retrieval"
---

## Problem

Ranking a big volume of contents will have poor latency on the service.

## Goal

Before ranking contents, have a fast model that can find relavant contents from a large content corpus.

## How It's Done

### High Level

1. Model vector representations of queries and contents in the same d-dimensional space.

2. For a given query vector use Approximate Nearest Neighbor (ANN) to retrieve relevant contents.

### Offline Metric

Key goal of the retrieval model isn't to rank, but to find all the relavent contents corresponding to a given query. Therefore, we want to focus on recall rather than precision. Also, we want the retrieval stage to be diverse so coverage is also important.

For a given test set with $$N$$ queries we look find the top $$k$$ contents

- recall@k: $$\frac{1}{N} \sum \frac{\text{True Positives}}{\text{True Positives + False Negatives}}$$
- coverage@k: $$\frac{\text{total number of distinct contents retrieved}}{\text{total number of contents in corpus}}$$

### Model

**Two Tower Embedding Model**

Learn two independent neural networks that encode query and content onto the same d-dimensional space.

Given an encoded query vector $$q$$ and content vector $$c$$, the model should learn such that the similarity between $$q$$ and $$c$$, $$s(q, c)$$ are high.