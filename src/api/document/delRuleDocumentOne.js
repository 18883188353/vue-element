import { $axios } from '@/config/axios'

//规则文档 删除
export default function (data) {
    let _url = `/ruleDocument/delRuleDocumentOne`;
    return $axios.call(this, _url, data, 'get');
}

