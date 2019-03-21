
import { get } from '@/http/request'
import  storeDetail from '@/http/urls/store_detail'

const STOREDETAIL = {
  // 获取店铺信息
  getStoreInfo (data) {
    return get(storeDetail.getStoreInfo,data)
  },
  // 获取商店商品分类信息
  getProductcategory (data) {
    return get(storeDetail.getProductcategory,data)
  },
  // 获取商店商品信息
  getStoreTradings (data) {
    return get(storeDetail.getStoreTradings,data)
  },
  // 加入购物车
  addshopcar (data) {
    return get(storeDetail.addshopcar,data,null,true)
  },
  // 减购物车
  reduceshopcar (data) {
    return get(storeDetail.reduceshopcar,data,null,true)
  }
}
export default STOREDETAIL;