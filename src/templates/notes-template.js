import * as React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'

const NotesPost = ({ data }) => {
  const { markdownRemark } = data
  const { frontmatter, html } = markdownRemark
  return (
    <Layout pageTitle={frontmatter.title}>
      <p>{frontmatter.date}</p>
      <div dangerouslySetInnerHTML={{ __html: html }}/>
    </Layout>
  )
}

export const pageQuery = graphql`
  query($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        slug
        title
      }
    }
  }
`

export default NotesPost