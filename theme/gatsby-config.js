const remarkSlug = require('remark-slug')
const remarkEmoji = require('remark-emoji')

module.exports = (options = {}) => {
  const { mdx = true, contentPath = 'content/docs' } = options

  return {
    siteMetadata: {
      title: 'Dox - Gatsby Theme',
      description: 'Documentation made easy with Gatsby',
      author: 'MunifTanjim'
    },
    plugins: [
      mdx && {
        resolve: `gatsby-plugin-mdx`,
        options: {
          extensions: [`.mdx`, `.md`],
          // gatsbyRemarkPlugins: [],
          remarkPlugins: [remarkSlug, remarkEmoji]
        }
      },
      {
        resolve: `gatsby-source-filesystem`,
        options: {
          name: contentPath,
          path: contentPath
        }
      },
      `gatsby-transformer-yaml`,
      `gatsby-plugin-react-helmet`,
      `gatsby-plugin-theme-ui`
    ].filter(Boolean)
  }
}
