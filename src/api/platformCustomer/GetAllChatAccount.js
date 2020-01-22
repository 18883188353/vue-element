/*
 * @Descripttion: 腾讯云聊天相关的三个接口 获取当前商家、用户、客服 账号
 * @version: 1.0.0
 * @Author: Cheng
 * @Date: 2019-07-17 18:01:07
 * @LastEditors: Cheng
 * @LastEditTime: 2019-09-20 10:51:05
 */


import { $axios } from '../../config/axios'


/**
 * 左侧聊天列表
 * @param data
 * @returns {Promise<*>}
 */
const leftUserList = function (data) {
    console.log(data)
    return $axios.call(this, '/chat/QueryChatList', data, 'get');
}


/**
 * 获取聊天历史记录
 * @param data
 * @returns {Promise<*>}
 */
const getHistory = function (data) {
    console.log(data)
    return $axios.call(this, '/chat/QueryChatRecord', data, 'get');
}




export {
    leftUserList,
    getHistory,
    /*
    * 接口共四个参数
    * 依次是  1：链接地址  2：data传的参数  3：是get还是post 不传值默认 post 4：要切换的IP地址 添加IP地址到config/vuex/state/api 文件 不传值默认host IP
    * $axios.call(this, '/api/sample/login', obj, ''，'test')
    * */
}
