import { $axios } from '@/config/axios'

//信誉规则查询详情
export default function (data) {
    let _url = `/businessCredit/queryReputationRuleDetails`;
    return $axios.call(this, _url, data, 'get');
}

