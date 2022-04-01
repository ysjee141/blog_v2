import * as React from "react"
import GlobalHeader from '../components/GlobalHeader'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSquareRss} from "@fortawesome/free-solid-svg-icons";
import {graphql, Link, useStaticQuery} from "gatsby";
import Social from "./Social";
import Bio from "./bio";
import Categories from "./Categories";
import {startsWithArray} from "../utils/StringUtils";
import {library} from "@fortawesome/fontawesome-svg-core";
import {far} from "@fortawesome/free-regular-svg-icons";
import { defineCustomElements as deckDeckGoHighlightElement } from "@deckdeckgo/highlight-code/dist/loader";

deckDeckGoHighlightElement();
library.add(far);

const Layout = ({location, title, children}) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isShowSidebar = startsWithArray(location.pathname, ["/list", "/category", "/tag"])
    || location.pathname === rootPath;
  const social = useStaticQuery(graphql`
  query {
    site {
      siteMetadata {
        social {
          name
          url
          icon
        }
      }
    }
  }
`).site.siteMetadata.social;
  return (
    <div className="global-wrapper">
      <GlobalHeader title={title} location={location}/>
      <section className={`contents ${!isShowSidebar && 'block'}`}>
        {children}
        {isShowSidebar && (
          <section className='sidebar'>
            <Bio/>
            <Categories/>
          </section>
        )}
      </section>
      <footer>
        <div className="copyright">
          © {new Date().getFullYear()} HAPPL. Built with{` `}
          <a href="https://www.gatsbyjs.com" target='_blank' rel='noreferrer'>Gatsby</a>
        </div>
        <ul className="follow">
          <li key="follow" className="follow__title">팔로우 :</li>
          {social.map(s => s.name !== 'email' && (
            <Social key={s.name} social={s}/>
          ))}
          <li>
            <Link to="/rss.xml">
              <FontAwesomeIcon icon={faSquareRss} color='#fa9b39'/>
              FEED
            </Link>
          </li>
        </ul>
      </footer>
    </div>
  )
}


export default Layout
