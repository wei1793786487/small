
App({
  globalData: {
    isband:false,
    islogin:1
  },
 //前端渣渣写的代码，大佬不要喷我
  onLaunch: function () {
    //每次登陆都要登陆，每次刷新token
  },

loginsync(){
  return new Promise((resolve, reject) =>{
      wx.showLoading({
        title: '请等待',
      })
      wx.login({
        success: res => {
          console.log(res)
          // 发送 res.code 到后台换取 openId, sessionKey, unionId
          wx.request({
            url: 'https://www.hqgml.com/sapi/miniUser/login',
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
    
   

    }
  );
},




})