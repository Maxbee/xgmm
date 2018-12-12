// pages/test/test.js

const app = getApp()
const bmap = require('../../libs/bmap-wx.js'); 
import effect from '../../static/js/mini.js'
const ak = 'EPSV8GGLf7Dhq5IGRENMaH6is5joXOBI'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bgcolor: 'background-color:#000'
      
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getSystemInfo({
      success: (res) => {
        let width = res.windowWidth
        this.setData({
          width,
          scale: width / 375
        })
      }
    })
    this.getWeather()
    const canvasId = 'effect'
    const ctx = wx.createCanvasContext(canvasId)
    ctx.moveTo(10, 10)
    ctx.lineTo(20, 20)
    let { width, scale } = this.data.width
    // 768 为 CSS 中设置的 rpx 值
    let height = 768 / 2 * scale
    // let rain = new Rain(ctx, width, height, {
    //   amount: 100,
    //   speedFactor: 0.03
    // })
    // rain.run()
    let rain = effect('rain', wx.createCanvasContext(canvasId), width, height, {
      amount: 100,
      speedFactor: 0.03
    })
    //  rain.run()
  },

  getCurrentDate(){
    let date = new Date();
    let year = date.getFullYear();
    let month =date.getMonth()+1;
    let day = date.getDate();
    return `${month}月${day}日`
  },

  getWeather(){
    this.setData({
      date: this.getCurrentDate()
    })
    wx.showNavigationBarLoading()
    wx.showLoading({
      title: '别着急，等会...',
    })
    var that = this;
    // 新建百度地图对象 
    var BMap = new bmap.BMapWX({
      ak: ak
    });
    var fail = function (data) {
      console.log(data)
    };
    var success = function (data) {
      wx.hideNavigationBarLoading();
      wx.hideLoading();
      var weatherData = data.currentWeather[0];

      var currentWeather = weatherData.date.substring(weatherData.date.indexOf('：') + 1, weatherData.date.indexOf(')'))
      var weatherDatas = '城市：' + weatherData.currentCity + '\n' + 'PM2.5：' + weatherData.pm25 + '\n' + '日期：' + weatherData.date + '\n' + '温度：' + weatherData.temperature + '\n' + '天气：' + weatherData.weatherDesc + '\n' + '风力：' + weatherData.wind + '\n';
      that.setData({
        weatherDatas: weatherDatas,
        weatherDesc: weatherData.weatherDesc,
        temperature: weatherData.temperature,
        currentWeather: currentWeather,
        city: weatherData.currentCity,

      });
    }
    // 发起weather请求 
    BMap.weather({
      fail: fail,
      success: success
    }); 
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
    return
    setInterval(()=>{
      let r = parseInt(Math.random()*255)
      let g = parseInt(Math.random() * 255)
      let b = parseInt(Math.random() * 255)
      let a = Math.random().toFixed(1)
      console.log({r,g,b,a})
     
      this.setData({
        bgcolor: `background-color:rgba(${r},${g},${b},${a})`
      })
    },10000)
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