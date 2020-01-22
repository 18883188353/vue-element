import { $axios } from '@/config/axios'

//教材 修改
export default function (data) {
    let _url = `/textbook/updateTextbook`;
    return $axios.call(this, _url, data, 'post');
}

