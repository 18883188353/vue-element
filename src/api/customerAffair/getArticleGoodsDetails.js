import { $axios } from '@/config/axios'

//商品详情
export default function (data) {
    let _url = `/goods/findDetail`;
    return $axios.call(this, _url, data, 'get');
}

