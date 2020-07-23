
import {
  getBandInfo
}
from '../../api/info.js'
var app = getApp();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    Check: [],
    UnCheck: [],
    TimeOut: [],
    active: 1,
    isband: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
   
    const Check = [];
    const UnCheck = [];
    const TimeOut = [];

    getBandInfo().then(res=>{
      console.log(res);
    })
    // getMeeting().then(res => {
    //   console.log(res);
      
    //   })
    // onLaunch()中的请求与index.js onLoad()中的请求是同时进行的 需要使用promise转为同步
   
    // app.loginsync().then((res) => {

    //   if (res.statusCode == 200) {
    //     const token = res.data.token;
    //     app.globalData.isband = res.data.isband;
    //     wx.setStorageSync('token', token)
    //     this.setData({
    //       isband: app.globalData.isband
    //     })
    //     wx.hideLoading()
    //     // wx.showLoading({
    //     //   title: '获取数据中',
    //     // })
    //     getMeeting().then(res => {
    //       if(res.data.code!=200){
    //         return
    //       }
    //       console.log(res)
    //       const datas = res.data.data;
    //       datas.forEach((item, index) => {
    //         //  console.log(item);
    //         //  console.log(index);
    //         //  console.log(item.ischeck)
    //         if (item.ischeck === 1) {
    //           Check.push(item)
    //         } else {
    //           var date = new Date(item.endTime);
    //           var curDate = new Date();
    //           if (date > curDate) {
    //             UnCheck.push(item)
    //           } else {
    //             TimeOut.push(item)
    //           }
    //         }

    //       });
    //       this.setData({
    //         Check: Check,
    //         UnCheck: UnCheck,
    //         TimeOut: TimeOut
    //       })
    //       //  console.log(Check)
    //       console.log("未签到")
    //       console.log(this.data.UnCheck)
    //       console.log("已签到")
    //       console.log(this.data.Check)
    //       console.log("超时")
    //       console.log(this.data.TimeOut)
    //       wx.stopPullDownRefresh()
    //     })

    //   }
    // })
  },
  /**
  * 页面相关事件处理函数--监听用户下拉动作
  */
  onPullDownRefresh: function () {
    this.onLoad();
   
  },
  //页面跳转
  Jump: function(data) {
    const id = data.target.dataset.id;
    const ischeck = data.target.dataset.ischeck;
    wx.redirectTo({
      url: '/pages/details/details?id=' + id + '&ischeck='+ischeck+'',
    })
  }
})