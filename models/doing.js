const disorderItem = items => {
  return items.sort(() => {
    return Math.random() - 0.5 ? -1 : 1;
  });
};

/**
 *
 * @param {mode} 模式 0 顺序 / 1 乱序
 * @param {data} 试题
 */
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
