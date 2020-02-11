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
    title: '信息',
    lat: '',
    long: ''
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
    const mid = this.data.mid;
    // const title = this.data.title;
    // const message = this.data.message;
    const datas = this;
    ctx.takePhoto({
      quality: 'high',
      success: (res) => {
        const base64 = wx.getFileSystemManager().readFileSync(res.tempImagePath, "base64");

        //获取位置
        wx.getLocation({
          success: res => {
            console.log(res)
            //成功了之后再发送请求
            // console.log(res)
            // console.log(base64)
            //这个调用的是没有进行校验的 就是说这个接口是谁都可以访问的 其实是不安全的

            getface(base64, mid, res.latitude, res.longitude).then(res => {
              console.log(res)
              if (res.data.code = 200) {
                datas.setData({
                  message : res.data.data || res.data.message
                })
              } else {
                datas.setData({
                  message :res.data.data || res.data.message
                })
                datas.data.message = res.data.message;
              }
              wx.hideLoading()
              Dialog.alert({
                title: datas.data.title,
                message: datas.data.message
              })
            })
          },
          fail: function() {
            Dialog.alert({
              message: '获取位置信息错误'
            })
          }
        })
      }
    })
  },



})