import { $axios } from '@/config/axios'

//查询工单处理流程
export default function (data) {
    let _url = `/sheet/CsServiceSelectSheetFlowLog`;
    // data = '';
    return $axios.call(this, _url, data, 'get');
}

