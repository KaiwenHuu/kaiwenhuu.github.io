---
title: "Pointers"
date: "2024-05-11"
slug: "pointers"
---

### Key Principles of Pointers in C

Example:
```
int a = 10;
char c = 'a';
char *cp = &c;

int *ip;
char **cpp;

# creating pointers
ip = &a;
cpp = &cp;

void *p;
p = &a;
p = &c;

*ip = 100; # dereferencing
```

#### Every pointer has an associated type

`ip` is a pointer to an `int` and `cpp` is pointer to an object that itself is a pointer to a `char`.

#### Every pointer has a value

The pointer holds the value of an address of some object. If pointer equals `NULL` or `0`, then the pointer is not pointing to anything. Each pointer is created using the `&` operator, which can be used on any *lvalue* (anything to the left of the `=` sign). Pointers can also be dereferenced using the `*` operator.

#### Array and Pointer

Array referencing (e.g., `a[3]`) has the exact same effect as pointer dereferencing (e.g., `*a`).

#### Casting

`(int *) p + 7` shifts the address by 28 bytes (because `int` has 4 bytes), but `(int *) (p + 7)` will shift the address by 7 bytes. Note that `(char *) p + 1` is just shifting the address by 1 byte. In general if `p` is a pointer, then `p+i` means the resulting address is $p+Li$ where $L$ is the size of the data type associated with the pointer.

#### Function Pointers

Example:

```
int foo(int x, int *p);
```

Assign a function pointer
```
(int) (*fp)(int, int *);
fp = foo;
```

Invoke the function using the pointer
```
int x = 1;
int result = fp(3, &x);
```

Note that `int *fp(int, int *)` would be read as `(int *) fp(int, int *);`, which means that theres a function `fp` that takes an `int` and `int *` as its arguments and returns an `int *`. `(int) (*fp)(int, int *)` means that `fp` is a pointer to a function that takes an `int` and `int *` as its arguments and returns an `int`.