<template>
    <div class="system-content-body">
        <div class="menu-body">
            <!--<vue-scroll :ops="scrollOption">-->
            <system-menu></system-menu>
            <!--</vue-scroll>-->
        </div>
        <div class="main-content-body">
            <div class="header-body">
                <head-top></head-top>
            </div>
            <div class="content-body">
                <!--<vue-scroll :ops="contentScrollOption" ref="vs" class="content-scroll">-->
                <keep-alive>
                    <router-view v-if="$route.meta.keepAlive === true"></router-view>
                </keep-alive>
                <router-view v-if="!$route.meta.keepAlive"></router-view>
                <!--</vue-scroll>-->
            </div>
        </div>
        <aside>
            <el-backtop
                target=".main-content-body"
                :bottom="80"
                :visibility-height="30"
            ></el-backtop>
        </aside>
    </div>
</template>

<script>

import headTop from '../components/headTop';
import systemMenu from '../components/menu';
import { closeWebSocket } from '../websocket/websocket';

export default {
    components: {
        headTop,
        systemMenu
    },
    data() {
        return {
            // scrollOption: {
            //     bar: {
            //         disable: true // 不显示滚动条
            //     }
            // },
            // contentScrollOption: {
            //     scrollPanel: {
            //         scrollingX: false // 不启用横向滚动条
            //     }
            // }
        }
    },
    methods: {

    },
    mounted() {
        //initWebSocket();
    },
    created() {
        window.onbeforeunload = e => {
            closeWebSocket();
        };
    },
    destroyed() {
        closeWebSocket();
    }
}
</script>

<style lang="less" scoped>
.system-content-body {
    width: 100%;
    height: 100%;
    font-size: 0px;
    //display: table; /** 这个用于消除子元素 display: inline-block; 空隙，但是不知为啥加上之后子元素无法确定宽度 */
    word-spacing: -1em;
    > div {
        display: inline-block;
        vertical-align: bottom;
    }
}
.menu-body {
    width: 250px;
    height: 100vh; /* 1vh等于视口高度的1% */
    background: #001529;
    position: absolute;
    left: 0;
    top: 0;
    overflow-y: auto;
}
.main-content-body {
    width: calc(~"100% - 250px");
    height: 100vh;
    font-size: 16px;
    position: absolute;
    top: 0;
    right: 0;
    overflow-y: auto;
    .header-body {
        width: 100%;
        height: 60px;
        background-color: yellow;
    }
    .content-body {
        width: 100%;
        height: calc(~"100% - 60px");
        overflow: auto;
    }
}
::-webkit-scrollbar {
    width: 0px; /*滚动条宽度*/
    height: 0px; /*滚动条高度*/
}
/*定义滚动条轨道 内阴影+圆角*/
::-webkit-scrollbar-track {
    /*滚动条的背景区域的内阴影*/
    box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.3) inset;
    /*滚动条的背景区域的圆角*/
    border-radius: 0px;
    /*滚动条的背景颜色*/
    background-color: rgba(144, 147, 153, 0.3);
}

/*定义滑块 内阴影+圆角*/
::-webkit-scrollbar-thumb {
    /*滚动条的内阴影*/
    box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.3) inset;
    /*滚动条的圆角*/
    border-radius: 0px;
    /*滚动条的背景颜色*/
    background-color: #aaa;
}
</style>
