// pages/bandFace/face.js
import {config} from "../../settings/url"

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  takePhoto() {
    let token= "eyJhbGciOiJSUzI1NiJ9.eyJ1c2VyIjoie1wiaWRcIjoyNyxcIm9wZW5pZFwiOlwibzhvMnY0azZlUHZFd1hKbWE5OURGYXRQNmhSNFwiLFwibGFzdFRpbWVcIjpcIjIwMjAtMDctMjQgMTc6MTI6MjJcIixcImNyZWF0ZVRpbWVcIjpcIjIwMjAtMDctMjQgMTU6MTg6MTdcIixcInBpZFwiOm51bGx9IiwianRpIjoiTWpNMFlXTXpaalV0WlROa1pDMDBaREJsTFRsa1lXWXRNV1V6TlRRMVpETTBNMkkxIiwiZXhwIjoxNTk1NTg5NzQyfQ.QyJw9iCPjJY1yEKuukv1VLsy-kJfTjLyh7txeOOCa6YyksUyMWNFhiojlY0X1DSn28BXtctWAmJQnjbbshz0Ne0TaiPlRaw8vw3xCywINIVFtqwKQqz7LndBBBvQh8dtWyj53kYBBjs1p0EivpHecvWF3gqlcMD8UWOFfD_l3uGszyREj9FkOP0kyOisP-myT9fU3UuSf2lP6bnIcTdO89E3nI8NjdI9VJeAlPjIAmuIGHAqViWdhnY-gw1CwyYFHBkYjGxLi8zdEtJX-0RVwggZdRbfCBL2gz7Cp0COnPaqnjOsTTyloutBTZ08xNL2W94-9f6A9_OTkJRBdI3nQw";
    console.log(token);
    wx.showLoading({
      title: '认证人脸中',
    })
    const ctx = wx.createCameraContext()
    ctx.takePhoto({
      quality: 'high',
      success: (res) => {
        const tempFilePath = res.tempImagePath
        wx.showToast({ icon: "loading", title: "正在上传……" });

        wx.uploadFile({
          // url: `${config.api_base_url}/upload/face`, //后端接口
          url:"http://192.168.1.105:8080/upload/face",
          filePath: tempFilePath,
          name: 'file',
          header: {
           "Content-Type": "multipart/form-data",
           "vxAuthorization":"VXBearer"+token,
          },
          success(res) {
           if (res.statusCode != 200) {
            wx.showModal({ title: '提示', content: '上传失败', showCancel: false });
            return;
           } else{
            console.log("");
           }
          },
          fail(e) {
            console.log(e);
           wx.showModal({ title: '提示', content: '上传失败', showCancel: false });
          },
          complete() {
           wx.hideToast(); //隐藏Toast
          }
         })

      }
    })
  }

})