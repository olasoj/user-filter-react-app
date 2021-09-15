import React, { Component } from 'react';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import { getAllUsers, getDistinctValues } from '../userService'

//component
import UserTable from './UsersTable';
import Form from '../../common/Form';

//common components
import Pagination from '../../common/Pagination';

class Users extends Form {
  constructor() {
    super();
    this.state = {
      data: {

        users: [],

        username: '',
        password: '',
        name: '',

        totalNumberOfUser: null,
        totalUserOnPage: 1,


        selectedWorkCategory: null,
        selectedInterest: null,


        page: 1,
        pageSize: 10,


        distinctWorkCategory: [],

        distinctInterest: [],
      },
      errors: {
        username: '',
        password: '',
        name: ''
      },


      page: 1,
      pageSize: 10,

      selectedInterest: '',
      selectedWorkCategory: '',



      selectedGenre: '',
      foundBySearch: '',
      sortColumn: { path: 'title', order: 'asc' }
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

  // //deletes a movie
  // deleteAMovie = async id => {
  //   //clone the movies
  //   console.log(id);
  //   const originalMovies = [...this.state.movies];
  //   const movies = originalMovies.filter(m => m._id !== id);

  //   this.setState({ movies: [...movies] });

  //   try {
  //     await deleteMovie(id);
  //   } catch (err) {
  //     if (err.response && err.response.status === 400)
  //       toast.error('Movie not found');

  //     this.setState({ movies: originalMovies });
  //   }
  // };


  //change page
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
        errors.username = err.response.data;
        this.setState({ errors });
      }
    }
  };

  async fetchUserDetailsData() {
    const { data } = this.state;
    const fetchUsersRequest = this.getFetchUsersRequest(data);
    console.log(fetchUsersRequest)
    const { data: users } = await getAllUsers(fetchUsersRequest);
    const { data: distinctValues } = await getDistinctValues();
    console.log(data.users);


    this.resolveUsersState(users, distinctValues, data);
  }

  resolveUsersState(users, distinctValues, data) {

    this.setState({
      data: this.newData(data, users, distinctValues),
    });
  }

  newData(data, users, distinctValues) {
    return {
      ...data, totalNumberOfUser: users._totalNumberOfUser,
      users: [...users._userResponse],
      page: users._pageNumber,
      pageSize: users._pageSize,
      distinctWorkCategory: [...distinctValues.distinctWorkCategories],
      distinctInterest: [...distinctValues.distinctInterests], totalUserOnPage: users._numberOfRecordsOnPage,
    };
  }

  getFetchUsersRequest(data) {
    return {
      userPageRequest: {
        pageNumber: data.page,
        pageSize: data.pageSize
      },
      userFilterRequest: {
        workCategory: data.selectedWorkCategory,
        interest: data.selectedInterest
      }
    };
  }

  render() {
    const { data: { users, pageSize, page, totalNumberOfUser } } = this.state;

    return (
      <div className='row'>

        <div className='col'>

          {this.getDistinctForm()}
          {this.getTableMetaData(totalNumberOfUser)}

          <UserTable
            users={users}
            onDelete={this.deleteAMovie}
          />

          <Pagination
            totalNumberOfRecord={totalNumberOfUser}
            pageSize={pageSize}
            currentPage={page}
            onPageChange={this.handlePageChange}
          />
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
        <Link className='btn-primary btn m-2' to='/movies/new'>
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
