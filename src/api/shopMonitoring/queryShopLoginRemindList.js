import { $axios } from '@/config/axios'

//登录提醒
export default function (data) {
    return $axios.call(this, '/exceptionManage/queryShopLoginRemindList', data, 'post');
}

