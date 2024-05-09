---
title: "Convolutional Neural Network"
date: "2024-05-08"
slug: "convolutional-neural-network"
---

## Convolutional Neural Network

Processing images in a standard deep learning framework typically encounters two major challenges:

- Utilizing an image vector implies that the model must learn from a large vector, resulting in a substantial number of parameters.
- Important spatial information within the image is lost.

Instead of flattening image data and inputting it directly into a deep neural network, a more effective approach is to utilize a  *Convolutional Neural Network (CNN)*. With CNNs, the input is the image matrix rather than the image vector, which effectively addresses the aforementioned issues. The operations within a CNN are performed iteratively through the following steps:

1. Convolution
2. Activation (using a non-linear activation function)
3. Pooling (usually max-pooling)

These steps are repeated several times, after which the matrix is flattened, and a final activation layer (such as sigmoid or softmax) is applied for classification or labeling tasks.

### Fully Convolutional Network

Flattening the matrix at the final step to input into a sigmoid or softmax function is a common practice in convolutional neural networks (CNNs) for classification or labeling tasks. However, for tasks like image segmentation, where the goal is to label each pixel of the image, the CNN should retain the output as a matrix rather than flattening it. This approach defines a *Fully Convolutional Network (FCN)*. FCNs operate similarly to CNNs but differ in the final stages; instead of flattening the output matrix into a vector, FCNs employ an upsampling technique to expand the spatial dimensions of the output. A prevalent method for upsampling in FCNs is Transposed Convolution. Beyond image segmentation, FCNs are also advantageous for applications such as enhancing image resolution, where maintaining spatial dimensions is critical.