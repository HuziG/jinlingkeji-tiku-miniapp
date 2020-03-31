/*
 * @Descripttion:
 * @version:
 * @Author: dingjia z
 * @Date: 2020-01-13 11:05:33
 * @LastEditors: dingjia z
 * @LastEditTime: 2020-03-31 14:26:51
 */
// components/doing/content/index.js
const query = wx.createSelectorQuery();

Component({
  properties: {
    data: {
      type: Object
    }
  },

  observers: {
    data: function(value) {
      if (value) {
        if (value.type === "choice" || value.type === "short")
          this.setData({
            shortValue: ""
          });
        if (value.type === "input") {
          this.setData({
            inputValue: []
          });
        }
      }
    }
  },

  data: {
    saveText: "保存",
    shortValue: "",
    inputValue: []
  },

  methods: {
    radioChange(e) {
      if (e.detail.value == this.data.data.answers) {
        this.triggerEvent("scoreHandle", {
          type: "ADD"
        });
      } else {
        this.triggerEvent("scoreHandle", {
          type: "REDUCE"
        });
      }
      this.triggerEvent("selectHandle", {
        index: e.detail.value
      });
    },

    answersInput(e) {
      const index = e.currentTarget.dataset.index;

      if (index !== undefined) {
        this.data.inputValue[index] = e.detail.value;
      } else {
        this.setData({
          inputValue: e.detail.value
        });
      }
    },

    saveHandle(e) {
      wx.showToast({
        title: "保存成功",
        icon: "none",
        duration: 1000
      });

      if (e.currentTarget.dataset.type === "short") {
        let getStorage = wx.getStorageSync("short_answers");
        getStorage = getStorage ? getStorage : [];
        getStorage.push({
          content: this.data.data.content,
          answer: this.data.shortValue
        });
        wx.setStorageSync("short_answers", getStorage);

        return false;
      }

      if (e.currentTarget.dataset.type === "input") {
        const index = e.currentTarget.dataset.index;
        const answer = this.data.data.answer[index];

        if (answer.indexOf(this.data.inputValue[index].trim()) !== -1) {
          this.triggerEvent("scoreHandle", {
            type: "ADD"
          });
        } else {
          this.triggerEvent("scoreHandle", {
            type: "REDUCE"
          });
        }

        const inputValue = JSON.parse(JSON.stringify(this.data.inputValue));

        this.triggerEvent("inputHandle", {
          value: inputValue
        });

        this.setData({
          inputValue
        });
      }
    }
  }
});
