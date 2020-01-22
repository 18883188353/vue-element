<template>
    <div class="fillcontain">

        <div class="main">

            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span>商家监测</span>
                    <!--<el-link type="primary" class="fr" @click="ruleUserAdd">新增文档</el-link>-->
                </div>
                <div class="text item">
                    <div>
                        <el-radio-group v-model="addrRadio" size="medium">
                            <el-radio-button label="全部" ></el-radio-button>
                            <el-radio-button label="处理完成" ></el-radio-button>
                            <el-radio-button label="未受理" ></el-radio-button>
                            <el-radio-button label="待回访" ></el-radio-button>
                            <el-radio-button label="待评价" ></el-radio-button>
                            <el-radio-button label="处理中" ></el-radio-button>
                        </el-radio-group>
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
                        label="提交人"
                        align="center"
                        width="">
                    </el-table-column>
                    <el-table-column
                        prop="come"
                        label="异常类型"
                        align="center"
                        width="">
                    </el-table-column>
                    <el-table-column
                        prop="answerPhone"
                        label="异常情况"
                        align="center"
                        width="">
                    </el-table-column>
                    <el-table-column
                        prop="notAnswerPhone"
                        label="异常提交时间"
                        align="center"
                        width="">
                    </el-table-column>
                    <el-table-column
                        prop="completedComplete"
                        label="处理人员"
                        align="center"
                        width="">
                    </el-table-column>
                    <el-table-column
                        prop="Processing"
                        label="满意度评价"
                        align="center"
                        width="">
                    </el-table-column>
                    <el-table-column
                        prop="Processing"
                        label="回访"
                        align="center"
                        width="">
                    </el-table-column>
                    <el-table-column
                        label="处理状态"
                        align="center"
                        width="">
                        <template>
                            <el-link type="primary" @click="">处理完成</el-link>
                            <el-link type="primary" @click="">查看处理结果</el-link>
                            <el-link type="primary" @click="">处理中</el-link>
                            <el-link type="primary" @click="testingUserDetails">立即处理</el-link>
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

                addrRadio: '全部',
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
             * 立即处理
             */
            testingUserDetails(){
                this.$router.push({'path': '/testingUserDetails'})
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
