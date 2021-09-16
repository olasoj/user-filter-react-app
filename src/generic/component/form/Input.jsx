import React from 'react';

const Input = ({ label, name, error, ...rest }) => {
  return (
    <div className="mb-3">
      <label className="form-label" htmlFor={name}>{label}</label>

      <input
        {...rest}
        name={name}
        className='form-control'
        id={name}
        placeholder={name}
      />
      {error && <div className='alert alert-danger'>{error}</div>}
    </div>
  );
};

export default Input;
