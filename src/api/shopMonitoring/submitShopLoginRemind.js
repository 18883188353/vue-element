import { $axios } from '@/config/axios'

//登录提醒 提醒操作
export default function (data) {
    return $axios.call(this, '/exceptionManage/submitShopLoginRemind', data, 'post');
}

