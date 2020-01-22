import { $axios } from '@/config/axios'

//查询业务学习反馈详情
export default function (data) {
    let _url = `/businessLearning/queryBusinessLearningFeedbackDetail`;
    return $axios.call(this, _url, data, 'get');
}

