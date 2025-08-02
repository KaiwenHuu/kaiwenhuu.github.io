// gatsby-node.js
const path = require("path");

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const result = await graphql(`
    {
      allMarkdownRemark {
        edges {
          node {
            id
            frontmatter {
              slug
            }
            fileAbsolutePath
          }
        }
      }
    }
  `);

  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`);
    return;
  }

  result.data.allMarkdownRemark.edges.forEach(({ node }) => {
    const dirName = path.basename(path.dirname(node.fileAbsolutePath));
    const allowedDirs = [
      "distributedsystems",
      "machinelearning",
      "microtheory",
      "pytorch",
      "bit",
      "c",
      "graph",
      "microservices",
      "recommendersystems",
    ];
    if (allowedDirs.includes(dirName)) {
      createPage({
        path: `notes/${dirName}/${node.frontmatter.slug}`,
        component: path.resolve(`./src/templates/notes-template.js`),
        context: {
          id: node.id,
        },
      });
    }
  });
};
