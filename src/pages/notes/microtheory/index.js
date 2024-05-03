// Step 1: Import React
import * as React from 'react'
import Layout from '../../../components/layout'
import { Link, graphql } from 'gatsby'

// Step 2: Define your component
const MicroTheoryPage = ( {data} ) => {
  return (
    <Layout pageTitle="Micro Theory">
      <p>
        At first glance, the connection between microeconomics and engineering may not be immediately apparent to a casual observer. Yet, as computational capabilities have dramatically improved, the ability to apply and validate microeconomic theories in practical scenarios has grown significantly. This intersection is particularly fascinating when viewed through the lens of data science, where economic principles can be rigorously tested and applied. Here are some topics that I find particularly interesting.
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
      filter: {fileAbsolutePath: {regex: "/microtheory/"}}
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
export default MicroTheoryPage