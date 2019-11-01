// pages/doing/doing.js
import * as DoingModels from "../../models/doing";

Page({
  data: {
    prevDisabled: true,
    analyDisabled: false,
    nextDisabled: false,
    index: 0,
    data: null,
    scores: 0,
    selectInfo: []
  },

  onLoad: function(options) {
    let data = DoingModels.modeGetItem(
      Number(options.mode),
      JSON.parse(wx.getStorageSync("doing_data"))
    );
    this.setData({
      data
    });
  },

  nextHandle() {
    this.data.scoreLock = "REFRESH";

    let { index, data, prevDisabled, nextDisabled } = this.data;

    index = ++index;

    if (index === data.length - 1) {
      nextDisabled = true;
    }

    if (index !== 0) {
      prevDisabled = false;
    }

    this.setData({
      index,
      prevDisabled,
      nextDisabled
    });
  },

  prevHandle() {
    this.data.scoreLock = "REFRESH";

    let { index, data, prevDisabled, nextDisabled } = this.data;

    index = --index;

    if (index !== data.length - 1) {
      nextDisabled = false;
    }

    if (index === 0) {
      prevDisabled = true;
    }

    this.setData({
      index,
      prevDisabled,
      nextDisabled
    });
  },

  scoreHandle(e) {
    let { scores, index, data, selectInfo } = this.data;

    if (e.detail.type === "ADD") {
      if (!this.data.scoreLock || this.data.scoreLock === "REFRESH") {
        scores += data[index].scores;
      }

      this.data.scoreLock = true;
    }

    if (e.detail.type === "REDUCE") {
      if (this.data.scoreLock || this.data.scoreLock === "REFRESH") {
        scores -= data[index].scores;
      }

      this.data.scoreLock = false;
    }

    selectInfo[index] = e.detail.index;

    this.data.scores = scores;

    this.setData({
      selectInfo
    });
  }
});
