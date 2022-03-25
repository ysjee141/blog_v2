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
import {faGithub, faInstagram} from "@fortawesome/free-brands-svg-icons";

const Bio = () => {
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
            twitter
          }
        }
      }
      allMarkdownRemark {
       totalCount
      }
    }
  `)

  // Set these values by editing "siteMetadata" in gatsby-config.js
  const author = data.site.siteMetadata?.author
  const social = data.site.siteMetadata?.social
  const postCount = data.allMarkdownRemark.totalCount;

  console.log(author)

  return (
    <article className="bio">
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
          <Link to='/'>
            <div>{postCount}</div>
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
            <FontAwesomeIcon icon={faGithub}/>
          </a>
        </li>
        <li>
          <a href="https://instagram.com/ysjee141" title="Instagram" target="_blank" rel="nofollow noopener noreferrer">
            <FontAwesomeIcon icon={faInstagram}/>
          </a>
        </li>
      </ul>
    </article>
  )
}

export default Bio
