import { $axios } from '@/config/axios'

//节点详情
export default function (data) {
    let _url = `/businessCredit/queryCreditNodeDetails`;
    return $axios.call(this, _url, data, 'get');
}

