//app.js
App({
  onLaunch: function() {
    wx.BaaS = requirePlugin("sdkPlugin");

    wx.BaaS.init("d3db7a1c4818bd121e18", { autoLogin: true });
  },
  globalData: {
    userInfo: null
  }
});
