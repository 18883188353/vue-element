import { $axios } from '@/config/axios'

//考试结果详情查询
export default function (data) {
    let _url = `/examPaper/queryExamPaperTestDetail`;
    return $axios.call(this, _url, data, 'get');
}

