import { $axios } from '@/config/axios'

//待受理工单列表
export default function (data) {
    return $axios.call(this, '/sheet/CsServiceSelectWaitSheetList', data, 'post');
}

