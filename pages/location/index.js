import {
  getMeetingById
} from '../../api/meeting.js'
import {config} from "../../settings/set"
var QQMapWX = require('../../lib/qqmap-wx-jssdk.min');
var qqmapsdk;
let inter
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
      title: '加载中',
      mask:'true'
    })
    qqmapsdk = new QQMapWX({
      key: config.qqKey// 必填
    });
  getMeetingById(option.id).then(res=>{
    let data=res.data.data
    this.distance(data,option.id)
    //开启定时器每秒计算时间
    inter= setInterval(()=>{
     this.distance(data,option.id)
    },1000)
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
  onHide: function () {
    clearInterval(inter)
  },
  onUnload: function () {
    clearInterval(inter)
  },
  distance(data,id) {
    qqmapsdk.calculateDistance({
      to: [{
        latitude:data.lat,
        longitude:data.lng
      }], //终点坐标
      success: res=> {//成功后的回调
       let distance =res.result.elements[0].distance;
        if(distance<100){
          wx.redirectTo({
            url: '/pages/face/face?id=' + id + '',
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