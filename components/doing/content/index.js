/*
 * @Descripttion:
 * @version:
 * @Author: dingjia z
 * @Date: 2020-01-13 11:05:33
 * @LastEditors: dingjia z
 * @LastEditTime: 2020-03-28 14:41:22
 */
// components/doing/content/index.js
Component({
  properties: {
    data: {
      type: Object
    }
  },

  observers: {
    data: function(value) {
      if (value)
        if (value.type === "choice" || value.type === "short")
          this.setData({
            inputValue: value.input_value || ""
          });
    }
  },

  data: {
    saveText: "保存",
    inputValue: null
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

    answerInput(e) {
      this.setData({
        inputValue: e.detail.value
      });
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
          answer: this.data.inputValue
        });
        wx.setStorageSync("short_answers", getStorage);

        return false;
      }

      const _inputValue = this.data.inputValue;
      if (
        _inputValue &&
        _inputValue.trim() == this.data.data.answer &&
        e.currentTarget.dataset.type === "input"
      ) {
        this.triggerEvent("scoreHandle", {
          type: "ADD"
        });
      } else {
        this.triggerEvent("scoreHandle", {
          type: "REDUCE"
        });
      }
      this.triggerEvent("inputHandle", {
        value: _inputValue
      });
    }
  }
});
