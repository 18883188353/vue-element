import { $axios } from '@/config/axios'

export default function (data) {
    let _url = `/smsTemplate/deleteTemplate/${data.id}`;
    data = null;
    return $axios.call(this, _url, data, 'get', '', {
        loading: true
    });
}

