---
title: "Recurrent Neural Network"
date: "2024-05-09"
slug: "recurrent-neural-network"
---

## Recurrent Neural Network

If incoming data $x$ is sequential then it has the structure $x_1, \dots , x_T$. Suppose the task is to classify the part of speech (e.g., noun, verb, adjective etc.) in an incoming sentence. Then the appropriate (and naive) approach is to use a *Recurrent Neural Network (RNN)*. RNN has the following components.

- Matrix $W$ that maps $x_t$ to a latent space $z_t$.
- Matrix $V$ that maps latent vector $z_t$ to the output $y_t$.
- Matrix $U$ that maps the latent vector in the previous state $z_{t-1}$ to the current latent vector $z_t$.

Note that $W,V,U$ are all the same matrices across all states. Therefore, for a given state $t$

$$
\hat{y}_t = Vh(Wx_t + Uz_{t-1})
$$

This is definitely not the best thing to do (because words in a sequence is not independent), but the structure can be thought of as independent soft-max functions over states. 

$$
P(y_{1:T}\mid x_{1:T}, W, V, U) = \prod_{t=1}^TP(y_t \mid x_t, W, V, U)
$$

Consequently, minimizing the NLL through SGD (backpropagation through time) would the method to train the RNN. Note that usual SGD won't work well, so in practice Adam or gradient clipping is used.

$$
\hat{W},\hat{V},\hat{U} \in \underset{W,V,U}{\arg \min} \left\{-\sum_{i=1}^n\sum_{t=1}^{T_i} \log{P{(y_{it}\mid x_{it}, W, V, U)}}\right\}
$$

 RNNs can have more than one layer (Deep RNN) and the network can also be bi-directional (Bi-Directional RNN); just like in english sentences it makes sense that the latter part of the sequence dictates what the word in the previous part means. However, with a Bi-Directional RNN the network must be acyclic.

However, there are major drawbacks with this approach:

- Memory issue: backpropagation through time requires many intermediate calculation, and due to the structure of RNN can't train with distributed systems.
- Vanishing or exploding gradients: $z_t = U^tz_0$ implies that $z_t$ will converge to $0$ if the largest singular value of $U$ is less than $1$ (diverge to $\infty$ if it is greater than $1$).
- Binding sequence length: input data and output data must have the same length.

### Sequence-to-Sequence

*Sequence-to-Sequence (seq2seq)* resolves the binding sequence length problem in an RNN. It has an encoding stage and a decoding stage. At the encoding stage there are $t$ latent states $z_1, \dots, z_t$ and at the decoding stage the output for state $\tau$ is returned by

$$
\hat{y}_\tau = V_dh(W_dx_{t+\tau} + U_dz_{t+\tau-1})
$$

Note that at the encoding stage there is no output matrix $V$. Thus, in a seq2seq, similar to RNN, the training involves minimizing the NLL

$$
\hat{W}_e, \hat{U}_e, \hat{W}_d,\hat{V}_d,\hat{U}_d \in \underset{W_e,U_e,W_d,V_d,U_d}{\arg \min} \left\{-\sum_{i=1}^n\sum_{t=1}^{T_i} \log{P{(y_{it}\mid x_{it}, W_e,U_e,W_d,V_d,U_d)}}\right\}
$$

However, there are still lingering issues:

- This loss function attempts to get every single word of the sentence correct. Therefore, if the sentence is slightly altered, but the meaning or context is the same, the model may misinterpret it. That is, the model fails at getting the entire sentence correct.
- Memory issue
- Vanishing or exploding gradients

Note that seq2seq can be adopted to be *multi-modal*. That is, the model can take a video as an input and output a text (e.g., caption), vice versa, or any other input-output pair where the datastructures are different.

### LSTM

*Long Short Term Memory (LSTM)* mitigates (but doesn't completely resolve) the vanishing or exploding gradient problem. LSTM has memory cells such that at certain states it can load previous information.