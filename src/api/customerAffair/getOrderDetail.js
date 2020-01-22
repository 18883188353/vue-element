import { $axios } from '@/config/axios'

//订单详情
export default function (data) {
    let _url = `/order/getOrderDetail`;
    return $axios.call(this, _url, data, 'get');
}

