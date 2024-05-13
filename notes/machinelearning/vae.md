---
title: "Variational Autoencoder"
date: "2024-05-13"
slug: "variational-autoencoder"
---

Ingredients of *Variational Autoencoder (VAE)*.

- Encoder: $q_\phi(z\mid x)$
- Decoder: $p_\theta(x\mid z)$
- Prior Distribution (bottle neck): $p_\theta(z) = N(0,\boldsymbol{I})$

Ideally, want to choose $\theta$ (the decoder) that maximizes the likelihood for the *deep latent variable model* $p_\theta(x) = \int p_\theta(x\mid z)p_\theta(z) dz$, but integrating through $z$ could be a problem if $z$ is high dimensional.

Solution: Use *recognition network*

$$
q_\phi(z\mid x) \approx p_\theta(z\mid x) = \frac{p_\theta(x\mid z)p_\theta(z)}{p_\theta(x)}
$$

### ELBO

$$
\begin{align*}
\log{p_\theta(x)} & = \underset{z\sim q_\phi(z\mid x)}{E}\left(\log{p_\theta(x)}\right)
\\& = \underset{z\sim q_\phi(z\mid x)}{E}\left(\log{\frac{p_\theta(x,z)}{p_\theta(z\mid x)}}\right)
\\& = \underset{z\sim q_\phi(z\mid x)}{E}\left(\log{\frac{p_\theta(x,z)q_\phi(z\mid x)}{q_\phi(z\mid x)p_\theta(z\mid x)}}\right)
\\& = \underset{z\sim q_\phi(z\mid x)}{E}\left(\log{\frac{p_\theta(x,z)}{q_\phi(z\mid x)}}\right) + \underset{z\sim q_\phi(z\mid x)}{E}\left(\log{\frac{q_\phi(z\mid x)}{p_\theta(z\mid x)}}\right)
\\& = \text{ELBO}_{\theta,\phi}(x) + \text{KL}(q_\phi(z\mid x)\parallel p_\theta(z\mid x))
\end{align*}
$$

This implies that $\underset{\phi}{\arg\max}\{\text{ELBO}_{\theta,\phi}(x)\} = \underset{\phi}{\arg\min}\{\text{KL}(q_\phi(z\mid x)\parallel p_\theta(z\mid x))\}$ because

$$
\sum_{i=1}^n \text{ELBO}_{\theta,\phi}(x_i) = \sum_{i=1}^n \log{p_\theta(x_i)}-\text{KL}(q_\phi(z\mid x)\parallel p_\theta(z\mid x))
$$

The KL divergence here is the information lost when approximating (or training) the encoder using the decoder network in the reverse direction, which is consistent the idea of recognition network. This should be intuitive because in an autoencoder the network should output the same thing as the input, given the latent representation.

#### Maximizing ELBO

$$
\begin{align*}
\text{ELBO}_{\theta,\phi}(x) & = \underset{z\sim q_\phi(z\mid x)}{E}\left(\log{\frac{p_\theta(x,z)p_\theta(z)}{p_\theta(z)q_\phi(z\mid x)}}\right)
\\& = 
\underset{z\sim q_\phi(z\mid x)}{E}\left(\log{p_\theta(x\mid z)}\right) - \text{KL}(q_\phi(z\mid x)\parallel p_\theta(z))
\end{align*}
$$

Note that the KL divergence is easy to compute because $p_\theta(z)$ is just the bottle neck and $q_\theta(z\mid x)$ is the encoder network. To compute the expectation use the reparametirization trick such that $\underset{z\sim q_\phi(z\mid x)}{E}\left(\log{p_\theta(x\mid z)}\right) = \underset{\epsilon\sim N(0, \boldsymbol{I})}{E}\left(\log{p_\theta(\boldsymbol{\mu}_\phi(x) + \boldsymbol{\Sigma}_\phi(x)^{\frac{1}{2}}\epsilon)}\right)$; take samples from $q$ using samples from $\epsilon$, run the decoder network, then use Monte Carlo to estimate. With this, finally take the autodiff on the expectation and run SGD to optimize the ELBO.