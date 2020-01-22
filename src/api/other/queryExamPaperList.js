import { $axios } from '@/config/axios'

//试卷 分页
export default function (data) {
    let _url = `/examPaper/queryExamPaperList`;
    return $axios.call(this, _url, data, 'post');
}

