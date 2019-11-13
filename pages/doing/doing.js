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
    analySis: {
      show: false,
      des: null
    }
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

    let { index, data, prevDisabled, nextDisabled, analySis } = this.data;

    index = ++index;

    if (index === data.length - 1) {
      nextDisabled = true;
    }

    if (index !== 0) {
      prevDisabled = false;
    }

    analySis.show = false;

    this.setData({
      index,
      prevDisabled,
      nextDisabled,
      analySis
    });
  },

  prevHandle() {
    this.data.scoreLock = "REFRESH";

    let { index, data, prevDisabled, nextDisabled, analySis } = this.data;

    index = --index;

    if (index !== data.length - 1) {
      nextDisabled = false;
    }

    if (index === 0) {
      prevDisabled = true;
    }

    analySis.show = false;

    this.setData({
      index,
      prevDisabled,
      nextDisabled,
      analySis
    });
  },

  scoreHandle(e) {
    let { scores, index, data } = this.data;

    if (e.detail.type === "ADD") {
      if (!this.data.scoreLock || this.data.scoreLock === "REFRESH") {
        scores += data[index].scores;
      }

      this.data.scoreLock = true;
    }

    if (e.detail.type === "REDUCE") {
      if (
        (this.data.scoreLock || this.data.scoreLock === "REFRESH") &&
        scores != 0
      ) {
        scores -= data[index].scores;
      }

      this.data.scoreLock = false;
    }

    this.data.scores = scores;
  },

  selectHandle(e) {
    const { data, index } = this.data;
    data[index].options = data[index].options.map((item, index) => {
      return {
        value: item.value,
        checked: index == e.detail.index ? true : false
      };
    });
    this.setData({
      data
    });
  },

  inputHandle(e) {
    const { data, index } = this.data;
    data[index].input_value = e.detail.value;

    this.setData({
      data
    });
  },

  checkHandle() {
    const { analySis, data, index } = this.data;
    analySis.show = true;
    analySis.des = data[index].analysis;
    this.setData({
      analySis
    });
  },

  submitHandle() {
    const { data } = this.data;
    let qArr = [];
    data.forEach(element => {
      if (element.type === "choice") {
        let myanswer = element.options.find(item => item.checked === true)
            .value,
          rightanswer = element.options[element.answers].value;

        qArr.push({
          context: element.content,
          myanswer: myanswer,
          rightanswer,
          result: myanswer == rightanswer,
          scores: element.scores
        });
      }
      if (element.type === "input") {
        qArr.push({
          context: element.content,
          myanswer: element.input_value || "暂无作答",
          result: element.answer === element.input_value,
          scores: element.scores
        });
      }
      if (element.type === "short") {
        qArr.push({
          context: element.content,
          myanswer: element.input_value || "暂无作答",
          rightanswer: element.answer,
          scores: element.scores
        });
      }
    });
  }
});
