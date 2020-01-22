import { $axios } from '@/config/axios'

//return $axios.call(this, 'queryProverty/queryall', po, 'get') //get调用方法
// return $axios.call(this, 'admin/role/', po, 'post') //post调用方法
export default function (data) {
    if(data.dateTime){
        data.startTime = data.dateTime[0];
        data.endTime = data.dateTime[1];
        delete data.dateTime;
    }
    // 接口需要,分隔的字符串
    data.taskTypeName = data.taskTypeName.join(',');
    return $axios.call(this, '/audit/getAuditTaskList', data, 'get');
}

