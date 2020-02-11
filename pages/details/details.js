// pages/details/details.js
import {
  getOneMeeting
}
from '../../utils/request.js'
var _mid="";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address:'',
    startTime:'',
    endTime:'',
    meetingPhone:'', 
    information:'',
    name:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const mid = options.id;
    _mid=mid;
    console.log(mid)
    getOneMeeting(mid).then(res => {
      console.log(res)
      const data = res.data.data;
      const address = data.meetingAddress +data.addressName
      console.log(address)
      this.setData({
        address: address,
        startTime: data.startTime,
        endTime: data.endTime,
        meetingPhone: data.meetingPhone,
        information: data.information,
        name: data.meetingName
      })
    })


  },
  goLogin(){
    console.log(_mid)
    wx.redirectTo({
      url: '/pages/face/face?id='+_mid+'',
    })
  }
})