import { GETSTOREINFO,GETSTORETRADINGS, GETSTORETRADINGSCATEGORY,WEIXINLOADUSERINFO,ADDSHOPCAR,REDUCESHOPCAR} from '../types/store_detail'
import { createAction } from 'redux-actions'
import { STOREDETAIL } from '@/http/index'

export const weixinLoadUserinfo = createAction(WEIXINLOADUSERINFO,(state) => {
  return new Promise((resolve,reject) => {
    STOREDETAIL.weixinLoadUserinfo(state).then(res=>{
        if(res.data.store) {
          resolve(res.data.store)
        } else {
          reject(res)
        }
    })
  })
})


export const getStoreInfo = createAction(GETSTOREINFO, (state) => {
  return new Promise((resolve,reject) => {
    STOREDETAIL.getStoreInfo(state).then(res=>{
        if(res.data.store) {
          resolve(res.data.store)
        } else {
          reject(res)
        }
    })
  })
})



export const getStoreTradings = createAction(GETSTORETRADINGS, (state) => {
  return new Promise((resolve,reject) => {
    STOREDETAIL.getStoreTradings(state).then(res=>{
        if(res.data.tradings) {
          resolve(res.data.tradings)
        } else {
          reject(res)
        }
    })
  })
})

export const getProductcategory = createAction(GETSTORETRADINGSCATEGORY,(state) => {
  return new Promise((resolve,reject) => {
    STOREDETAIL.getProductcategory({_id:state._id}).then(res=>{
      if(res.data.categorys) {
        resolve(res.data.categorys)
      } else {
        reject(res)
      }
    })
  })
})

export const addshopcar = createAction(ADDSHOPCAR,(state) => {
  return new Promise((resolve,reject) => {
    STOREDETAIL.addshopcar({_id:state._id,sku_id:state.sku_id}).then(res=>{
      if(res.data) {
        resolve(res.data)
      } else {
        reject(res)
      }
    })
  })
})

export const reduceshopcar = createAction(REDUCESHOPCAR,(state) => {
  return new Promise((resolve,reject) => {
    console.log('--reduceshopcar---',state)
    STOREDETAIL.reduceshopcar({_id:state._id,sku_id:state.sku_id}).then(res=>{
      if(res.data) {
        resolve(res.data)
      } else {
        reject(res)
      }
    })
  })
})


