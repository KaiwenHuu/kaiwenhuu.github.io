---
title: "Training Recommender Model"
date: "2025-08-02"
slug: "training"
---

## Task

Given a query, we want to identify the content with the highest probability of interaction (e.g., click), denoted as $$ P(y_c \mid q) $$. Suppose $$C$$ is the set of all content on the platform. Then, we want to optimize the cross-entropy loss:


$$-\log{\frac{\exp{s(q,c)}}{\sum_{c' \in C} \exp{s(q, c')}}}$$

## In the Real World

In practice, the pairs $$(q, c)$$ correspond to the interactions observed in a dataset $$D$$. However, computing this loss over the entire content corpus $$C$$ is infeasible when $$C$$ is large, due to the computational cost. Moreover, it's unreasonable to assume that all content is negative for a given query.

### Sigmoid

Instead of computing the full softmax loss over the entire corpus, we can approximate it using binary cross-entropy loss. This involves using observed negative interactions (e.g., dislikes or reports) as negative samples. However, such signals are sparse, as users rarely take the time to explicitly dislike or report content.

A common strategy is to sample popular content that the user did not interact with, under the assumption that the user saw it but chose to ignore it. However, this can introduce bias, as popular content is disproportionately sampled as negatives.

### Batch Negative Sampling

Another approach is to treat other content within the same batch during training as negative samples. This ensures that less popular content can also be used as negatives. The loss becomes an "efficient softmax," computed only over the batch $$B$$:

$$-\log{\frac{\exp{s(q,c)}}{\sum_{c' \in B} \exp{s(q, c')}}}$$

This reduces computation from the entire corpus to just the batch contents. However, popular content still tends to be over-represented as negatives, which may unfairly penalize it.

#### Accidental Negatives

Want to make sure that we don't treat any overlapping query, content pair as negatives. For example, if two queries appear in the same batch, the corresponding contents should not be counted as a negative sample of one another.

#### Log Q Correction

A common method to reduce this bias is to apply a correction term to the score function. Specifically:

$$-\log{\frac{\exp{s(q,c)}}{\exp{s(q,c)} + \sum_{c' \in B, c' \neq c} \exp{s_d(q,c')}}}$$

$$s_d(q,c) = s(q,c) - \log(Q_c)$$

Here, $$Q_c$$ typically represents the probability that content $$c$$ appears in the batch. Two common definitions are
- $$Q_c = p_c = \frac{\text{freq}_c}{N}$$ where $$N$$ is the size of the training data, or
- $$Q_c = 1-(1-p_c)^b$$ where $$b$$ is batch size.

### Mixed Negative Sampling

Even with in-batch sampling, some challenges remain:
- Content that never appears in the data is never sampled as a negative.
- Ideally, $$Q_c$$ should reflect the true probability of $$c$$ appearing in a batch. But in real world applications batches, aren't created randomly when coupled with batch negative sampling. They are constructed to ensure meaningful negatives. For instance, in an Amazon recommender system, a user in North America is unlikely to buy products only available in Asia, so these user-items should not appear in the same batch. Therefore, $$Q_c$$ might deviate from the ideal distribution.

To address this, **Mixed Negative Sampling** introduces an additional set of uniformly sampled content $$B' \subseteq C$$. For each positive example, $$b'$$ additional negative samples are drawn. The cross-entropy loss becomes:

$$-\log{\frac{\exp{s(q,c)}}{\exp{s(q,c)} + \sum_{c' \in [B + B'], c' \neq c} \exp{s_d(q,c')}}}$$

In this case, the definition of $$Q_c$$ depends on whether $$c \in B$$ or $$c \in B'$$. If $$c \in B'$$, then $$p_c = \frac{1}{|C|}$$.

### Reference

[Mixed Negative Sampling for Learning Two-tower Neural
Networks in Recommendations](https://storage.googleapis.com/gweb-research2023-media/pubtools/6090.pdf)