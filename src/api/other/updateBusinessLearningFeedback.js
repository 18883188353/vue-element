import { $axios } from '@/config/axios'

//业务学习反馈 修改
export default function (data) {
    let _url = `/businessLearning/updateBusinessLearningFeedback`;
    return $axios.call(this, _url, data, 'post');
}

