import { $axios } from '@/config/axios'

//教材 列表
export default function (data) {
    let _url = `/textbook/queryTextbookList`;
    return $axios.call(this, _url, data, 'post');
}

