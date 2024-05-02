import * as React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'

const ArtPage = ({ data }) => {
  return (
    <Layout pageTitle="Art">
      <p>
      I usually draw in my spare time, and here are some of my works that I particularly like, displayed in no particular order. These pieces were mostly created using Procreate. I don't have any specific brush or style that I use; it really depends on my mood. If I feel like being more organized, I will use layers and so forth, but if I'm in the mood for a more unpredictable process, I might not use any. If anyone is willing to share their Photoshop account with me, please let me know. You can find other drawings that didn't make it here and the time lapses of these <a href='https://www.instagram.com/kaiwen_huu/'>here</a>.
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