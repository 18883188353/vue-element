import { $axios } from '@/config/axios'

//清零修改
export default function (data) {
    let _url = `/businessCredit/updateMerchantCreditClearanceRule`;
    return $axios.call(this, _url, data, 'post');
}

