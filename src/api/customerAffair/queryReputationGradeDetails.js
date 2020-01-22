import { $axios } from '@/config/axios'

//信誉等级查询详情
export default function (data) {
    let _url = `/businessCredit/queryReputationGradeDetails`;
    return $axios.call(this, _url, data, 'get');
}

