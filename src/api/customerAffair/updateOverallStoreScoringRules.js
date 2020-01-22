import { $axios } from '@/config/axios'

//店铺评分规则修改
export default function (data) {
    let _url = `/businessCredit/updateOverallStoreScoringRules`;
    return $axios.call(this, _url, data, 'post');
}

