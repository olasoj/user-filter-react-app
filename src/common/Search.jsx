import React from 'react';

const Search = ({ onSearch }) => {
  return (
    <div className='input-group mb-3'>
      <div className='input-group-prepend'>
        <span className='input-group-text' id='basic-addon1'>
          <i className='fa fa-search' aria-hidden='true' />
        </span>
      </div>
      <input
        type='text'
        className='form-control'
        placeholder='Search'
        aria-label='Search'
        aria-describedby='basic-addon1'
        onChange={e => onSearch(e)}
      />
    </div>
  );
};

export default Search;
