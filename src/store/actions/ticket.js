/*
 * @Description: 
 * @Author: zhaofeixiang
 * @LastEditors: zhaofeixiang
 * @Date: 2019-04-08 17:45:05
 * @LastEditTime: 2019-04-12 16:19:41
 */
import { GETTICKET,GETSTATIONCODE } from '../types/ticket'
import { createAction } from 'redux-actions'
import { TICKET } from '@/http/index'

export const getTicket = createAction(GETTICKET, (state) => {
  return new Promise((resolve,reject) => {
    wx.showLoading({title: '拼命加载中'})
    TICKET.getTicket(state).then(res=>{
        if (res.data.ticket) {
          resolve(res.data.ticket)
        } else {
          reject(res.msg)
        }
      })
  })
})


export const getStationCode = createAction(GETSTATIONCODE, (state) => {
  return new Promise((resolve,reject) => {
    TICKET.getStationCode().then(res=>{
        if (res.data) {
          resolve(res.data)
        } else {
          reject(res.msg)
        }
      })
  })
})



