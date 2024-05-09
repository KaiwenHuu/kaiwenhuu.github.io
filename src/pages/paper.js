import * as React from 'react'
// import { graphql } from 'gatsby'
import Layout from '../components/layout'
import { Link } from 'gatsby'

const PaperPage = () => {
  return (
    <Layout pageTitle="Papers">
      <p>
        Here are some interesting papers I have read or plan to read.
      </p>
      <ul>
        <li>
          <Link to="https://bpb-us-w2.wpmucdn.com/campuspress.yale.edu/dist/a/3019/files/2023/09/Master.pdf">Spatial Learning and Path Dependence in Consumer Search</Link>
        </li>
        <li>
          <Link to="https://arxiv.org/pdf/2202.05947">Artificial Intelligence and Auction Design</Link>
        </li>
        <li>
          <Link to="https://papers.ssrn.com/sol3/papers.cfm?abstract_id=3682021">Algorithmic Pricing and Competition: Empirical Evidence from the German Retail Gasoline Market</Link>
        </li>
        <li>
          <Link to="https://arxiv.org/abs/2205.04661">Pricing with Algorithms</Link>
        </li>
        <li>
          <Link to="https://papers.ssrn.com/sol3/papers.cfm?abstract_id=3195812">Autonomous Algorithmic Collusion: Q-Learning Under Sequential Pricing</Link>
        </li>
        <li>
          <Link to="https://arxiv.org/pdf/2202.00273">StyleGAN-XL: Scaling StyleGAN to Large Diverse Datasets</Link>
        </li>
        <li>
          <Link to="https://arxiv.org/pdf/1511.01844">A Note on the Evaluation of Generative Models</Link>
        </li>
        <li>
          <Link to="https://yang-song.net/blog/2021/score/">Generative Modeling by Estimating Gradients of the Data Distribution</Link>
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
        <li>
          <Link to="https://arxiv.org/pdf/2404.19756">Kolmogrov-Arnold Network</Link>
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