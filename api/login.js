
import {config} from "../settings/set"
export function login() {
  return new Promise((resolve, reject) => {
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        wx.request({
          url: `${config.api_base_url}/vx/login`,
          data: {
            code: res.code
          },
          success: (res) => {
            wx.setStorage({
              key:"token",
              data:res.data.data
            })
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
