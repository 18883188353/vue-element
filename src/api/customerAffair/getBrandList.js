import { $axios } from '@/config/axios'

//品牌列表
export default function (data) {
    let _url = `/affair/getBrandList`;
    return $axios.call(this, _url, data, 'get');
}

