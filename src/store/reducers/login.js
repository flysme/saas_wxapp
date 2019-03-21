import { handleActions } from 'redux-actions'
import { WEIXINLOADUSERINFO } from '../types/login'

export default handleActions({
  [WEIXINLOADUSERINFO] (state,action) {
    return {
      ...state,
      userInfo:action.payload,
      is_Login:action.payload ? true :false
    }
  }
}, {
  is_Login:false,
  userInfo:null
})