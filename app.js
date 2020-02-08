import {
  login
} from '/utils/request.js'


App({
  globalData: {
    isband:false
  },
 //前端渣渣写的代码，大佬不要喷我
  onLaunch: function () {
    //每次登陆都要登陆，每次刷新token
      login();
  }


})