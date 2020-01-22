import { $axios } from '@/config/axios'

//查询渠道来源字典
export default function (data) {
    let _url = `/businessCredit/queryMerchantDictionary`;
    return $axios.call(this, _url, data, 'get');
}

