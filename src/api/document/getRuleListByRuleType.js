import { $axios } from '@/config/axios'

//规则文档 删除
export default function (data) {
    return $axios.call(this, '/ruleDocument/getMultiDocument', data, 'get');
}

