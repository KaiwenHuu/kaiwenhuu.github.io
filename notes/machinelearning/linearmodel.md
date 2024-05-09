---
title: "Linear Models"
date: "2024-05-02"
slug: "linear-models"
---
## Linear Classfiers

Let us assume that we believe that a certain outcome $y$ is a linear combination of $X_1, \dots ,X_d$ and some unobservable $U$.

$$
y = X\beta + U: y \in \mathbb{R}^{n \times 1}, X \in \mathbb{R}^{n \times d}, \beta \in \mathbb{R}^{d \times 1}, U \in \mathbb{R}^{n \times 1}
$$

### OLS Estimator

We want to minimize the objective function with respect to $\beta$.

$$
f(\beta) = \frac{1}{2}||y-X\beta||^2 = \frac{1}{2}(y-X\beta)^T(y-X\beta)
$$

Minimizing $f(\beta)$ will give us the OLS estimator $\hat{\beta}$. Note that $f(\beta)$ is convex so a global minimum exists. However, we must assume that $X$ is full rank (i.e., no multi-collinearity). Otherwise, we will have a non-unique solution.

$$
\hat{\beta} = \underset{\beta}{\arg \min} \left\{\frac{1}{2}(y-X\beta)^T(y-X\beta)\right\}
$$

$$
\hat{\beta} = (X^TX)^{-1}X^Ty
$$

If we have the matrix of $X$ and vector $y$, then the OLS estimator is very easy to compute. The overall computation cost is $O(nd^2 + d^3)$ because:

- Solving $X^Ty$ is $O(nd)$.
- Solving $X^TX$ is $O(nd^2)$.
- Solving $\hat{\beta} = (X^TX)^{-1}X^Ty$ is $O(d^3)$

### Robust Regression

$$
f(\beta) = ||y-X\beta||_1 = \sum_{i=1}^n |y_i-X_i\beta|
$$

Sum of squared errors is sensitive to outliers while the L1 norm of error is not influenced by outliers. The idea is that the sum of squared errors for outliers will be much greater than the absolute error.

### Brittle Regression

$$
f(\beta) = ||y-X\beta||_\infty = \max\{|y_i-X_i\beta|\}
$$

$$
\max\{|y_i-X_i\beta|\} \approx \log{\left(\sum_{i=1}^n\exp{(y_i-X_i\beta)}\right)}
$$

The brittle regression would be very sensitive to outliers. Therefore, if we want to have a line of best fit through the outliers we would minimize this objective function.

### Lasso

$$
f(\beta) = \frac{1}{2}||y-X\beta||^2 + \alpha||\beta||_1
$$

$||\beta||_1 = \sum_{j=1}^d|\beta_j|$ (i.e., L1 norm - sum of all absolute values) and $\alpha$ is the regularization parameter. Now the objective function has the squared error + size of $\beta_j$s. Therefore, the bigger each $\beta_j$ term is, the more penalty we will have on the objective function. So in order to minimize the objective function, we would want to shrink some of the $\beta_j$s.

$$
\hat{\beta}_{Lasso} = \underset{\beta}{\arg \min}\left\{\frac{1}{2}||y-X\beta||^2 + \alpha||\beta||_1\right\}
$$

Note that the L1 norm is not differentiable at the minimum point (i.e., it is convex, but it is not smooth). However, there is still a closed form solution for $\hat{\beta}_{Lasso}$.

Minimizing the objective function will allow us to shrink some $\beta_j$ such that $|\hat{\beta}_j| = 0$ for some $i$'s. This in turn is useful for feature selection. The higher the $\alpha$ is, the more feature we would shrink $\beta$.

### Ridge

$$
f(\beta) = \frac{1}{2}||y-X\beta||^2 + \frac{\alpha}{2}||\beta||^2
$$

Instead of the L1 norm like we used in lasso, we use the L2 norm of the $\beta$ for the penalizing term.

$$
\hat{\beta}_{Ridge} = \underset{\beta}{\arg \min}\left\{\frac{1}{2}||y-X\beta||^2 + \frac{\alpha}{2}||\beta||^2\right\}
$$

$$
\hat{\beta}_{Ridge} = (X^TX + \alpha I)^{-1}X^Ty
$$

Note that $X^TX + \alpha I$ is always full rank, so ridge regression can be a solution for multicollinear data.

The Ridge regression will make the model less sensitive to overfitting. This implies that as $\alpha$ increases the test error decreases.

## Binary

Now what if $y\in\{0,1\}$? The linear models above won't do justice because with specific values of $X$, we can predict $\hat{y} = X\hat{\beta}$ to be some value way greater than $1$ or way less than $0$ (unless all coefficients in $\hat{\beta} = 0$).

### Hinge Loss

Let us assume that instead of  $y\in\{0,1\}$ we have  $y\in\{-1,1\}$. We don't want to use OLS for binary classification problems because we want to assign $y_i = 1$ if true, and $y_i = -1$ if false.

What we want is a 0-1 loss; if the prediction is correct we add $0$ penalty but if it's wrong we add $1$ penalty, but this is hard to minimize because it's not convex. Therefore use the Hinge loss for a convex approximation of the 0-1 loss.

$$
f(\beta) = \sum_{i=1}^n\max\{0, 1-y_i\beta^TX_i\}
$$

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

$$
f(\beta) = \sum_{i=1}^n\max\{0, 1-y_i\beta^TX_i\} + \frac{\alpha}{2}||\beta||^2
$$

### Logistic Loss

Notice that $\max\{0, -y_i\beta^TX_i\} \approx \log(exp(0)+\exp(-y_i\beta^TX_i)) = \log(1+\exp(-y_i\beta^TX_i))$

$$
f(\beta) = \sum_{i=1}^n \log(1+\exp(-y_i\beta^TX_i))
$$

### Sigmoid

Let $z_i = \beta^TX_i$. Then to get the probability that $z_i = 1$, we can use the sigmoid function.

$$
h(z_i) = \frac{1}{1+\exp(-z_i)}
$$

$$
P(y_i = 1 \mid \beta, X_i) = \frac{1}{1+\exp(-\beta^TX_i)}
$$

### Multi Class Linear Classifiers (Multi-Class SVM)

Now $\beta$ is $d \times k$ where $k$ is the number of classes we want to classify. $\beta_c^T$ is the $c$'th row of the $\beta$ matrix, and $\beta_c^TX_i$ gives the prediction score for class $c$.

$$
\hat{y}_i = \underset{c}{\max}\{\beta_c^TX_i\}
$$

Going back to the hinge-loss, we avoid non trivial solution by aiming for $y_i\beta^TX_i \geq 1$ for the non-degenerative form.

Let $y_i$ be the true class for sample $i$. We want $\beta_{y_i}^TX_i > \beta_c^TX_i$ for all $c\neq t$, but we use $\beta_{y_i}^TX_i \geq \beta_c^TX_i + 1$.

There are two possible loss that for multi class linear classifiers.

$$
\sum_{c\neq y_i} \max\{0, 1-\beta_{y_i}^TX+\beta_c^TX_i\}
$$

$$
\mathop{\max}_{c\neq y_i}\{\max\{0, 1-\beta_{y_i}^TX+\beta_c^TX_i\}\}
$$

Sum peanlizes for each $c$ that violates the constraint for each sample $i$ and max penalizes for one $c$ that violates the constraint the most.

To get Multi-Class SVM, add the L2-regularization.

$$
f(\beta) = \sum_{i=1}^n\sum_{c\neq y_i} \max\{0, 1-\beta_{y_i}^TX+\beta_c^TX_i\} + \frac{\alpha}{2}\sum_{c=1}^k{||\beta_c||}^2
$$

We can write $\sum_{c=1}^k{||\beta_c||}^2$ as the Frobenius.

$$
||\beta||_F = \sqrt{\sum_{c=1}^k\sum_{j=1}^d\beta_{jc}^2}
$$

$$
||\beta||_F^2 = \sum_{c=1}^k\sum_{j=1}^d\beta_{jc}^2 = \sum_{c=1}^k{||\beta_c||}^2
$$

So the Multi-Class SVM written using the Frobenius norm becomes

$$
f(\beta) = \sum_{i=1}^n\sum_{c\neq y_i} \max\{0, 1-\beta_{y_i}^TX+\beta_c^TX_i\} + \frac{\alpha}{2}||\beta||_F^2
$$

### Multi-Class Logistic Regression and Soft Max Loss

The degenerate constraint in the multi-class case and its approximation can be written as

$$
\beta_{y_i}^TX_i\geq \underset{c}{\max}\{\beta_c^TX_i\}
$$

$$
\beta_{y_i}^TX_i\geq \log\left(\sum_{c=1}^k \exp(\beta_c^TX_i)\right)
$$

The loss function from multi-class smoothed approximation degenerate max constraint is the soft max loss. When $k = 2$, then it is equivalent to the binary logistic loss.

$$
f(\beta) = \sum_{i=1}^n\left[-\beta_{y_i}^TX_i + \log\left(\sum_{c=1}^k \exp(\beta_c^TX_i)\right)\right] + \frac{\alpha}{2}\sum_{c=1}^k{||\beta_c||}^2
$$

Also, the soft max function gives us

$$
P(y_i = c \mid \beta, X_i) = \frac{\exp(\beta_{c}^TX_i)}{\sum_{c'=1}^k \exp(\beta_{c'}^TX_i)}
$$