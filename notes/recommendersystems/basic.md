---
title: "Basics"
date: "2025-08-01"
slug: "basics"
---

## Premise

A recommender service should be optimized toward a specific goal - such as increasing user engagement (e.g., number of interactions or time spent on the app) or improving user retention. With this business objective in mind, the recommender model should be trained to predict the appropriate metric (e.g., pCTR or pCVR), depending on the task. The contents should then be displayed to the user in descending order of the predicted value, in order to maximize the target KPI.

### Overall Flow

The input to a recommender service is typically a query. In this context, a query is a general term that may refer to, but not limitedt to, a search keyword, a `user_id`, or a combination of both.

A standard recommender service consists of the following components:

1. Filtering Logic: Determines which contents should be passed to the recommender.

2. Retrieval Stage: A lightweight model that retrieves the top ~1,000 contents relevant to the query.

3. Ranking Stage: A more complex model that ranks these retrieved contents by relevance.

4. Reranking Stage: Business rules or an additional model that adjusts the final list to ensure diversity or meet other constraints.

### High Level of How the Model Works

A recommender model typically embeds both the query and content into the same d-dimensional vector space. The core idea is that relevant content will have embeddings that are close to the query's embedding. Common techniques to compute similarity between vectors include:
- dot product
- cosine distance
- dot product divided by $$\sqrt{d}$$

### Serving and Training

<img alt="Gatsby" src="./images/icon.png" width="60" />