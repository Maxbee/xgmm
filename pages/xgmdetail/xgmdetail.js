// pages/xgmdetail/xgmdetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    blog: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let blog = JSON.parse(options.blog);
    console.log(blog)
    wx.setNavigationBarTitle({ title: blog.title })

    this.setData({
      blog
    })
  },

  onSaveImg(event) {
    console.log(event);

    wx.downloadFile({
      url: event.target.dataset.imgsrc, //仅为示例，并非真实的资源
      success: function (result) {
        // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
        if (result.statusCode === 200) {

          wx.showModal({
            title: '保存图片',
            content: '你要保存这张图片吗？',
            confirmText: '是的',
            cancelText: '不要',
            success(res) {
              if (res.confirm) {
                wx.saveImageToPhotosAlbum({
                  filePath: result.tempFilePath,
                  success(resp) {
                    wx.showToast({
                      title: '图片保存成功',
                      duration: 2000
                    })
                  },
                  fail(resp) {
                    wx.showToast({
                      title: '保存失败',
                      duration: 2000
                    })
                    console.log(resp)
                  }
                })
              } else {
                //取消保存

              }
            }
          })
        }
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