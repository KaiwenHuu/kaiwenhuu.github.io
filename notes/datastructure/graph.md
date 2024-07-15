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

### Connectivity

### Properties of Graphs

Real-world networks are so large that it's hard to compare them, so we want to compare them using "graph properties".

#### Clustering Coefficients

Measure of how close a vertex and its neighbors are to being a complete subgraph, where $N(v)$ is the open neighborhood of $v$, i.e., graph composed of vertices adjacent to $v$ and the edges connecting vertices adjacent to $v$:

$$
C_v = \frac{|E(N(v))|}{\text{max possible number of edges in }N(v)}
$$

Note that for any vertex $v$ with $|N(v)| < 2$, then $C_v = 0$. The clustering coefficient for the entire graph is the average of the clustering coefficients over all nodes. $C_v$ can be interpreted as the probability that two neighbors of $v$ are connected. The average clustering coefficient is about how densely clustered the edgs are in the graph.

*Clustering spectrum* $C(k)$ is the distribution of the average of the clustering coefficients of all vertex of degree $k$ in the network, over all $k$. Typically, first thing to look at when analyzing big networks is the average clustering coefficient and its distribution.

#### Importance in a Network (Centrality)

##### Degree

Nodes with large number of neighbors (or edges) have high centrality, meaning those specific nodes hold some important purpose in the network. This way of calculating the importance is simple, where degree centrality $C_d(v) = deg(v)$. These nodes with high degree are also called *hub nodes*. However, this way of measuring centrality can be deceptive.

##### Closeness

Aside from adjacency matrix, graphs can be represented using *distance matrices* where entry $d_{ij}$ is the distance between vertex $i$ and $j$. Degree centrality incorporates the geodesic distance into the centrality equation.

$$
C_c(v) = \frac{1}{\sum_{u\in V} \text{dist}(u, v)}
$$

where $u\in V$ means all other nodes in the network.

##### Betweenness

Betweenness centrality counts the number of shortest paths between $i$ and $k$ that node $j$ resides on

$$
C_b(v) = \sum_{s\neq t, s\neq v, t \neq v} \frac{\sigma st(v)}{\sigma st}
$$

where $\sigma st$ is the number of shortest paths from $s$ to $t$ and $\sigma st(v)$ is the number of shortest pahts from $s$ to $t$ passing through $v$.