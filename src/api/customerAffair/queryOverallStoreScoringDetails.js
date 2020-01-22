import { $axios } from '@/config/axios'

//店铺评分规则详情
export default function (data) {
    let _url = `/businessCredit/queryOverallStoreScoringDetails`;
    return $axios.call(this, _url, data, 'get');
}

