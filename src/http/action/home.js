import { get } from '@/http/request'
import  home from '@/http/urls/home'

const HOME = {
  getStoreList (data) {
    return get(home.getStoreList,data)
  },
  getUserLocaltion (data) {
    return get(home.getUserLocaltion,data) 
  }
}
export default HOME;