import { graphql } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import React from 'react'
import Layout from '../components/layout'
import SEO from '../components/SEO'

function Doc({ data: { doc } }) {
  const headingTitle = doc.headings[0] && doc.headings[0].value
  const title = doc.slug === '/' ? null : doc.title || headingTitle

  return (
    <Layout>
      <SEO title={title} description={doc.description || doc.excerpt} />
      <MDXRenderer>{doc.body}</MDXRenderer>
    </Layout>
  )
}

export const query = graphql`
  query($id: String!) {
    doc: doc(id: { eq: $id }) {
      id
      title
      description
      excerpt
      body
      headings {
        value
      }
      slug
    }
  }
`

export default Doc
