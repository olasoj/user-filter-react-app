import React, { Fragment, Component } from "react"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

import { BrowserRouter as Router, Route, Switch, Redirect, } from "react-router-dom"
import "./App.css"

import Users from './user/component/Users';
// import NavBar from './components/NavBar';
// import NotFound from './components/NotFound';
// import MovieForm from './components/MovieForm';
import RegisterForm from './user/component/RegisterForm';
// import ProtectedRoutes from './common/protectedRoutes';

class App extends Component {
  state = {}

  render() {
    return (

      <Fragment>
        <ToastContainer />
        <Router>
          {/* <NavBar user={user} /> */}
          <main className='container'>
            <p>Yes</p>
            <Switch>
              {/* <ProtectedRoutes path='/movies/:id' component={MovieForm} /> */}
              <Route path='/users/add' component={RegisterForm} />
              <Route path='/users' render={(props) => <Users {...props} />} />
              {/* <ProtectedRoutes path='/movies/:id' component={MovieForm} /> */}
              {/* <Route path='/users' component={Movies} /> */}
              <Redirect exact from='/' to='/users' />
              {/* <Route path='/not-found' component={NotFound} /> */}
              <Redirect to='/not-found' />
            </Switch>
          </main>
        </Router>
      </Fragment>

    )
  }
}

export default App
