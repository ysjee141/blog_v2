import * as React from "react";
import {Link} from "gatsby";

const GlobalHeader = ({location, title, children}) => {
  return (
    <section className="gnb">
      <Link to="/" className="site-title">
        {title.text}
        <span>{title.subTitle}</span>
      </Link>
    </section>
  )
}

export default GlobalHeader
