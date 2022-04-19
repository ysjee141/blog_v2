/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import * as React from "react"
import {graphql, useStaticQuery} from "gatsby"
import {StaticImage} from "gatsby-plugin-image"
import {css} from "@emotion/react";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faLocationDot} from "@fortawesome/free-solid-svg-icons";
import Social from "./Social";

const Bio = ({type}) => {
  const viewType = type || '';
  const data = useStaticQuery(graphql`
    query BioQuery {
      site {
        siteMetadata {
          author {
            name
            summary
            image
          }
          social {
            name
            url
            icon
          }
        }
      }
      allMarkdownRemark {
       nodes {
         frontmatter {
           tags
         }
       }
       totalCount
      }
    }
  `)

  // Set these values by editing "siteMetadata" in gatsby-config.js
  const author = data.site.siteMetadata?.author
  const social = data.site.siteMetadata?.social
  const postCount = data.allMarkdownRemark.totalCount;

  const tags = new Set()
  data.allMarkdownRemark.nodes.forEach(n => {
    n.frontmatter?.tags?.filter(t => t !== '').forEach(t => tags.add(t))
  })

  return viewType === '' ? (
    <article className={`bio`}>
      <div className='avatar'>
        <StaticImage
          layout="fixed"
          formats={["auto", "webp", "avif"]}
          src="../assets/images/profile.jpg"
          css={css`margin-left: auto;
            margin-right: auto`}
          width={110}
          height={110}
          quality={95}
          alt="Profile picture"
        />
      </div>
      <div className='author'>
        <div className="author__name">{author.name}</div>
        <div className='author__description'>{author.summary}</div>
      </div>
      <ul className='blog__statistics'>
        <li>
          <div>{postCount}</div>
          <div>POSTS</div>
        </li>
        <li>
          <div>{tags.size}</div>
          <div>TAGS</div>
        </li>
        <li>
          <div>D+606</div>
          <div>OPENED</div>
        </li>
      </ul>
      <ul className='author__urls'>
        <li>
          <FontAwesomeIcon icon={faLocationDot}/>
          <span>Seoul, Korea</span>
        </li>
        {social.map(s => (
          <Social key={s.name} social={s} isText={false}/>
        ))}
      </ul>
    </article>
  ) : (
    <article className={'bio-simple'}>
      <StaticImage
        layout="fixed"
        formats={["auto", "webp", "avif"]}
        src="../assets/images/profile.jpg"
        width={110}
        height={110}
        quality={95}
        alt="Profile picture"
      />
      <div className="author__name">
        {author.name}
        <span>Seoul, Korea</span>
      </div>
      <div className='author__description'>{author.summary}</div>
      <ul className='author__urls'>
        {social.map(s => (
          <Social key={s.name} social={s} isText={true}/>
        ))}
      </ul>
    </article>
  )
}

export default Bio
