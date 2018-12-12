// pages/list/list.js


const config = require('../../config.js')
const  QQMapWX = require('../../utils/qqmap-wx-jssdk.js');
var QQMap = new QQMapWX({
  key: 'BDLBZ-GCC6F-G42JE-NR5JK-IWLT2-Z4FBH' 
});
Page({

  /**
   * 页面的初始数据
   */
  data: {
    subjects:[],
    page:1,
    city:'定位中'
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
    this.movieType = options.type;
    let movieType = options.type;
    this.setData({
      movieType: options.type
    })
    this.getLct()
    this.getData(movieType)
  },

  openLocation() {
    wx.showToast({
      title: '检测到您未授权使用位置权限，请先开启哦',
      icon: 'none',
      duration: 3000
    })
  },
  /*
  *获取电影数据
  *
  */
  getData(movietype){
    wx.showLoading({
      title: '加载中...',
    })

    var self = this;
    
    console.log(movietype, self.data.city)
    wx.request({
      // url: config.url+type+'?city=广州',
      url: `${config.url}/${movietype}?city=${self.data.city}&count=${self.data.page * 10}`,
      method: "GET",
      data: {},
      header: {
        'Content-Type': "json"
      },

      success: function (res) {
        wx.hideLoading();
        let newData = res.data.subjects;
        let currentData = self.data.subjects;

        if(newData.toString()===currentData.toString()){
          wx.showToast({
            title: '已无更多数据',
            icon:'none'
          })
        }
        self.setData({
          subjects: res.data.subjects,
          page: self.data.page+1
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },
  // 获取经纬度
  getLct(){
    let self  = this;
    wx.getLocation({
      type: 'gcj02',
      success: function (res) {
        var latitude = res.latitude
        var longitude = res.longitude

        self.setData({
          latitude,
          longitude
        })
        self.analyLocation()
        // self.getData(self.data.movieType)
      }
    })
    
  },
  //逆解析地址
  analyLocation(){
    let self = this
    QQMap.reverseGeocoder({
      location: {
        latitude: self.data.latitude,
        longitude: self.data.longitude
      },
      success: function (res) {
       
        let city = res.result.address_component.city;
        self.setData({
          city
        })
        console.log('解析出来的城市：',self.data.city)
      },
      fail: function (res) {
        console.log(res);
        self.openLocation()//提醒打开地理位置权限
      },

    });
  },
  //选择地址
  chooseLocation() {
    let self = this;
    wx.chooseLocation({
      success: (res) => {

        let { latitude, longitude } = res

        this.setData({
          latitude,
          longitude,
        })
        self.analyLocation()//逆解析地址
       
        self.getData(self.movieType)
      }
    })
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
    this.getData(this.movieType)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})