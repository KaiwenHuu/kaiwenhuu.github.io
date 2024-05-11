---
title: "Bayesian Inference"
date: "2024-05-11"
slug: "bayeseian-inference"
---

In a frequentist setting, a statistician or econometrician typically commits to one specific parameter $\hat{\theta}$ after observing $\boldsymbol{y}$ and $\boldsymbol{X}$ and uses this parameter to dictate the probability of outcomes. Therefore, for an unobserved data $\tilde{y},\tilde{X}$ the likelihood is

$$
P(\tilde{y}\mid \hat{\theta},\tilde{X})
$$

However, in a dynamic real-world environment, it is often unrealistic to assume that the parameter remains fixed, given the continual changes and updates that influence underlying conditions.

### Posterior Predictive

Instead of committing to one parameter to compute the likelihood of an unobserved data, the *posterior predictve* computes the weighted average of the likelihoods across all possible $\theta$, given its parameter $\alpha$.

$$
P(\tilde{y}\mid\tilde{X}, \boldsymbol{y}, \boldsymbol{X}, \alpha)=\int \frac{P(\tilde{y}\mid\theta, \tilde{X})P(\theta\mid \boldsymbol{y}, \boldsymbol{X}, \alpha)}{P(\theta\mid\tilde{X}, \boldsymbol{y}, \boldsymbol{X}, \alpha)}d\theta
$$

### Bayesian Linear Regression

Consider the following linear framework: $y = X\theta + U$

$$
U\mid X \sim N(0, \sigma^2), \theta \sim N(0, \lambda^{-1}I)
$$

Note that $U\mid X \sim N(0, \sigma^2)$ implies $y\mid X \sim(X\theta, \sigma^2)$. Then, the posterior has the form

$$
\theta \sim N\left(\theta_{MAP}, \left(\frac{1}{\sigma^2}X^\top X+\lambda I\right)^{-1}\right), \theta_{MAP} = \left(X^\top X+\frac{\lambda}{\sigma^2}I\right)^{-1}X^\top y
$$

$$
\tilde{y} \mid \boldsymbol{X}, \boldsymbol{y}, \tilde{X} \sim N\left(\theta_{MAP}^\top\tilde{X}, \sigma^2+\tilde{X}^\top\left(\frac{1}{\sigma^2}X^\top X+\lambda I\right)\tilde{X}\right)
$$

### Gaussian Process

*Gaussian Process* is the distribution over functions.
For a more general case that can be expanded to non-linear framework suppose $y = f(X) + U$. Then $f$ follows a Gaussian Process

$$
f(X) \sim N(m(X), K(X,X'))
$$

#### Linear Basis Function

For example, $f$ can depend on the parameter $\theta$ where $\theta \sim N(0, \lambda^{-1}I)$. Consider the case $f(X) = \theta^\top \phi(X)$. Then, $m(X)$ is as follows

$$
m(X) = E(\theta^\top \phi(X))
$$

$$
m(X) = E(\theta^\top)\phi(X)
$$

$$
m(X) = 0
$$

#### Kernel

The kernel $K$ determines the covariance over the functions, where $K(X, X') = cov(X, X')$. A common choice is the RBF kernel.

$$
K(X,X') = \alpha^2\exp\left(\frac{-||x-x'||^2}{2l^2}\right)
$$

### Empirical Bayes

Instead of using cross validation to find the best hyperparmeter $\alpha$, which can potentially be biased towards the validation set, an alternative approach is to use *Empirical Bayes*.

$$
\hat{\alpha} \in \underset{\alpha}{\arg\max}\left\{P(y, X\mid\alpha)\right\}
$$

$$
P(y, X\mid\alpha) = \int P(y,X\mid\alpha)P(\theta\mid\alpha)d\theta
$$