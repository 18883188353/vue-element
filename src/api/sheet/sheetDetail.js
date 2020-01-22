import { $axios } from '@/config/axios'

// 工单详情  聚合
export default function (data) {
    let _url = `/sheet/sheetDetail`;
    // data = '';
    return $axios.call(this, _url, data, 'get');
}

