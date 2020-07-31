import {
  getBandInfo
} from '../../api/info.js'
import {
  getMeeting
} from '../../api/meeting.js'

import {
  login
} from '../../api/login.js'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    Check: [],
    UnCheck: [],
    TimeOut: [],
    active: 1,
    isband: 0,
    isbandFace: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
      mask:true
    })
    const Check = [];
    const UnCheck = [];
    const TimeOut = [];
    login().then(res => {
      getBandInfo().then(res => {
        let data = res.data.data;
        this.setData({
          isband: data.face_band,
          isbandFace: data.person_band
        })
        if (this.data.isband = 1 && this.data.isbandFace == 1) {
          getMeeting().then(res => {
            if (res.data.code != 200) {
              return
            }
            const datas = res.data.data;
            datas.forEach((item, index) => {
              console.log();
              if (item.isCheck=== 1) {
                Check.push(item)
              } else {
                var date = new Date(item.endTime);
                var curDate = new Date();
                if (date > curDate) {
                  UnCheck.push(item)
                } else {
                  TimeOut.push(item)
                }
              }
            });
            this.setData({
              Check: Check,
              UnCheck: UnCheck,
              TimeOut: TimeOut
            })
            console.log("未签到")
            console.log(this.data.UnCheck)
            console.log("已签到")
            console.log(this.data.Check)
            console.log("超时")
            console.log(this.data.TimeOut)
            wx.stopPullDownRefresh()
          })
        }
        wx.hideLoading()
      })
    })




  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.onLoad();
  },
  //页面跳转
  Jump: function (data) {
    const id = data.target.dataset.id;
    const ischeck = data.target.dataset.ischeck;
    wx.redirectTo({
      url: '/pages/details/details?id=' + id + '&ischeck=' + ischeck + '',
    })
  }
})