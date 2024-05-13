---
title: "MLE and MAP"
date: "2024-05-05"
slug: "mle-map"
---

## Maximum Likelihood Estimation (MLE)

Let $D = \{D_i:i=1\dots n\}$ where $D_i = (y_i, X_i)$ and each $D_i$ is iid. Suppose that there is some parameter $\theta \in \Theta$. Then the joint probability density function (or probability mass function) $P(D\mid\theta)$ - or the likelihood $L_n(\theta)$ is

$$
L_n(\theta) = \prod_{i=1}^n P(D_i\mid\theta)
$$

The joint PDF gives us the likelihood of the iid sample given $\theta$. The negative log likelihood (NLL) then becomes

$$
-\log{L_n(\theta)} = - \sum_{i=1}^n \log{P(D_i\mid\theta)}
$$

The goal is to have some estimate of $\theta$ that describes the samples that we observe. Therefore, we want to maximize the likelihood function $L_n$ with respect to $\theta$ - or minimize the NLL. The maximum likelihood estimator (MLE) is defined as

$$
\hat{{\theta}}_{MLE} \in \underset{\theta \in \Theta}{\arg \min} \{-\log{L_n(\theta)}\}
$$

The MLE estimator $\hat{{\theta}}_{MLE}$ is the value which we are most likely to observe $D$. In general, $\hat{\theta}_{MLE}$ is obtained using some form of numerical optimization over the NLL.

### Asymptotics of MLE

$\underset{n\to\infty}{\lim}{\hat{{\theta}}_{MLE}} = \theta$

MLE is asymptotically consistent. It is also asymptotically normal and this can be proven using *Stein's Lemma*.

### Exponential Family

If each $D_i$ (or $x_i$) follows a distribution of an *Exponential Family*, then $P(x_i\mid\theta)$ follows the form

$$
\frac{h(x_i)\exp(\eta(\theta)^\top s(x_i))}{Z(\theta)}
$$

Examples of exponential families include

- Bernoulli Distribution: $P(x_i\mid\theta) = \theta^{1(x_i = 1)}(1-\theta)^{1(x_i = 0)}$
- Categorical Distribution: $P(x_i\mid \boldsymbol{\theta}) = \prod_{c=1}^k\theta_c^{1(x_i = c)}$
- Normal Distribution: $P(x_i\mid\mu,\sigma) = \frac{1}{\sigma\sqrt{2\pi}}\exp\left(-\frac{1}{2}\left(\frac{x-\mu}{\sigma}\right)^2\right)$
- Multivariate Normal Distribution: $P(\boldsymbol{x}_i\mid \boldsymbol{\mu}, \boldsymbol{\Sigma}) = \frac{1}{(2\pi)^{\frac{d}{2}}\det(\boldsymbol{\Sigma})^{\frac{d}{2}}}\exp\left(-\frac{1}{2}(\boldsymbol{x}_i-\boldsymbol{\mu})^\top \boldsymbol{\Sigma}^{-1}(\boldsymbol{x}_i-\boldsymbol{\mu})\right)$
- Poisson Distribution: $P(x_i \mid \lambda) = \frac{1}{x_i!}\lambda^{x_i}\exp(-\lambda)$

Convenient thing about distributions that follow the exponential family is that the MLE can be obtained from moment matching - i.e., the estimator is just the sample mean (and sample covariance). Thus, there is no need for any numerical optimization method such as grid search or gradient descent.

<!-- ### Gaussian MLE

Assume $y_i = \beta^\top  X_i + U_i$ where $U_i$ follows a standard normal.

$$\mathbb{P}(U_i) = \frac{1}{\sqrt{2\pi}}\exp{\left(-\frac{U_i^2}{2}\right)}$$

$$\log{L_n(\beta)} = \sum_{i=1}^n\log{\left(\frac{1}{\sqrt{2\pi}}\exp{\left(-\frac{U_i^2}{2}\right)}\right)}$$

$$\log{L_n(\beta)} = \sum_{i=1}^n\left[\log{\frac{1}{\sqrt{2\pi}}} + \log{\exp{\left(-\frac{U_i^2}{2}\right)}}\right]$$

$$\log{L_n(\beta)} = \sum_{i=1}^n\left(\log{\frac{1}{\sqrt{2\pi}}} - \frac{U_i^2}{2}\right)$$

$$\log{L_n(\beta)} = \sum_{i=1}^n\left(\log{\frac{1}{\sqrt{2\pi}}} - \frac{(y_i - \beta^\top  X_i)^2}{2}\right)$$

$$\log{L_n(\beta)} = n\log\left({\frac{1}{\sqrt{2\pi}}}\right) - \frac{1}{2}\sum_{i=1}^n(y_i - \beta^\top  X_i)^2$$

$n\log{\frac{1}{\sqrt{2\pi}}}$ is just some constant independent of $\beta$. Let us denote this constant as $c$. Then finding MLE is simply solving for the least squares.

$$\log{L_n(\beta)} = c - \frac{1}{2}{||y-X\beta||_2}^2$$

$$-\log{L_n(\beta)} = -c + \frac{1}{2}{||y-X\beta||_2}^2$$

Minimizing for $-\log{L_n(\beta)}$ is the same as maximizing for $\log{L_n(\beta)}$. Note that the joint PDF is conditional on both $X$ and $\beta$ ($\mathbb{P}(y|X,\beta)$). This is called a discriminative supervised learning model. A generative model would optimize $\mathbb{P}(y, X|\beta)$.

### Discriminative Probabilistic Models

- Least Squares. MLE under gaussian likelihood $$\mathbb{P}(y|X,\beta) = \frac{1}{\sqrt{2\pi}}\exp{\left(-\frac{U_i^2}{2}\right)}$$
- Robust Regression. MLE under laplace likelihood $$\mathbb{P}(y|X,\beta) = \frac{1}{2}\exp{\left(-|U_i|\right)}$$
- Logistic Regression. MLE under sigmoid function $$\mathbb{P}(y|X,\beta) = \frac{1}{1+\exp{(-y_i\beta^\top  X_i)}}$$

### Generative Probabilistic Models

- Naive Bayes
- Linear Discriminant Analysis -->

## Maximum a Posteriori (MAP) Estimation

MLE estimates $\theta$ by maximizing the likelihood of seeing $D$ conditional on $\theta$, but it's more intuitive to think of learning $\theta$ conditional on observing $D$ - i.e. what we really want to find $\theta$ that has the highest prob ability given the data. From Bayes' rule we have

$$
\begin{align*}
P(\theta\mid D) & = \frac{P(D\mid \theta)P(\theta)}{P(D)}
\\& \propto P(D\mid \theta)P(\theta)
\end{align*}
$$

Note that $P(\theta)$ should really be $P(\theta\mid\alpha)$, where $\alpha$ is the parameter for the prior distribution of $\theta$. Following the same way MLE estimated $\theta$ from minimizing the NLL, the maximum a posteriori (MAP) estimator can be obtained from minimizing the NLL where $L_n(\theta) = P(\theta\mid D, \alpha) \propto P(D\mid \theta)P(\theta\mid\alpha)$.

$$
\hat{{\theta}}_{MAP} \in \underset{\theta \in \Theta}{\arg \min} \left\{-\sum_{i=1}^n \log{P{(D_i\mid\theta)}} - \log{P(\theta\mid\alpha)}\right\}
$$

The prior distribution acts as a regularizer, ensuring that the estimator does not overfit, particularly when the number of observations is small. Note that as $n\to\infty$, $\hat{{\theta}}_{MAP} \to \hat{{\theta}}_{MLE}$. 

<!-- Let $f(y_i,\theta) = \mathbb{P}(y|\beta)\mathbb{P}(\beta)$ -->

<!-- $$\Pi_{i=1}^n \log{f(y_i,\theta)} = \Pi_{i=1}^n \log{\mathbb{P}(y_i|\beta)\mathbb{P}(\beta)}$$

$$\Pi_{i=1}^n \log{f(y_i,\theta)} = \Pi_{i=1}^n \log{\mathbb{P}(y_i|\beta)} + \log{\mathbb{P}(\beta)}$$ -->

<!-- $${\theta}_{MAP} = \mathop{\arg \max}_{\theta \in \Theta} \log{\mathbb{P}(y|\beta)\mathbb{P}(\beta)}$$

$${\theta}_{MAP} = \mathop{\arg \max}_{\theta \in \Theta} \log{\mathbb{P}(y|\beta)} + \log{\mathbb{P}(\beta)}$$

$${\theta}_{MAP} = \mathop{\arg \max}_{\theta \in \Theta} \log{\prod_{i=1}^n\mathbb{P}(y_i|\beta)} + \log{\mathbb{P}(\beta)}$$

$${\theta}_{MAP} = \mathop{\arg \max}_{\theta \in \Theta} \sum_{i=1}^n\log{\mathbb{P}(y_i|\beta)} + \log{\mathbb{P}(\beta)}$$

Interpret $\sum_{i=1}^n\log{\mathbb{P}(y_i|\beta)}$ as the loss and $\log{\mathbb{P}(\beta)}$ as the regularizer. Assume $\beta_i$ is iid and comes from a Gaussian with mean $0$ and variance $\frac{1}{\alpha}$.

$$\mathbb{P}(\beta) = \Pi_{j=1}^k \mathbb{P}(\beta_j)$$

$$\mathbb{P}(\beta) \propto \Pi_{j=1}^k \exp{\left(\frac{-\alpha}{2}\beta_j^2\right)}$$

$$\mathbb{P}(\beta) \propto \exp{\left(\frac{-\alpha}{2}\sum_{j=1}^k\beta_j^2\right)}$$

$$\mathbb{P}(\beta) \propto \exp{\left(\frac{-\alpha}{2}||\beta||_2^2\right)}$$

$$\log{\mathbb{P}(\beta)} = \log{\exp{\left(\frac{-\alpha}{2}||\beta||_2^2\right)}} + c$$

$$\log{\mathbb{P}(\beta)} = \frac{-\alpha}{2}||\beta||_2^2 + c$$

$${\theta}_{MAP} = \mathop{\arg \max}_{\theta \in \Theta} \sum_{i=1}^n\log{\mathbb{P}(y_i|\beta)} - \frac{\alpha}{2}||\beta||_2^2$$

### MAP and Regularization

- Least Squares with L2 Regularization: $$\mathbb{P}(y|X,\beta) = \frac{1}{\sqrt{2\pi}}\exp{\left(-\frac{U_i^2}{2}\right)}$$
$$\mathbb{P}(\beta_j) = \exp{\left(\frac{-\alpha}{2}\beta_j^2\right)}$$
- Robust Regression with L2 Regularization: $$\mathbb{P}(y|X,\beta) = \frac{1}{2}\exp{\left(-|U_i|\right)}$$
$$\mathbb{P}(\beta_j) = \exp{\left(\frac{-\alpha}{2}\beta_j^2\right)}$$

Unlike MLE, the choice of variance changes the MAP solution; as $n \to \infty$ the effect of prior/regularizer goes to zero. -->

### Conjugate Priors

If $P(D\mid \theta)$ follows an Exponential Family, there is a prior distribution for $\theta\mid\alpha$ such that $\theta\mid D,\alpha$ will belong to the same family of distributions as the prior. Some examples of conjugate priors are:

- Beta-Bernoulli: $x\mid\theta \sim Bern(\theta), \theta\mid\alpha,\beta \sim Beta(\alpha,\beta)$
- Categorical-Dirichlet: $x\mid\boldsymbol{\theta} \sim Cat(\boldsymbol{\theta}), \boldsymbol{\theta}\mid\boldsymbol{\alpha} \sim Dir(\boldsymbol{\alpha})$
- Normal Distribution: $x\mid\mu,\sigma \sim N(\mu,\sigma), \mu\mid\mu_0,\sigma_0 \sim N(\mu_0,\sigma_0)$
- Multivariate Normal Distribution: $\boldsymbol{x}\mid \boldsymbol{\mu}, \boldsymbol{\Sigma} \sim N(\boldsymbol{\mu}, \boldsymbol{\Sigma}), \boldsymbol{\mu}\mid\boldsymbol{\mu}_0,\boldsymbol{\Sigma}_0\sim N(\boldsymbol{\mu}_0,\boldsymbol{\Sigma}_0)$
- Gamma-Poisson Distribution: $x\mid \lambda \sim Poisson(\lambda), \lambda\mid\alpha,\beta \sim Gamma(\alpha,\beta)$