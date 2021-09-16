import React, { Fragment } from 'react';
import * as yup from 'yup';
import Form from '../../generic/component/form/Form';
import { addUser, getDistinctValues } from '../userService';

class NewUserForm extends Form {
  constructor() {
    super();
    this.state = {
      data: {
        email: "", fullName: "", username: "",
        yearsOfExperience: 0, workCategory: "", interest: "",
        distinctWorkCategory: []
      },
      errors: {},
    };
  }

  schema = {
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


  async componentDidMount() {
    try {
      await this.getDistinctWorkCategory();
    } catch (err) {
      this.setState({ users: [], distinctValues: [] });
    }
  }

  async getDistinctWorkCategory() {
    const { data } = this.state;
    const { data: distinctValues } = await getDistinctValues();
    this.resolveNewUsersState(distinctValues, data);
  }

  resolveNewUsersState(distinctValues, data) {
    this.setState({ data: { ...data, distinctWorkCategory: [...distinctValues.distinctWorkCategories] } });
  }

  doSubmit = async () => {
    try {
      await addUser(this.state.data);
      window.location = '/';
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
          {this.renderSelect('distinctWorkCategory', "selectedWorkCategory", "Work Category")}
          {this.renderInput('Interest', 'interest')}
          {this.renderButton('Add User')}
        </form>
      </Fragment>
    );
  }
}

export default NewUserForm;
