import { $axios } from '@/config/axios'

//店铺详情
export default function (data) {
    let _url = `/monitor/queryOrderMonitorById`;
    return $axios.call(this, _url, data, 'get');
}

