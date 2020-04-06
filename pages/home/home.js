/*
 * @Descripttion:
 * @version:
 * @Author: dingjia z
 * @Date: 2020-01-13 11:05:33
 * @LastEditors: dingjia z
 * @LastEditTime: 2020-04-02 09:37:29
 */
// pages/home/home.js
import { getTagAttr } from "../../utils/util.js";
import * as HomeModels from "../../models/home";

Page({
  data: {
    picker: {
      value: [
        { id: 0, name: "顺序刷题" },
        { id: 1, name: "随机刷题" }
      ],
      index: 0
    },
    list: {
      con: null,
      loading: "ING"
    }
  },

  onShow() {
    this.requestHandle();

    wx.removeStorage({
      key: "short_answers"
    });
    wx.removeStorage({
      key: "doing_data"
    });
  },

  async requestHandle() {
    const { list } = this.data;
    const { statusCode, data } = await HomeModels.getListHandle();

    console.log(statusCode);

    if (statusCode !== 200) {
      list.loading = "ERR";
      this.setData({
        list
      });
    }

    if (statusCode === 200) {
      list.loading = "SUCC";
      list.con = data.objects;
      this.setData({
        list
      });
      wx.stopPullDownRefresh();
      wx.showToast({
        title: "获取数据成功",
        icon: "none",
        duration: 1000
      });
    }
  },

  detailHandle(e) {
    let data = this.data.list.con[getTagAttr(e, "index")];
    this.data.checkDataId = data.id;
    wx.setStorageSync("doing_data", JSON.stringify(data.data));
  },

  pickerChangeHandle(e) {
    HomeModels.addTimesHandle(this.data.checkDataId);

    wx.navigateTo({
      url: `/pages/doing/doing?mode=${e.detail.value}`
    });
  },

  onPullDownRefresh() {
    this.requestHandle();
  }
});
