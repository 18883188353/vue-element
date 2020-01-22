import { $axios } from '@/config/axios'

//信誉列表
export default function (data) {
    let _url = `/businessCredit/queryShopReputationList`;
    return $axios.call(this, _url, data, 'get');
}

