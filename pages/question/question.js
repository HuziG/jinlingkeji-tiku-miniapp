// pages/question/question.js
Page({
  data: {
    data: {}
  },

  onLoad: function({ index = 0 }) {
    this.setData({
      data: wx.getStorageSync("submit_data")[index]
    });
  }
});
