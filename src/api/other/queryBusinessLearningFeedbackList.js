import { $axios } from '@/config/axios'

//学习知识反馈 列表
export default function (data) {
    let _url = `/businessLearning/queryBusinessLearningFeedbackList`;
    return $axios.call(this, _url, data, 'post');
}

