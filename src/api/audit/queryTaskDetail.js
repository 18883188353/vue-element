import { $axios } from '@/config/axios'

//return $axios.call(this, 'queryProverty/queryall', po, 'get') //get调用方法
// return $axios.call(this, 'admin/role/', po, 'post') //post调用方法
export default function (data) { 
    return $axios.call(this, '/audit/getAuditTaskEntity', data, 'get');
}

