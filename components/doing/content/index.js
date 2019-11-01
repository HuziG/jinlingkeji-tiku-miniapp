// components/doing/content/index.js
Component({
  properties: {
    data: {
      type: Object
    },
    selectInfo: {
      type: Array
    }
  },

  data: {},

  methods: {
    radioChange(e) {
      if (e.detail.value == this.data.data.answers) {
        this.triggerEvent("scoreHandle", {
          type: "ADD",
          index: e.detail.value
        });
      } else {
        this.triggerEvent("scoreHandle", {
          type: "REDUCE",
          index: e.detail.value
        });
      }
    }
  }
});
