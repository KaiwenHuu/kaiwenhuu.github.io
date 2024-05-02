// Step 1: Import React
import * as React from 'react'
import Layout from '../components/layout'

// Step 2: Define your component
const MachineLearningPage = () => {
  return (
    <Layout pageTitle="Machine Learning">
      <p>
In general, Machine Learning encompasses everything from basic applications of statistics to Deep Learning and Generative AI. Thus, organizing my thoughts in this area can become quite messy. I have broken down my knowledge into areas that I believe are somewhat orthogonal.</p>
      <ul>
        <li>Linear Models</li>
        <li>MLE and MAP</li>
        <li>Optimization</li>
        <li>Causal Models</li>
        <li>Neural Network and Deep Learning</li>
        <li>Convolutional Neural Network</li>
        <li>Recurrent Neural Network</li>
        <li>Reinforcement Learning</li>
        <li>Transformers</li>
        <li>Bayesian Regression and Gaussian Processes</li>
        <li>VAE</li>
      </ul>
    </Layout>
  )
}

// Step 3: Export your component
export default MachineLearningPage