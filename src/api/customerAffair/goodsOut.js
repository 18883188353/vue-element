import { $axios } from '@/config/axios'

//店铺列表
export default function (data) {
    return $axios.call(this, '/goods/goodsOut', data, 'post');
}

