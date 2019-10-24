// pages/home/home.js
import { getTagAttr } from "../../utils/util.js";

Page({
  data: {
    select: {
      id: null,
      mode: null
    },
    picker: {
      value: [{ id: 0, name: "顺序刷题" }, { id: 1, name: "随机刷题" }],
      index: 0
    }
  },

  onLoad: function(options) {},

  detailHandle(e) {
    this.data.select.id = getTagAttr(e, "id");
  },

  pickerChangeHandle(e) {
    this.data.select.mode = e.detail.value;
  }
});
