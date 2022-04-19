import * as React from "react"
import {graphql, Link} from "gatsby"
import Layout from "../components/layout"
import Seo from "../components/seo"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronLeft, faChevronRight, faTags} from "@fortawesome/free-solid-svg-icons";

const BlogPostTemplate = ({data, location}) => {
  const post = data.markdownRemark
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const {previous, next} = data

  return (
    <Layout location={location} title={siteTitle}>
      <Seo
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
      />
      <article
        className="blog-post"
        itemScope
        itemType="http://schema.org/Article"
      >
        <header>
          <h1 itemProp="headline">{post.frontmatter.title}</h1>
          <i>
            <FontAwesomeIcon icon={["far", "clock"]}/>
            <span>{post.frontmatter.date}</span>
          </i>
          <i className={'blog-post-category-link'}>
            in <Link to={`/category/${post.frontmatter?.category}`}>{post.frontmatter?.category}</Link>
          </i>
        </header>
        <span className="page-divider">
          <span className="one"/>
          <span className="two"/>
        </span>
        {post.frontmatter.tags && (
          <ul className="post-tags">
            <li><FontAwesomeIcon icon={faTags}/></li>
            {post.frontmatter.tags?.map(t => (
              <li key={`post-tags-${t}`}>
                <Link to={`/tag/${t}`}>#{t}</Link>
              </li>
            ))}
          </ul>
        )}
        <section
          dangerouslySetInnerHTML={{__html: post.html}}
          itemProp="articleBody"
        />
        {post.frontmatter.refs ? (
          <div itemProp='postReference' className="post-reference">
            <table>
              <tbody>
              <tr>
                <td>참고자료</td>
                <td>
                  <ul>
                    {post.frontmatter.refs.map(r => (
                      <li key={`post-reference-${r}`}>
                        <a target='_blank'rel={'noreferrer'} href={r}>{r}</a>
                      </li>
                    ))}
                  </ul>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
        ) : (
          <span className="page-divider">
            <span className="one"/>
            <span className="two"/>
          </span>
        )}
        {/*<footer>*/}
        {/*  <Bio />*/}
        {/*</footer>*/}
      </article>
      <nav className={`blog-post-nav ${post.frontmatter.refs === null && 'no-margin'}`}>
        <ul
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
            padding: 0,
          }}
        >
          <li>
            {previous && (
              <Link to={previous.fields.slug} rel="prev">
                <FontAwesomeIcon icon={faChevronLeft}/> {previous.frontmatter.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={next.fields.slug} rel="next">
                {next.frontmatter.title} <FontAwesomeIcon icon={faChevronRight}/>
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug(
    $id: String!
    $previousPostId: String
    $nextPostId: String
  ) {
    site {
      siteMetadata {
        title {
          text
          subTitle
        }
      }
    }
    markdownRemark(id: { eq: $id }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
        category
        tags
        refs
      }
    }
    previous: markdownRemark(id: { eq: $previousPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
    next: markdownRemark(id: { eq: $nextPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
  }
`
