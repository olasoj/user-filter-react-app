import React from 'react';

const Select = ({ options, name, property, key, label, onChange }) => {
  return (
    <div className='input-group mb-3 m-2'>
      <select onChange={e => onChange(e)} className='custom-select' id={name}>
        <option defaultValue>Choose...</option>
        {options.map(option => (
          <option key={option[key]} value={option[key]}>
            {option[property]}
          </option>
        ))}
      </select>
      <div className='input-group-append'>
        <label className='input-group-text' htmlFor='inputGroupSelect02'>
          {label}
        </label>
      </div>
    </div>
  );
};

Select.defaultProps = {
  key: '_id',
  property: 'name'
};

export default Select;
