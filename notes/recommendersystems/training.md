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

#### Example Code

```
import torch
import torch.nn as nn
import torch.nn.function as F

class Encoder(nn.Module):
    def __init__(self, input_dim, hidden_layer_dims, output_dim, dropout):
        super(MLP, self).__init__()
        layer_sizes = [input_dim] + hidden_layer_dims
        layers = []
        for in_size, out_size in zip(layer_sizes[:-1], layer_sizes[1:]):
            lin = nn.Linear(in_size, out_size)
            nn.init.kaiming_normal_(lin.weight)
            layers.append(lin)
            layers.append(nn.BatchNorm1d(out_size))
            layers.append(nn.ReLU(inplace=True))
            layers.append(nn.Dropout(p=dropout))
        self.layers=nn.Sequential(*layers)
        self.fc = nn.Linear(hidden_layer_dims[-1], output_dim)
        nn.init.kaiming_normal_(self.fc.weight)

    def forward(self, x):
        x = self.layers.forward(x)
        return self.fc(x)
    
class TTEModel(nn.Module):
    def __init__(
        self,
        query_feat,
        item_feat,
        emb_dim,
        query_dropout,
        item_dropout,
        item_freqs,
    ):
        super(TTEModel, self).__init__()

        self.device = torch.device("cuda") if torch.cuda.is_available() else torch.device("cpu")

        self.query_feat = query_feat.to(self.device)
        self.item_feat = item_feat.to(self.device)

        self.query_tower = Encoder(query_feat.shape[1], [query_feat.shape[1], query_feat.shape[1]], emb_dim, query_dropout)
        self.item_tower = Encoder(item_feat.shape[1], [item_feat.shape[1], item_feat.shape[1]], emb_dim, item_dropout)

        self.num_items = self.item_feat.shape[0]
        self.item_freqs = item_freqs.to(self.device)

    def _item_emb(self, item=None):
        if item is None:
            item_emb = self.item_tower(item_feat)
        else:
            item_emb = self.item_tower(item_feat[item])
        # Normalize by L2 norm
        return F.normalize(item_emb, p=2, dim=1)
    
    def _query_emb(self, query=None):
        if query is None:
            return self.query_tower(query_feat)
        else:
            return self.query_tower(query_feat[query])
        # Normalize by L2 norm
        return F.normalize(query_emb, p=2, dim=1)

    def fit(self, loader, mns_ratio=1, mask_accidental_negatives=True):
        # Don't need accidental negative masking and mns when evaluating
        loss = 0.0
        is_training = False
        if mns_ratio == 0 and mask_accidental_negatives == False:
            self.eval()
        else:
            is_training = True
            self.train()
        loader_size = loader.dataset.__len__()
        for batch in loader:
            b = len(batch)
            query, item = batch
            optimizer.zero_grad()
            with torch.set_grad_enabled(is_training):
                query_emb = self._query_emb(query)
                item_emb = self._item_emb(item)
                scores = torch.matmul(query_emb, item_emb.transpose(0, 1)) # b * b matrix
                labels = torch.arange(b, device=self.device)
                
                if is_training:
                    w = torch.clamp(1 - (1 - self.item_freqs[item] / loader_size) ** b, min=1e-9)
                    log_q = torch.log(w)
                    positive_scores = torch.diag(scores).clone()
                    scores = scores - log_q
                    scores[torch.arange(b), torch.arange(b)] = positive_scores

                    b_mns = int(b * mns_ratio)
                    if b_mns > 0:
                        random_negatives = torch.randint(0, self.num_items, (b_mns,), device=self.device)
                        random_neg_emb = self._item_emb(random_negatives)
                        random_neg_scores = torch.matmul(query_emb, random_neg_emb.transpose(0, 1))
                        w = torch.clamp(1 - (torch.ones(b_mns, device=self.device) / self.num_items) ** b_mns, min=1e-9)
                        log_q = torch.log(w)
                        random_neg_scores = random_neg_scores - logq
                        scores = torch.cat([scores, random_neg_scores])
                
                if mask_accidental_negatives:
                    item_comparison = item.view(-1, 1) == item.view(1, -1)
                    query_comparison = query.view(-1, 1) == query.view(1, -1)
                    eye = torch.eye(b, device=self.device, dtype=torch.bool)
                    accidental_negatives = (item_comparison | query_comparison) & ~eye
                    scores[:, :b][accidental_negatives] = 1e-9
                
                loss = criterion(scores, labels)
                if is_training:
                    loss.backward()
                    optimizer.step()
            loss += loss.data.item() * b
        return loss / loader_size
```

### Reference

[Mixed Negative Sampling for Learning Two-tower Neural
Networks in Recommendations](https://storage.googleapis.com/gweb-research2023-media/pubtools/6090.pdf)