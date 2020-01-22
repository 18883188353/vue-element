import { $axios } from '@/config/axios'

//清零查询详情
export default function (data) {
    let _url = `/businessCredit/queryCreditClearanceDetails`;
    return $axios.call(this, _url, data, 'get');
}

