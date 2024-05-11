---
title: "Neural Network"
date: "2024-05-06"
slug: "neural-network"
---

## Neural Network

Consider $f(x) = v^\top h(Wx)$ where $x\in \mathbb{R}^{d\times 1}, W\in \mathbb{R}^{k\times d}$, and $h:\mathbb{R}^k \to \mathbb{R}^k$ is some non-linear transformation. The hidden layer is size $k$ and usual candidates for a single hidden layer network is sigmoid or tanh.

We want to have $\hat{y} = f(x)$, so we want an estimate for $v$ and $W$. Just like with least squares, we can minimize the squared loss.

$$
\hat{v}, \hat{W} \in \underset{v,W}{\arg\min}\{(y-v^\top h(Wx))^\top (y-v^\top h(Wx))\}
$$

To get the actual estimates we can use SGD.

### Binary Classifiers

If the problem is to classify $y$ as true or false, let $y\in\{-1,1\}$ and minimize the logistic loss with SGD.

$$
\hat{v}, \hat{W} \in \underset{v,W}{\arg\min}\left\{\sum_{i=1}^n\log(1+\exp(-y_iv^\top h(Wx_i)))\right\}
$$

### Multi-Label Classification

Instead of a $v$ vector at the very last layer, have a $V$ matrix such that each row $V_c^\top h(Wx)$ will give the sigmoid function

$$
P(y=c\mid x,W,V) = \frac{1}{1+\exp(-V_c^\top h(Wx))}
$$

To train the classification problem minimize the following loss with SGD.

$$
\hat{V}, \hat{W} \in \underset{V,W}{\arg\min}\left\{\sum_{i=1}^n\sum_{c=1}^k\log(1+\exp(-y_{ic}V_c^\top h(Wx_i)))\right\}
$$


### Tricks

Some tricks to make neural networks perform better:

- Add bias term.
- Add skip connection: $\hat{y} = w^\top x + v^\top h(Wx)$

### Deep Learning

Deep Learning is simply a neural network with more than one hidden layer. Note that the non-linear transformation does not have to be the same function across all layers.

$$
f(x) = v^\top (h(W_2(h(W_1x))))
$$

However, more hidden layers come with more non-linear transformation, which will induce the *vanishing gradient* problem. Some solution for this would be:

- *ReLU* function, $h(x) = \max\{0, x\}$, is inspired by the behavior of neurons in the brain, which only activate when the input exceeds a certain threshold. One drawback of the ReLU function is that it can lead to sparsity in the neural activations, which might not always be desirable. An alternative to address this issue is *Leaky ReLU* $h(x) = \max\{-cx,x\}$ where $c\in(0,1)$. This variation allows a small, non-zero gradient when the input is negative, thereby mitigating the problem of inactive neurons.

- Skip connection: ResNet.

Some other tricks to improve performance include:

- Data standardization
- Initialize weight parameters close to $0$
- Batch Norm
- Adam Gradient Descent