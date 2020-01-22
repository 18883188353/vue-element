import { $axios } from '@/config/axios'

//学习知识 修改
export default function (data) {
    return $axios.call(this, '/api/orderRemind/queryToDeliveryOrderRemind', data, 'get');
}

