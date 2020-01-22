import { $axios } from '@/config/axios'

//查询交易纠纷进度
export default function (data) {
    let _url = `/sheet/GetDisputeProgress`;
    // data = '';
    return $axios.call(this, _url, data, 'get');
}

