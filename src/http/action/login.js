/*
 * @Description: 
 * @Author: zhaofeixiang
 * @LastEditors: zhaofeixiang
 * @Date: 2019-03-13 17:52:41
 * @LastEditTime: 2019-04-25 18:15:38
 */

import { get } from '@/http/request'
import  login from '@/http/urls/login'

const LOGIN = {
  // 微信登录
  weixinLoadUserInfo (data,header) {
    return get(login.weixinLoadUserInfo,data,header)
  },
  wxNodeLogin (data) {
    return get(login.wxNodeLogin,data)
  },
  //获取session_id
  getSessionId () {
    return get(login.getSessionId)
  },
  //获取open_id
  getOpenId (data) {
    return get(login.getOpenId,data)
  },
}
export default LOGIN;