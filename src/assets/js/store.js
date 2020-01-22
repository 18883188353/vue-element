//设置cookie
export const setCookie = function (name, value, day) {
    if (day !== 0) {
        let expires = day * 24 * 60 * 60 * 1000;
        let date = new Date(+new Date() + expires);
        document.cookie = name + "=" + escape(JSON.stringify(value)) + ";expires=" + date.toUTCString();
    } else {
        document.cookie = name + "=" + + escape(JSON.stringify(value));
    }
};

//获取cookie
export const getCookie = function (name) {
    let arr;
    let reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg))
        return JSON.parse(unescape(arr[2]));
    else
        return null
};
