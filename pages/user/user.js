// pages/user/user.js
import Toast from '../../@vant/weapp/toast/toast'
import Dialog from '../../@vant/weapp/dialog/dialog';
import {
  checkPhone
} from '../../utils/util.js'

import {
  bind,usernameStatus
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
   
 
      usernameStatus(name).then(res=>{
      let message="";
      console.log(res);
      
      if(res.data.data===0){
        this.bandface(name,phone)
      }else if(res.data.data===1) {
        Dialog.confirm({
          title: '提醒',
          message: "该人员已存在人脸库,您将绑定人员库的该人员",
        })
          .then(() => {
            this.bandface(name,phone)
          })
      }else if(res.data.data===2){
        Dialog.alert({
          title: '提醒',
          message: '改姓名已经被其他微信用户绑定,请联系管理员',
        })
      }
      })

    }
  },
  bandface(name,phone){
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

})