/*
 * @Description: 
 * @Author: zhaofeixiang
 * @LastEditors: zhaofeixiang
 * @Date: 2019-04-08 17:45:13
 * @LastEditTime: 2019-04-22 15:13:39
 */
import { handleActions } from 'redux-actions'
import UTILS from '@/utils/utils';
import { GETSTATIONCODE, SETCITY,CHANGECITYORDER,CHOOSEDATE,GETPREVIOUSDAY,GETNEXTDAY,INITBTNSTATUS,SENDCHECKTICKETMESSAGE } from '../types/ticket'


const date = UTILS.resetnewDate(); //当前时间
const daytimestamp = 24 * 60 * 60 * 1000; //一天时间戳


export default handleActions({
  [GETSTATIONCODE] (state,action) {
    return {
      ...state,
      stationList:action.payload,
    }
  },
  [SETCITY] (state,action) {
    const citys = action.payload.status == 'start' ?
       {startStation:action.payload.city} : {arriveStation:action.payload.city}
    return Object.assign(state,citys)
  },
  [CHANGECITYORDER] (state) {
      const startStation = state.startStation;
      state.startStation = state.arriveStation;
      state.arriveStation = startStation;
      return {
        ...state
      }
  },
  [CHOOSEDATE] (state,action) {
    return {
      ...state,
      select_date:action.payload,
      train_date:action.payload,
    }
  },

  [GETPREVIOUSDAY] (state,action) {
    const date = UTILS.resetnewDate(); //当前时间
    let default_date = UTILS.resetnewDate(state.train_date); //选择出发时间
    const oldtimestamp = default_date.getTime(); //出发日期时间戳
    const new_date = UTILS.getCurrentDate(oldtimestamp - daytimestamp);
    const new_default_date = UTILS.resetnewDate(new_date);
    return {
      ...state,    
      train_date:(date.toDateString() === default_date.toDateString()) ? state.train_date : new_date,
      btn_pre_status:date.toDateString() === new_default_date.toDateString() ? false : true
    }
  },
  [GETNEXTDAY] (state,action) {
    let default_date = UTILS.resetnewDate(state.train_date); //选择出发时间
    const oldtimestamp = default_date.getTime(); //出发日期时间戳
    const new_date = UTILS.getCurrentDate(oldtimestamp + daytimestamp);
    const new_default_date = UTILS.resetnewDate(new_date);
    return {
      ...state,    
      train_date:new_date,
      btn_pre_status:date.toDateString() === new_default_date.toDateString() ? false : true
    }
  },
  [INITBTNSTATUS] (state,action) {
    let default_date = UTILS.resetnewDate(state.train_date); //选择出发时间
    return {
      ...state,
      btn_pre_status:date.toDateString() === default_date.toDateString() ? false : true
    }
  },
  [SENDCHECKTICKETMESSAGE] (state,action) {
    return {
      ...state
    }
  }
}, {
  stationList:[],
  purpose_codes:'ADULT', //车票类型 ADULT 成人票
  train_date:UTILS.getCurrentDate(), //出行日期
  startStation:{name:'上海',code:'SHH'}, //出发车站
  arriveStation:{name:'南京',code:'NJH'}, //到达车站
  select_date:UTILS.getCurrentDate(),
  btn_pre_status:false, //上一个是否可用
})