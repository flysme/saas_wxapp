/*
 * @Description: 
 * @Author: zhaofeixiang
 * @LastEditors: zhaofeixiang
 * @Date: 2019-03-01 18:06:22
 * @LastEditTime: 2019-04-08 18:04:56
 */
import { combineReducers } from 'redux'
import counter from './counter'
import home from './home'
import store_detail from './store_detail'
import login from './login'
import ticket from './ticket'
export default combineReducers({
  counter,
  home,
  store_detail,
  login,
  ticket,
})