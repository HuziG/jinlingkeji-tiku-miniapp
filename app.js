//app.js
App({
  onLaunch: function() {
    wx.BaaS = requirePlugin("sdkPlugin");
    wx.BaaS.wxExtend(wx.login, wx.getUserInfo);

    wx.BaaS.init("d3db7a1c4818bd121e18");
  },
  globalData: {
    userInfo: null
  }
});
