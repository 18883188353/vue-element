import { $axios } from '@/config/axios'

/**
 * 增加沟通
 * @param data
 * @returns {*}
 */
export default function (data) {
    return $axios.call(this, '/sheet/submitRecord', data, 'post');
}

