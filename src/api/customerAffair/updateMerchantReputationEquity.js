import { $axios } from '@/config/axios'

//信誉权益更新
export default function (data) {
    let _url = `/businessCredit/updateMerchantReputationEquity`;
    return $axios.call(this, _url, data, 'post');
}

