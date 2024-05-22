---
title: "Game Theory"
date: "2024-05-19"
slug: "game-theory"
---

### Basics

Normal form of a game $(A_i,u_i)_{i=1}^I$ is where

- Players are $i = 1 \dots I$
- $A_i$ is the set of actions available to player $i$
- $u_i: A_1 \times \dots \times A_I \to R$ is the payoff of player $i$

Players make the choices based on expected payoff

$$
u_i(a_i, a_{-i})
$$

### Mixed Strategies

*Mixed Strategy* is the probability distribution $\sigma_i \in \Delta(A_i)$.

- $\sigma_i(a_i)$ is the probability of playing $a_i$ in mixed strategy $\sigma_i$
- $\sigma_i(a_i) \in [0,1]$ and $\sum_{a_i \in A_i} \sigma_i(a_i) = 1$
- *Strategy Profile* is $\sigma = (\sigma_1,\dots,\sigma_n)$

Players make the choices based on expected payoff

$$
u_i(a_i, \sigma_{-i})
$$

### Bayesian Games

*Bayesian Game* is $((A_i, \Theta_i, u_i)_{i=1}^I,P)$

- Players are $i = 1 \dots I$
- $A_i$ is the set of actions available to player $i$
- $\Theta_i$ is the set of possible types of player $i$
- $u_i: A_1 \times \dots \times A_I \to R$ is the payoff of player $i$
- $P$ is the distribution over types

Players make the choices based on expected payoff

$$
u_i(a_i,a_{-i};\theta_i,\theta_{-i})
$$

### Stochastic Games

If $r_{i1},\dots,r_{ik}$ is an infinite sequence of payoffs for player $i$, then the average payoff is

$$
\underset{k\to\infty}{\lim} \sum_{j=1}^k \frac{r_{ij}}{k}
$$

If $\delta \in (0, 1)$ is the discount factor, the future discounted reward is

$$
\sum_{j=1}^k \delta^jr_{ij}
$$

Some strategies in an infinitely repeated prisoner's dilemma game include:

- Tit for Tat
- Trigger
- Grim

*Stochastic Game* is $(Q, N, A, P, R)$

### Behavioral Game Theory

In the real world people are irational. We can relax the assumption that all players play the best response, and assume the *quantal response* strategy; that is high-utility actions played often than low-utility actions, which is caracterized as the softmax function where $\lambda$ is the sensitivity to differences in utility.

$$
QBR(\sigma_i; \lambda)(a_i) = \frac{\exp(\lambda u_i(a_i,\sigma_{-i}))}{\sum_{a_i'\in A_i}\exp(\lambda u_i(a_i',\sigma_{-i}))}
$$

Another way to think: agents choose $\underset{i}{\arg\max} \{u(a_i) + \epsilon_i\}$ where $\epsilon_i$ is a random shock for action $i$.

Strategy profile $\sigma$ is a *Quantile Response Equilbrium* (QRE) with precision $\lambda$ if every player is simultaneously quantally responding to the profile of the other agents' strategies

$$
\forall i \in I: \sigma_i = QBR_i(\sigma_{-i};\lambda)
$$

*level-k* model: every player performs a finite number of steps of strategic reasoning:

- level-0: nonstrategic distribution of action (often uniform)
- level-1: best response to level-0 players - i.e., reading one step ahead
- level-2: best response to level-1, or to level-1 and level-2 players - i.e., reading two steps ahead, and so on...

### Evolutionary Game Theory

Inspiration comes from biology and how the population learns to evolve.

Example: Prisoner's Dilemma

Let $A$ be a $2\times 2$ matrix where

- $A_{11}$ is the payoff from both players coordinate
- $A_{12}$ is the payoff from coordinating and opponent defecting
- $A_{21}$ is the payoff from defecting and opponent coordinating
- $A_{22}$ is the payoff from both players defecting

Let strategy profile for player $i$ be $\sigma_i = (\sigma_{i1}, \sigma_{i2})$ where $\sigma_{i1}$ is the probability to coorporate, and $\sigma_{i2} = 1-\sigma_{i1}$ is probability to defect. Then the payoff for player $i$ is

$$
\sigma_{i}^\top A \sigma_{i}
$$

Strategy $\sigma^*$ for a symmetric game with payoff matrix $A$ is an *Evolutionary Stable Strategy* (ESS), which is analagous of a Nash Equilbrium in Evolutionary Game Theory, if

1. $\sigma_i^\top A\sigma^* \leq {\sigma^*}^\top A\sigma^*$
2. $\sigma_i^\top A\sigma_{-i} < {\sigma^*}^\top A\sigma_{-i}$ (if 1 holds)

Population in an ESS is resistant to invasion by a small number of mutants playing a different strategy because they won't fit well with the population. Let a player belong to one of the subgroup of population $E_1,\dots E_k$. If player belongs to $E_c$, then player will have the same strategy profile $\sigma_c$. The idea is the sub-populations that performed the best would grow, and those that did not perform well would shrink.

The *Replicator Dynamics* is the natural selection process that determines how populations playing specific strategies evolve. The fitness of the subpopulation (or strategy) $c$ is $f_c(\sigma) = (A\sigma)_c$ and the average fitness of the population is $\bar{f}(\sigma) = \sigma^\top A\sigma$. The Replicator Dynamics is

$$
\begin{align*}
\dot{\sigma}_c(t) & = \sigma_c(t)(f_c(\sigma) - \bar{f}(\sigma))
\\& = \sigma_c(t)((A\sigma)_c - \sigma^\top A\sigma)
\end{align*}
$$

If time is discrete, given hyperparameter $\alpha$ (decay), then it is

$$
\sigma_c(t+1) = \frac{\alpha + f_c(\sigma)}{\alpha + \bar{f}(\sigma)}\sigma_i(t)
$$

Going back to the Prisoner's Dilemma Example, sub population $1$ can be the players who choose to coordinate and $2$ can be the players who choose to defect.