import * as HomeServices from "../services/home";

export async function getListHandle() {
  return HomeServices.getList();
}
