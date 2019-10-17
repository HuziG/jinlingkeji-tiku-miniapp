//index.js
Page({
  data: {},
  onLoad() {
    this.getAuthStateHandle().then(state => {
      if (state) {
        this.directToHandle();
      }
    });
  },
  getuserinfoHandle(e) {
    if (e.detail.rawData) {
      this.directToHandle();
    } else {
      wx.showToast({
        title: "授权失败",
        icon: "none",
        duration: 1000
      });
    }
  },
  getAuthStateHandle() {
    return new Promise(resolve => {
      wx.getSetting({
        success(res) {
          resolve(res.authSetting["scope.userInfo"]);
        }
      });
    });
  },
  directToHandle() {
    wx.redirectTo({
      url: "../home/home"
    });
  }
});
