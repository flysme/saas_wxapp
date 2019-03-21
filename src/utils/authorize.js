const setting = {
  getSetting (scope) {
    return new Promise ((resolve,reject)=>{
      wx.getSetting({
        success(res) {
          if (res.authSetting && res.authSetting[scope]==null) {
            setting.authorize(scope).then(()=>{
              console.log('授权-----1')
              wx.showToast({title: '授权成功！', icon: 'none'})
              resolve()
            }).catch(()=>{
              console.log('授权-----2');
              wx.showToast({title: '授权失败！', icon: 'none'})
              reject();
            })
          } else if (res.authSetting && res.authSetting[scope] == false) {
            wx.showModal({
              title: '是否授权',
              content: '获取授权才能保持功能使用',
              success (tip) {
                if (tip.confirm) {
                  setting.openSetting(scope).then(()=>{
                    wx.showToast({title: '授权成功！',icon: 'none'})
                    resolve()
                  }).catch(()=>{
                    wx.showToast({title: '授权失败！',icon: 'none'})
                    reject();
                  })
                } else {
                  wx.showToast({title: '授权失败！',icon: 'none'})
                  reject();
                }
              },
              fail (res) {
                wx.showToast({title: '调用授权窗口失败',icon: 'none'})
                reject();
              }
            })
          } else {
            resolve()
          }
        }
      })
    })
  },
  authorize (scope) {
    return new Promise((resolve,reject)=>{
      wx.authorize({
        scope,
        success() {
            resolve();
        },
        fail (err) {
          reject(err);
        }
      })
    })
  },
  openSetting (scope) {
    return new Promise((resolve,reject)=>{
      wx.openSetting({
        success(res) {
          if (res.authSetting[scope]) {
            resolve();
          } else {
            reject();
          }
        },
        fail (err) {
          reject(err);
        }
      })
    })
  }
}

const scopeList = {
  userLocation:'scope.userLocation'
}

const authorize = {
  userLocation () {
    return new Promise((resolve,reject)=>{
      setting.getSetting(scopeList.userLocation).then(res=>{
        resolve();
      }).catch(()=>{
        reject();
      })
    })
  }
}

export default authorize;