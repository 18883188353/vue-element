import { $axios } from '@/config/axios'

//学习知识 修改
export default function (data) {
    let _url = `/businessLearning/delBusinessLearningOne`;
    return $axios.call(this, _url, data, 'get');
}

