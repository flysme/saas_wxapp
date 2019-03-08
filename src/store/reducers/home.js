import { handleActions } from 'redux-actions'
import { GETSTORELIST,GETUSERLOCALTION } from '../types/home'
import  config from '@/config/index'
const utils = {
  resetStoreData (storeList) {
    storeList.length&&storeList.forEach(item=>{
      item.src = config.ImgHost + item.img
    })
    return storeList;
  }
}


export default handleActions({
  [GETSTORELIST] (state, action) {
    return {
      ...state,
      storeList:utils.resetStoreData(action.payload),
      isEmpty:!action.payload.length,
      Loading: false
    }
  },
  [GETUSERLOCALTION] (state, action) {
    return {
      ...state,
      addressInfo:action.payload
    }
  }
}, {
  Loading: true,
  isEmpty:false,
  storeList: [],
  addressInfo:{},
})