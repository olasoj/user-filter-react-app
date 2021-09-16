import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getPageNumbers, getPageNumberClass } from './PaginationService'


const Pagination = ({ totalNumberOfRecord, currentPage, pageSize, onPageChange }) => {
  const pages = getPageNumbers(totalNumberOfRecord, pageSize)

  return (
    <nav aria-label='Page navigation example'>
      <ul className='pagination'>
        {pages && pages.map(page => (
          <li className={getPageNumberClass(page, currentPage)} key={page}>
            <Link className='page-link' to='/users' onClick={e => onPageChange(page)}>
              {page}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

Pagination.propTypes = {
  totalNumberOfRecord: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired
};

export default Pagination;
