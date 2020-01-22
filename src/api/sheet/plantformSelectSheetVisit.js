import { $axios } from '@/config/axios'

//工单回访记录
export default function (data) {
    let _url = `/sheet/PlantformSelectSheetVisit`;
    // data = '';
    return $axios.call(this, _url, data, 'get');
}

