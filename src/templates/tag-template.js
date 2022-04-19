import * as React from "react"
import {graphql, Link} from "gatsby"
import Layout from "../components/layout"
import Seo from "../components/seo"

const TagTemplate = ({data, location, pageContext}) => {
  const siteTitle = data.site.siteMetadata?.title || "title"
  const posts = data.allMarkdownRemark?.edges || []
  const tagMap = new Map();

  posts.forEach(post => {
    post.node.frontmatter.tags?.forEach(tag => {
      const tagPosts = tagMap.get(tag) || []
      tagPosts.push(post)
      tagMap.set(tag, tagPosts)
    })
  })

  return (
    <Layout location={location} title={siteTitle}>
      <Seo title="Tag Archives"/>
      <section className="contents__wrapper">
        <div className="category__sub-title">
          Tags Archive
        </div>
        <div className={'is-divider'}/>
        <ul className={'tag__archive'}>
          {tagMap && Array.from(tagMap)
            .sort((c, n) => n[1].length - c[1].length)
            .map(tag => (
            <li key={`tag__archive__${tag[0]}`}>
              <Link to={`/tag/${tag[0]}`}>
                <strong>{tag[0]}</strong>
                <span>{tag[1].length}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  )
}

export default TagTemplate

export const pageQuery = graphql`
  query TagListQuery {
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
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            category
            date
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
