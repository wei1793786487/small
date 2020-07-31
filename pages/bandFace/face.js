// pages/bandFace/face.js
import {config} from "../../settings/set"

import {
  hellow
} from '../../api/band.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    condition:false,
    value:2
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    hellow().then(res=>{
       if(res.data.code===404){
        this.setData({
          condition:true
        })
       }
    })

  },
  takePhoto() {

    const token = wx.getStorageSync('token');
    wx.showLoading({
      title: '认证人脸中',
    })
    const ctx = wx.createCameraContext()
    ctx.takePhoto({
      quality: 'high',
      success: (res) => {
        const tempFilePath = res.tempImagePath
        wx.showToast({ icon: "loading", title: "正在上传……" });
        wx.uploadFile({
          url: `${config.api_base_url}/upload/face`, //后端接口
          filePath: tempFilePath,
          name: 'file',
          header: {
           "Content-Type": "multipart/form-data",
           "vxAuthorization":"VXBearer"+token,
          },
          success(res) {
            let data = JSON.parse(res.data)
           if (data.code != 200) {
            wx.showModal({ title: '提示', content: data.message, showCancel: false });
            return;
           } else{
            wx.hideToast(); 
            wx.showModal({ title: '提示', content: "上传成功", showCancel: false,
            success (res) {
              wx.redirectTo({
                url: '/pages/index/index',
              })
            } });
           }
          },
          fail(e) {
            console.log(e);
           wx.showModal({ title: '提示', content: '上传失败', showCancel: false });
          },
          complete() {
           
          }
         })

      }
    })
  }

})