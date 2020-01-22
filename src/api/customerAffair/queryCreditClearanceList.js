import { $axios } from '@/config/axios'

//清零列表
export default function (data) {
    let _url = `/businessCredit/queryCreditClearanceList`;
    return $axios.call(this, _url, data, 'get');
}

