// pages/user/user.js
import Toast from '../../@vant/weapp/toast/toast'
import {
  checkPhone
} from '../../utils/util.js'

import {
  bind
}
from '../../utils/request.js'
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
  onLoad: function(options) {
    // wx.getLocation({
    //   success: function(res) {
    //     console.log(res)
    //   },
    // })
  },

  onChangen(event) {
    // event.detail 为当前输入的值
    this.setData({
      name: event.detail
    })
  },
  onChangep(event) {
    // event.detail 为当前输入的值
    this.setData({
      phone: event.detail
    })
  },


  submit: function(res) {
    const name = this.data.name;
    const phone = this.data.phone;
    if (name === '') {
      Toast('请输入名字');
    } else if (phone === '' || !checkPhone(phone)) {
      Toast('请输入正确格式电话号码');
    } else {
      bind(name,phone).then(res => {
        if(res.data.code===200){
          Toast('绑定成功');
          wx.redirectTo({
            url: '/pages/index/index',
          })
        }else{
          Toast(res.data.message);
        }
      })
    }
  }


})