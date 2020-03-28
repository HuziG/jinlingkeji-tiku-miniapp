/*
 * @Descripttion:
 * @version:
 * @Author: dingjia z
 * @Date: 2020-01-13 11:05:33
 * @LastEditors: dingjia z
 * @LastEditTime: 2020-03-28 14:47:48
 */
const disorderItem = items => {
  return items.sort(() => {
    return Math.random() - 0.5 ? -1 : 1;
  });
};

export const modeGetItem = (mode, data) => {
  data = data.map(item => {
    if (item.options) {
      item.options = item.options.map(item => ({
        value: item,
        checked: false
      }));
    }
    return item;
  });

  if (mode === 1) {
    return disorderItem(data);
  }
  if (mode === 0) {
    return data;
  }
};
