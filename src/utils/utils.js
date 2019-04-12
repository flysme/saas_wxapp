/*
 * @Description: 
 * @Author: zhaofeixiang
 * @LastEditors: zhaofeixiang
 * @Date: 2019-03-13 15:50:17
 * @LastEditTime: 2019-04-12 11:58:27
 */
import wepy from 'wepy'

const UTILS = {
   /**
     *@method缓存方法
     * put 添加缓存 @params {key,value,expirat} 
     * get 获取缓存  @params {key} 
     * remove 移除缓存  @params {key} 
     */
    StorageSync: {
      put (key,value,expirat = 86400) {
          let seconds = parseInt(expirat);
          let timestamp = Date.parse(new Date()) || (new Date()).getTime();
          timestamp = parseInt(timestamp / 1000) + seconds;
          let data = {
              value,
              expiratime: timestamp
          }
          wx.setStorageSync(key, Object.assign({},data))
      },
      get (key) {
          let timestamp = Date.parse(new Date()) || (new Date()).getTime();
          timestamp = timestamp / 1000;
          let {value, expiratime } = wx.getStorageSync(key);
          if (expiratime < timestamp)return;
          return value;
      },
      remove (key) {
          wx.removeStorageSync(key);
      }
  },
  /**
   * 获取当前日期
   * @params nowTimestamp 传入时间戳
   * @return ex: 2019-04-09
   */
  getCurrentDate (nowTimestamp) {
    const date = nowTimestamp ? new Date(nowTimestamp) : new Date();
    const year = date.getFullYear();
    const now_month = date.getMonth() + 1; //当前月
    const currentDay = date.getDate(); //当前日 
    return `${year}-${String(now_month).padStart(2,'0')}-${String(currentDay).padStart(2,'0')}`
  },
  /**
   * 匹配ios时间格式
   */
  resetnewDate  (yyyy_mm_dd) {
    const curr_date = yyyy_mm_dd && wepy.$instance.globalData.checkIsIOS ? yyyy_mm_dd.replace(/\-/g, '/') : yyyy_mm_dd;
     return yyyy_mm_dd ? (new Date(curr_date)) : (new Date());
  }
}
export default UTILS
