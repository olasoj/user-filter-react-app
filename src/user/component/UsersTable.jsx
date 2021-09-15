import React from 'react';

import Table from '../../generic/component/table/Table';


const UsersTable = ({
  users,
  onDelete,
}) => {
  //for table headers and table body

  const columns = [
    { id: 1, label: 'Username', path: '_username' },
    { id: 2, label: 'Full Name', path: '_fullName' },
    { id: 3, label: 'Email', path: '_email' },
    { id: 4, label: 'Years of Experience', path: '_yearsOfExperience' },
    { id: 5, label: 'interest', path: '_interest' },
    { id: 6, label: 'Work Category', path: '_workCategory' }
    // ,
    // {
    //   id: 7, content: movie => (
    //     <Like onClick={() => onLike(movie._id)} liked={movie.liked} />
    //   )
    // }
  ];

  return (
    <Table
      data={users}
      columns={columns}
    />
  );
};

export default UsersTable;
