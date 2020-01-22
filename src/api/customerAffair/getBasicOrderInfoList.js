import { $axios } from '@/config/axios'

//订单列表
export default function (data) {
    if(data.queryTime && data.queryTime.length === 2){
        data.startTime = data.queryTime[0];
        data.endTime = data.queryTime[1];
    }
    delete data.queryTime;
    return $axios.call(this, '/order/getBasicOrderInfoList', data, 'get');
}

