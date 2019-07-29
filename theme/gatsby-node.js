const crypto = require(`crypto`)
const fs = require('fs')
const mkdirp = require('mkdirp')
const path = require('path')

const themeOptions = {
  basePath: '/',
  contentPath: 'content/docs'
}

exports.onPreBootstrap = ({ store, reporter }, options = {}) => {
  if (options.basePath) themeOptions.basePath = options.basePath
  if (options.contentPath) themeOptions.contentPath = options.contentPath

  const { contentPath } = themeOptions

  const { program } = store.getState()

  const dirs = [path.join(program.directory, contentPath)]

  dirs.forEach(dir => {
    if (!fs.existsSync(dir)) {
      reporter.info(`Initializing directory: ${dir}`)
      mkdirp.sync(dir)
    }
  })
}

const mdxResolverPassthrough = fieldName => async (
  source,
  args,
  context,
  info
) => {
  const type = info.schema.getType(`Mdx`)
  const mdxNode = context.nodeModel.getNodeById({
    id: source.parent
  })

  const resolver = type.getFields()[fieldName].resolve
  const result = await resolver(mdxNode, args, context, {
    fieldName
  })

  return result
}

exports.sourceNodes = ({ actions, schema }) => {
  const { createTypes } = actions

  createTypes(
    schema.buildObjectType({
      name: `Doc`,
      fields: {
        id: { type: `ID!` },
        title: { type: `String!` },
        description: { type: `String` },
        slug: { type: `String!` },
        headings: {
          type: `[MdxHeadingMdx!]`,
          resolve: mdxResolverPassthrough(`headings`)
        },
        body: {
          type: `String!`,
          resolve: mdxResolverPassthrough(`body`)
        },
        excerpt: {
          type: `String!`,
          args: {
            pruneLength: {
              type: `Int`,
              defaultValue: 140
            }
          },
          resolve: mdxResolverPassthrough(`excerpt`)
        }
      },
      interfaces: [`Node`]
    })
  )
}

const isReadmeNode = node => /readme/i.test(node.name)
const isIndexNode = node => /index/i.test(node.name) || isReadmeNode(node)
const createDocPath = node => {
  const { basePath } = themeOptions
  const { name, relativeDirectory } = node
  const fullPath = [basePath, relativeDirectory, isIndexNode(node) ? '' : name]
  return path.join(...fullPath)
}

const createContentDigest = data => {
  return crypto
    .createHash(`md5`)
    .update(JSON.stringify(data))
    .digest(`hex`)
}

exports.onCreateNode = ({ node, actions, getNode, createNodeId }) => {
  const { createNode, createParentChildLink } = actions

  // Make sure it's an MDX node
  if (node.internal.type !== `Mdx`) {
    return
  }

  const { contentPath } = themeOptions

  // Create source field (according to contentPath)
  const fileNode = getNode(node.parent)
  const source = fileNode.sourceInstanceName

  if (node.internal.type === `Mdx` && source === contentPath) {
    const slug = createDocPath(fileNode)
    const { title, description } = node.frontmatter

    const fieldData = {
      title,
      description,
      slug
    }

    const id = createNodeId(`${node.id} >>> Doc`)
    const contentDigest = createContentDigest(fieldData)

    createNode({
      ...fieldData,
      id,
      parent: node.id,
      children: [],
      internal: {
        type: `Doc`,
        contentDigest,
        description: `Documentation`
      }
    })

    createParentChildLink({ parent: fileNode, child: node })
  }
}

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  const result = await graphql(`
    {
      allDoc {
        nodes {
          id
          slug
        }
      }
    }
  `)

  if (result.errors) {
    reporter.panic(result.errors)
  }

  const DocTemplate = require.resolve('./src/templates/doc')

  const docs = result.data.allDoc.nodes

  docs.forEach((doc, index) => {
    const previous = index === docs.length - 1 ? null : docs[index + 1]
    const next = index === 0 ? null : docs[index - 1]
    const { slug } = doc

    createPage({
      path: slug,
      component: DocTemplate,
      context: {
        ...doc,
        previous,
        next
      }
    })
  })
}
