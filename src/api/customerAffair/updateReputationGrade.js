import { $axios } from '@/config/axios'

//信誉等级更新
export default function (data) {
    let _url = `/businessCredit/updateReputationGrade`;
    return $axios.call(this, _url, data, 'post');
}

