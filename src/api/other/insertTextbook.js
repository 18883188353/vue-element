import { $axios } from '@/config/axios'

//教材 新增
export default function (data) {
    let _url = `/textbook/insertTextbook`;
    return $axios.call(this, _url, data, 'post');
}

