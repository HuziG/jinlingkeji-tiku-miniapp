/*
 * @Descripttion:
 * @version:
 * @Author: dingjia z
 * @Date: 2020-01-13 11:05:33
 * @LastEditors: dingjia z
 * @LastEditTime: 2020-04-06 19:17:25
 */
// pages/conclusion/conclusion.js
import { sendShortAnswer, reqQuestionState } from "../../services/conclusion";

Page({
  data: {
    submitData: wx.getStorageSync("submit_data"),
  },

  onShow: function () {
    this.initHandle();
    this.sendShortAnswersHandle();
    this.sendQuestionState();
  },

  initHandle() {
    let doingData = wx.getStorageSync("doing_data");

    let totalScores = JSON.parse(doingData).reduce((value, item) => {
      return (value += item.scores);
    }, 0);

    let getScores = this.data.submitData.reduce((value, item) => {
      if (item.result) value += item.scores;
      return value;
    }, 0);

    let scoresPer = (getScores / totalScores) * 100;

    this.setData({
      doingData,
      totalScores,
      getScores,
      scoresPer,
    });
  },

  sendShortAnswersHandle() {
    if (wx.getStorageSync("short_answers")) {
      sendShortAnswer();
    }
  },

  async sendQuestionState() {
    let promiseArr = [];
    this.data.submitData.forEach((element) => {
      if (!element.result) {
        promiseArr.push(reqQuestionState(element));
      }
    });

    console.log(promiseArr);

    const result = await Promise.all(promiseArr).catch(() => {});

    console.log(result);
  },

  questionTo(e) {
    wx.navigateTo({
      url: `/pages/question/question?index=${e.currentTarget.dataset.index}`,
    });
  },

  onUnload: function () {
    wx.reLaunch({
      url: "/pages/home/home",
    });
  },
});
