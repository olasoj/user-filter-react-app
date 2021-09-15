import React, { Fragment, Component } from "react"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

import { BrowserRouter as Router, Route, Switch, Redirect, } from "react-router-dom"
import "./App.css"

import Users from './user/component/Users';
// import NavBar from './components/NavBar';
// import NotFound from './components/NotFound';
import RegisterForm from './user/component/RegisterForm';

class App extends Component {
  state = {}

  render() {
    return (

      <Fragment>
        <ToastContainer />
        <Router>
          {/* <NavBar user={user} /> */}
          <main className='container'>
            <Switch>
              {/* <ProtectedRoutes path='/movies/:id' component={MovieForm} /> */}
              <Route path='/users/add' component={RegisterForm} />
              <Route path='/users' render={(props) => <Users {...props} />} />
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
