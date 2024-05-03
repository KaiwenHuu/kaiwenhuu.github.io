// Step 1: Import React
import * as React from 'react'
import Layout from '../../components/layout'
import { Link } from 'gatsby'

// Step 2: Define your component
const NotesPage = () => {
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

// Step 3: Export your component
export default NotesPage