import { $axios } from '@/config/axios'

//规则文档 详情
export default function (data) {
    let _url = `/ruleDocument/queryRuleDocumentDetail`;
    return $axios.call(this, _url, data, 'get');
}

