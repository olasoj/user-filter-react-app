import React, { Component } from 'react';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import { getAllUsers, getDistinctValues, removeUser } from '../userService'

import UserTable from './UsersTable';
import Form from '../../generic/component/form/Form';
import Pagination from '../../generic/Pagination';

class Users extends Form {
  constructor() {
    super();
    this.state = {
      data: {
        name: '',
        page: 1, pageSize: 10,
        selectedWorkCategory: null, selectedInterest: null,
        users: [], distinctWorkCategory: [], distinctInterest: [],
        totalNumberOfUser: null, totalUserOnPage: 1
      },
      errors: { name: '' },
    };
  }

  async componentDidMount() {
    try {
      await this.fetchUserDetailsData();
    } catch (err) {
      this.setState({
        users: [],
        distinctValues: []
      });
    }
  }

  deleteUser = async id => {
    const { data } = this.state
    const users = [...data.users];

    const newUsers = users.filter(user => user._id !== id);
    this.setState({ data: { ...data, users: [...newUsers] } });

    await this.handleDeleteUser(id, data, users);
  };

  handlePageChange = async (pageNumber) => {
    const { data } = this.state
    data.page = pageNumber;
    await this.fetchUserDetailsData()
  };

  doSubmit = async () => {
    try {
      const { data } = this.state
      data.page = 1;
      await this.fetchUserDetailsData()
    } catch (err) {
      if (err.response && err.response.status === 400) {
        const errors = { ...this.state.errors };
        this.setState({ errors });
      }
    }
  };

  async handleDeleteUser(id, data, users) {
    try {
      await removeUser(id);
    } catch (err) {
      if (err.response && err.response.status === 404)
        toast.error('Movie not found');
      this.setState({ data: { ...data, users: users } });
    }
  }

  async fetchUserDetailsData() {
    const { data } = this.state;
    const { data: users } = await getAllUsers(this.getUserRequestBody(data));
    const { data: distinctValues } = await getDistinctValues();
    this.resolveUsersState(users, distinctValues, data);
  }

  resolveUsersState(users, distinctValues, data) {
    this.setState({ data: this.getNewStateData(data, users, distinctValues), });
  }

  getNewStateData(data, users, distinctValues) {
    return {
      ...data, totalNumberOfUser: users._totalNumberOfUser,
      page: users._pageNumber, pageSize: users._pageSize,
      users: [...users._userResponse],
      distinctWorkCategory: [...distinctValues.distinctWorkCategories],
      distinctInterest: [...distinctValues.distinctInterests], totalUserOnPage: users._numberOfRecordsOnPage,
    };
  }

  getUserRequestBody(data) {
    return {
      userPageRequest: { pageNumber: data.page, pageSize: data.pageSize },
      userFilterRequest: { workCategory: data.selectedWorkCategory, interest: data.selectedInterest }
    };
  }

  render() {
    const { data: { users, pageSize, page, totalNumberOfUser } } = this.state;

    return (
      <div className='row'>
        <div className='col'>
          {this.getDistinctForm()}
          {this.getTableMetaData(totalNumberOfUser)}

          <UserTable users={users} onDelete={this.deleteUser} />
          <Pagination totalNumberOfRecord={totalNumberOfUser} pageSize={pageSize} currentPage={page} onPageChange={this.handlePageChange} />
        </div>
      </div>
    );
  }

  getTableMetaData(totalNumberOfUsers) {
    return <div className='row'>
      <div className='col'>
        <p>{totalNumberOfUsers} users(s) founded</p>
      </div>
      <div className='col'>
        <Link className='btn-primary btn m-2' to='/users/add'>
          Add User
        </Link>
      </div>
    </div>;
  }

  getDistinctForm() {
    return <form onSubmit={e => this.handleSubmit(e)}>
      <div className='row'>

        <div className='col'>
          {this.renderSelect('distinctWorkCategory', "selectedWorkCategory", "Work Category")}
        </div>

        <div className='col'>
          {this.renderSelect('distinctInterest', "selectedInterest", "Interest")}
        </div>

        <div className='col'>
          {this.renderButton('Filter')}
        </div>

      </div>
    </form>;
  }
}

export default Users;
