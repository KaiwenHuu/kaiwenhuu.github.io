---
title: "Evaluating Recommender Model"
date: "2025-08-02"
slug: "evaluation"
---

## Offline Metrics

Given a test data on impressions logs, group the logs by query. This will give a dictionary where key is the query, and value is a list of contents that's been interacted in chronological order.

### Recall@K

This is good to evaluate retrieval model, because the retrieval model aims to find all the relevant contents for a given query.

$$
\text{Recall@K} = \frac{|\text{(TP + FN)} \cap \text{Top K contents}|}{|\text{TP} + \text{FN}|}
$$

### Average Precision@K
$$
\text{AP@K} = \frac{1}{K} \sum_{k=1}^K \frac{|\text{(TP + FN)} \cap \text{Top k contents}|}{k}
$$

#### Mean Average Precision@K
$$
\text{MAP@K} = \frac{1}{N} \sum^N \text{AP@K}
$$

### Coverage@K

Good to evaluate whether a model is recommending diverse contents.

$$
\text{Coverage@K} = \frac{\text{Total Number of Distinct Items recommended @ K}}{|C|}
$$

### Mean Reciprical Rank

$$
\text{MRR} = \frac{1}{N} \sum^N \frac{1}{1+\text{rank}}
$$

Takes into account the position of the ranked content. However, it only looks at the first content that was correctly recommended.

### Noramlized Discounted Cumulatie Gain@K

Good to take into account how well the recommender system positions the contents. In $$\text{rel}_k$$ is the relavence of the $$k$$th interaction from the ground trugh observation in the test data.

$$
DCG@K = \sum_{k=1}^K \frac{2^{\text{rel}_k}-1}{\log(1+k)}
$$

IDCG@K is the ideal discounted cumulative gain of the first $$K$$ items.

$$
IDCG@K = \sum_{k=1}^K \frac{2^{\text{rel}_k}-1}{\log(1+k)}
$$

NDCG@K is good to evaluate ranking ability of the system, as it takes into the position of the ranked contents.

$$
NDCG@K = \frac{DCG@K}{IDCG@K}
$$

### Reference

[10 metrics to evaluate recommender and ranking systems](https://www.evidentlyai.com/ranking-metrics/evaluating-recommender-systems)
[Information Retrieval Evaluation](https://web.stanford.edu/class/cs276/handouts/EvaluationNew-handout-1-per.pdf)
[recmetrics](https://github.com/statisticianinstilettos/recmetrics)