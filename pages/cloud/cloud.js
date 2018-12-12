// pages/cloud/cloud.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  onShareAppMessage: function () {
    return {
      title: '2019年节假日放假安排',
      path: '/index/index?id=123'
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // wx.cloud.init({
    //   env: 'xgmm-adb90c',
    //   traceUser:true
    // })
    // wx.getUserInfo({
    //   success(res) {
    //     const userInfo = res.userInfo
    //     const nickName = userInfo.nickName
    //     const avatarUrl = userInfo.avatarUrl
    //     const gender = userInfo.gender // 性别 0：未知、1：男、2：女
    //     const province = userInfo.province
    //     const city = userInfo.city
    //     const country = userInfo.country
    //     console.log(res)
    //   },
    //   fail(res){
    //     console.log(res)
    //   } 
    // })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})