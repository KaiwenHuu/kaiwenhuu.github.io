import * as React from 'react'
// import { graphql } from 'gatsby'
import Layout from '../components/layout'
import { Link } from 'gatsby'

const PaperPage = () => {
  return (
    <Layout pageTitle="Papers">
      <p>
        Papers I have read or plan to read.
      </p>
      <h2>Economics</h2>
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
      </ul>
      <h2>Recommender System</h2>
      <ul>
        <li>
          <Link to="https://g.co/kgs/oefmyBT">Deep Neural Networks for YouTube Recommendations</Link>
        </li>
        <li>
          <Link to="https://arxiv.org/pdf/1812.02353">Top-K Off-Policy Correction for a REINFORCE Recommender System</Link>
        </li>
        <li>
          <Link to="https://research.google/pubs/sampling-bias-corrected-neural-modeling-for-large-corpus-item-recommendations/">Sampling-Bias-Corrected Neural Modeling for Large Corpus Item Recommendations</Link>
        </li>
        <li>
          <Link to="https://storage.googleapis.com/pub-tools-public-publication-data/pdf/b9f4e78a8830fe5afcf2f0452862fb3c0d6584ea.pdf?uclick_id=d8c863ab-e440-4a7b-a88b-090afb0a1ac2">Mixed Negative Sampling for Learning Two-tower Neural Networks in Recommendations</Link>
        </li>
        <li>
          <Link to="https://arxiv.org/pdf/1511.06939">Session-based Recommendations with Recurrent Neural Networks
          </Link>
        </li>
      </ul>
      <h2>Neural Network</h2>
      <ul>
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
        <li>
          <Link to="https://arxiv.org/pdf/2312.00752">Mamba</Link>
        </li>
        <li>
          <Link to="https://www.wpeebles.com/DiT">DIT</Link>
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