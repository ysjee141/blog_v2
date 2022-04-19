import * as React from "react";
import {useEffect, useState} from "react";
import {graphql, Link, useStaticQuery} from "gatsby";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {isInclude} from "../utils/StringUtils";
import {faSearch} from "@fortawesome/free-solid-svg-icons";

const SearchPosts = ({isVisible}) => {

  const data = useStaticQuery(graphql`
  query  {
    allMarkdownRemark( 
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      nodes {
        fields {
          slug
        }
        frontmatter {
          title
          category
          date(formatString: "DD, MMM YYYY")
          description
          tags
        }
        excerpt
        rawMarkdownBody
      }
    }
  }
`).allMarkdownRemark.nodes;

  const [posts, setPosts] = useState([]);
  const [tags, setTags] = useState([])

  const changeKeyword = (e) => {
    const keyword = e.target.value.toLowerCase();
    setPosts(keyword ? data.filter(post => {
      const {title, category, tags} = post.frontmatter;
      return isInclude([title.toLowerCase(), category.toLowerCase(), tags?.join("").toLowerCase()],
        keyword.toLowerCase())
    }) : [])
  }

  useEffect(() => {
    let a = [];
    posts.forEach(post => {
      if (post.frontmatter.tags !== null) {
        a = a.concat(post.frontmatter.tags)
      }
    })
    setTags(posts.length === 0 ? [] : Array.from(new Set(a)))
  }, [posts])

  return (
    <section className={`contents search ${isVisible && 'active'}`} style={{width: "100%"}}>
      <section className="contents__wrapper">
        <FontAwesomeIcon icon={faSearch}/>
        <input type={'text'} placeholder={'검색어를 입력하세요'} onChange={changeKeyword}/>
        {posts.length > 0 && (
          <section>
            <div className="category__sub-title">
              Search results
              <div className={'search__result__count'}>{posts.length} 개 결과 발견</div>
            </div>
            <div className={'is-divider wide'}/>
          </section>
        )}
        <ul className="search__result__list">
          {posts && posts.map(post => {
            const date = post.frontmatter.date || 'UN,KNOWN'
            const [day, month] = date?.split(",");
            return (
              <li className={'search__result__item'} key={post.fields.slug}>
                {day && month && (
                  <section className="search__result__item__date">
                    <p>{day}</p>
                    <i>{month}</i>
                  </section>
                )}
                <Link to={post.fields.slug}>
                  <strong>{post.frontmatter.title}</strong>
                  <span>{post.excerpt}</span>
                  {post.frontmatter.tags && (
                    <ul className="search__result__item__tags">
                      {post.frontmatter.tags.map(tag => (
                        <li>#{tag}</li>
                      ))}
                    </ul>
                  )}
                </Link>
              </li>
            )
          })}
        </ul>
      </section>
    </section>
  )
}

export default SearchPosts
