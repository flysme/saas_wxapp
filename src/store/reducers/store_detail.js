import { handleActions } from 'redux-actions'
import { GETSTORETRADINGS, GETSTORETRADINGSCATEGORY,GETSTOREINFO, WEIXINLOADUSERINFO, ADDSHOPCAR, REDUCESHOPCAR } from '../types/store_detail'
import  config from '@/config/index'
const utils = {
  resetStoreData (tradingsList) {
    tradingsList.length && tradingsList.forEach(item=>{
      item.src = config.ImgHost + item.img
      item.sku_price_list = [];
      item.sku.forEach(c_item=>{
        item.sku_price_list.push(c_item.price)
      })
      item.sku_price = Math.min(...item.sku_price_list) 
    })
    return tradingsList;
  },
  resetCateGroys (catesgoryList) {
     catesgoryList.unshift({
      category_name:'全部',
      _id:''
    })
    return catesgoryList;
  }
}


export default handleActions({
  [GETSTORETRADINGS] (state, action) {
    return {
      ...state,
      isEmpty:!action.payload.length,
      tradingsList:utils.resetStoreData(action.payload)
    }
  },
  [GETSTORETRADINGSCATEGORY] (state, action) {
    return {
      ...state,
      catesgoryList:utils.resetCateGroys(action.payload)
    }
  },
  [GETSTOREINFO] (state,action) {
    return {
      ...state,
      storeInfo:action.payload
    }
  },
  [WEIXINLOADUSERINFO] (state,action) {
    return {
      ...state,
      userInfo:action.payload
    }
  },
  [ADDSHOPCAR] (state,action) {
    return {
      ...state
    }
  },
  [REDUCESHOPCAR] (state,action) {
    return {
      ...state
    }
  }
}, {
  userInfo:{},
  tradingsList: [],
  isEmpty:true,
  storeInfo:null,
  catesgoryList:[]
})