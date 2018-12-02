import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './pages/Home'
import MapView from './pages/MapView'
import Search from './pages/Search/index'
import Calculator from './pages/Calculator'
import About from './pages/About'
const Routes = props => (
  <Switch>
  <Route path='/school/:schoolID' component={MapView} />
  <Route path='/map' component={MapView} />
  <Route path='/search' component={Search} />
  <Route path='/calculator' component={Calculator} />
  <Route path='/about' component={About} />
  <Route path='' exact component={Home} />
  </Switch>

)
export default Routes;
