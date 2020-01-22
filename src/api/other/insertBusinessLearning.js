import { $axios } from '@/config/axios'

//学习知识 新增
export default function (data) {
    let _url = `/businessLearning/insertBusinessLearning`;
    return $axios.call(this, _url, data, 'post');
}

