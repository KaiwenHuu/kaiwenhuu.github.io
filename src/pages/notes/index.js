// Step 1: Import React
import * as React from 'react'
import Layout from '../../components/layout'
import { Link, graphql } from 'gatsby'

// Step 2: Define your component
const NotesPage = ( {data} ) => {
  return (
    <Layout pageTitle="Notes">
      <p>Here are some notes that I have compiled to organize my thoughts while learning new concepts.</p>
      <ul>
        <li>
          <Link to="/notes/microtheory">
            Micro Economics
          </Link>
        </li>
        <li>
          <Link to="/notes/machinelearning">
            Machine Learning
          </Link>
        </li>
        <li>
          <Link to="/notes/distributedsystems">
            Distributed Systems
          </Link>
        </li>
      </ul>
    </Layout>
  )
}

export const query = graphql`
  query {
    allMdx(sort: { frontmatter: { date: ASC }}) {
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
export default NotesPage