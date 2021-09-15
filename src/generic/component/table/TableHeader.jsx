import React, { Fragment } from 'react';

const TableHeader = ({ columns }) => {
  const renderIcon = column => {
    return <i className='fa fa-sort-desc' />;
  };

  return (
    <Fragment>
      <thead>
        <tr>
          {columns.map(column => (
            <th
              style={{ cursor: 'pointer' }}
              key={column.id}
            >
              {column.label}
              {renderIcon(column)}
            </th>
          ))}
        </tr>
      </thead>
    </Fragment>
  );
};

export default TableHeader;
