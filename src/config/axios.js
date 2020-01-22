import axios from 'axios';
import route from '../router/index'
import { Message, Loading } from 'element-ui';

const qs = require('qs');

const HEADERS_JSON = 'application/json';
const HEADERS_FORM_DATA = 'application/x-www-form-urlencoded';

var LOADING_DOM = {};

/**
 * 设置默认值
 */
axios.defaults.baseURL = window.mj.defaultHost;
axios.defaults.headers.post['Content-Type'] = HEADERS_JSON; // POST方法默认请求头
axios.defaults.timeout = 30000; // 默认超时时间 （30秒）
axios.defaults.retry = 8; // 访问失败重试次数
axios.defaults.retryDelay = 500; // 访问失败重试间隔（单位：毫秒）

/**
 * 前置拦截器 ==> 请求之前
 */
axios.interceptors.request.use(function (config) {
    //console.log(config, " =========> config before ==>");
    config.headers['Authorization'] = window.sessionStorage.getItem('AUTHORIZATION') || '';
    if (config['headers']['Content-Type'] === HEADERS_FORM_DATA) {
        config.data = qs.stringify(config.data);
    }
    console.log(config, " =========> config after ==>");
    return config;
}, function (error) {
    console.log(" =========> 前置拦截器拦截错误信息 ==>");
    return Promise.reject(error);
});

/**
 * 后置拦截器 ==> 请求之后
 */
axios.interceptors.response.use(function (response) {
    console.log(response, " =========> response success ==>");
    if (response.data && response.data.Code === 0) {
        closeLoading(response.config);
        Message.warning(response.data.Desc || '服务暂时不可用，请稍后再试');
        return false;
    }
    closeLoading(response.config);
    return response.data;
}, async function (error) {
    let config = error.config;

    console.log('error ===>>> ', error);
    console.log('error.config ===>>> ', error.config);
    console.log('error.response ===>>> ', error.response);

    if (checkIsRetry(error)) {
        // 如果配置不存在或未设置重试选项，则直接结束
        if (!config || !config.retry) {
            endReturn(error);
            return Promise.reject(error);
        }
        // 跟踪已重试次数
        config.__retryCount = config.__retryCount || 0;
        // 判断重试次数是否超过设置的最大重试次数
        if (config.__retryCount >= config.retry) {
            endReturn(error);
            return Promise.reject(error);
        }
        // 重试次数 +1
        config.__retryCount += 1;
        var retryBack = new Promise(function (resolve) {
            // 设置延迟重试
            setTimeout(function () {
                resolve();
            }, config.retryDelay || 1);
        });
        return retryBack.then(function () {
            return axios(config);
        });
    } else {
        // 结束
        endReturn(error);
        return Promise.reject(error);
    }
});

/**
 * 判断是否重试
 * @param { 返回的错误信息 } error 
 * @return true 需要重试 / false 不需要重试
 */
function checkIsRetry(error) {
    if (error.response) {
        let status = error.response.status;
        if (status === 401 || status === 404 || status === 500) {
            return false;
        }
    }
    return true;
}

/**
 * 结束访问并回馈给用户提示
 * @param {错误信息} error 
 */
function endReturn(error) {
    closeLoading(error.config);
    console.log(' =======> 接口访问失败 ==>', error.response);
    if (error.response) {
        // 判断 HTPP 码
        switch (error.response.status) {
            case 401:
                Message.warning('登录超时，请重新登录');
                window.sessionStorage.removeItem('AUTHORIZATION');
                window.sessionStorage.removeItem('USER_INFO');
                route.push({ path: '/login' });
                break;
            case 404:
                Message.warning('找不到服务地址，请稍后再试');
                break;
            case 500:
                Message.error('服务暂不可用，请稍后再试');
                break;
            default:
                Message.error('未知错误，请联系管理员');
                break;
        }
    } else {
        Message.error('服务暂不可用，请稍后再试');
    }
}

export async function $axios(url, data, type = 'post', host, config) {

    config = config ? config : {};
    //let baseURL = (host ? API[host] : API.host) + url;
    //let baseURL = default_host + url;
    // let baseURL = window.mj.defaultHost + url;
    // data = data ? data : {};

    // if ('get' === type && Object.keys(data).length > 0) {
    //     baseURL = baseURL + '?' + qs.stringify(data);
    // }

    //let baseURL = window.mj.defaultHost;
    if(!data){
        data = {};
    }

    if('get' === type && Object.keys(data).length > 0){
        url = url + '?' + qs.stringify(data);
    }

    //config.baseURL = baseURL;
    config.url = url;
    config.method = type;
    config.data = data;

    // 是否访问接口时显示 loading 提示
    if (config.loading) {
        config.__loadingKey = randomString(10);
        LOADING_DOM[config.__loadingKey] = Loading.service({
            body: true,
            fullscreen: false,
            background: 'rgba(0, 0, 0, 0.6)'
        });
    }

    return axios(config);
}

function closeLoading(config) {
    /** 
     * 判断是否携带 loadingKey，如果携带则关闭对应的loading，然后从 LOADING_DOM 中删除对应的 loading 对象
     * __loadingKey 在请求发起时添加
     */ 
    if (config.__loadingKey) {
        if (LOADING_DOM[config.__loadingKey]) {
            LOADING_DOM[config.__loadingKey].close();
            delete LOADING_DOM[config.__loadingKey];
        }
    }
}

/**
 * 生成随机字符串
 * @param {生成字符串长度} length 
 * @param {生成字符串需要的字符，不传则为默认的} chars 
 */
function randomString(length, chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ') {
    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
}

















// import axios from 'axios'
// const API = require('@/config/vuex/state/api').state
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'; // Form Data 模式

// //定义fetch函数，config为配置
// export function fetch(config, base) {
//     //返回promise对象
//     return new Promise((resolve, reject) => {
//         //创建axios实例，把基本的配置放进去
//         const instance = axios.create({
//             //定义请求文件类型
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             // 请求超时
//             timeout: 5000
//         });
//         //请求成功后执行的函数
//         instance(config).then(res => {
//             console.log(res);
//             resolve(res);
//             if (res.data.Code === 101) {
//                 console.error('用户未登录');
//             }
//             //失败后执行的函数
//         }).catch(err => {
//             console.log('错误')
//             console.log(err);
//             reject(err);
//         })
//     });
// }

// // 封装调用的接口 getData
// export function $axios(url, data, type = 'post', host) {
//     console.log(API);
//     let baseURL = host ? API[host] : API.host
//     axios.defaults.headers.common['Authorization'] = this.$route.name === 'login' ? 'Basic cGlnOnBpZw==' : window.sessionStorage.getItem('access_token')
//     // 判断是否登录
//     /*if (window.localStorage.getItem('token')) {
//      data = _merge({
//        /!*access_token: '3655b548-8d35-4cfe-92ac-9ce746f0b244'*!/
//      }, data)
//    } else {
//      data = {}
//    }*/
//     if (type === 'post' && !data) {
//         data = {}
//     } else if (type === 'get' && !data) {
//         data = ''
//     }
//     return fetch({
//         url: type === 'post' ? baseURL + url : baseURL + url + data,
//         method: type || 'post',
//         data: data,
//     })
// }
