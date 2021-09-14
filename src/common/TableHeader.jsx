import React, { Fragment } from 'react';

const TableHeader = ({ onSort, sortColumn, columns }) => {
  // const renderIcon = column => {
  //   //check if the header exist in the sortColumn object
  //   if (column.path !== sortColumn.path) return null;

  //   if (sortColumn.order === 'asc') return <i className='fa fa-sort-asc' />;
  //   return <i className='fa fa-sort-desc' />;
  // };

  // const raiseSort = header => {
  //   const sortHeader = { ...sortColumn };
  //   //check if the header and path are the same
  //   //if the so change asc to desc
  //   if (header === sortHeader.path) {
  //     sortHeader.order = sortHeader.order === 'asc' ? 'desc' : 'asc';
  //   } else {
  //     sortHeader.path = header;
  //     sortHeader.order = 'asc';
  //   }
  //   //sort the headers
  //   onSort(sortHeader);
  // };

  return (
    <Fragment>
      <thead>
        <tr>
          {columns.map(column => (
            <th
              style={{ cursor: 'pointer' }}
              key={column.id}
            // onClick={() => raiseSort(column.path)}
            >
              {column.label}
              {/* {renderIcon(column)} */}
            </th>
          ))}
        </tr>
      </thead>
    </Fragment>
  );
};

export default TableHeader;
