import { $axios } from '@/config/axios'

//规则文档 分页列表
export default function (data) {
    let _url = `/ruleDocument/queryRuleDocumentList`;
    return $axios.call(this, _url, data, 'post');
}

