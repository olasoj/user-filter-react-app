import React from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import { getAllUsers, getDistinctValues, removeUser } from '../userService'

import UserTable from './UsersTable';
import Form from '../../generic/component/form/Form';
import Pagination from '../../pagination/Pagination';

class Users extends Form {
  constructor() {
    super();
    this.state = {
      data: {
        name: '',
        page: 1, pageSize: 10,
        selectedWorkCategory: null, selectedInterest: null,
        users: [], distinctWorkCategory: [], distinctInterest: [],
        totalNumberOfUser: 0, totalUserOnPage: 0
      },
      errors: { name: '' },
    };
  }

  schema = {}

  async componentDidMount() {
    try {
      await this.getUserDetailsData();
    } catch (err) {
      this.setState({ data: { users: [], distinctValues: [] } });
    }
  }

  deleteUser = async id => {
    const { data } = this.state
    const users = [...data.users];

    const newUsers = users.filter(user => user._id !== id);
    this.setState({ data: { ...data, totalNumberOfUser: --data.totalNumberOfUser, users: [...newUsers] } });
    await this.handleDeleteUser(id, data, users);
  };

  handlePageChange = async (pageNumber) => {
    const { data } = this.state
    data.page = pageNumber;
    await this.getUserDetailsData()
  };

  doSubmit = async () => {
    const { data } = this.state
    data.page = 1;
    await this.getUserDetailsData()
  };

  async handleDeleteUser(id, data, users) {
    try {
      const { data: { message } } = await removeUser(id);
      toast.success(message);
    } catch (err) {
      if (err.response && err.response.status === 404) toast.error('User not found');
      this.setState({ data: { ...data, users: users } });
    }
  }

  async getUserDetailsData() {
    toast.info("Retrieving users")
    const { data } = this.state;
    try {
      const { data: users } = await getAllUsers(this.getUserRequestBody(data));
      const { data: distinctValues } = await getDistinctValues();
      this.resolveUsersState(users, distinctValues, data);
      toast.success("Successfully retrieved users")
    } catch (err) {
      this.setState({ data: { ...data } });
      toast.error("Failed to retrieve users")
    }
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
        <p>{totalNumberOfUsers} users(s) found</p>
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
