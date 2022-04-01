import * as React from "react";
import {Link} from "gatsby";
import {faSearch} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {startsWithArray} from "../utils/StringUtils";

const GlobalHeader = ({location, title, children}) => {

  const isPost = startsWithArray(location.pathname, ["/", "/category", "/tag"]);

  return (
    <nav className="gnb">
      <div className="site-title">
        <Link to="/">
          {title.text}
          <span>{title.subTitle}</span>
        </Link>
      </div>
      <ul className="gnb__menu">
        <li>
          <Link to='/' className={isPost && 'active'}>Posts</Link>
        </li>
        <li>
          <Link to='/tags'>Tags</Link>
        </li>
        <li>
          <Link to='/repos'>Repos</Link>
        </li>
        <li>
          <Link to='/about'>About</Link>
        </li>
      </ul>
      <button className='search'>
        <FontAwesomeIcon icon={faSearch}/>
      </button>
    </nav>
  )
}

export default GlobalHeader
