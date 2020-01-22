import { $axios } from '@/config/axios'

//店铺评分规则列表
export default function (data) {
    let _url = `/businessCredit/queryOverallStoreScoringRulesList`;
    return $axios.call(this, _url, data, 'get');
}

