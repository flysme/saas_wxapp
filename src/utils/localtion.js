import Authorize from '@/utils/authorize' // alias example
const Localition = {
    // 提前授权地理位置
    authorizeUserLocaltion () {
      return new Promise((resolve,reject)=>{
        Authorize.userLocation().then(()=>{
          wx.getLocation({
            type:'gcj02',
            success(res) {
              resolve(res);
            },
            fail (err) {
              reject(err);
            }
          })
        })
      })
    }
}

export default Localition;