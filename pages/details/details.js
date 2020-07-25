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

    getMeetingById(mid).then(res => {
      console.log(res)
      const data = res.data.data;
      const address = data.meetingAddress + data.addressName
      console.log(address)
      this.setData({
        address: address,
        startTime: data.startTime,
        endTime: data.endTime,
        meetingPhone: data.meetingPhone,
        information: data.information,
        name: data.meetingName,
        mid:data.id
      })
      var date = new Date(data.endTime);
      var curDate = new Date();
      if (ischek === "true") {
        this.setData({
          buttontext: "你已经签到过了",
          isfalse: true
        })
      } else if (date < curDate) {
        this.setData({
          buttontext: "签到已过期，不可签到",
          isfalse: true
        })
      }
    })
  },
  goLogin() {
    wx.redirectTo({
      url: '/pages/face/face?id=' + this.data.mid + '',
    })
  }
})