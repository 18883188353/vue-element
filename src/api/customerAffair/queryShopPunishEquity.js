import { $axios } from '@/config/axios'

//处罚/权益
export default function (data) {
    let _url = `/businessCredit/queryShopPunishEquity`;
    return $axios.call(this, _url, data, 'get');
}

