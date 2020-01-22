import { $axios } from '@/config/axios'

//店铺评分
export default function (data) {
    let _url = `/businessCredit/queryShopScore`;
    return $axios.call(this, _url, data, 'get');
}

