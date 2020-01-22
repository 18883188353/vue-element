import { $axios } from '@/config/axios'

//学习知识 详情
export default function (data) {
    let _url = `/businessLearning/queryBusinessLearningDetail`;
    return $axios.call(this, _url, data, 'get');
}

