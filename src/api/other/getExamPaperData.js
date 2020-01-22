import { $axios } from '@/config/axios'

//获取考试页面数据
export default function (data) {
    let _url = `/examPaper/getExamPaperData`;
    return $axios.call(this, _url, data, 'get');
}

