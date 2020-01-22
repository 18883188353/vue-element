import { $axios } from '@/config/axios'

export default function (data) {
    return $axios.call(this, '/common/getFees', data, 'get', 'host', {
        timeout: 60000
    });
}

