// Step 1: Import React
import * as React from 'react'
import Layout from '../components/layout'

// Step 2: Define your component
const MicroTheoryPage = () => {
  return (
    <Layout pageTitle="Micro Theory">
      <p>Generally speaking, a casual audience might not perceive a clear relationship between microeconomics and engineering. However, with the rise of big data, many microeconomic theories can now be estimated and identified. Here are some topics that I find particularly interesting and that are commonly observed in many data science settings.</p>
      <ul>
        <li>Game Theory</li>
        <li>Auction</li>
        <li>Search</li>
        <li>Matching</li>
      </ul>
    </Layout>
  )
}

// Step 3: Export your component
export default MicroTheoryPage