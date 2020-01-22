import { $axios } from '@/config/axios'

export default function (data) {
    return $axios.call(this, '/shopMonitor/insertShopDealRecord', data, 'post');
}

