import { $axios } from '@/config/axios'

//添加一条记录
export default function (data) {
    return $axios.call(this, '/orderUntreatedVisit/insertVisit', data, 'post', '', {
        loading: true
    });
}

