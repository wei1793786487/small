

export function request(options) {
  //草 应该是执行这个方法的时时候在取出啊！！
  return new Promise((resolve, reject) => {
    const token = wx.getStorageSync('token');
 wx.request({
      url: options.url,
      method: options.method || 'get',
      data: options.data || {},
      header: {
        token
      },
      success: res => {
        console.log(options.url)
        console.log(token)
        //一般不会
        if (res.data.code === 1000) {
          console.log("认证失效,重新认证")
          wx.login({
            success: res => {
              console.log(res)
              // 发送 res.code 到后台换取 openId, sessionKey, unionId
              wx.request({
                url: 'http://127.0.0.1:10086/miniUser/login',
                data: {
                  code: res.code
                },
                success: (res) => {
                  if (res.statusCode == 200) {
                    const token = res.data.token;
                    //进行本地的储存
                    wx.setStorageSync('token', token)
                  }
                }
              })
            }
          })

        } else {
          //认证成功，更新token
          if (res.header.token && res.header.token != "") {
            console.log("认证成功，更新");
            wx.setStorageSync('token', token)
          }
          resolve(res)
        }
      },
      fail: function(err) {
        reject(err)
      }
    })
  })
}