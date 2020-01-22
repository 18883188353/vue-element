import { $axios } from '@/config/axios'

//详情 新增
export default function (data) {
    let _url = `/textbook/queryTextbookDetail`;
    return $axios.call(this, _url, data, 'get');
}

