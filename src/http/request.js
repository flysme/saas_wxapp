import wepy from 'wepy'
// 设置全局请求头
const headers = {
  'content-type':'application/json'
}
// 设置全局host
const host= 'https://www.20130510.cn/api/';
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

const request = (url,data={},method='GET',re_header)=>{
  const header = Object.assign({},headers,re_header);
  url = host + url;
  return new Promise((resolve,reject)=>{
    wx.showNavigationBarLoading()
    wepy.request({
      url,
      data,
      method,
      header,
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
  })
}

/**
 * get请求
 * @param {*} url 
 * @param {*} data 
 * @param {*} header 
 */
export const get = (url,data={},header)=>{
  url = `${url}${serializeUrl(url)}`;
  return new Promise((resolve,reject)=>{
      request(url,data,'GET',header).then(res=>{
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
export const post = (url,data={},header)=>{
  return new Promise((resolve,reject)=>{
      request(url,data,'POST',header).then(res=>{
        resolve(res);
      }).catch(err=>{
        reject(err);
      })
  })
}

