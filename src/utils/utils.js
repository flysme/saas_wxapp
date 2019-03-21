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
  }
}
export default UTILS
