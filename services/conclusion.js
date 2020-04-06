/*
 * @Descripttion:
 * @version:
 * @Author: dingjia z
 * @Date: 2020-03-28 14:26:01
 * @LastEditors: dingjia z
 * @LastEditTime: 2020-04-06 19:23:52
 */
const userId = wx.getStorageSync("user_openid");

export const sendShortAnswer = () => {
  let shortAnswers = JSON.parse(
    JSON.stringify(wx.getStorageSync("short_answers"))
  );
  let MyTableObject = new wx.BaaS.TableObject("question_short");

  shortAnswers = shortAnswers.map((item) => {
    return {
      question_content: item.content,
      question_answer: item.answer,
      user_id: userId,
    };
  });

  MyTableObject.createMany(shortAnswers).then(
    (res) => {
      console.log(res.data.succeed);
    },
    (err) => {
      console.log(err);
    }
  );
};

export const reqQuestionState = (val) => {
  return new Promise((resolve, reject) => {
    let data = {
      question_content: val.context,
      question_answer: JSON.stringify(val.my_answer),
      user_id: userId,
      question_state: false,
    };

    let Product = new wx.BaaS.TableObject("question_data");
    let product = Product.create();

    product
      .set(data)
      .save()
      .then(
        () => {
          resolve(true);
        },
        (err) => {
          reject(err);
        }
      );
  });
};
