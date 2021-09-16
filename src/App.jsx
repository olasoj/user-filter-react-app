import React, { Fragment, Component } from "react"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

import { BrowserRouter as Router, Route, Switch, Redirect, } from "react-router-dom"
import "./App.css"

import Users from './user/component/Users';
import NavBar from './navigation/component/NavBar';
// import NotFound from './components/NotFound';
import NewUserForm from './user/component/NewUserForm';

class App extends Component {
  state = {}

  render() {
    return (

      <Fragment>
        <ToastContainer />
        <Router>
          <NavBar />
          <main className='container'>
            <Switch>
              <Route path='/users/add' component={NewUserForm} />
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
