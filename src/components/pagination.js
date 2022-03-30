import {Link} from "gatsby";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleDoubleLeft, faAngleDoubleRight} from "@fortawesome/free-solid-svg-icons";
import * as React from "react";

const Pagination = ({pageInfo}) => {
  const prevPage = (pageInfo.currentPage - 1);
  const nextPage = (pageInfo.currentPage + 1);

  return (
    <div className="pagination">
      <Link to={ prevPage < 2 ?  `/list` : `/list/${prevPage}`} className={`pagination__arrow ${!pageInfo.hasPreviousPage ? 'disable' : ''}`}>
        <FontAwesomeIcon icon={faAngleDoubleLeft}/>
      </Link>
      <div className='pagination__info'>Page {pageInfo.currentPage} of {pageInfo.pageCount}</div>
      <Link to={`/list/${nextPage}`} className={`pagination__arrow ${!pageInfo.hasNextPage ? 'disable' : ''}`}>
        <FontAwesomeIcon icon={faAngleDoubleRight}/>
      </Link>
    </div>
  )
}

export default Pagination
