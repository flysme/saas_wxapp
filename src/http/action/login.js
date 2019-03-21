
import { get } from '@/http/request'
import  login from '@/http/urls/login'

const LOGIN = {
  // 微信登录
  weixinLoadUserInfo (data,header) {
    return get(login.weixinLoadUserInfo,data,header)
  }
}
export default LOGIN;