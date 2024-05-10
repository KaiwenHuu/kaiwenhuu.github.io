---
title: "Autoencoder"
date: "2024-05-07"
slug: "autoencoder"
---

## Autoencoder

Goal: Learn a function $f$ such that $f(x) \approx x$. This function is an *Autoencoder*. Note, we don't want $f$ to be a simple identity matrix here.

There are three main ingredients in an Autoencoder:

- Encoder: analgous to a PCA, where you take the input to a lower dimensional latent space.
- Bottleneck Layer: typically, the dimension of the bottle neck layer should be smaller than the input.
- Decoder: take the latent representation as an input and try to output the original input.

Autoencoders follow the encoder -> bottle neck -> decoder framework.

### Training Autoencoders

The goal of autoencoders is to reproduce the original input data, so if the data has $d$ dimensions then the Autoencoder's final output has $d$ dimensions - $f:\mathbb{R}^d\to\mathbb{R}^d$.

If the each values in the input vector is continuous, then training is minimizing the following objective function:

$$
f(\Theta) = \sum_{i=1}^n\sum_{j=1}^d(\hat{x}_{ij}-x_{ij})^2
$$

If each values in the input is binary, then training requires minimizing the following instead:

$$
f(\Theta) = \sum_{i=1}^n\sum_{j=1}^d \log{(1+\exp(-x_{ij}\hat{x}_{ij}))}
$$

### Basic Usage

Some problems Autoencoders can be used include:

- Using bottleneck for a latent representation (2 dimensional or 3 dimensional) of the data. This can be utilized to store data with less storage.
- Detect outliers.
- Denoising: use corrupt data such that the autoencoder learns to reconstruct uncorrupted data (i.e., remove noise).