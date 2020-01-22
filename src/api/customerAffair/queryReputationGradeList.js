import { $axios } from '@/config/axios'

//信誉等级列表
export default function (data) {
    let _url = `/businessCredit/queryReputationGradeList`;
    return $axios.call(this, _url, data, 'get');
}

