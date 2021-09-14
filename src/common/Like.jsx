import React from 'react';

const Like = ({ liked, onClick }) => {
  //Toggle's btw a full heart and an empty heart
  let likeClass = 'fa fa-heart';
  if (!liked) likeClass += '-o';
  //returns a heart
  return (
    <div>
      <i
        className={likeClass}
        aria-hidden='true'
        onClick={onClick}
        style={{ cursor: 'pointer' }}
      />
    </div>
  );
};

export default Like;
