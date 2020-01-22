import { $axios } from '@/config/axios'

//信誉规则列表
export default function (data) {
    let _url = `/businessCredit/queryReputationRuleList`;
    return $axios.call(this, _url, data, 'get');
}

