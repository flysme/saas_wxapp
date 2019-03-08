import { GETSTOREINFO,GETSTORETRADINGS, GETSTORETRADINGSCATEGORY } from '../types/store_detail'
import { createAction } from 'redux-actions'
import { STOREDETAIL } from '@/http/index'


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



