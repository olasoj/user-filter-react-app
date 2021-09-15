import React, { Component } from 'react';
// import Joi from 'joi-browser'; 
import Input from '../common/Input';
import Select from './Select';

//const username = React.createRef();

class Form extends Component {
  constructor() {
    super();
    this.state = {
      data: {},
      errors: {}
    };
  }

  //handle validation of the form
  validate = () => {
    const { data } = this.state;

    //Getting the error properties of the validation
    const options = { abortEarly: false };
    const { error } = false;//Joi.validate(data, this.schema, options);
    //if no errors exists, exit the function
    if (!error) return '';

    //create an object to store each errors
    const errors = {};

    //Get the items in the error.details
    // error.details returns a list of objects
    //return an objects
    error.details.map(err => (errors[err.path[0]] = err.message));
    return errors;
  };

  //handle validation of each field
  //name and value are coming from e.target
  validateProperty = ({ name, value }) => {
    //validating field value
    const obj = { [name]: value };
    //create schema used to validate the field
    const fieldSchema = { [name]: this.schema[name] };

    //get the error property
    const { error } = false//Joi.validate(obj, fieldSchema);

    return error ? error.details[0].message : null;
  };

  handleChange = ({ target }) => {
    const { data, error } = this.state;
    const errors = { ...error };
    const errorMessage = this.validateProperty(target);

    if (errorMessage) errors[target.name] = errorMessage;
    else delete errors[target.name];
    this.setState({
      data: { ...data, [target.name]: target.value },
      errors: { ...errors }
    });
  };

  handleSelect = ({ target }) => {
    const { data } = this.state;
    console.log(target.value)
    // const newData = { ...data };
    if (target.value)
      return this.setState({ data: { ...data, [target.id]: target.value } });
  };

  handleSubmit = e => {
    e.preventDefault();
    const errors = this.validate();
    this.setState({ errors } || { error: {} });
    console.log(errors);
    if (errors) return;

    this.doSubmit();
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

    return (
      <Select
        name={[name]}
        options={data}
        onChange={this.handleSelect}
        label={[label]}
      />
    );
  };

  renderButton = label => {
    return (
      <button
        //disabled={this.validate()}
        type='submit'
        className='btn btn-primary'
      >
        {label}
      </button>
    );
  };
}

export default Form;
