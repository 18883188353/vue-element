import { $axios } from '@/config/axios'

//发送密码
export default function (data) {
    return $axios.call(this, '/affair/getSendPassWord', data, 'post');
}

