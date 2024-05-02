/**
 * @type {import('gatsby').GatsbyConfig}
 */
require("dotenv").config()

module.exports = {
  siteMetadata: {
    title: `kaiwenhuu.github.io.demo`,
    siteUrl: `https://www.yourdomain.tld`,
  },
  plugins: [
    {
      resolve: 'gatsby-source-s3',
      options: {
        aws: {
          accessKeyId: process.env.AWS_ACCESS_KEY_ID,
          secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
          region: process.env.AWS_REGION  // Replace with your bucket's region
        },
        buckets: [process.env.AWS_BUCKET],
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: `notes`,
        path: `${__dirname}/notes`,
      }
    },
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    'gatsby-image',
    "gatsby-plugin-mdx",
  ],
}
