import { handleActions } from 'redux-actions'
import { WEIXINLOADUSERINFO } from '../types/login'
import  UTILS from '@/utils/utils' // 本地缓存

export default handleActions({
  [WEIXINLOADUSERINFO] (state,action) {
    return {
      ...state,
      userInfo:action.payload,
      is_Login:action.payload ? true :false
    }
  }
}, {
  is_Login:UTILS.StorageSync.get('sessionid') ? true : false,
  userInfo:null
})