import { $axios } from '@/config/axios'

//查询店铺信用记录
export default function (data) {
    let _url = `/businessCredit/queryShopCreditList`;
    return $axios.call(this, _url, data, 'get');
}

