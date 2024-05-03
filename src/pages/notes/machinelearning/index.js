// Step 1: Import React
import * as React from 'react'
import Layout from '../../../components/layout'
import { Link, graphql } from 'gatsby'

// Step 2: Define your component
const MachineLearningPage = ( {data} ) => {
  return (
    <Layout pageTitle="Machine Learning">
      <p>
        Machine Learning is a broad and dynamic field that spans from foundational statistical methods to advanced areas like Deep Learning and Generative AI. Given the expansive scope of this discipline, organizing thoughts and insights can be challenging. To bring clarity and structure to this complex subject, I have categorized my knowledge into distinct, somewhat orthogonal areas. If it gets overwhelming, I might split some of these into its own sections.
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
      filter: {fileAbsolutePath: {regex: "/machinelearning/"}}
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