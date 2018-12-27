import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './pages/Home'
import MapView from './pages/MapView'
import Search from './pages/Search/index'
import Calculator from './pages/Calculator'
import About from './pages/About'
import Manage from './pages/manage'
import Privacy from './pages/Privacy'
const Routes = props => (
  <Switch>
  <Route path='/manage' component={Manage} />

  <Route path='/school/:schoolID' component={MapView} />
  <Route path='/map' component={MapView} />
  <Route path='/search' component={Search} />
  <Route path='/calculator' component={Calculator} />
  <Route path='/privacy' component={Privacy} />
  <Route path='/start' component={Home} />
  <Route path='/' exact component={About} />
  </Switch>

)
export default Routes;
