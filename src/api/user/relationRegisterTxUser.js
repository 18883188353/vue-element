import { $axios } from '@/config/axios'

/**
 * 关联注册腾讯云账号
 */
export default function (data) {
    return $axios.call(this, '/chat/relationRegister', data, 'post');
}

