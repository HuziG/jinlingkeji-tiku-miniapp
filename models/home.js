import * as HomeServices from "../services/home";

export async function getListHandle() {
  return HomeServices.getList();
}

export function addTimesHandle(id) {
  let Product = new wx.BaaS.TableObject("testpaper_list");
  let product = Product.getWithoutData(id);

  product.incrementBy("times", 1);

  product.update().then(res => {});
}
