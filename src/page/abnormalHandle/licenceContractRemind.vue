<template>
    <div class="fillcontain">

        <div class="main">

            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span>证照合约提醒：</span>
                    <el-link type="primary" class="fr" @click="ruleReminder">提醒规则列表</el-link>
                </div>
                <div class="text item">
                    <div>
                        <el-radio-group v-model="addrRadio" size="medium">
                            <el-radio-button label="合约到期" ></el-radio-button>
                            <el-radio-button label="营业执照上传" ></el-radio-button>
                            <el-radio-button label="营业执照到期" ></el-radio-button>
                            <el-radio-button label="营业执照年审" ></el-radio-button>
                            <el-radio-button label="资质证照到期" ></el-radio-button>
                        </el-radio-group>
                    </div>
                    <div class="mt20">
                        <el-form :inline="true" :model="formInline" class="demo-form-inline">
                            <el-form-item label="店铺名称:">
                                <el-input v-model="formInline.name" placeholder="请输入商家名称"></el-input>
                            </el-form-item>
                            <el-form-item label="提醒状态:">
                                <el-select v-model="formInline.region" placeholder="请选择提醒状态">
                                    <el-option label="区域一" value="shanghai"></el-option>
                                    <el-option label="区域二" value="beijing"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="提醒时间:">
                                <el-date-picker
                                    v-model="formInline.start"
                                    type="datetime"
                                    placeholder="开始时间">
                                </el-date-picker> -
                                <el-date-picker
                                    v-model="formInline.end"
                                    type="datetime"
                                    placeholder="结束时间">
                                </el-date-picker>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="onSubmit">查询<i class="el-icon-search el-icon--right"></i></el-button>
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
                        width="">
                    </el-table-column>
                    <el-table-column
                        prop="come"
                        label="店铺名称"
                        align="center"
                        width="">
                    </el-table-column>
                    <el-table-column
                        prop="answerPhone"
                        label="负责人姓名"
                        align="center"
                        width="">
                    </el-table-column>
                    <el-table-column
                        prop="notAnswerPhone"
                        label="负责人电话"
                        align="center"
                        width="">
                    </el-table-column>
                    <el-table-column
                        prop="completedComplete"
                        label="到期时间"
                        align="center"
                        width="">
                    </el-table-column>
                    <el-table-column
                        prop="completedComplete"
                        label="第一次提醒"
                        align="center"
                        width="">
                    </el-table-column>
                    <el-table-column
                        prop="completedComplete"
                        label="电话提醒状态"
                        align="center"
                        width="">
                    </el-table-column>
                    <el-table-column
                        prop="completedComplete"
                        label="第二次提醒"
                        align="center"
                        width="">
                    </el-table-column>
                    <el-table-column
                        prop="completedComplete"
                        label="电话提醒状态"
                        align="center"
                        width="">
                    </el-table-column>
                    <el-table-column
                        label="操作"
                        align="center"
                        width="">
                        <template>
                            <el-link type="warning" @click="licenceContractRemindDetails">立即处理</el-link>
                            <el-link type="warning" @click="licenceContractRemindDetails">查看</el-link>
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

                },
                addrRadio: '合约到期',
                currentPage: 1,
                tableData: [{
                    type: '2019-5-2',
                    come: '15',
                    answerPhone: '12',
                    notAnswerPhone: '30',
                    completedComplete: '5',
                    Processing: '10',
                    returnVisit: '90%',
                },],//用户使用规则
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

</style>
