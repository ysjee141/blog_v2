import * as React from "react";
import {Link} from "gatsby";
import {faBars, faSearch} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {startsWithArray} from "../utils/StringUtils";
import {useState} from "react";

const GlobalHeader = ({location, title, searchEvent}) => {

  const isPost = startsWithArray(location.pathname, ["/category", "/tag/", "/list/"])
    || location.pathname === '/';
  const [isMobileGnbActive, setMobileGnbActive] = useState(false);
  const toggleMobileGnb = () => {
    setMobileGnbActive(!isMobileGnbActive)
  }
  const [isToggleSearch, setToggleSearch] = useState(true);
  const toggleSearch = () => {
    setToggleSearch(!isToggleSearch)
    searchEvent(isToggleSearch)
  }

  const resetToggle = () => {
    setToggleSearch(false)
    setMobileGnbActive(false)
    searchEvent(isToggleSearch)
  }

  return (
    <nav className="gnb">
      <div className="site-title">
        <Link to="/" onClick={resetToggle}>
          {title.text}
          <span>{title.subTitle}</span>
        </Link>
      </div>
      <ul className="gnb__menu">
        <li>
          <Link to='/' className={isPost ? 'active': ''}>Posts</Link>
        </li>
        <li>
          <Link to='/tags/' activeClassName={'active'}>Tags</Link>
        </li>
        <li>
          <Link to='/repos/' activeClassName={'active'}>Repos</Link>
        </li>
        <li>
          <Link to='/about/' activeClassName={'active'}>About</Link>
        </li>
      </ul>
      <button className='search' onClick={toggleSearch}>
        <FontAwesomeIcon icon={faSearch}/>
      </button>
      <button className={`gnb__menu__mobile ${isMobileGnbActive ? 'active' : ''}`} onClick={toggleMobileGnb} >
        <FontAwesomeIcon icon={faBars}/>
        <ul className="gnb__menu__mobile__nav">
          <li>
            <Link to='/' className={isPost ? 'active': ''}>Posts</Link>
          </li>
          <li>
            <Link to='/tags' activeClassName={'active'}>Tags</Link>
          </li>
          <li>
            <Link to='/repos' activeClassName={'active'}>Repos</Link>
          </li>
          <li>
            <Link to='/about' activeClassName={'active'}>About</Link>
          </li>
        </ul>
      </button>
    </nav>
  )
}

export default GlobalHeader
