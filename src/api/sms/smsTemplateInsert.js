import { $axios } from '@/config/axios'

export default function (data) {
    delete data.id;
    return $axios.call(this, '/smsTemplate/insertTemplate', data, 'post', '', {
        loading: true
    });
}

