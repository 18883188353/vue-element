import { $axios } from '@/config/axios'

//试卷 详情
export default function (data) {
    let _url = `/examPaper/queryExamPaperDetail`;
    return $axios.call(this, _url, data, 'get');
}

