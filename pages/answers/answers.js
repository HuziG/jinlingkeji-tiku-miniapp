/*
 * @Descripttion:
 * @version:
 * @Author: dingjia z
 * @Date: 2020-03-28 14:48:25
 * @LastEditors: dingjia z
 * @LastEditTime: 2020-03-29 15:31:19
 */
// pages/answers/answers.js
import { getAnsComment } from "../../services/ansComment";

Page({
  data: {
    listData: []
  },

  onLoad() {
    (async () => {
      const {
        data: { objects }
      } = await getAnsComment();
      this.setData({
        listData: objects
      });
    })();
  }
});
