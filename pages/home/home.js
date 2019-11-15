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
  },

  async requestHandle() {
    const { list } = this.data;
    const { statusCode, data } = await HomeModels.getListHandle();

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
  }
});
