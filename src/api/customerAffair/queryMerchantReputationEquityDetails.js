import { $axios } from '@/config/axios'

//信誉权益详情
export default function (data) {
    let _url = `/businessCredit/queryMerchantReputationEquityDetails`;
    return $axios.call(this, _url, data, 'get');
}

