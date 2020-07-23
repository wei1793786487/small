import {
  login
  }
   from './api/login'
App({
  onLaunch: function () {
    login()
  }
})