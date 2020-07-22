export function login() {
  return new Promise((resolve, reject) => {
    wx.login({
      success: res => {
        console.log(res)
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        wx.request({
          url: 'http://127.0.0.1:8080/vx/login',
          data: {
            code: res.code
          },
          success: (res) => {
            resolve(res);
          },
          fail: (err) => {
            reject(err)
          }
        })
      }
    })
  })
}