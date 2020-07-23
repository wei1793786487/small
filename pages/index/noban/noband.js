// pages/index/noban/noband.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    band: {
      type: Number,
      value: 1
    }
  },
  /**
   * 组件的初始数据
   */
  data: {

  },
  /**
   * 组件的方法列表
   */
  methods: {
    gobind: function () {
       if(this.data.band===0){
        wx.redirectTo({
          url: '/pages/user/user',
        })
       }else if(this.data.band===1){
        wx.redirectTo({
          url: '/pages/bandFace/face',
        })
       }else{
        wx.showToast({
          title: '异常',
          duration: 2000
        })
       }

    }
  }
})