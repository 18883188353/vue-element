import { $axios } from '@/config/axios'

//查询字典
export default function (data) {
    let _url = `/businessCredit/queryDictionary`;
    return $axios.call(this, _url, data, 'get');
}

