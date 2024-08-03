---
title: "Tree"
date: "2024-07-12"
slug: "tree"
---

*Tree* is a connected graph without any cycles - i.e., it is a connected acyclic graph. A disjoint union of trees is called a *forest*.

*Leaf* of a tree is a vertex with a degree of $1$.

If $G=(V,E)$ is a tree with $|V| = m$ and $|E| = n$, then $n = m - 1$.

Application example: setting a network. If you want to make route decisions you want to reduce a graph to a tree to get rid of redundant routes. *Spanning tree* is a subgraph of a graph $G$ that connects all of its vertices. The spanning tree of a graph contains the minimum number of edges to keep the graph connected.

A *spanning subgraph* of graph $G=(V,E)$ is a subgraph with vertex set $V$, and the spanning graph doesn't need to be connected.

There are many algorithms to compute a spanning tree for a connected graph, e.g., vertex-centric algorithm. On the other hand, *minimum spanning tree* is the spanning tree with the minimum sum of edge weights. The *Kruskal's Algorithm* is used the go to algorithm to find a minimum spanning tree.