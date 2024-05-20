---
title: "Utility"
date: "2024-05-18"
slug: "utility"
---

Consumption set $X = R_+^n$. A bundle $x=(x_1,\dots,x_n) \in X$ where $x_i$ is the amount of good $i$.

### Preference Relation

$x \succeq x'$ means $x$ is at least as good as $x'$.

Axioms:

1. Completeness: any bundles can be compared $x \succeq  x'$ or $x' \succeq  x$.
2. Transitivity: If $x \succeq x'$ and $x' \succeq  x''$, then $x \succeq  x''$.

Axioms 1 and 2 together gets $x \sim x'$ if $x \succeq x'$ and $x' \succeq x$, and $x \succ x'$ if $x \succeq x'$ and $\neg (x' \succeq x)$. This defines the following sets:
- $\sim(x) = \{x'\in X \mid x \sim x' \}$
- $\succeq(x) = \{x'\in X \mid x \succeq x' \}$

3. Strict Monotonicity: If $x >> x'$ then $x \succ x'$, and if $x \geq x'$ then $x \succeq x'$
4. Continuity: $\succeq(x)$ and $\preceq(x)$ are closed (i.e., $\succ(x)$ and $\prec(x)$ are opened)

Axioms 1 through 4 allows for preference relations to be represented by an *Utility Function*:
If $\succeq$ satisfies Axioms 1 through 4, then there exists a continuos utility function $U:R^n\to R$ representing $\succeq$.