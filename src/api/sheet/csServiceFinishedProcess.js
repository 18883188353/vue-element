import { $axios } from '@/config/axios'

//客服处理工单
export default function (data) {
    return $axios.call(this, '/sheet/CsServiceFinishedProcess', data, 'post');
}

