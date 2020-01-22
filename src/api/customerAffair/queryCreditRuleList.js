import { $axios } from '@/config/axios'

//信用规则列表
export default function (data) {
    let _url = `/businessCredit/queryCreditRuleList`;
    return $axios.call(this, _url, data, 'get');
}

