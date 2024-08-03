---
title: "Network"
date: "2024-07-27"
slug: "network"
---

*Network model* is a process for generating a graph, i.e., it models static graphs or evolving graphs. Models of static graphs get a set of parameters $\Pi$, and the size of the graph $n$ as inputs. Models of evolving graphs get a set of parameters $\Pi$, and an initial graph $G_0$ and return a graph $G_t$.

If a model is *deterministic*, the network defines a single graph for each value of $n$ (or $t$). In contrast, if the network is randomized, then it defines a probability space $<G_n, P>$ where $G_n$ is the set of all graphs of size $n$ and $P$ a probability distribution over the set $G_n$. This is sometimes called the family of random graphs $R$ (or $ER$).

### ER

### SF

