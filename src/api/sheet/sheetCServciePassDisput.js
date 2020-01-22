import { $axios } from '@/config/axios'

//return $axios.call(this, 'queryProverty/queryall', po, 'get') //get调用方法
// return $axios.call(this, 'admin/role/', po, 'post') //post调用方法
// 纠纷流转
export default function (data) {
    return $axios.call(this, '/sheet/sheetCServciePassDisput', data, 'post');
}

