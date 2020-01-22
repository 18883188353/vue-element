import { $axios } from '@/config/axios'

//删除试卷（题库） 单个
export default function (data) {
    let _url = `/examPaper/delExamPaperOne`;
    return $axios.call(this, _url, data, 'get');
}

