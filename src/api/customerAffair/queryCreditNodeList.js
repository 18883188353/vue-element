import { $axios } from '@/config/axios'

//信用分节点规则列表
export default function (data) {
    let _url = `/businessCredit/queryCreditNodeList`;
    return $axios.call(this, _url, data, 'get');
}

