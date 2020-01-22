import { $axios } from '@/config/axios'

export default function (data) {
    return $axios.call(this, '/smsESBTask/insertESBTask', data, 'post', '', {
        loading: true
    });
}

