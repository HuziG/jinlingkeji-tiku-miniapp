const getTagAttr = (e, key) => {
  return e.currentTarget.dataset[key];
};

module.exports = {
  getTagAttr: getTagAttr
};
