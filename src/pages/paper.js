import * as React from 'react'
// import { graphql } from 'gatsby'
import Layout from '../components/layout'
import { Link } from 'gatsby'

const PaperPage = () => {
  return (
    <Layout pageTitle="Papers">
      <p>
        Here are some interesting papers I have read.
      </p>
      <ul>
        <li>
          <Link to="https://bpb-us-w2.wpmucdn.com/campuspress.yale.edu/dist/a/3019/files/2023/09/Master.pdf">Sequential Search</Link>
        </li>
        <li>
          <Link to="https://arxiv.org/pdf/2202.05947">Auction</Link>
        </li>
        <li>
          <Link to="https://arxiv.org/pdf/2202.00273">GAN</Link>
        </li>
        <li>
          <Link to="https://arxiv.org/pdf/1511.01844">Generative Models</Link>
        </li>
        <li>
          <Link to="https://yang-song.net/blog/2021/score/">Generative Modeling</Link>
        </li>
        <li>
          <Link to="https://arxiv.org/pdf/2208.09392">Cold Diffusion</Link>
        </li>
        <li>
          <Link to="https://arxiv.org/pdf/2301.13188">Extracting Data from Diffusion Models</Link>
        </li>
        <li>
          <Link to="https://arxiv.org/pdf/1804.03599">beta VAE</Link>
        </li>
        <li>
          <Link to="https://arxiv.org/pdf/1512.03385">ResNet</Link>
        </li>
      </ul>
    </Layout>
  )
}

// export const query = graphql`
//     query {
//         images: allS3Object {
//             nodes {
//               Key
//               localFile {
//                 childImageSharp {
//                   fluid(maxWidth: 1024) {
//                     ...GatsbyImageSharpFluid
//                   }
//                 }
//               }
//             }
//           }
//     }
//   `

export default PaperPage