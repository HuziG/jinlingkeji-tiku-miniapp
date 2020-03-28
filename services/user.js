/*
 * @Descripttion:
 * @version:
 * @Author: dingjia z
 * @Date: 2020-03-28 14:19:13
 * @LastEditors: dingjia z
 * @LastEditTime: 2020-03-28 14:23:06
 */
export const userLogin = () => {
  return new Promise((resolve, reject) => {
    wx.BaaS.auth.loginWithWechat().then(
      ({ openid }) => {
        wx.setStorageSync("user_openid", openid);
        resolve(true);
      },
      err => {
        reject(true);
      }
    );
  });
};
