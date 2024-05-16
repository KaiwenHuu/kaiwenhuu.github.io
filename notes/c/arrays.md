---
title: "Arrays"
date: "2024-05-13"
slug: "arrays"
---

### Basics

Example:
```
char A[12];
char *B[8];
double C[6];
double *D[5];
```

|Array|Element Size|Total Size|Start Address|Element `i`|
|---|---|---|---|---|
|`A`|1|12|$x_A$|$x_A+i$|
|`B`|4|32|$x_B$|$x_B+4i$|
|`C`|8|48|$x_C$|$x_C+8i$|
|`D`|4|20|$x_D$|$x_D+4i$|

### Pointer Arithmetic

If `p` is a pointer of type $T$, where L is the size of $T$, and the value of `p` is $x_p$, then `p+i` has the value $x_p + Li$.

### Nested Arrays

```
int A[n][m];
```

is equivalent to the following declaration

```
typedef int rowm_t[m];
rowm_t A[n];
```

Array `A` contains `n` elements of array with `m` integers. Therefore, the total array size is $4nm$ bytes. It is analagous to a two-dimensional array where the reference starts from `A[0][0]` through `A[n-1][m-1]`. If the address of `A[0][0]` is $x_A$, then the address of `A[i][j]` is $x_A + L(mi+j)$.

### Fixed-Size Arrays vs Variable-Size Arrays

#### Fixed-Size Arrays

The size of a fixed-size array is determined at compile time. This means that the array size is known and fixed when the program is compiled.

Fixed-Size Array Example
```
#include <stdio.h>

int main(){
    int N = 5;
    int fixedArray[N];
    return 0;
}
```

#### Variable-Size Arrays

The size of a variable-size array is determined at run time.

Variable-size arrays can be declared as local variables or as arguments to a function. The address computation for variable-size arrays is similar to that of fixed-size arrays, with two main differences:

1. The positions of the arguments on the stack are shifted due to the addition of the size parameter.
2. A multiply instruction is used to compute the address of an element rather than using the `leal` instruction.

Static variables, like fixed-size arrays, are any global variables and any other variable declared static. The compiler allocates the variables, giving them a constant address. To allocate storage of variable-size arrays dynamically need `malloc` or `calloc`.

For example:

```
int a;
int* b;
void foo () {
    b = (int*) malloc (10*sizeof(int));
    b[a] = a;
}
```

At compilation compiler allocates pointer `b`. At run time `b` calls `malloc` to get an address for the dynamic array.

Note in Java `static int[] arr` is not a static variable.