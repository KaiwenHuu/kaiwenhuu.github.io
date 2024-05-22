---
title: "Control"
date: "2024-05-22"
slug: "control"
---

### Conditionals

CPUs maintain a set of single-bit *conditional code* registers.

#### If Statements

```
if (<test expression>)
    <then-statement>
else
    <else-statement>
```

### Loops

#### Do-While Loops

```
do
    <body-statement>
    while (<test expression>)
```

Execute the `<body-statement>`, evaluate the `<test expression>`, and continue the loop if the evaluation result is non-zero.

#### While Loops
```
while (<test expression>)
    <body-statement>
```

#### For Loops

```
for (<initial expression>; <test expression>; <update expression>)
    <body-statement>
```