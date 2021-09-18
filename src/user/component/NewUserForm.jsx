import React, { Fragment } from 'react';
import { toast } from 'react-toastify';

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
      .email("Invalid Email")
      .required("Email is required")
      .label('E-mail'),

    fullName: yup
      .string()
      .required("Full name is required")
      .label('fullName'),

    username: yup
      .string()
      .required("Username is required")
      .label('Username'),
    workCategory: yup
      .string()
      .required("Work category is required")
      .nullable(false)
      .label('workCategory'),
    interest: yup
      .string()
      .required("Interest is required")
      .label('interest'),

    yearsOfExperience: yup.number("Please enter a valid positive number.")
      .required("Please enter a valid positive number.")
      .positive("Please enter a valid positive number.")
      .integer("Please enter a valid positive number.")
      .label('yearsOfExperience')
  }


  async componentDidMount() {
    try {
      await this.getDistinctWorkCategory();
    } catch (err) {
      this.setState({ users: [], distinctValues: [] });
      toast.error("Failed to retrieve ")

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
      toast.info("Creating user")
      const { data } = this.state
      data.yearsOfExperience = parseInt(data.yearsOfExperience)
      const { data: { message } } = await addUser(data);
      toast.success(message)
      this.props.history.replace("/users")
    } catch ({ response }) {
      console.log(response)
      if (response && response.status === 400)
        return toast.error("Server: validation error")
      toast.error("Server: service unavailable, please try later")

    }
  };

  render() {
    return (
      <Fragment>
        <form onSubmit={e => this.handleSubmit(e)}>
          {this.renderInput('E-mail *', 'email', 'email')}
          {this.renderInput('Full name *', 'fullName')}
          {this.renderInput('Username *', 'username')}
          {this.renderInput('Years Of Experience *', 'yearsOfExperience', 'number')}
          {this.renderSelect('distinctWorkCategory', "workCategory", "Work Category *")}
          {this.renderInput('Interest *', 'interest')}
          {this.renderButton('Add User')}
        </form>
      </Fragment>
    );
  }
}

export default NewUserForm;
