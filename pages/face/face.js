// pages/face/face.js

import {
  getface
} from '../../api/sign.js'

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
          type: 'gcj02',
          isHighAccuracy:'true',
          success: res => {
            console.log(res)
            getface(base64, mid, res.latitude, res.longitude).then(res => {
              console.log(res)
              if (res.data.code = 200) {
                datas.setData({
                  message : res.data.data || res.data.message
                })
                wx.hideLoading()
              } else {
                datas.setData({
                  message :res.data.data || res.data.message
                })
                datas.data.message = res.data.message;
              }
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