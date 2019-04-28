/*
 * @Description: 
 * @Author: zhaofeixiang
 * @LastEditors: zhaofeixiang
 * @Date: 2019-03-13 17:55:23
 * @LastEditTime: 2019-04-25 18:12:45
 */
import { handleActions } from 'redux-actions'
import { WEIXINLOADUSERINFO,GETSESSIONID,GETOPENID } from '../types/login'
import  UTILS from '@/utils/utils' // 本地缓存

export default handleActions({
  [WEIXINLOADUSERINFO] (state,action) {
    return {
      ...state,
      userInfo:action.payload,
      is_Login:action.payload ? true :false
    }
  },
  [GETSESSIONID] (state,action) {
    return {
      ...state,
      sessionid:action.payload
    }
  },
  [GETOPENID] (state,action) {
    return {
      ...state,
      user_ids:action.payload
    }
  }
}, {
  is_Login:UTILS.StorageSync.get('sessionid') ? true : false,
  userInfo:null,
  sessionid:null, //驴妈妈接口sessionid
  user_ids:{} //用户相关id信息 
})