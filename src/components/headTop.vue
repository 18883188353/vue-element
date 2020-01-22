<template>
    <div class="header_container">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item
                v-for="(item, index) in $route.meta.title"
                :key="index"
            >{{item}}</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="user">
            <el-dropdown @command="handleCommand">
                <span class="el-dropdown-link">
                    <img src="../assets/img/head_portrait.png">
                    <b>{{ userInfo.rel_name }}</b>
                    <b>欢迎您</b>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>修改密码</el-dropdown-item>
                    <el-dropdown-item command="logOut">退出</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>

    </div>
</template>

<script>

export default {
    created() {

    },
    data() {
        return {
            userInfo: JSON.parse(window.sessionStorage.getItem('USER_INFO')),
        }
    },
    methods: {
        handleCommand(command) {
            console.log(command, 'command');
            switch (command) {
                case 'logOut': this.logOut(); break;
                default: break;
            }
        },
        logOut() {
            window.sessionStorage.removeItem('AUTHORIZATION');
            window.sessionStorage.removeItem('USER_INFO');
            this.$router.push({ path: '/login' })
        }
    }
}

</script>
<style lang="less" scoped>
.user {
    height: 60px;
    float: right;
    color: #0074d9;
    .el-dropdown {
        color: #fff;
        margin-top: 15px;
        margin-right: 20px;
    }
    .el-dropdown-link {
        img {
            width: 30px;
            height: 30px;
            border-radius: 50%;
            vertical-align: middle;
        }
    }
}
</style>

<style>
.header_container {
    width: 100%;
    height: 60px;
    background-color: #25ada3;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    box-sizing: border-box;
}
.el-breadcrumb {
    height: 60px;
    float: left;
    line-height: 60px;
}
</style>
