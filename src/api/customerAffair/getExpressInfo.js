import { $axios } from '@/config/axios'

//订单物流
export default function (data) {
    let _url = `/order/getExpressInfo`;
    return $axios.call(this, _url, data, 'get');
}

