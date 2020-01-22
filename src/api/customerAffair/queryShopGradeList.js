import { $axios } from '@/config/axios'

//商家等级
export default function (data) {
    let _url = `/businessCredit/queryShopGradeList`;
    return $axios.call(this, _url, data, 'get');
}

