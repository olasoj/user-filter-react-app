import React, { Component } from 'react';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import { getAllUsers, getDistinctValues } from '../userService'

//component
import MoviesTable from './MoviesTable';
//External data
// import { getGenres } from '../services/genres';
// import { getMovies, deleteMovie } from '../services/movies';

//common components
import Pagination from '../../common/Pagination';
import ListGroup from '../../common/ListGroup';
// utils

class Movies extends Component {
  constructor() {
    super();
    this.state = {
      users: [],

      distinctWorkCategory: [],

      distinctInterest: [],


      selectedInterest: '',
      selectedWorkCategory: '',

      page: 1,
      pageSize: 4,

      totalUsers: null,
      totalUserOnPage: null,

      selectedGenre: '',
      foundBySearch: '',
      sortColumn: { path: 'title', order: 'asc' }
    };
  }

  async componentDidMount() {
    try {
      const { data: users } = await getAllUsers();
      const { data: distinctValues } = await getDistinctValues();
      console.log(users)

      this.setState({
        users: [...users._userResponse],
        distinctWorkCategory: [...distinctValues.distinctWorkCategories],
        distinctInterest: [...distinctValues.distinctInterests],
        totalUserOnPage: users._numberOfRecordsOnPage,
        page: users._pageNumber,
        pageSize: users._pageSize
      });
    } catch (err) {
      this.setState({
        users: [],
        distinctValues: []
      });
    }
  }

  getPageData = () => {
    const { movies, selectedGenre, foundBySearch, sortColumn, users } = this.state;

    // //if movies found exists and is lower than all the movies
    // if (Array.isArray(foundBySearch) && foundBySearch.length < movies.length) {
    //   // console.log('s');
    //   return { totalMovies: foundBySearch.length, data: foundBySearch };
    // } else {
    //   //filter by genre
    //   //if selectGenre._id exist filter the movie by genre._id else return movies
    //   const filteredMovies = selectedGenre._id
    //     ? movies.filter(m => m.genre._id === selectedGenre._id)
    //     : movies;

    //   //sorting the filtered movies, either by title etc
    //   const sortedMovies = _.orderBy(
    //     filteredMovies,
    //     [sortColumn.path],
    //     [sortColumn.order]
    //   );
    //   return { totalMovies: 2 //sortedMovies.length
    //     , data: [] };
    // }
    return {
      totalMovies: users.length //sortedMovies.length
      , users: []
    };
  };

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
  handlePageChange = page => {
    //change the current page , pagination
    this.setState({ page: page });
  };

  //sort the movies by genre
  handleGenreSelect = genre => {
    //store the selected genre
    //this used for filtering movies above
    this.setState({ page: 1, selectedGenre: genre });
  };

  //sort movies by header(title, genre, ... )
  handleSortMovie = sortColumn => {
    this.setState({ sortColumn });
  };

  render() {
    const { distinctInterest, distinctWorkCategory, pageSize, page, selectedGenre, sortColumn, users } = this.state;
    const { user } = this.props;

    const { totalMovies, data } = this.getPageData();
    //paginate movies
    // const paginatedMovies = paginate(data, page, pageSize);

    return (
      <div className='row'>
        <div className='col-3'>
          <ListGroup
            items={distinctInterest}
            selectedItem={selectedGenre}
            onItemSelect={this.handleGenreSelect}
          />
        </div>

        <div className='col-3'>
          <ListGroup
            items={distinctWorkCategory}
            selectedItem={selectedGenre}
            onItemSelect={this.handleGenreSelect}
          />
        </div>

        <div className='col'>
          {user && (
            <Link className='btn-primary btn m-2' to='/movies/new'>
              New Movie
            </Link>
          )}
          <p>There are {totalMovies} movie(s) available</p>


          <MoviesTable
            paginatedMovies={users}
            sortColumn={sortColumn}
            onLike={this.handleLike}
            onDelete={this.deleteAMovie}
            onSort={this.handleSortMovie}
          />
          <Pagination
            noOfMovies={totalMovies}
            pageSize={pageSize}
            currentPage={page}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

export default Movies;
