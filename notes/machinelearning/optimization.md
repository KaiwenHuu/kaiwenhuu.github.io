---
title: "Optimization"
date: "2024-05-07"
slug: "optimization"
---

### Gradient Descent

Pseudo Code

- Start with an initial point for $\beta$. Let this be $\beta^0$
- Compute the gradient at $\beta^0$ to generate a better guess $\beta^1 = \beta^0 - \alpha\frac{\partial f}{\partial \beta}(\beta^0)$ where $\alpha$ is the step size.
- repeat this until $\beta^t$ where $\frac{\partial f}{\partial \beta}(\beta^t) = 0$, or until $||\frac{\partial f}{\partial \beta}(\beta^t)|| \leq \epsilon$ where $\epsilon$ is some small scalar.

To get the gradient at each iteration we have to solve

$$\frac{\partial f}{\partial \beta}(\beta^t) = X^T(X\beta - y)$$

Solving $X\beta$ is $O(nd)$

Solving $X\beta - y$ is $O(n)$

Solving $X^T(X\beta - y)$ is $O(nd)$

Therefore, the cost of gradient descent at each iteration is $O(nd)$. So if we have $t$ total iterations, the total cost of gradient descent is $O(ndt)$

The time complexity for solving OLS estimator is $O(nd^2 + d^3)$. So if $d$ is big, gradient descent may be a better alternative. Note that as $n$ or $d$ grow, then $\alpha$ must be smaller for gradient descent to work.

### Stochastic Gradient Descent (SGD)

Since cost of gradient descent at each iteration is $O(nd)$, cost of computation at each iteration becomes expensive as $n$ grows.

Calculating the gradient using all $n$ samples is the same as calculating the gradient using the average sample.

$$f(\beta) = \sum_{i=1}^n f_i(\beta)$$

$$f(\beta) = \frac{1}{n}\sum_{i=1}^n f_i(\beta)$$

$$E\left(\frac{\partial f_i}{\partial \beta}(\beta^t)\right) = \sum_{i=1}^nP(i)\frac{\partial f_i}{\partial \beta}(\beta^t) = \sum_{i=1}^n\frac{1}{n}\frac{\partial f_i}{\partial \beta}(\beta^t) = \frac{1}{n}\sum_{i=1}^n\frac{\partial f_i}{\partial \beta}(\beta^t)  = \frac{\partial f}{\partial \beta}(\beta^t)$$

Therefore, if we draw sub-samples randomly at each iteration we should get the same result as gradient descent; the gradient at each iteration will point to the right direction as the actual gradient on average.

$$Var\left(\frac{\partial f}{\partial \beta}(\beta^t)\right) = E\left[\left(\frac{\partial f}{\partial \beta}(\beta^t) - E\left(\frac{\partial f}{\partial \beta}(\beta^t)\right)\right)^2\right]$$

$$Var\left(\frac{\partial f}{\partial \beta}(\beta^t)\right) = \frac{1}{n}\sum_{i=1}^n\left(\frac{\partial f_i}{\partial \beta}(\beta^t) - \frac{\partial f}{\partial \beta}(\beta^t)\right)^2$$

If Variance is $0$, every step goes in the right direction.

If Variance is small, most steps point in the right direction.

If variance is large, many steps will point in the wrong direction; This is when $\beta^t$ is close to the global minimizer.

As step size $\alpha$ increases variance increases as well. So Stochastic Gradient Descent can make an improvement by

- Have $\alpha$ be big when $\beta^t$ is far from global minimizer
- Have $\alpha$ be small when $\beta^t$ is close to global minimizer

Let $\alpha^t$ be the step size at $t$.

Stochastic gradient converges to a stationary point if

$$\frac{\sum_{t=1}^\infty ({\alpha^t})^2}{\sum_{t=1}^\infty \alpha^t}=0$$

A solution for decreasing step sizes would be $\alpha^t = O\left(\frac{1}{\sqrt{t}}\right)$. If we don't really care about getting the exact solution we can just have $\alpha^t = \alpha$ for all $t$.

In stochastic gradient descent we are not guaranteed to reach a gradient that will exactly equal $0$. So in practice we can measure the validation set error after $d$ iterations for some large $d$ and stop the algorithm when the validation set error isn't improving.

There are multiple different ways where we can choose $\alpha$ as well, such as Adam, batch-norm, min-batch etc.

### Automatic Differentiation (AD)

Consider a function where the input is a function and the output is the derivative. This is *Automatic Differentiation (AD)*, which is used when running gradient descents.

In deeper neural networks, the computation of the derivatives can get quite tedious, so instead of computing the gradient by hand use AD.

The idea behind AD is using chain rule from calculus.

#### Back Propagation

A dynamic programming approach to solving the chain rule is *back propagation*. There are 2 steps: forward path and backward path.

- For each hidden layer, compute all forward paths $h(W_1x), h(W_2h(W_1x)), \dots, v^Th(\dots)$.
- Compute the backward paths using chain rule and store all the intermediate gradients starting from $\nabla f_{v}$, then all the way until $\nabla f_{W_1}$.

Backpropagation requires significant storage capacity to hold all intermediate results during the computation process. Additionally, the computational cost of calculating the gradient is equivalent to the cost of computing the function itself.