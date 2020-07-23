
import {
  login
  }
 from '../api/login'

export function request(options) {
  return new Promise((resolve, reject) => {
    const token = wx.getStorageSync('token');
    wx.request({
      url: options.url,
      method: options.method || 'get',
      data: options.data || {},
      header: {
        "vxAuthorization":"VXBearer"+token,
        'content-type': 'application/x-www-form-urlencoded',
      },
      success: res => {
        //如果是1000的话 递归调用自己
        if (res.data.code === 1000) {
          console.log("登录到期，重新登录");
          login().then(res=>[
            request(option)
          ]);
        } 
          resolve(res)
      },
      fail: function(err) {
        reject(err)
      }
    })
  })
}
