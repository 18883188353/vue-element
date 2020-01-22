import { $axios } from '@/config/axios'

//补充资料
export default function (data) {
    return $axios.call(this, '/sheet/CsServiceFinishedDispute', data, 'post');
}

