/*
 * @Description: 
 * @Author: zhaofeixiang
 * @LastEditors: zhaofeixiang
 * @Date: 2019-03-05 10:00:01
 * @LastEditTime: 2019-04-12 18:17:21
 */
import wepy from 'wepy'
import  UTILS from '@/utils/utils' // 本地缓存

// 设置全局请求头
const headers = {
  'content-type':'application/json',
}
// 设置全局host
// const host= 'https://20130510.cn/api/';

const host= 'https://api.20130510.cn/api/v1';

// const host= 'http://www.vuetext.com:8083/api/';

const serializeUrl = (data)=>{
  let joinStr = '';
  if (data instanceof Object && Object.keys(data).length) {
    for (let key in data) {
      joinStr += joinStr.indexOf('?') > -1 ? `&${key}=${data[key]}` : `?${key}=${data[key]}`;
    }
  }
  return joinStr;
}

// const MAX_LOGIN_TIMES = 3; //最多登录次数
/* 微信登录 */ 
const checkWxLogin = () =>{
  return new Promise((resolve,reject)=>{
    let SESSION_ID = UTILS.StorageSync.get('sessionid');
    if (SESSION_ID) {
      checkSession().then(flag=>{
        if (!flag) {
          wx.redirectTo({
            url: '/pages/login/login'
          })
        } else {
        let request_Header = {'X-SESSION-TOKEN':SESSION_ID};
          resolve(request_Header);
        }
      })
    } else {
      wx.redirectTo({
        url: '/pages/login/login'
      })
    }
  })
}

/*微信检查session-key是否过期 */ 

const checkSession = ()=>{
  return new Promise((resolve)=>{
    wx.checkSession({
      // session_key 有效(未过期)
      success (res) {
        console.log(res,'session_key')
        resolve(true)
      },
      // session_key 过期
      fail () {
        resolve(false)
      }
    });
  })
}

/**
 * methods 小程序请求
 * @param {*} url 
 * @param {*} data 
 * @param {*} header 
 * @param {*} checkLogin  检查接口是否鉴权
 * 
 */ 
const WxRequest = async (url,data={},method='GET',wx_header,checkLogin)=>{
  let header = wx_header && Object.assign({},headers,wx_header) || headers;
  url = host + url;
  return new Promise((resolve,reject)=>{
    wx.showNavigationBarLoading()
    const request = (request_headers={})=>{
      header = Object.assign({},header,request_headers);
      wepy.request({url,data,method,header,
        success: res => {
          if (res.statusCode == 200) {
             resolve(res.data);
          } else {
            reject(res.errMsg);
          }
        },
        fail: err => reject(err),
        complete:()=> {
          wx.hideNavigationBarLoading()
          wx.stopPullDownRefresh();
        }
      })
    }
    if (checkLogin) {
      checkWxLogin().then(res=>{
        request(res);
      })
    } else {
      request()
    }
  })
}

const replaceUrl = (url,data)=>{
  if (data && Object.keys(data).length) {
      for (let i in data) {
          let reg =  new RegExp("{" + i + "}?");
          if (url.match(reg)) {
             url = url.replace(reg, data[i])
             delete data[i];
             continue;
          }
      }
  }
  return {url,data};
}

/**
 * get请求
 * @param {*} url 
 * @param {*} data 
 * @param {*} header 
 */
export const get = (currenturl,params={},header,checkLogin)=>{
  let { url,data } = replaceUrl(currenturl,params);
  url = `${url}${serializeUrl(url)}`;
  return new Promise((resolve,reject)=>{
    WxRequest(url,data,'GET',header,checkLogin).then(res=>{
        resolve(res);
      }).catch(err=>{
        reject(err);
      })
  })
}
/**
 * post请求
 * @param {*} url 
 * @param {*} data 
 * @param {*} header 
 */
export const post = (url,data={},header,checkLogin)=>{
  return new Promise((resolve,reject)=>{
    WxRequest(url,data,'POST',header,checkLogin).then(res=>{
        resolve(res);
      }).catch(err=>{
        reject(err);
      })
  })
}

