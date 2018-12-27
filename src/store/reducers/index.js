import { combineReducers } from 'redux'
import style from './style'
import select from './select'
import consent from './consent'
import data from './data'
export default combineReducers({
  style,
  select,
  consent,
  data
})
