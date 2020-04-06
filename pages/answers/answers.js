/*
 * @Descripttion:
 * @version:
 * @Author: dingjia z
 * @Date: 2020-03-28 14:48:25
 * @LastEditors: dingjia z
 * @LastEditTime: 2020-04-02 09:37:15
 */
// pages/answers/answers.js
import { getAnsComment } from "../../services/ansComment";

Page({
  data: {
    listData: []
  },

  onLoad() {
    this.getAnswers();
  },

  async getAnswers() {
    const {
      data: { objects }
    } = await getAnsComment();
    this.setData({
      listData: objects
    });
    wx.stopPullDownRefresh();
    wx.showToast({
      title: "获取数据成功",
      icon: "none",
      duration: 1000
    });
  },

  onPullDownRefresh() {
    this.getAnswers();
  }
});
