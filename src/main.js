import Vue from 'vue'
import App from './app'
import router from './router'
import store from './store/'

import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';//官方主题
import './assets/css/theme-chalk/index.css';//自定义主题

import Viewer from 'v-viewer'
import 'viewerjs/dist/viewer.css'

import VueQuillEditor from 'vue-quill-editor'
// require styles 引入样式
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';

import md5 from 'js-md5';
import VueScroll from 'vuescroll';

import "./assets/js/sdkIM/webim";
import "./assets/js/sdkIM/json2";
import "./assets/js/sdkIM/spark-md5";

//import GoEasy from 'goeasy';

import Tool from './assets/js/tool';

// Vue.prototype.$goEasy = new GoEasy({
//     host: 'hangzhou.goeasy.io',
//     appkey: 'BC-968fed598511443ca62d8255c0e4e3b6',
//     onConnected: function(){
//         console.log('连接成功！')
//     },
//     onDisconnected: function() {
//         console.log('连接断开！')
//     },
//     onConnectFailed: function(error) {
//         console.log('连接失败或错误！', error)
//     }
// })

Vue.config.productionTip = false;
Vue.prototype.$md5 = md5;
Vue.use(VueQuillEditor);
Vue.use(ElementUI);
Vue.prototype.$Tool = Tool;
// 图片查看插件
Vue.use(Viewer);
Viewer.setDefaults({
    Options: {
        inline: true,
        button: true,
        navbar: true,
        title: true,
        toolbar: true,
        tooltip: true,
        movable: true,
        zoomable: true,
        rotatable: true,
        scalable: true,
        transition: true,
        fullscreen: true,
        keyboard: true,
        url: 'data-source'
    }
});

window.eventBus = new Vue();

Vue.use(VueScroll, {
    ops: { // 在这里设置全局默认配置
        vuescroll: {
            mode: 'native',
            wheelScrollDuration: 1 // 如果子元素的滚动条带动父元素滚动条一起滚动，可尝试改变此值
        },
        scrollPanel: {
            speed: 1000,
            easing: 'easeInQuint'
        },
        bar: {
            onlyShowBarOnScroll: false,
            background: 'rgb(182, 199, 192)',
            opacity: '0.6',
            size: '5'
        }
    }
});

const vue = new Vue({
    el: '#app',
    store,
    router, // 这个插件只能叫这个名字，否则会报错
    render: (h) => h(App) // 通过创建DOM元素返回参数h将App挂载，h即为hyperscript，用来实现虚拟DOM的
})

export default vue;
