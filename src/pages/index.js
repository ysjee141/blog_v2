import * as React from "react"
import {graphql} from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import Seo from "../components/seo"
// import {library} from "@fortawesome/fontawesome-svg-core";
// import {far} from '@fortawesome/free-regular-svg-icons'
import BlogList from "../components/BlogList";
// library.add(far);

const BlogIndex = ({data, location}) => {
  const siteTitle = data.site.siteMetadata?.title || {text: `Title`}
  const posts = data.allMarkdownRemark.nodes
  const pageInfo = data.allMarkdownRemark.pageInfo

  if (posts.length === 0) {
    return (
      <Layout location={location} title={siteTitle}>
        <Seo title="All posts"/>
        <Bio/>
        <p>
          No blog posts found. Add markdown posts to "content/blog" (or the
          directory you specified for the "gatsby-source-filesystem" plugin in
          gatsby-config.js).
        </p>
      </Layout>
    )
  }

  return (
    <Layout location={location} title={siteTitle}>
      <Seo title="All posts"/>
      <section className="contents__wrapper">
        <div className="archive__list__title">Posts</div>
        <BlogList posts={posts} pageInfo={pageInfo}/>
      </section>
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query  {
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
      limit: 10
    ) {
      nodes {
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
