/*
 * @Description: 
 * @Author: zhaofeixiang
 * @LastEditors: zhaofeixiang
 * @Date: 2019-03-13 17:55:11
 * @LastEditTime: 2019-04-17 14:55:00
 */
import { WEIXINLOADUSERINFO} from '../types/login'
import { createAction } from 'redux-actions'
import { LOGIN } from '@/http/index'
import  UTILS from '@/utils/utils' // 本地缓存
import wepy from 'wepy';
const headersKey = {
    WX_CODE: 'X-WX-Code',
    WX_ENCRYPTE_DATA: 'X-WX-EncrypteData',
    WX_SIGNATURE: 'X-WX-Signature',
    WX_IV:'X-WX-Iv',
    WX_IV:'X-WX-Iv',
    WX_RawData:'X-WX-rawData'
};


// const Login_Request = (iv,signature,encryptedData,rawData)=>{
//     return new Promise((resolve,reject)=>{
//       wx.login({
//         success(res) {
//           if (res.code) {
//             const currentCode = res.code;
//             const header = {
//               [headersKey.WX_CODE]: currentCode,
//               [headersKey.WX_ENCRYPTE_DATA]: encryptedData,
//               [headersKey.WX_SIGNATURE]: signature,
//               [headersKey.WX_IV]: iv,
//               [headersKey.WX_RawData]: encodeURIComponent(rawData),
//             }
//             const SESSION_ID = UTILS.StorageSync.get('sessionid'); //拿到session_id
//             const request_Header = SESSION_ID ? {'X-SESSION-TOKEN':SESSION_ID} : {}; //根据session_id 判断是否已经注册
//             resolve(Object.assign({},header,request_Header))
//           } else {
//              console.log('登录失败！' + res.errMsg)
//              reject({ msg : res.errMsg})
//           }
//         }
//       })
//     })
// }


const Login_Request = (iv,signature,encryptedData,rawData)=>{
  return new Promise((resolve,reject)=>{
    wx.login({
      success(res) {
        if (res.code) {
          const currentCode = res.code;
          resolve(Object.assign({},{code:currentCode}))
        } else {
           console.log('登录失败！' + res.errMsg)
           reject({ msg : res.errMsg})
        }
      }
    })
  })
}


export const wxLogin = createAction(WEIXINLOADUSERINFO,(state) => {
  // const userInfo = state.detail;
  // if (userInfo.errMsg!='getUserInfo:ok')return;
  return new Promise((resolve,reject) => {
    // Login_Request(userInfo.iv,userInfo.signature,userInfo.encryptedData,userInfo.rawData).then(resHeader => {
    //   LOGIN.weixinLoadUserInfo(null,resHeader).then(res=>{
    //       console.log(res,'weixinLoadUserInfo---')
    //       if(res.status == 0) {
    //         UTILS.StorageSync.put('sessionid',res.sessionid);
    //         wx.showToast({title: '登录成功',icon: 'none'})
    //         resolve(res.sessionid)
    //       } else {
    //         wx.showToast({title: res.msg,icon: 'none'})
    //         reject()
    //       }
    //   })
    // })
    Login_Request().then(({ code })=> {
      LOGIN.wxNodeLogin({code}).then(res=>{
          if(res.status == 0) {
            UTILS.StorageSync.put('sessionid',res.token);
            wx.showToast({title: '授权成功',icon: 'none'})
            resolve(res.token)
          } else {
            reject()
          }
      })
    })
  })
})

