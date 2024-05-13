---
title: "Variational Inference"
date: "2024-05-12"
slug: "variational-inference"
---

### KL Divergence

Use a distribution $q$ to approximate $p$. A common measure of the "distance" or "divergence" between the two distribution is *Kullback-Leibler (KL) Divergence*.

$$
\text{KL}(p \parallel q)=\int p(x)\log{\frac{p(x)}{q(x)}}dx
$$

The formal definition is the information lost when $p$ is approximated with $q$. Therefore, the goal would be to minimize the KL Divergence. Note that $\text{KL}(p \parallel q) \neq \text{KL}(q \parallel p)$. It turns out that minimizing $\text{KL}(p \parallel p_\theta)$ gives the MLE.

#### Reverse KL Divergnece

It is easier to minimize the *reverse KL Divergence* $\text{KL}(q\parallel p)$ with respect to $q$ when approximating $p$ with $q$.

$$
\begin{align*}
\text{KL}(q\parallel p) & = \int q(x)\log{q(x)}dx - \int q(x) \log{p(x)}dx
\\& = \int q(x)\log{q(x)}dx - \int q(x) \log{\tilde{p}(x)}dx + \int q(x) \log{Z}dx
\\& = \underset{x\sim q}{E}(\log{q(x)}) - \underset{x\sim q}{E}(\log{\tilde{p}(x)}) + \underset{x\sim q}{E}(\log{q(Z)})
\\& = -H(q) - \underset{x\sim q}{E}(\log{\tilde{p}(x)}) + \underset{x\sim q}{E}(\log{q(Z)})
\end{align*}
$$

$$
\underset{q}{\arg\min} \{\text{KL}(q\parallel p)\} = \underset{q}{\arg\max} \left\{\underset{x\sim q}{E}(\log{\tilde{p}(x)}) + H(q)\right\}
$$

It's hard to optimize over an expectation so use *reparametrization trick*.

Example: $q$ is a multi variate gaussian.

Maximizing over $q$ means maximizing over $\boldsymbol{\mu}$ and $\boldsymbol{\Sigma}$ (the parameter of the distribution).

Then the entropy $H(q) = \frac{1}{2}\log{|\boldsymbol{\Sigma}|} + \frac{d}{2}\log{2\pi e}$, so the maximization problem becomes

$$
\underset{\boldsymbol{\mu},\boldsymbol{\Sigma}}{\arg\max}\left\{\underset{x\sim N(\boldsymbol{\mu},\boldsymbol{\Sigma})}{E}(\log{\tilde{p}(x)}) + \frac{1}{2}\log{|\boldsymbol{\Sigma}|}\right\}
$$

Use *Cholesky Decomposition* to reparametize $q$ - $\boldsymbol{\Sigma} = LL^\top$. That is, given a standard normal distribution $z\sim N(0, \boldsymbol{I})$, $q = \boldsymbol{\mu} + Lz$. Therefore, the maximization problem can be reparametized to

$$
\underset{\boldsymbol{\mu},\boldsymbol{\Sigma}}{\arg\max}\left\{\underset{z\sim N(0,\boldsymbol{I})}{E}(\log{\tilde{p}(\boldsymbol{\mu} + Lz)}) + \frac{1}{2}\log{|\boldsymbol{\Sigma}|}\right\}
$$

Note that the expectation can be easily estimated using Monte Carlo because $z$ is easy to sample.