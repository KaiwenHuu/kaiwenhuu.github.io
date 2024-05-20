---
title: "Heterogenous Data Structure"
date: "2024-05-17"
slug: "heterogenous-data-structure"
---

### Structures

`struct` creates a data type that groups objects of possibly different types into a single object.

Unlike C++ or Java, C provides no support for objects and classes.

For example if we have the following structure declaration, then it contains 3 fields of 4-byte `int`s and one 4-byte `int` pointer. Therefore it contains a total of 16 bytes.
```
struct square{
    int i;
    int j;
    int len;
    int *p;
}
```

The address for the fields are:
|Field|Address|
|----|----|
|`i`|x|
|`j`|x+4|
|`len`|x+8|
|`p`|x+12|

The compiler will allocate the appropriate addresses for the structures.

### Unions

Example
```
struct s{
    char c;
    int i[2];
    double v;
}

union u{
    char c;
    int i[2];
    double v;
}
```

At compilation time the memory offsets will be

|Field|`s` Offsets|`u` Offsets|
|----|----|----|
|`c`|0|0|
|`i[2]`|4|0|
|`v`|12|0|

The `struct s` requires a total of 20 bytes whereas `union u` requires 8 bytes (the maximum size of the fields). Unions are useful for optimizing memory.

Tree Example: A tree node is either an internal node or a leaf (two different fields in a data structure will be mutually exclusive)

```
struct node_s {
    struct node_s *left;
    struct node_s *right;
    double data;
};

union node_u {
    struct {
        union node_u *left;
        union node_u *right;
    } internal;
    double data;
};
```

With a structure every node requires 16 bytes whereas with an union it only requires 8 bytes. Right now we don't know which node is an internal node or a leaf so to make things better do the following instead.

```
typedef enum { n_leaf, n_internal } nodetype_t;

struct node {
    nodetype_t type;
    union {
        struct {
            struct node *left;
            struct node *right;
        } internal;
        double data;
    } info;
};
```

### Data Alignment

Linux follows a 2-byte alignment for 2-byte data types and a 4-byte alignment for any larger data types. In Windows, any primitive object of K bytes, for K = 2, 4, or 8, must have an address that is a multiple of K. The alignment restrictions simplify the design of the hardware forming the interface between the processor and the memory system