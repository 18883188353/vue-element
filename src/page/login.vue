<template>
    <div class="login_page fillcontain">
        <section class="form_contianer">
            <div class="manage_tip">
                <p>满集客服管理系统</p>
            </div>
            <el-form
                :model="loginForm"
                :rules="rules"
                ref="loginForm"
                label-width="55px"
            >
                <el-form-item
                    prop="username"
                    label="账号"
                >
                    <el-input
                        type="text"
                        v-model="loginForm.username"
                        placeholder="请输入账号"
                        prefix-icon="el-icon-user"
                    ></el-input>
                </el-form-item>
                <el-form-item
                    prop="password"
                    label="密码"
                >
                    <el-input
                        type="password"
                        v-model="loginForm.password"
                        placeholder="请输入密码"
                        prefix-icon="el-icon-unlock"
                        @keyup.enter.native="submitLogin"
                    ></el-input>
                </el-form-item>
                <el-form-item label="">
                    <el-button
                        type="primary"
                        @click="submitLogin"
                        class="submit_btn"
                    >登陆</el-button>
                </el-form-item>
            </el-form>
        </section>
    </div>
</template>

<script>

import Login from '../api/login/login';
import RelationRegisterTxUser from '../api/user/relationRegisterTxUser';

export default {
    data() {
        return {
            loginForm: {
                username: '',//账号
                password: '',//密码
                remember: false
            },

            rules: {
                username: [
                    { required: true, message: '请输入用户账号', trigger: 'blur' },
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' }
                ],
            },

        }
    },
    created(){
        let _this = this;
        document.onkeydown = function(e) {
            let key = window.event.keyCode;
            if (key == 13) {
                _this.submitLogin();
            }
        };
    },
    mounted() {

    },
    computed: {

    },

    methods: {



        submitLogin() {
            this.$refs['loginForm'].validate((valid) => {
                if (valid) {
                    // 开启加载动画
                    let loginLoading = this.$loading({ text: '登陆中......' });
                    // 调用登录接口
                    Login.call(this, {
                        username: this.loginForm.username,
                        password: this.$md5(this.loginForm.password),
                        remember: this.loginForm.remember
                    }).then(res => {
                        if (res.code === '0000') {

                            let userInfo = JSON.parse(res.data.user),
                                authorization = res.data.token + "," + this.loginForm.username;

                            userInfo.sessionId = res.data.token;

                            // 注册腾讯云账号
                            if (!userInfo.tencentUser || !userInfo.tencentUser.tx_account) {
                                loginLoading.text = '正在初始化腾讯云账户，请稍后......';
                                RelationRegisterTxUser.call(this, { relName: userInfo.rel_name, userId: userInfo.id }).then(res => {
                                    if (res.Code === 1) {
                                        userInfo.tencentUser = res.Data;
                                    } else {
                                        this.$message.error('注册腾讯云账户失败，请联系管理员');
                                        userInfo.tencentUser = {};
                                    }
                                    this.loginSuccess(authorization, userInfo, loginLoading);
                                });
                            } else {
                                this.loginSuccess(authorization, userInfo, loginLoading);
                            }
                        } else {
                            this.$message.error(res.message);
                            loginLoading.close();
                        }
                    }).catch((error => {
                        loginLoading.close();
                    }))
                } else {
                    return false;
                }
            });
        },
        loginSuccess(authorization, userInfo, loginLoading) {
            window.sessionStorage.setItem('AUTHORIZATION', authorization);
            window.sessionStorage.setItem('USER_INFO', JSON.stringify(userInfo));
            loginLoading.close();
            // 移除回车事件监听
            document.onkeydown = undefined;
            this.$router.push({ path: '/index' })
        },
        /**
         * 点击登录
         */
        submitForm() {
            this.$router.push({ path: '/customerIndex' })
        }
    },
    watch: {

    }
}
</script>

<style lang="less" scoped>
.login_page {
    width: 100%;
    height: 100%;
    background-image: url("../assets/img/login_bg.png");
    background-position: center center;
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-size: cover;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
}
.form_contianer {
    width: 450px;
    height: 400px;
    padding: 20px;
    background: #fff;
    border-radius: 10px;
    position: fixed;
    right: 10%;
    top: 50%;
    margin-top: -200px;
    .manage_tip {
        width: 100%;
        height: auto;
        p {
            margin: 50px 0;
            font-weight: 600;
            color: #25ada3;
            font-size: 24px;
            text-align: center;
        }
    }
    .el-form-item {
        margin-bottom: 30px;
    }
    .el-button--primary {
        width: 100%;
        margin-top: 20px;
        background-color: #25ada3;
    }
}
</style>
