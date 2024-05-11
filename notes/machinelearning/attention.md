---
title: "Attention"
date: "2024-05-10"
slug: "attention"
---

## Attention

Instead of analyzing data sequentially as in an RNN or its variants, most modern approaches analyze sequential information as a whole. This strategy helps mitigate or resolve many of the common issues faced by RNNs. The key concept behind Attention is that for each encoder state, there is a corresponding key vector $Kz_t$ and for each decoder state query vector $Qz_{t+\tau}$. These vectors interact through a function to generate a context vector, which is then passed to the decoding states.

1. Compute Key Vectors: For each of the encoder states compute the key vectors $Kz_t$
2. Compute Attention Scores: For each of the encoder states with the respective decoding state. Usually the score is calculated as $\frac{Kz_t^\top Qz_{t+\tau}}{d}$, which represents the ratio of the Euclidean distance between the key vector and the query vector to the dimension $d$ of the source hidden state $z$.
3. Soft-max the Attention Scores: Apply the softmax function to the attention scores to normalize them.
4. Compute Weighted Attention Scores: Multiply each hidden state $z$ by the soft-maxed attention scores to get the weighted attention scores.
5. Compute Context Vector: Sum the weighted attention scores to get the context vector.

In a basic attention framework the goal is to learn $K$ and $Q$.

### Transformer

In a *Transformer Network*, the architecture completely discards the recurrent components. Instead, the encoder features self-attention layers, where each input vector at the encoder stage computes an attention score relative to all other encoder inputs. This is based on the premise that every word in a sentence may depend on all other words in the sentence. Notably, in a basic attention framework, the primary goal is to learn the matrices $K$ and $Q$, but a Transformer also learns a $V$ matrix where $Vz$ is the value vector.

1. Compute Key Vectors: For each of the encoder states compute the key vectors $Kz_t$
2. Compute Attention Scores: For each of the encoder states with the respective decoding state. Usually the score is calculated as $\frac{Kz_t^\top Qz_{t'}}{d}$, which represents the ratio of the Euclidean distance between the key vector and the query vector to the dimension $d$ of the source hidden state $z$.
3. Soft-max the Attention Scores: Apply the softmax function to the attention scores to normalize them.
4. Compute Weighted Value Vectors: Multiply each value vectors $Vz$ by the soft-maxed attention scores to get the weighted value vectors.
5. Compute Output: Sum the weighted value vectors to get the output.

#### Layer Stacking in Transformer

This process can be repeated multiple times, allowing the self-attention layers to stack atop one another. In this configuration, the output computed in one self-attention layer becomes the input for the next, facilitating complex transformations and deeper understanding.

#### Tricks

- Positional Encoding
- Residual Connections
- Layer Normalization
- Masked Attention: Use a Lower Triangular Matrix to "mask" to prevent positions from attending to subsequent positions.