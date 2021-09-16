import React, { Fragment } from 'react';
import Joi from 'joi-browser';
import * as yup from 'yup';
import Form from '../../generic/component/form/Form';
import * as userService from '../userService';

class NewUserForm extends Form {
  constructor() {
    super();
    this.state = {
      data: {
        email: "", fullName: "", username: "",
        yearsOfExperience: "", workCategory: "", interest: ""
      },
      errors: {}
    };
  }

  schema = //yup.object().shape({
    {
      email: yup.string()
        .email()
        .required()
        .label('E-mail'),


      fullName: yup
        .string()
        .required()
        .label('fullName'),

      username: yup
        .string()
        .required()
        .label('Username'),
      workCategory: yup
        .string()
        .required()
        .label('workCategory'),
      interest: yup
        .string()
        .required()
        .label('interest'),

      yearsOfExperience: yup.number()
        .required().positive()
        .integer()
        .label('yearsOfExperience')
    }
  //});

  // schema = {
  //   username: Joi.string()
  //     .required()
  //     .email()
  //     .label('Username'),
  //   password: Joi.string()
  //     .required()
  //     .min(5)
  //     .label('Password'),
  //   name: Joi.string()
  //     .required()
  //     .label('Name')
  // };

  doSubmit = async () => {
    try {
      // console.log(this.schema)
      const { data } = await userService.addUser(this.state.data);
      // console.log(data)
      // window.location = '/';
    } catch ({ response }) {
      if (response && response.status === 400) {
        // console.log(response)
        // const errors = { ...this.state.errors };
        // errors.username = err.response.data;
        // this.setState({ errors });
      }
    }
  };



  render() {
    return (
      <Fragment>
        <form onSubmit={e => this.handleSubmit(e)}>
          {this.renderInput('E-mail', 'email', 'email')}
          {this.renderInput('Full name', 'fullName')}
          {this.renderInput('Username', 'username')}
          {this.renderInput('Years Of Experience', 'yearsOfExperience')}
          {this.renderInput('Work Category', 'workCategory')}
          {this.renderInput('Interest', 'interest')}
          {this.renderButton('Add User')}
        </form>
      </Fragment>
    );
  }
}

export default NewUserForm;
