/*
 * @Descripttion:
 * @version:
 * @Author: dingjia z
 * @Date: 2020-03-28 14:26:01
 * @LastEditors: dingjia z
 * @LastEditTime: 2020-03-28 14:46:41
 */
export const sendShortAnswer = () => {
  const userId = wx.getStorageSync("user_openid");
  let shortAnswers = JSON.parse(
    JSON.stringify(wx.getStorageSync("short_answers"))
  );
  let MyTableObject = new wx.BaaS.TableObject("question_short");

  shortAnswers = shortAnswers.map(item => {
    return {
      question_content: item.content,
      question_answer: item.answer,
      user_id: userId
    };
  });

  MyTableObject.createMany(shortAnswers).then(
    res => {
      console.log(res.data.succeed);
    },
    err => {
      console.log(err);
    }
  );
};
