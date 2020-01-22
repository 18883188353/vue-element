import { $axios } from '@/config/axios'

//学习知识 列表
export default function (data) {
    let _url = `/businessLearning/queryBusinessLearningList`;
    return $axios.call(this, _url, data, 'post');
}

