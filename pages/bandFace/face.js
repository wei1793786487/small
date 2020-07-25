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
    let token="eyJhbGciOiJSUzI1NiJ9.eyJ1c2VyIjoie1wiaWRcIjoyNyxcIm9wZW5pZFwiOlwibzhvMnY0azZlUHZFd1hKbWE5OURGYXRQNmhSNFwiLFwibGFzdFRpbWVcIjpcIjIwMjAtMDctMjQgMTc6MTI6MjJcIixcImNyZWF0ZVRpbWVcIjpcIjIwMjAtMDctMjQgMTU6MTg6MTdcIixcInBpZFwiOm51bGx9IiwianRpIjoiT0RCbU16RTVZell0TmprMFpDMDBNV1EwTFdJeU1UTXRaVFV6TURKa1lXVXhPREkyIiwiZXhwIjoxNTk1NjYyODYxfQ.XejhdycO4E2smEbE_0ucXqGOTCa1rJnb3Egf4ENs-rqMz1Dorf7MczV37J4iP50rQnf8AI_fWxozKOvCaf8zmod_XN1PtEPTmZS_xl0hP8E-E34JVbCpMJwOkQyf0VPTLqS8z6B-8tjwMlGW2BO8QJ5HQPfaN7dkDvzN4WSCKy7rMbqjzTZhxbMvQCRAvoPw-AwpxIyLopWIzLLtoqJjokURBvU5wnmvjcGqsyCp33yGyaHJ5P_PbX1yhcazOP-H1VZxu0C2wTeNSNW2JA2y9oGXDRqixiL7JZt1lXTYrW7J24xpEu91Ri9UCWnbsJFOqADc2I8BZbG-AbwYErkdeQ"
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
          url: `${config.api_base_url}/upload/face`, //后端接口
          filePath: tempFilePath,
          name: 'file',
          header: {
           "Content-Type": "multipart/form-data",
           "vxAuthorization":"VXBearer"+token,
          },
          success(res) {
           if (res.code != 200) {
            wx.showModal({ title: '提示', content: res.data, showCancel: false });
            return;
           } else{
            wx.hideToast(); 
            console.log("");
           }
          },
          fail(e) {
            console.log(e);
           wx.showModal({ title: '提示', content: '上传失败', showCancel: false });
          },
          complete() {
           
          }
         })

      }
    })
  }

})