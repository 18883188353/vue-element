import { $axios } from '@/config/axios'

// 获取部门树
export default function (data) {
    return $axios.call(this, '/user/getUserBySysCode', data, 'get');
}

