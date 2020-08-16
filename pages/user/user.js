// pages/user/user.js
import Toast from '../../@vant/weapp/toast/toast'
import {
  checkPhone
} from '../../utils/util.js'

import {
  bind
} from '../../api/band.js'



Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: "",
    phone: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  userChance(event) {
    this.setData({
      name: event.detail
    })
  },
  phoneChance(event) {
    this.setData({
      phone: event.detail
    })
  },

  submit: function (res) {
  
    const name = this.data.name;
    const phone = this.data.phone;
    if (name === '') {
      Toast('请输入名字');
    } else if (phone === '' || !checkPhone(phone)) {
      Toast('请输入正确格式电话号码');
    } else {
      wx.showLoading({
        title: '加载中',
      })
      bind(name, phone).then(res => {
        wx.hideLoading()
        if (res.data.code === 200) {
          if (res.data.data === 0) {
            Toast('绑定成功');
            setTimeout(function () {
              wx.redirectTo({
                url: '/pages/index/index',
              })
            }, 2000)
          } else {
            if (res.data.data === 1) {
              Toast('绑定成功,请前往绑定人脸');
              setTimeout(function () {
                wx.redirectTo({
                  url: '/pages/bandFace/face',
                })
              }, 2000)
            }else{
              Toast('未查找到您的信息，请联系管理员添加');
            }
          }
        } else {
          Toast(res.data.message);
        }
      }).catch(res=>{
      wx.hideLoading()
    })

    }
  }


})