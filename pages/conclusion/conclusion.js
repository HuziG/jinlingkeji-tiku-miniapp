/*
 * @Descripttion:
 * @version:
 * @Author: dingjia z
 * @Date: 2020-01-13 11:05:33
 * @LastEditors: dingjia z
 * @LastEditTime: 2020-03-31 16:01:26
 */
// pages/conclusion/conclusion.js
import { sendShortAnswer } from "../../services/conclusion";

Page({
  data: {},

  onShow: function() {
    this.initHandle();
    this.sendShortAnswersHandle();
  },

  initHandle() {
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

  sendShortAnswersHandle() {
    sendShortAnswer();
  },

  questionTo(e) {
    wx.navigateTo({
      url: `/pages/question/question?index=${e.currentTarget.dataset.index}`
    });
  },

  onUnload: function() {
    wx.reLaunch({
      url: "/pages/home/home"
    });
  }
});
