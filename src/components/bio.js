/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import * as React from "react"
import {graphql, Link, useStaticQuery} from "gatsby"
import {StaticImage} from "gatsby-plugin-image"
import {css} from "@emotion/react";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faEnvelopeSquare, faLocationDot} from "@fortawesome/free-solid-svg-icons";

const Bio = () => {
  const data = useStaticQuery(graphql`
    query BioQuery {
      site {
        siteMetadata {
          author {
            name
            summary
          }
          social {
            twitter
          }
        }
      }
    }
  `)

  // Set these values by editing "siteMetadata" in gatsby-config.js
  const author = data.site.siteMetadata?.author
  const social = data.site.siteMetadata?.social

  return (
    <article className="bio">
      <div className='avatar'>
        <StaticImage
          layout="fixed"
          formats={["auto", "webp", "avif"]}
          src="https://ysjee141.github.io/blog/assets/img/profile.jpg"
          css={css`margin-left: auto;
            margin-right: auto`}
          width={110}
          height={110}
          quality={95}
          alt="Profile picture"
        />
      </div>
      <div className='author'>
        <div className="author__name">YOONSEON JI</div>
        <div className='author__description'>개발을 좋아하는 천생 개발자이고 싶은 개발자</div>
      </div>
      <ul className='blog__statistics'>
        <li>
          <Link to='/'>
            <div>11</div>
            <div>POSTS</div>
          </Link>
        </li>
        <li>
          <Link to='/'>
            <div>11</div>
            <div>TAGS</div>
          </Link>
        </li>
        <li>
          <Link to='/'>
            <div>D+606</div>
            <div>OPENED</div>
          </Link>
        </li>
      </ul>
      <ul className='author__urls'>
        <li>
          <FontAwesomeIcon icon={faLocationDot}/>
          <span>Seoul, Korea</span>
        </li>
        <li>
          <a href="mailto:ysjee141@gmail.com" title="Email" target="_blank" rel="nofollow noopener noreferrer">
            <FontAwesomeIcon icon={faEnvelopeSquare}/>
          </a>
        </li>
        <li>
          <a href="https://github.com/ysjee141" title="GitHub" target="_blank" rel="nofollow noopener noreferrer">
            <FontAwesomeIcon icon={faEnvelopeSquare}/>
          </a>
        </li>
        <li>
          <a href="https://instagram.com/ysjee141" title="Instagram" target="_blank" rel="nofollow noopener noreferrer">
            <FontAwesomeIcon icon={faEnvelopeSquare}/>
          </a>
        </li>
      </ul>

      {author?.name && (
        <p>
          Written by <strong>{author.name}</strong> {author?.summary || null}
          {` `}
          <a href={`https://twitter.com/${social?.twitter || ``}`}>
            You should follow them on Twitter
          </a>
        </p>
      )}
    </article>
  )
}

export default Bio
