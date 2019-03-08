import { combineReducers } from 'redux'
import counter from './counter'
import home from './home'
import store_detail from './store_detail'
export default combineReducers({
  counter,
  home,
  store_detail,
})