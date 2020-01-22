import { $axios } from '@/config/axios'

//查询所有试卷
export default function (data) {
    let _url = `/examPaper/queryExamPaperAll`;
    return $axios.call(this, _url, data, 'get');
}

