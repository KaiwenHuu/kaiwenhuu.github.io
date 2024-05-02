// Step 1: Import React
import * as React from 'react'
import Layout from '../components/layout'
import { Link, graphql } from 'gatsby'

// Step 2: Define your component
const NotesPage = ( {data}) => {
  return (
    <Layout pageTitle="Notes">
      <p>Here are some notes that I have compiled to organize my thoughts while learning new concepts.</p>
      <ul>
        <li>
          <Link to="/microtheory">
            Micro Economics
          </Link>
        </li>
        <li>
          <Link to="/machinelearning">
            Machine Learning
          </Link>
        </li>
        <li>
          <Link to="/distributedsystems">
            Distributed Systems
          </Link>
        </li>
      </ul>
      <ul>
      {
        data.allFile.nodes.map(node => (
          <li key={node.name}>
            {node.name}
          </li>
        ))
      }
      </ul>
    </Layout>
  )
}

export const query = graphql`
  query {
    allFile(filter: {sourceInstanceName: {eq: "note"}}) {
      nodes {
        name
      }
    }
  }
`

// Step 3: Export your component
export default NotesPage