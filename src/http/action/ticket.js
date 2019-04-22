/*
 * @Description: 
 * @Author: zhaofeixiang
 * @LastEditors: zhaofeixiang
 * @Date: 2019-04-08 17:49:09
 * @LastEditTime: 2019-04-22 15:16:04
 */

import { get,post } from '@/http/request'
import  ticket from '@/http/urls/ticket'

const TICKET = {
  // 获取车票列表
  getTicket (data) {
    return post(ticket.getTicket,data)
  },
  // 获取车站信息
  getStationCode () {
    return get(ticket.getStationCode)
  },
  // 发送检票
  onCheckSeatStatus (data) {
    return post(ticket.onCheckSeatStatus,data,null,true)
  },
  // 获取车票详情
  getTicketDetail (data) {
    return post(ticket.getTicketDetail,data)
  }
}
export default TICKET;