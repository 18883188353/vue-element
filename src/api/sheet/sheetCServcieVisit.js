import { $axios } from '@/config/axios'

// 提交回访
export default function (data) {
    return $axios.call(this, '/sheet/sheetCServcieVisit', data, 'post');
}

