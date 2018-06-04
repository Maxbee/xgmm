// pages/list/list.js


const config = require('../../config.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    subjects:[]
  },
  onToDetail:function(event){
    
    let params = JSON.stringify(event.currentTarget.dataset.lists)
    wx.navigateTo({
      url: '../detail/detail?lists=' + params ,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let type = options.type;
    wx.showLoading({
      title: '加载中...',
    })
    var self = this;
    wx.request({
     // url: config.url+type+'?city=广州',
      url:`${config.url}/${type}?city=广州`,
      method: "GET",

      data: {},

      header: {

        'Content-Type': "json"

      },

      success: function (res) {
        wx.hideLoading();
        self.setData({
          subjects: res.data.subjects
        })
        console.log(res.data.subjects)

      }
    })
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