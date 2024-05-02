// Step 1: Import React
import * as React from 'react'
import Layout from '../components/layout'

// Step 2: Define your component
const DistributedSystemsPage = () => {
  return (
    <Layout pageTitle="Distributed Systems">
      <p>
In any software job, it's crucial to understand how to scale out a product. This implies knowing how data is stored and accessed across millions of different platforms simultaneously. I've jotted down some notes on anything related to this that's important to know.</p>
      <ul>
        <li>Database</li>
        <li>Load Balancing</li>
        <li>Network</li>
        <li>HTTP</li>
        <li>Cache</li>
        <li>Logging</li>
      </ul>
    </Layout>
  )
}

// Step 3: Export your component
export default DistributedSystemsPage