/**
 * 配置编译环境和线上环境之间的切换
 * 
 * baseUrl: 域名地址
 * routerMode: 路由模式
 * baseImgPath: 图片存放地址
 * 
 */
let baseUrl = ''; 
let routerMode = 'hash';
let baseImgPath;

if (process.env.NODE_ENV == 'development') {
	baseUrl = '';
    baseImgPath = '/img/';
}else{
	baseUrl = '//elm.cangdu.org';
    baseImgPath = '//elm.cangdu.org/img/';
}

if('development' == process.env.NODE_ENV){
    console.log('鼠标左右键可操作1');
} else {
    document.oncontextmenu = function(){
        return false;
    };//鼠标右键阻止点击
    document.onselectstart = function() {
        return false;
    }//鼠标左键阻止拖动
    console.log('鼠标左右键可操作2');
}

export {
	baseUrl,
	routerMode,
	baseImgPath
}
