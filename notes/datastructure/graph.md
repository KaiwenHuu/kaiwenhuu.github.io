---
title: "Graph"
date: "2024-06-20"
slug: "graph"
---

Graph is denoted as $G = (V,E)$ where $V$ is a set of vertices and $E$ is a set of edges, which are 2-element subsets of $V$.

A directed edge $(v_1, v_2)$ represents an arrow from $v_1$ to $v_2$.

### Special Graphs

*Cycle Graph* $C_n$ is a graph consisting of a single cycle of $n$ vertices joined by $n$ edges.

*Path Graph* $P_n$ is a graph with $n$ vertices joined consecutively by a chain of $n-1$ edges.

*Complete Graph* $K_n$ is a graph with $n$ vertices that are all pairwise adjacent.

*Multigraph* is a graph that is permitted to have multiple edges.

*Simple Graph* contains no loops or multiple edges.

*Bipartite Graph* is a graph that has two parts, with edgs joining nodes between the two parts. A *Complete Bipartite Graph* $K_{m,n}$ has $m+n$ vertices in two parts and the edges join all the $mn$ pairs from the two parts.

*Wheels* $W_n$ are graphs formed by connecting a new single vertex to all vertices of a cycle $C_n$.

*N_cubes* $Q_n$.

### Degree and Order

Degree $d$ of a vertex $v$ is the number of edges $v$ has. A graph $G$ is *d-regular* if all its vertices have the same degree $d$.

Order of the graph is the number of vertices $|V|$ in the graph $G$. The number of edges $|E|$ in the graph is the size of the graph.

### Graph Representation

*Adjacency Matrix* $A$ is an $n\times n$ binary matrix where $a_{ij} = 1$ if there is an edge from vertex $i$ to $j$.

*Incidence Matrix* $I$ of a grpah is the binary matrix that has a row for each vertex and a column for each edge. $I_{ve} = 1$ if and only if vertex $v$ is the incident upon edge $e$.

With a weighted graph, the weights can substitute the binary values in either matrices.