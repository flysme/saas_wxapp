import { GETSTORELIST,GETUSERLOCALTION,SEARCHSTORE } from '../types/home'
import { createAction } from 'redux-actions'
import { HOME } from '@/http/index'
import Localtion from '@/utils/localtion' // alias example

export const getStoreList = createAction(GETSTORELIST, (state) => {
  return new Promise((resolve,reject) => {
    Localtion.authorizeUserLocaltion().then((res)=>{
      HOME.getStoreList({lat:res.latitude,lng:res.longitude}).then(res=>{
        if (res.data.store) {
          resolve(res.data.store)
        } else {
          reject(res.msg)
        }
      })
    })
  })
})

export const getUserLocaltion = createAction(GETUSERLOCALTION, (state) => {
  return new Promise((resolve,reject) => {
    Localtion.authorizeUserLocaltion().then((res)=>{
      HOME.getUserLocaltion({lat:res.latitude,lng:res.longitude}).then(res=>{
        if (res.data) {
          resolve(res.data)
        } else {
          reject(res.msg)
        }
      })
    })
  })
})



export const searchStore = createAction(SEARCHSTORE, (store_name) => {
  return new Promise((resolve,reject) => {
    Localtion.authorizeUserLocaltion().then((res)=>{
      HOME.getStoreList({lat:res.latitude,lng:res.longitude,name:store_name}).then(res=>{
        if (res.data.store) {
          resolve(res.data.store)
        } else {
          reject(res.msg)
        }
      })
    })
  })
})

