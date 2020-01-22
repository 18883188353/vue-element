import { $axios } from '@/config/axios'

//信用规则获取详情
export default function (data) {
    let _url = `/businessCredit/queryCreditRuleDetails`;
    return $axios.call(this, _url, data, 'get');
}

