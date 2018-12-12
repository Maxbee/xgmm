// components/pill/pill.js
const app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    isShow: { // 是否显示后退按钮            
      type: String,
      value: "1"
    },
    isIndex: { // 是否主页            
      type: Boolean,
      value: false,
    },
    title_height: { //             
      type: String,
      value: app.config.title_height,
    },
    titleIcon_height: {
      type: String,
      value: app.config.titleIcon_height,
    },
    titleIcon_width: {
      type: String,
      value: app.config.titleIcon_width,
    },
    statusbarHeight: {
      type: String,
      value: app.config.statusbarHeight,
    },
    title_top: {
      type: String,
      value: app.config.title_top,
    },
    title_text: {
      type: String,
      value: app.config.title_text,
    },
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
    _goBack: function () {
      wx.navigateBack({
        delta: 1
      });
    },
    _goHome: function () {
      wx.switchTab({
        url: "/pages/index/index"
      });
    }
  }
  
})
