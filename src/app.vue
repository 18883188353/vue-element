<template>
    <router-view></router-view>
</template>

<script>
export default {
    computed: {
        key() {
            return this.$route.name ? this.$route.name + new Date() : this.$route + new Date();
        }
    },
    data() {
        return {

        }
    },
    methods: {
        hint: function (msg) {
            this.$alert(msg, {
                dangerouslyUseHTMLString: true,
                showConfirmButton: false,
                center: true,
                type: 'error',
                callback: m => { }
            });
        }
    },
    beforeCreate() {
        if ('development' === process.env.NODE_ENV) {
            console.log('鼠标左右键可以操作');
        } else {
            document.oncontextmenu = function () {
                return false;
            };//鼠标右键阻止点击
            // document.onselectstart = function() {
            //     return false;
            // }//鼠标左键阻止拖动
        }
    },
    created() {
        console.log('_Model ===>>> ', _Model)
        let model = null;
        if (undefined === _Model || null === _Model || '' === _Model) {
            model = window.mj.model;
        } else {
            model = _Model;
        }

        console.log('model ===>>>', model);

        if (!model) {
            this.hint('运行环境不能确定...... 系统无法使用，请联系管理员');
            return;
        }
        if (!model || 'defined' === model) {
            if (!window.mj.defaultHost || !window.mj.defaultWs) {
                this.hint('系统参数缺失...... 系统无法使用，请联系管理员');
            }
            return;
        } else {
            let resultHost = this.$store.getters.getHostUrl(model);
            if (!resultHost || !resultHost.defaultHost || !resultHost.defaultHost) {
                this.hint('系统参数缺失...... 系统无法使用，请联系管理员');
                return;
            }
            window.mj = resultHost;
        }
    }
}
</script>

<style lang="less">
@import "http://at.alicdn.com/t/font_1328059_8q7f4vw2gvm.css";
@import "./assets/css/public.css";

.heightbg {
    width: 100%;
    height: 10px;
    background: #eaeaea;
}
.el-breadcrumb__inner {
    color: #fff !important;
}
.el-breadcrumb__inner a,
.el-breadcrumb__inner.is-link {
    color: #fff !important;
}
</style>

