import { $axios } from '@/config/axios'

export default function (data) {
    return $axios.call(this, '/smsESBTask/updateESBTask', data, 'post', '', {
        loading: true
    });
}

