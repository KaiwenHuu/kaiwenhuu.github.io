// Step 1: Import React
import * as React from 'react'
import Layout from '../../../components/layout'
import { Link, graphql } from 'gatsby'

// Step 2: Define your component
const MachineLearningPage = ( {data} ) => {
  return (
    <Layout pageTitle="Machine Learning">
      <p>
        Some notes on anything related to machine learning, from econometrics, deep learning to reinforcement learning.
      </p>
      <ul>
      {
        data.allMarkdownRemark.nodes.map((node) => (
          <article key={node.id}>
            <li>
              <Link to={`./${node.frontmatter.slug}`}>
                {node.frontmatter.title}
              </Link>
            </li>
          </article>
        ))
      }
      </ul>
    </Layout>
  )
}

export const query = graphql`
  query {
    allMarkdownRemark(
      filter: {fileAbsolutePath: {regex: "/notes/machinelearning/"}}
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