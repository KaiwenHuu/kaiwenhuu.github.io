// Step 1: Import React
import * as React from 'react'
import Layout from '../../../components/layout'
import { Link, graphql } from 'gatsby'

// Step 2: Define your component
const MachineLearningPage = ( {data} ) => {
  return (
    <Layout pageTitle="Machine Learning">
      <p>
      Machine Learning is a broad and dynamic field that spans from foundational statistical methods to advanced areas like Deep Learning and Generative AI. Given the expansive scope of this discipline, organizing thoughts and insights can be challenging. To bring clarity and structure to this complex subject, I have categorized my knowledge into distinct, somewhat orthogonal areas. If it gets overwhelming, I might split some of these into its own sections.</p>
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
      {
        data.allMdx.nodes.map((node) => (
          <article key={node.id}>
            <h2>
              <Link to={`/notes/${node.frontmatter.slug}`}>
                {node.frontmatter.title}
              </Link>
            </h2>
          </article>
        ))
      }
    </Layout>
  )
}

export const query = graphql`
  query {
    allMdx(
      filter: {internal: {contentFilePath: {regex: "/machinelearning/"}}}
      sort: { frontmatter: { date: ASC }}
    ) {
      nodes {
        frontmatter {
          date(formatString: "MMMM D, YYYY")
          title
          slug
        }
        id
        excerpt
      }
    }
  }
`

// Step 3: Export your component
export default MachineLearningPage