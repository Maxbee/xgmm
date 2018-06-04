// pages/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    disirable:'rating',
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let data =JSON.parse(options.lists)
    console.log(data);
    
    let { summary, title, images, countries, directors, rating, casts, genres } = data;
    wx.setNavigationBarTitle({
      title: title,
    })
    let newDirectors = directors.map((item)=>{
     
      return item.name 
    }).join(" ")
    rating.average = rating.average==0?'暂未评分':rating.average


    
    let newCasts = []
    for(let tempAry of casts){
        newCasts.push(tempAry.name)
    }
   
    this.setData({
      countries,
      directors:newDirectors,
      images: images.large,
      title:title,
      summary: summary,
      rating: rating.average,
      disirable:rating.average>7?'red':'orange',
      casts:newCasts.join('  '),
      genres,
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