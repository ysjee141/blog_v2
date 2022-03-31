import {Link} from "gatsby";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Pagination from "./pagination";
import * as React from "react";

const BlogList = ({posts, pageInfo}) => {
  return (
    <div>
      <ol className='archive__list'>
        {posts.map(post => {
          const title = post.frontmatter.title || post.fields.slug
          const tags = post.frontmatter.tags || [];

          return (
            <li key={post.fields.slug}>
              <article
                className="post-list-item"
                itemScope
                itemType="http://schema.org/Article"
              >
                <header>
                  <h3>
                    <Link to={post.fields.slug} itemProp="url">
                      {title}
                    </Link>
                  </h3>
                  {post.frontmatter.date && (
                    <small>
                      <FontAwesomeIcon icon={["far", "clock"]}/>
                      <span>{post.frontmatter.date}</span>
                    </small>
                  )}
                </header>
                <section>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: post.frontmatter.description || post.excerpt,
                    }}
                    itemProp="description"
                  />
                  {tags && tags.filter(t => t !== '').map(t => (
                    <Link key={`list-tag-${t}`} to={`/tag/${t}`} className='archive__tag'>#{t}</Link>
                  ))}
                </section>
              </article>
            </li>
          )
        })}
      </ol>
      <Pagination pageInfo={pageInfo}/>
    </div>
  )
}

export default BlogList
