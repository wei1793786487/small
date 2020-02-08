import {
  request,
  }
   from './network.js'

const url = "http://127.0.0.1:10086"

 
export function auto() {
  return request({
    url: url + "/miniUser"
  })
}

export function login() {
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
            const token = res.data;
            //进行本地的储存
            wx.setStorageSync('token', token)
          }
        }
      })
    }
  })
}


