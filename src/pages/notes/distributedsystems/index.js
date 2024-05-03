// Step 1: Import React
import * as React from 'react'
import Layout from '../../../components/layout'
import { Link, graphql } from 'gatsby'

// Step 2: Define your component
const DistributedSystemsPage = ( {data} ) => {
  return (
    <Layout pageTitle="Distributed Systems">
      <p>
        In the realm of software development, mastering the art of scaling a platform is often more critical than proficiency in coding itself. This crucial skill involves comprehending the mechanisms of data storage and access across millions of platforms in real time. Coming from a non-traditional computer science background, I primarily gained this invaluable knowledge through hands-on experience in the field. I've jotted down some notes on everything related to this that is important to know.
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
      filter: {fileAbsolutePath: {regex: "/distributedsystems/"}}
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
export default DistributedSystemsPage