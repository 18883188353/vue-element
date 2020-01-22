<template>
    <div class="fillcontain">

        <div class="main">

            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span>新增规则：</span>
                    <el-button type="primary" class="fr" size="mini" @click="drawer = true">添加</el-button>
                </div>
                <div class="text item">

                    <div class="mt20">
                        <el-form :inline="true" :model="formInline" class="demo-form-inline">
                            <el-form-item label="规则名称:">
                                <el-select v-model="formInline.region" placeholder="请选择规则名称">
                                    <el-option label="区域一" value="shanghai"></el-option>
                                    <el-option label="区域二" value="beijing"></el-option>
                                </el-select>
                            </el-form-item>

                            <el-form-item>
                                <el-button type="primary" @click="onSubmit">搜索<i class="el-icon-search el-icon-search"></i></el-button>
                            </el-form-item>
                        </el-form>
                    </div>
                </div>
            </el-card>


            <el-card class="box-card">
                <el-table
                    :data="tableData"
                    border
                    style="width: 100%; margin-top: 20px;">
                    <el-table-column
                        prop="type"
                        label="序号"
                        align="center"
                        width="80">
                    </el-table-column>
                    <el-table-column
                        prop="come"
                        label="提醒方式"
                        align="center"
                        width="">
                    </el-table-column>
                    <el-table-column
                        prop="answerPhone"
                        label="第一次提醒"
                        align="center"
                        width="">
                    </el-table-column>
                    <el-table-column
                        prop="notAnswerPhone"
                        label="第二次提醒"
                        align="center"
                        width="">
                    </el-table-column>
                    <el-table-column
                        prop="completedComplete"
                        label="第三次提醒"
                        align="center"
                        width="">
                    </el-table-column>
                    <el-table-column
                        label="操作"
                        align="center"
                        width="">
                        <template>
                            <el-link type="warning" @click="">编辑</el-link>
                            <el-link type="warning" @click="">删除</el-link>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="page">
                    <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="currentPage"
                        :page-sizes="[100, 200, 300, 400]"
                        :page-size="100"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="400">
                    </el-pagination>
                </div>
            </el-card>

            <el-drawer
                title="提醒方式"
                size="40%"
                :visible.sync="drawer"
                :direction="direction">
                <el-form ref="formInline" :model="formInline" label-width="120px">
                    <el-form-item label="提醒方式：">
                        <el-radio v-model="formInline.radio" label="1">系统语音电话</el-radio>
                        <el-radio v-model="formInline.radio" label="2">系统短信</el-radio>
                        <el-radio v-model="formInline.radio" label="3">人工客服电话</el-radio>
                    </el-form-item>
                </el-form>
                <el-row style="padding: 0 5%" v-if="formInline.radio === '1' ">
                    <el-col :span="24">
                        <el-col :span="24">
                            <el-card shadow="hover">
                                <h3 class="tc">系统语音电话提醒配置</h3>
                                <ul class="tel_list">
                                    <li>第一次提醒(截止日期前多少天)： <span><el-input v-model="formInline.input" placeholder="请输入天数"></el-input></span></li>
                                    <li>第二次提醒(截止日期前多少天)： <span><el-input v-model="formInline.input" placeholder="请输入天数"></el-input></span></li>
                                    <li>提醒时间(截止日期前多少天)： <span><el-input v-model="formInline.input" placeholder="请输入天数"></el-input></span></li>
                                </ul>
                                <div class="mt10 tr">
                                    <el-button type="">返回</el-button>
                                    <el-button type="primary">提交</el-button>
                                </div>
                            </el-card>
                        </el-col>
                    </el-col>
                </el-row>
                <el-row style="padding: 0 5%" v-if="formInline.radio === '2' ">
                    <el-col :span="24">
                        <el-col :span="24">
                            <el-card shadow="hover">
                                <h3 class="tc">系统短信提醒配置</h3>
                                <ul class="tel_list">
                                    <li>第一次提醒(截止日期前多少天)： <span><el-input v-model="formInline.input" placeholder="请输入天数"></el-input></span></li>
                                    <li>提醒时间(截止日期前多少天)： <span><el-input v-model="formInline.input" placeholder="请输入天数"></el-input></span></li>
                                    <li>提醒时间(截止日期前多少天)： <span><el-input v-model="formInline.input" placeholder="请输入天数"></el-input></span></li>
                                    <li>短信内容： <span><el-input class="mt10" type="textarea" :autosize="{ minRows: 4, maxRows: 8}" placeholder="电话内容记录" v-model="formInline.textarea"></el-input></span></li>
                                </ul>
                                <div class="mt10 tr">
                                    <el-button type="">返回</el-button>
                                    <el-button type="primary">提交</el-button>
                                </div>
                            </el-card>
                        </el-col>
                    </el-col>
                </el-row>
                <el-row style="padding: 0 5%" v-if="formInline.radio === '3' ">
                    <el-col :span="24">
                        <el-col :span="24">
                            <el-card shadow="hover">
                                <h3 class="tc">人工客服电话提醒配置</h3>
                                <ul class="tel_list">
                                    <li>第一次提醒(截止日期前多少天)： <span><el-input v-model="formInline.input" placeholder="请输入天数"></el-input></span></li>
                                    <li>第二次提醒(截止日期前多少天)： <span><el-input v-model="formInline.input" placeholder="请输入天数"></el-input></span></li>
                                    <li>提醒时间(截止日期前多少天)： <span><el-input v-model="formInline.input" placeholder="请输入天数"></el-input></span></li>
                                </ul>
                                <div class="mt10 tr">
                                    <el-button type="">返回</el-button>
                                    <el-button type="primary">提交</el-button>
                                </div>
                            </el-card>
                        </el-col>
                    </el-col>
                </el-row>

            </el-drawer>

        </div>

    </div>
</template>

<script>
    import headTop from '../../components/headTop'
    export default {
        components: {
            headTop,
        },
        data(){
            return {
                formInline: {
                    name: '',
                    region: '',
                    start: '',
                    end: '',
                    radio: '',//提醒方式
                    input: '',
                    textarea: '',
                    checkList: '',
                },
                addrRadio: '合约到期',
                currentPage: 1,
                tableData: [{
                    type: '1    ',
                    come: '电话',
                    answerPhone: '截止日期前10天',
                    notAnswerPhone: '截止日期前10天',
                    completedComplete: '截止日期前10天',
                },],//新增规则
                drawer: true,
                direction: 'rtl',
                checkList: [],

            }
        },

        methods:{

            /**
             * 搜索按钮
             */
            onSubmit() {
                console.log('submit!');
            },

            /**
             * 跳转到营业执照到期
             */
            licenceContractRemindDetails(){
                this.$router.push({'path': '/licenceContractRemindDetails'})
            },

            /**
             * 跳转到提醒规则列表
             */
            ruleReminder(){
                this.$router.push({'path': '/ruleReminder'})
            },

            /**
             * 页码
             * @param val
             */
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
            }

        },

        created(){

        }
    }
</script>

<style lang="less" scoped>

    .box-card{
        margin-bottom: 20px;
    }
    .page{
        text-align: right;
        padding: 20px;
    }

    .tel_list{
        width: 100%;
        height: auto;
        margin-top: 10px;
        li{
            width: 100%;
            height: auto;
            border-bottom: 1px #eaeaea solid;
            padding: 10px 0;
            span{
                float: right;
            }
            &:after{
                clear: both;
                display: block;
                content: '';
            }
        }
    }

</style>
