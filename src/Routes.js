import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './pages/Home'
import MapView from './pages/MapView'
import Search from './pages/Search/index'
import School from './pages/School'
const Routes = props => (
  <Switch>
  <Route path='/school/:schoolID' component={School} />
  <Route path='/search' component={Search} />
  <Route path='/map' component={MapView} />
  <Route path='' exact component={Home} />
  </Switch>

)
export default Routes;
