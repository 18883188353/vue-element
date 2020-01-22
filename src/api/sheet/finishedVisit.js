import { $axios } from '@/config/axios'

//完成回访
export default function (data) {
    return $axios.call(this, '/sheet/CsServiceFinishedVisit', data, 'post');
}

