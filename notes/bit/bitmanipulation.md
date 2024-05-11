---
title: "Bit Manipulation"
date: "2024-05-11"
slug: "bit-manipulation"
---

### Basics

```
Not 1 = 0
Not 0 = 1
```
#### And
```
1 & 1 = 1
1 & 0 = 0
0 & 1 = 0
0 & 0 = 0
```
#### OR
```
1 | 1 = 1
1 | 0 = 1
0 | 1 = 1
0 | 0 = 0
```
#### XOR
```
1 ^ 1 = 1
1 ^ 0 = 0
0 ^ 1 = 0
0 ^ 0 = 1
```
### Bit Shifting

`<< k` left-shifts by `k` bits. It drops off the `k` left most bits and adds new bits on the `k` right most positions set them to `0`. This is equivalent to multiplying by $2^k$.

`>> k` right-shifts by `k` bits. It drops off the `k` right most bits and adds new bits on the `k` left most positions set them to `0`. This is equivalent to dividing by $2^k$.

### Masking

`&0` to turn off all bits.

`|1` to turn on all bits.