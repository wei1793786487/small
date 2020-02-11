// pages/face/face.js

import {
  getface
}
from '../../utils/request.js'
import Dialog from '../../@vant/weapp/dialog/dialog';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    mid: '',
    message: '',
    title: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      mid: options.id
    })
  },

  takePhoto() {
    wx.showLoading({
      title: '识别中',
    })
    const ctx = wx.createCameraContext()
    ctx.takePhoto({
      quality: 'high',
      success: (res) => {
        const base64 = wx.getFileSystemManager().readFileSync(res.tempImagePath, "base64");
        // console.log(base64)
        //这个调用的是没有进行校验的 就是说这个接口是谁都可以访问的 其实是不安全的

        getface(base64, this.data.mid).then(res => {
        console.log(res)
          if (res.data.code = 200) {
            this.data.title = "信息";
            this.data.message = res.data.data || res.data.message;
          } else {
            this.data.title = "信息";
            this.data.message = res.data.message;
          }
          wx.hideLoading()
          Dialog.alert({
            title: this.data.title,
            message: this.data.message
          })
        })
      }
    })
  },

})