import * as React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import Seo from "../components/seo"
import { library } from "@fortawesome/fontawesome-svg-core"
import { far } from "@fortawesome/free-regular-svg-icons"
import BlogList from "../components/BlogList"
import { CategoryMeta } from "../assets/metadata"

library.add(far)

const BlogListTemplate = ({ data, location, pageContext }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const posts = data.allMarkdownRemark.edges.map(i => i.node)
  // const pageInfo = data.allMarkdownRemark.pageInfo

  const { edges: node, pageInfo } = data.allMarkdownRemark
  const { type, value } = pageContext.info || { type: "", value: "" }

  return (
    <Layout location={location} title={siteTitle}>
      <Seo title={`page ${pageInfo.currentPage} of ${pageInfo.pageCount}`} />
      <section className="contents__wrapper">
        {type !== "" ? (
          <div className="archive__list__type">
            <small>{type.toUpperCase()}</small>
            <span>
              {value} {CategoryMeta[value] && `| ${CategoryMeta[value]}`}
            </span>
          </div>
        ) : (
          <div className="archive__list__title">Posts</div>
        )}

        {node.length === 0 ? (
          <p>
            No blog posts found. Add markdown posts to "content/blog" (or the
            directory you specified for the "gatsby-source-filesystem" plugin in
            gatsby-config.js).
          </p>
        ) : (
          <BlogList
            posts={node.map(n => n.node)}
            pageInfo={pageInfo}
            pageContext={pageContext}
          />
        )}
      </section>
    </Layout>
  )
}

export default BlogListTemplate

export const pageQuery = graphql`
  query blogListQuery(
    $skip: Int!
    $limit: Int!
    $filter: MarkdownRemarkFilterInput
  ) {
    site {
      siteMetadata {
        title {
          text
          subTitle
        }
      }
    }
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: $filter
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            category
            date(formatString: "MMM DD, YYYY")
            description
            tags
          }
          excerpt
        }
      }
      pageInfo {
        currentPage
        hasNextPage
        hasPreviousPage
        pageCount
        perPage
        totalCount
      }
    }
  }
`
