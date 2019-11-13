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
