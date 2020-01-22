import { $axios } from '@/config/axios'

//商家信用信誉管理列表
export default function (data) {
    let _url = `/businessCredit/queryBusinessCreditReputationList`;
    return $axios.call(this, _url, data, 'get');
}

