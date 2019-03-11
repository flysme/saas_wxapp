import { handleActions } from 'redux-actions'
import { GETSTORELIST,GETUSERLOCALTION,SEARCHSTORE } from '../types/home'
import  config from '@/config/index'
const utils = {
  resetStoreData (storeList) {
    let resetStoreList = []; 
    storeList.length&&storeList.forEach(item=>{
      item.src = config.ImgHost + item.img
    })
    let startStoreList = storeList.filter(item=>item.setting.is_business);
    let endStoreList = storeList.filter(item=>!item.setting.is_business);
    resetStoreList = startStoreList.concat(endStoreList);
    return resetStoreList;
  }
}


export default handleActions({
  [GETSTORELIST] (state, action) {
    return {
      ...state,
      storeList:utils.resetStoreData(action.payload),
      isEmpty:!action.payload.length,
      isSearchEmpty:false,
      Loading: false
    }
  },
  [GETUSERLOCALTION] (state, action) {
    return {
      ...state,
      addressInfo:action.payload
    }
  },
  [SEARCHSTORE] (state,action) {
    return {
      ...state,
      storeList:utils.resetStoreData(action.payload),
      isSearchEmpty:!action.payload.length,
      Loading: false
    }
  }
}, {
  Loading: true,
  isEmpty:false,
  isSearchEmpty:false,
  storeList: [],
  addressInfo:{},
})