import { $axios } from '@/config/axios'

//品牌详情
export default function (data) {
    let _url = `/affair/getBrandDetail`;
    return $axios.call(this, _url, data, 'get');
}

