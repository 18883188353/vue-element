import { $axios } from '@/config/axios'

//完成监控
export default function (data) {
    let _url = `/monitor/completeOrderMonitor`;
    return $axios.call(this, _url, data, 'get', '', {
        loading: true
    });
}

