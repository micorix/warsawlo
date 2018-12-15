import React, {Component} from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom'
import Home from './Home'
import Login from './Login'
import Dashboard from './Dashboard'
import * as firebase from 'firebase/app'
import 'firebase/auth'
export default class extends Component {
  render = () => {
    return (
      <Router>
        <Switch>
          <Route path='/manage/login' component={Login} />
          <Route path='/manage/dashboard' component={Dashboard} />
          <Route exact path='/manage' render={(props) => (<Redirect to={`/manage/${firebase.auth().currentUser ? 'dashboard' : 'login'}`} />)} />
        </Switch>
      </Router>
    )
  }
}
