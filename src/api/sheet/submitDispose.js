import { $axios } from '@/config/axios'

//完成工单
export default function (data) {
    return $axios.call(this, '/sheet/submitDispose', data, 'post');
}

