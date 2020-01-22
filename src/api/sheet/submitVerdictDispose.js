import { $axios } from '@/config/axios'

// 提交裁决
export default function (data) {
    return $axios.call(this, '/sheet/submitVerdictDispose', data, 'post');
}

