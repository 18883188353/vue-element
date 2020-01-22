import { $axios } from '@/config/axios'

//试卷 新增
export default function (data) {
    let _url = `/examPaper/saveExamPaper`;
    return $axios.call(this, _url, data, 'post');
}

