export const getList = () => {
  let Product = new wx.BaaS.TableObject("testpaper_list");

  return Product.find()
    .then(data => data)
    .catch(err => err);
};
