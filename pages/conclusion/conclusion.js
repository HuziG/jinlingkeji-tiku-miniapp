// pages/conclusion/conclusion.js
Page({
  data: {},

  onShow: function(options) {
    let doingData = wx.getStorageSync("doing_data");
    let submitData = wx.getStorageSync("submit_data");

    let totalScores = JSON.parse(doingData).reduce((value, item) => {
      return (value += item.scores);
    }, 0);

    let getScores = submitData.reduce((value, item) => {
      if (item.result) value += item.scores;
      return value;
    }, 0);

    let scoresPer = (getScores / totalScores) * 100;

    this.setData({
      doingData,
      submitData,
      totalScores,
      getScores,
      scoresPer
    });
  },

  onUnload: function() {
    wx.reLaunch({
      url: "/pages/home/home"
    });
  }
});
