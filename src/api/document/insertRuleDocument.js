import { $axios } from '@/config/axios'

//规则文档 新增
export default function (data) {
    let _url = `/ruleDocument/insertRuleDocument`;
    return $axios.call(this, _url, data, 'post');
}

