import { $axios } from '@/config/axios'

//教材 删除
export default function (data) {
    let _url = `/textbook/delTextbookOne`;
    return $axios.call(this, _url, data, 'get');
}

