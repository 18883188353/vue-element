import { $axios } from '@/config/axios'

//信誉权益列表
export default function (data) {
    let _url = `/businessCredit/queryReputationEquityList`;
    return $axios.call(this, _url, data, 'get');
}

