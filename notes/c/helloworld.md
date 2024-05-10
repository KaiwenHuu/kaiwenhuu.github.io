---
title: "Hello World C"
date: "2024-05-09"
slug: "hello-world-c"
---

## Running a C app

In the terminal of shell create a hello.c file with vim.

```
vim hello.c
```

copy paste the following

```
#include <stdio.h>

int main(void) {
    int num;
    printf("Hello world! Give me an integer:\n");
    scanf("%d", &num);
    printf("Thanks! I've always been fond of %d.\n", num);
    return 0;
}
```

Click esc then type the following and press enter.

```
:wq
```

run the following to create an executable file "runme" and run the helloworld program.
```
gcc -o runme hello.c
```

```
./runme
```