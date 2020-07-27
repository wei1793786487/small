import {
  getMeetingById
} from '../../api/meeting.js'
var QQMapWX = require('../../lib/qqmap-wx-jssdk.min');
var qqmapsdk;

Page({
  data: {
    Height: 0,
    scale:15 ,
    latitude: "",
    longitude: "",
    //距离
    distance:"",
    markers: [],
    circles: []
  },
  onLoad: function (option) {
    wx.showLoading({
      title: '价值',
      mask:'true'
    })
    qqmapsdk = new QQMapWX({
      key: 'N4NBZ-5IFWK-NH7JH-AK7LS-77W77-LMBVI' // 必填
    });
  getMeetingById(option.id).then(res=>{
    let data=res.data.data
    this.distance(data)
    //开启定时器每秒计算时间
    setInterval(()=>{
    this.distance(data)
    },10000)
    this.setData({
      latitude: data.lat,
      longitude: data.lng,
      markers:[{
        latitude: data.lat,
        longitude: data.lng,
        label:{
          content:'签到地点' ,
        }
      }],
      circles: [{
        latitude: data.lat,
        longitude: data.lng,
        fillColor: '#7cb5ec88',
        color:'#00FFFF',
        radius: 100,
      }]
    })
    wx.hideLoading()
  })
    var _this = this;
    wx.getSystemInfo({
      success: function (res) {
        //设置map高度，根据当前设备宽高半屏显示
        _this.setData({
          view: {
            Height: res.windowHeight/2
          }
        })
      }
    })
  },
  distance(data) {
    qqmapsdk.calculateDistance({
      to: [{
        latitude:data.lat,
        longitude:data.lng
      }], //终点坐标
      success: res=> {//成功后的回调
       let distance =res.result.elements[0].distance;
        if(distance<100){
          wx.redirectTo({
            url: '/pages/face/face?id=' + this.data.mid + '',
          })
        }
        this.setData({
          distance:distance
        })
      },
      fail: function(error) {
        console.error(error);
      },
      complete: function(res) {
        console.log(res);
      }
  });
  }
})