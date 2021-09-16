import React, { Component } from 'react';
import Input from './Input';
import Select from './Select';
import * as yup from 'yup';
import { each, groupBy, keys } from 'lodash-es';

class Form extends Component {
  constructor() {
    super();
    this.state = { data: {}, errors: {} };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const errors = this.validateForm();
    this.setState({ errors } || { error: {} });

    if (errors) return;
    this.doSubmit();
  };

  validateForm = () => {
    try {
      const { data } = this.state;
      const options = { abortEarly: false };
      const schemaTransform = yup.object().shape(this.schema);
      schemaTransform.validateSync(schemaTransform.cast(data), options);

      return '';
    } catch (err) {
      return this.getFormErrors(err);
    }
  };

  getFormErrors(err) {
    const errors = {};
    const fieldErrors = groupBy(err.inner, 'path');
    const fields = keys(fieldErrors);

    each(fields, (field) => {
      each(fieldErrors[field], (fieldError) => {
        Object.assign((errors[field] = fieldError.errors[0]));
      });
    });

    return errors;
  }

  handleChange = ({ target }) => {
    const { data, error } = this.state;
    const errors = { ...error };
    const errorMessage = this.validateField(target);

    if (errorMessage) errors[target.name] = errorMessage;
    else delete errors[target.name];
    this.setState({ data: { ...data, [target.name]: target.value }, errors: { ...errors } });
  };

  validateField = ({ name, value }) => {
    try {
      const obj = { [name]: value };
      const fieldSchema = { [name]: this.schema[name] };
      const schemaTransform = yup.object().shape(fieldSchema);
      schemaTransform.validateSync(obj);
      return null;
    } catch (err) {
      return err.errors[0]
    }
  };

  handleSelect = ({ target }) => {
    const { data } = this.state;
    const value = ((target.value).trim() === "Select") ? null : target.value;
    if (target.value) return this.setState({ data: { ...data, [target.id]: value } });
  };

  renderInput = (label, name, type = 'text') => {
    const { data, errors } = this.state;

    return (
      <Input
        label={label} type={type}
        name={name} value={data[name]}
        onChange={this.handleChange} placeholder={label}
        error={errors[name]}
      />
    );
  };

  renderSelect = (dataListName, name, label) => {
    const { data: { [dataListName]: lists }, errors } = this.state;
    return (<Select name={[name]} options={lists} onChange={this.handleSelect} label={[label]} error={errors[name]}
    />);
  };

  renderButton = label => {
    return (
      <button type='submit' className='btn btn-primary'>
        {label}
      </button>
    );
  };

}

export default Form;
