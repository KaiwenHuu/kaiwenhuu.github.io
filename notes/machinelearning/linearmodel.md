---
title: "Linear Models"
date: "2024-05-02"
slug: "linear-models"
---
## Linear Classfiers

Let us assume that we believe that a certain outcome $y$ is a linear combination of $X_1, \dots ,X_k$ and some unobservable $U$.

$$y = X\beta + U: y \in \mathbb{R}^n, X \in \mathbb{R}^{n\times k}, \beta \in \mathbb{R}^{k \times 1}, U \in \mathbb{R}^n$$

### OLS Estimator

$$f(\beta) = \frac{1}{2}||y-X\beta||^2 = \frac{1}{2}(y-X\beta)^T(y-X\beta)$$

We want to minimize the objective function with respect to $\beta$. The objective function is convex $f'' > 0$, so there is a unique global minimizer.

Assumptions: $X$ is full rank (i.e., no multi-collinearity). If $X$ is not full rank, then we have a non-unique solution.

$$\hat{\beta} = \underset{\beta}{\arg \min} \left\{\frac{1}{2}(y-X\beta)^T(y-X\beta)\right\}$$

$$\hat{\beta} = (X^TX)^{-1}X^Ty$$

$$(X^TX)\hat{\beta} = X^Ty$$

If we have the matrix of $X$ and vector $y$, then the OLS estimator is very easy to compute. The overall computation cost is $O(nk^2 + k^3)$ because:

- Solving $X^Ty$ is $O(nk)$.
- Solving $X^TX$ is $O(nk^2)$.
- Solving $(X^TX)\hat{\beta} = X^Ty$ is $O(k^3)$

### Robust Regression

$$f(\beta) = ||y-X\beta||_1 = \sum_{i=1}^n |y_i-X_i\beta|$$

Sum of squared errors is sensitive to outliers while the L1 norm of error is not influenced by outliers. The idea is that the sum of squared errors for outliers will be much greater than the absolute error.

### Brittle Regression

$$f(\beta) = ||y-X\beta||_\infty = \max\{|y_i-X_i\beta|\}$$

$$\max\{|y_i-X_i\beta|\} \approx \log{\left(\sum_{i=1}^n\exp{(y_i-X_i\beta)}\right)}$$

The brittle regression would be very sensitive to outliers. Therefore, if we want to have a line of best fit through the outliers we would minimize this objective function.

### Lasso

$$f(\beta) = \frac{1}{2}||y-X\beta||^2 + \alpha||\beta||_1$$

$||\beta||_1 = \sum_{i=1}^k|\beta_k|$ (i.e., L1 norm - sum of all absolute values) and $\alpha$ is the regularization parameter. Now the objective function has the squared error + size of $\beta_i$s. Therefore, the bigger each $\beta_i$ term is, the more penalty we will have on the objective function. So in order to minimize the objective function, we would want to shrink some of the $\beta_i$s.

$$\hat{\beta}_{Lasso} = \underset{\beta}{\arg \min}\left\{\frac{1}{2}||y-X\beta||^2 + \alpha||\beta||_1\right\}$$

Note that the L1 norm is not differentiable at the minimum point (i.e., it is convex, but it is not smooth). However, there is still a closed form for $\hat{\beta}_{Lasso}$.

Minimizing the objective function will allow us to shrink some $\beta_i$ such that $|\hat{\beta}_i| = 0$ for some $i$'s. This in turn is useful for feature selection. The higher the $\alpha$ is, the more feature we would shrink $\beta$.

### Ridge

$$f(\beta) = \frac{1}{2}||y-X\beta||^2 + \frac{\alpha}{2}||\beta||^2$$

Instead of the L1 norm like we used in lasso, we use the L2 norm of the $\beta$ for the penalizing term.

$$\hat{\beta}_{Ridge} = \underset{\beta}{\arg \min}\left\{\frac{1}{2}||y-X\beta||^2 + \frac{\alpha}{2}||\beta||^2\right\}$$

$$\hat{\beta}_{Ridge} = (X^TX + \alpha I)^{-1}X^Ty$$

Note that $X^TX + \alpha I$ is always full rank, so ridge regression can be a solution for multicollinear data.

The Ridge regression will make the model less sensitive to overfitting. This implies that as $\alpha$ increases the test error decreases.

## Binary

Now what if $y\in\{0,1\}$? The linear models above won't do justice because with specific values of $X$, we can predict $\hat{y} = X\hat{\beta}$ to be some value way greater than $1$ or way less than $0$ (unless all coefficients in $\hat{\beta} = 0$).

### Hinge Loss

We don't want to use OLS for binary classification problems because we want to assign $y_i = 1$ if true, and $y_i = -1$ if false. $\hat{y}_i$ can take any $\mathbb{R}$ with OLS so we don't want this. Same thing with the L1 norm.

What we want is a 0-1 loss, but this is hard to minimize. Therefore use the Hinge loss for a convex approximation of the 0-1 loss.

$$f(\beta) = \sum_{i=1}^n\max\{0, 1-y_i\beta^TX_i\}$$

The idea is that if $y_i > 0$ and $\beta^TX_i > 0$, then we made the right prediction. If $y_i < 0$ and $\beta^TX_i < 0$, we also made the right prediction. Therefore if $y_i\beta^TX_i > 0$, we have the right prediction (i.e., the loss is 0).

$$
    error_i= 
    \begin{cases}
    0 & \text{if } y_i\beta^TX_i > 0 \\
    -y_i\beta^TX_i & \text{if } y_i\beta^TX_i < 0
    \end{cases}
$$

However, with the loss function will be $f = \sum_{i=1}^n\max\{0, y_i\beta^TX_i\}$ and the minimizer for this would simply be $\beta = 0$. Therefore, instead of letting $y_i\beta^TX_i > 0$ imply truly classifying $i$ consider $y_i\beta^TX_i \geq 1$. This will be the non-degenerative form and the new error becomes

$$
    error_i= 
    \begin{cases}
    0 & \text{if } y_i\beta^TX_i - 1 \geq 0 \\
    1-y_i\beta^TX_i & \text{if } y_i\beta^TX_i - 1 < 0
    \end{cases}
$$

Summing over the new error terms will give if the Hinge loss function. Note that the Hinge-loss will be a mirrored version of the graph below.

### SVM

SVM is Hinge loss with L2 regularization

$$f(\beta) = \sum_{i=1}^n\max\{0, 1-y_i\beta^TX_i\} + \frac{\alpha}{2}{||\beta||_2}^2$$

### Logistic Loss

Notice that $\max\{0, -y_i\beta^TX_i\} \approx \log(exp(0)+\exp(-y_i\beta^TX_i)) = \log(1+\exp(-y_i\beta^TX_i))$

$$f(\beta) = \sum_{i=1}^n \log(1+\exp(-y_i\beta^TX_i))$$

Now $f(0) = n\log(2)$.