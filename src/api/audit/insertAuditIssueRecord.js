import { $axios } from '@/config/axios'

//return $axios.call(this, 'queryProverty/queryall', po, 'get') //get调用方法
// return $axios.call(this, 'admin/role/', po, 'post') //post调用方法
/**
 * 添加审核问题记录
 * @param {数据} data 
 */
export default function (data) {
    return $axios.call(this, '/auditissues/InserResponse', data, 'post');
}

