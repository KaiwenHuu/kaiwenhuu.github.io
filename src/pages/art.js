import * as React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'

const ArtPage = ({ data }) => {
  return (
    <Layout pageTitle="Art">
      <p>
        I usually draw in my spare time, and here are some of my works that I particularly like, displayed in no particular order. These pieces were predominantly crafted using Procreate, a versatile digital art app. My approach to creating art varies with my mood; sometimes I meticulously use layers for a structured outcome, and other times I embrace a more spontaneous and unpredictable process without them. You can find other drawings that are not featured here and shortened time-lapse video of these <a href='https://www.instagram.com/kaiwen_huu/'>here</a>.
      </p>
      <ul>
        {
          data.images.nodes.map(node => (
            <img src={node.localFile.childImageSharp.fluid.src} width="250"></img>
          ))
        }
        </ul>
    </Layout>
  )
}

export const query = graphql`
    query {
        images: allS3Object {
            nodes {
              Key
              localFile {
                childImageSharp {
                  fluid(maxWidth: 1024) {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
            }
          }
    }
  `

export default ArtPage