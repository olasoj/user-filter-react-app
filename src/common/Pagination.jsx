import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

//condition rendering
function getClass(page, currentPage) {
  const classes = page === currentPage ? 'page-item active' : 'page-item';
  return classes;
}

const Pagination = ({ noOfMovies, currentPage, pageSize, onPageChange }) => {
  let pageCount = noOfMovies / pageSize;
  pageCount = Math.ceil(pageCount);

  //If count is zero or one dont paginate
  if (pageCount === 0 || pageCount === 1) return null;

  //create an array called pages
  //we will use this to create multiple element
  const pages = _.range(1, pageCount + 1);
  return (
    <nav aria-label='Page navigation example'>
      <ul className='pagination'>
        {pages.map(page => (
          <li className={getClass(page, currentPage)} key={page}>
            <Link
              className='page-link'
              to='/movies'
              onClick={e => onPageChange(page)}
            >
              {page}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
//validation for prop types
Pagination.propTypes = {
  noOfMovies: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired
};

export default Pagination;
