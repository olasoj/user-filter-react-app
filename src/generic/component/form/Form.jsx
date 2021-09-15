import React, { Component } from 'react';
import Joi from 'joi-browser';
import Input from './Input';
import Select from './Select';
import * as yup from 'yup';


//const username = React.createRef();

class Form extends Component {
  constructor() {
    super();
    this.state = { data: {}, errors: {} };
  }


  handleSubmit = async (e) => {
    e.preventDefault();
    const errors = await this.validateForm();
    console.log(errors)
    this.setState({ errors } || { error: {} });

    if (errors) return;

    this.doSubmit();
  };

  validateForm = async () => {
    const { data } = this.state;
    const options = { abortEarly: false };


    const valid = await this.schema.isValid(data);

    console.log(valid)

    const { error } = false;//Joi.validate(data, this.schema, options);

    if (!error) return '';

    // const errors = {};
    // error.details.map(err => (errors[err.path[0]] = err.message));
    // return errors;
  };

  handleChange = ({ target }) => {
    const { data, error } = this.state;
    const errors = { ...error };
    const errorMessage = null//this.validateProperty(target);

    if (errorMessage) errors[target.name] = errorMessage;
    else delete errors[target.name];
    this.setState({ data: { ...data, [target.name]: target.value }, errors: { ...errors } });
  };

  validateProperty = ({ name, value }) => {
    console.log(name)
    const obj = { [name]: value };
    const fieldSchema = { [name]: this.schema[name] };

    const { error } = Joi.validate(obj, fieldSchema);
    return error ? error.details[0].message : null;
  };


  handleSelect = ({ target }) => {
    const { data } = this.state;
    if (target.value) return this.setState({ data: { ...data, [target.id]: target.value } });
  };


  renderInput = (label, name, type = 'text') => {
    const { data, errors } = this.state;

    return (
      <Input
        label={label}
        type={type}
        name={name}
        value={data[name]}
        onChange={this.handleChange}
        placeholder={label}
        error={errors[name]}
      />
    );
  };

  renderSelect = (dataListName, name, label) => {
    const { data: { [dataListName]: data } } = this.state;
    return (<Select name={[name]} options={data} onChange={this.handleSelect} label={[label]} />);
  };

  renderButton = label => {
    return (
      <button
        // disabled={this.validateForm()}
        type='submit'
        className='btn btn-primary'
      >
        {label}
      </button>
    );
  };
}

export default Form;
