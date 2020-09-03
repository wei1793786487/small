// pages/details/details.js
import {
  getMeetingById
} from '../../api/meeting.js'

Page({
  /**
   * 页面的初始数据
   */
  data: {
    buttontext: '点我去签到',
    isfalse: false,
    address: '',
    startTime: '',
    endTime: '',
    meetingPhone: '',
    information: '',
    name: '',
    mid:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const mid = options.id;
    const ischek = options.ischeck;
    wx.showLoading({
      title: '加载中',
      mask:'true'
    })
    getMeetingById(mid).then(res => {
    wx.hideLoading()
      const data = res.data.data;
      const address = data.meetingAddress + data.addressName
      this.setData({
        address: address,
        startTime: data.startTime,
        endTime: data.endTime,
        meetingPhone: data.meetingPhone,
        information: data.information,
        name: data.meetingName,
        mid:data.id
      })
      var date_start = new Date(data.startTime).getTime();
      var date_end = new Date(data.endTime).getTime();
      var date_now = new Date().getTime();
      

      
      if (ischek === "true") {
        this.setData({
          buttontext: "你已经签到过了",
          isfalse: true
        })
      } else if (!(date_start<date_now)||!(date_now<date_end)) {
        this.setData({
          buttontext: "不在签到范围内",
          isfalse: true
        })
      }
    })
  },
  goLogin() {
    wx.redirectTo({
      url: '/pages/location/index?id=' + this.data.mid + '',
    })
  }
})