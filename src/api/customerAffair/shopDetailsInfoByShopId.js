import { $axios } from '@/config/axios'

//店铺详情
export default function (data) {
    let _url = `/affair/shopDetailsInfoByShopId`;
    return $axios.call(this, _url, data, 'get');
}

