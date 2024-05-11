---
title: "Two's Complement"
date: "2024-05-11"
slug: "twos-complement"
---

### Two's Complement

#### 8 bit

|bit|signed|unsigned|
|----|----|----|
|`1111 1111`|-1|255|
|`1111 1110`|-2|254|
|`1111 1101`|-3|253|
|`1111 1100`|-4|252|
|`1111 1011`|-1|251|
|`1111 1010`|-1|250|
|`1111 1001`|-1|249|
|`1111 1000`|-1|248|

#### 32 bit

Unsigned: $0$ to $2^{32}$.

Signed: $-(2^{31})$ to $2^{31}-1$.

### Memory

|data|byte|bit|
|----|----|----|
|byte|1|4|
|short|2|8|
|int|4|32|
|long|8|16|