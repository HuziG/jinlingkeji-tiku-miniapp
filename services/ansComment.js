/*
 * @Descripttion:
 * @version:
 * @Author: dingjia z
 * @Date: 2020-03-29 15:25:07
 * @LastEditors: dingjia z
 * @LastEditTime: 2020-03-29 15:30:41
 */
export const getAnsComment = () => {
  const user_openid = wx.getStorageSync("user_openid");

  return new Promise((resolve, reject) => {
    let query = new wx.BaaS.Query();
    query.compare("user_id", "=", user_openid);

    let Product = new wx.BaaS.TableObject("question_comment");
    Product.setQuery(query)
      .find()
      .then(
        res => {
          resolve(res);
        },
        err => {
          reject(err);
        }
      );
  });
};
