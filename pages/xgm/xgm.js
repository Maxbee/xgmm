// pages/xgm/xgm.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bloglist: [],
    page: 0,
    img: [
      'http://xgmm.me/01.JPG',
      'http://xgmm.me/gxt1.JPG'
    ],
    animationData: {},

    message: '',
    ishidden: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getBlog()
    
    
    this.getNews()
  },
  onSure() {

    this.setData({
      ishidden: false
    })
  },
  getNews() {
    var self = this;
    wx.request({
      url: 'http://xgmm.me/bolg.php?method=news',
      success: function (res) {
        let oldId = wx.getStorageSync('newId')
        let newId = res.data[0].newId
        
        if (oldId != newId) {
         
          self.topToMiddle();
          wx.setStorageSync('newId', newId);
          self.setData({
            ishidden: true
          })
        }
        self.setData({
          message: res.data[0].message
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  getBlog() {

    wx.setNavigationBarTitle({ title: "xgmm" })
    let self = this;
    wx.showLoading({
      title: '加载中...',
    })
    wx.showNavigationBarLoading()
    wx.request({
      url: 'http://xgmm.me/bolg.php',
      method: "GET",
      data: {
        "method": "blog",
        "page": self.data.page,
      },
      header: {
        'Content-Type': "json"
      },
      success: function (res) {

        let bloglist = res.data;
        console.log(bloglist)
        if (bloglist.length == 0) {
          wx.showToast({
            title: '没有更多数据啦~',
            mask: true,
            icon: 'loading',
            duration: 1000
          })
        }
        //  console.log('新增的数据',res.data)
        //  console.log('新增后的数据',self.data.bloglist.concat(res.data))
        self.setData({
          bloglist: self.data.bloglist.concat(res.data),
          page: self.data.page + 9
        })

        wx.hideLoading()
        wx.hideNavigationBarLoading()
      }
    })
  },
  ToDetail(page) {
    let blogContent = JSON.stringify(page.currentTarget.dataset.blog);
    wx.navigateTo({
      url: '../xgmdetail/xgmdetail?blog=' + blogContent
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // var animation = wx.createAnimation({
    //   duration: 1000,
    //   timingFunction: 'ease',
    // })

    // this.animation = animation

    // this.animation.top('300rpx').step();
    // this.animation.top('250rpx').step();
    // this.animation.rotate(-5).step();
    // this.animation.rotate(5).step();
    // this.animation.rotate(0).step();
    // this.setData({
    //   animationData: animation.export()
    // })
    // var animation = wx.createAnimation({
    //   duration: 800,
    //   timingFunction: 'ease',
    // })

    // this.animation = animation

  
    // this.animation.top('300rpx').step();
    // this.animation.top('250rpx').step();
    // this.animation.rotate(-5).step();
    // this.animation.rotate(5).step();
    // this.animation.rotate(0).step();
    // this.setData({
    //   animationData: this.animation.export()
    // })
  },
  topToMiddle() {
    var animation = wx.createAnimation({
      duration: 1000,
      timingFunction: 'ease',
    })

    this.animation = animation

    this.animation.top('300rpx').step();
    this.animation.top('250rpx').step();
    this.animation.rotate(-5).step();
    this.animation.rotate(5).step();
    this.animation.rotate(0).step();
    this.setData({
      animationData: this.animation.export()
    })
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
    this.getNews();
    wx.setNavigationBarTitle({ title: "xgmm" })
    let self = this;
    wx.showLoading({
      title: '加载中...',
    })
    wx.showNavigationBarLoading()
    wx.request({
      url: 'http://xgmm.me/bolg.php',
      method: "GET",
      data: {
        "method": "blog",
        "page": 0,
      },
      header: {
        'Content-Type': "json"
      },
      success: function (res) {
        console.log(res)
        let bloglist = res.data;

        //  console.log('新增的数据',res.data)
        //  console.log('新增后的数据',self.data.bloglist.concat(res.data))
        self.setData({
          bloglist

        })

        wx.hideLoading()
        wx.hideNavigationBarLoading()
      }
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log('到底了');
    this.getBlog();
    wx.stopPullDownRefresh();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})