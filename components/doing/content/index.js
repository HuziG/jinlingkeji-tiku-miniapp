// components/doing/content/index.js
Component({
  properties: {
    data: {
      type: Object
    }
  },

  data: {
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

    saveHandle() {
      const _inputValue = this.data.inputValue;
      if (_inputValue.trim() == this.data.data.answer) {
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
