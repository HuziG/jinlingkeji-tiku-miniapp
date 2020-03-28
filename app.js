//app.js
App({
  onLaunch: function() {
    wx.BaaS = requirePlugin('sdkPlugin')
    wx.BaaS.wxExtend(wx.login)

    let clientID = 'd3db7a1c4818bd121e18'  
    wx.BaaS.init(clientID)
  },
  globalData: {
    userInfo: null
  }
});
