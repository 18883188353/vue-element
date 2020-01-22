import { $axios } from '@/config/axios'

//考试结果列表查询
export default function (data) {
    let _url = `/examPaper/queryExamPaperTestList`;
    return $axios.call(this, _url, data, 'post');
}

