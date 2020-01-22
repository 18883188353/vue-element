import { $axios } from '@/config/axios'

export default function (data) {
    let _url = `/sheet/sheetSelectDisputStep/${data}`;
    data = '';
    return $axios.call(this, _url, data, 'get');
}

