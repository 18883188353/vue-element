import { $axios } from '@/config/axios'

//规则文档 编辑
export default function (data) {
    let _url = `/ruleDocument/updateRuleDocument`;
    return $axios.call(this, _url, data, 'post');
}

