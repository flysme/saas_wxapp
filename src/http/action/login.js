/*
 * @Description: 
 * @Author: zhaofeixiang
 * @LastEditors: zhaofeixiang
 * @Date: 2019-03-13 17:52:41
 * @LastEditTime: 2019-04-16 09:19:26
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
  }
}
export default LOGIN;