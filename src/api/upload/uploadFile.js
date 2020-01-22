import { $axios } from '@/config/axios'

export default function (data) {
    return $axios.call(this, '/upload/uploadFile', data, 'post', 'host', {
        headers: {'Content-Type' : 'multipart/form-data'},
        loading: true
    });
}

