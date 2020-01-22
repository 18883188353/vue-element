import { $axios } from '@/config/axios'

//试卷考试 提交
export default function (data) {
    let _url = `/examPaper/submitTest`;
    return $axios.call(this, _url, data, 'post');
}

