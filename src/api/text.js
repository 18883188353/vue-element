import { $axios } from '@/config/axios'

export default function (po) {
    return $axios.call(this, 'queryProverty/queryall', po, 'get') //get调用方法
    // return $axios.call(this, 'admin/role/', po, 'post') //post调用方法
}

