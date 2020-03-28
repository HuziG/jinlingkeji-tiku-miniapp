/*
 * @Descripttion:
 * @version:
 * @Author: dingjia z
 * @Date: 2020-01-13 11:05:33
 * @LastEditors: dingjia z
 * @LastEditTime: 2020-03-28 14:55:15
 */
//index.js
import { userLogin } from "../../services/user";

Page({
  data: {},
  onLoad() {
    this.getAuthStateHandle().then(state => {
      if (state) {
        this.directToHandle();
      }
    });
  },
  async getuserinfoHandle(e) {
    wx.showLoading({
      title: "登陆中"
    });
    let result = await userLogin().catch(() => {
      wx.showToast({
        title: "登陆成功",
        icon: "none",
        duration: 2000
      });
      wx.hideLoading();
    });
    if (result) {
      wx.showToast({
        title: "登陆失败",
        icon: "none",
        duration: 2000
      });
      wx.hideLoading();
      this.directToHandle();
    }
  },
  getAuthStateHandle() {
    return new Promise(resolve => {
      wx.getSetting({
        success(res) {
          resolve(res.authSetting["scope.userInfo"]);
        }
      });
    });
  },
  directToHandle() {
    wx.switchTab({
      url: "/pages/home/home"
    });
  }
});
