// components/bottomNav/index.js
Component({
  properties: {
    prevDisabled: {
      type: Boolean
    },
    analyDisabled: {
      type: Boolean
    },
    nextDisabled: {
      type: Boolean
    }
  },

  data: {},

  methods: {
    next() {
      this.triggerEvent("nextHandle");
    },
    check() {
      this.triggerEvent("checkHandle");
    },
    prev() {
      this.triggerEvent("prevHandle");
    }
  }
});
