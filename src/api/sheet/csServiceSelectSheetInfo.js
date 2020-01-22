import { $axios } from '@/config/axios'

//查询该工单相关的资料信息(包括填写资料、补充资料、举证资料、沟通记录
export default function (data) {
    let _url = `/sheet/CsServiceSelectSheetInfo`;
    // data = '';
    return $axios.call(this, _url, data, 'get');
}

