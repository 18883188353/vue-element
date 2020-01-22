import { $axios } from '@/config/axios'

//信誉规则修改 删除逻辑
export default function (data) {
    let _url = `/businessCredit/updateReputationRule`;
    return $axios.call(this, _url, data, 'post');
}

