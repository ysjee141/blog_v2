import * as React from "react";
import {Link} from "gatsby";
import {faSearch} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const GlobalHeader = ({location, title, children}) => {
  return (
    <nav className="gnb">
      <Link to="/" className="site-title">
        {title.text}
        <span>{title.subTitle}</span>
      </Link>
      <ul className="gnb__menu">
        <li>
          <Link to='/' activeClassName='active'>Posts</Link>
        </li>
        <li>
          <Link to=''>Tags</Link>
        </li>
        <li>
          <Link to=''>Repos</Link>
        </li>
        <li>
          <Link to=''>About</Link>
        </li>
      </ul>
      <button className='search'>
        <FontAwesomeIcon icon={faSearch}/>
      </button>
    </nav>
  )
}

export default GlobalHeader
