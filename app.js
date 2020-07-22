import {
  login
  }
   from './utils/login'
App({
  globalData: {
    isband:false,
    islogin:1
  },
  onLaunch: function () {
    login().then(res=>{
       console.log(res);
    })
  },
})