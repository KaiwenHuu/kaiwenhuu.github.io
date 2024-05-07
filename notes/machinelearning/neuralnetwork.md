---
title: "Neural Network"
date: "2024-05-06"
slug: "neural-network"
---

## Neural Network

Consider $f(x) = v^Th(Wx)$ where $x\in \mathbb{}^{d\times 1}, W\in \mathbb{R}^{k\times d}$, and $h$ is some non-linear transformation. The hidden layer is size $k$ and usual candidates for a single hidden layer network is sigmoid or tanh.

We want to have $\hat{y} = f(x)$, so we want an estimate for $v$ and $W$. Just like with least squares, we can minimize the squared loss.

$$\hat{v}, \hat{W} \in \underset{v,W}{\arg\min}\{(y-v^Th(Wx))^T(y-v^Th(Wx))\}$$

To get the actual estimates we can use SGD.

### Binary Classifiers

If the problem is to classify $y$ as true or false, let $y\in\{-1,1\}$ and minimize the logistic loss with SGD.

$$\hat{v}, \hat{W} \in \underset{v,W}{\arg\min}\{\sum_{i=1}^n\log(1+\exp(-y_iv^Th(Wx_i)))\}$$

### Tricks

Some tricks to make neural networks perform better:

- Add bias term.
- Add skip connection: $\hat{y} = w^Tx + v^Th(Wx)$