import { $axios } from '@/config/axios'

//商品分页
export default function (data) {
    let _url = `/goods/findList`;
    return $axios.call(this, _url, data, 'get');
}

