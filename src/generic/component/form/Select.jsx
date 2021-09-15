import React from 'react';

const Select = ({ options, name, property, key, label, onChange }) => {
  return (
    <div className='input-group mb-3 m-2'>
      <div className='input-group-append'>
        <label className='input-group-text' htmlFor='inputGroupSelect02'>
          {label}
        </label>
      </div>

      <select onChange={e => onChange(e)} className="form-select form-select-sm" id={name}>
        <option defaultValue>Choose...</option>

        {options.map(option => (
          <option key={options.indexOf(option)} value={option}>
            {option}
          </option>
        ))}
      </select>

    </div>
  );
};

// Select.defaultProps = {
//   key: '_id',
//   property: 'name'
// };

export default Select;
