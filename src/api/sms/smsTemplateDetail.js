import { $axios } from '@/config/axios'

export default function (data) {
    let url = `/smsTemplate/queryTemplateDetail/${data.id}`;
    delete data.id;
    return $axios.call(this, url, data, 'get');
}

