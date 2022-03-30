import * as React from "react";
import {graphql, Link, useStaticQuery} from "gatsby";

const Categories = ({location}) => {

  const data = useStaticQuery(graphql`
  query {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          title
          category
          description
          tags
        }
      }
    }
  }
`)

  const posts = data.allMarkdownRemark.nodes
  const recent = posts.slice(0,3).map(p => {
    return {
      ...p.frontmatter,
      ...p.fields
    }
  })

  let sideData = {
    categories: new Map(),
    tags: new Map()
  }

  for (let post of posts) {
    const category = post.frontmatter.category || "NoCategory";
    const tag = post.frontmatter.tags || [];
    let count = sideData.categories.get(category) || 0;
    sideData.categories.set(category, ++count);
    tag.forEach((v, k) => {
      count = sideData.tags.get(v) || 0;
      sideData.tags.set(v, ++count)
    })
  }

  return (
    <nav className='category__list'>
      <ul className="category__item">
        <li>
          <span className="category__sub-title">Categories</span>
          <div className="is-divider small" />
          <ul className='category__item__category'>
            {sideData.categories && Array.from(sideData.categories).map((i) => (
              <li key={`category-${i[0]}`}>
                <Link to={`/category/${i[0]}`}>{i[0]}({i[1]})</Link>
              </li>
            ))}
          </ul>
        </li>
      </ul>
      <ul className="category__item">
        <li>
          <span className="category__sub-title">Recent Posts</span>
          <div className="is-divider small" />
          <ul className='category__item__recent'>
            {recent && recent.map(i => (
              <li className="recent-posts">
                <Link key={i.slug} to={i.slug}>{i.title}</Link>
              </li>
            ))}
          </ul>
        </li>
      </ul>
      <ul className="category__item">
        <li className="category__item__tags">
          <span className="category__sub-title">Recent Posts</span>
          <div className="is-divider small" />
          {sideData.tags && Array.from(sideData.tags).map((i) => (
            <Link key={`tag-${i[0]}`} to={`/blog/tag/${i[0]}`}>#{i[0]}</Link>
          ))}
        </li>
      </ul>
    </nav>
  )

}

export default Categories;
