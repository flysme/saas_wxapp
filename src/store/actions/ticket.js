/*
 * @Description: 
 * @Author: zhaofeixiang
 * @LastEditors: zhaofeixiang
 * @Date: 2019-04-08 17:45:05
 * @LastEditTime: 2019-04-22 16:50:47
 */
import { GETTICKET,GETSTATIONCODE,SENDCHECKTICKETMESSAGE,GETTICKETDETAIL } from '../types/ticket'
import { createAction } from 'redux-actions'
import { TICKET } from '@/http/index'

export const getTicket = createAction(GETTICKET, (state) => {
  return new Promise((resolve,reject) => {
    wx.showLoading({title: '拼命加载中'})
    TICKET.getTicket(state).then(res=>{
        if (res.data.segments) {
          resolve(res.data.segments)
        } else {
          reject(res.msg)
        }
      })
  })
})


export const getTicketDetail = createAction(GETTICKETDETAIL, (state) => {
  return new Promise((resolve,reject) => {
    wx.showLoading({title: '拼命加载中'})
    TICKET.getTicketDetail(state).then(res=>{
        if (res.data.segments) {
          resolve(res.data.segments)
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


export const sendCheckTicket = createAction(SENDCHECKTICKETMESSAGE, (state) => {
  return new Promise((resolve,reject) => {
    TICKET.onCheckSeatStatus(state).then(res=>{
        if (res.data) {
          wx.showToast({title: '监控成功！',icon: 'none'})
          resolve(res.data)
        } else {
          reject(res.msg)
        }
      })
  })
})



