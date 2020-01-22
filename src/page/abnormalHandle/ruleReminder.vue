<template>
    <div class="fillcontain">

        <div class="main">

            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span>提醒规则列表：</span>
                    <el-link type="primary" class="fr" @click="ruleReminderAdd">新增提醒规则</el-link>
                </div>
                <div class="text item">
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
                            label="规则名称"
                            align="center"
                            width="">
                        </el-table-column>
                        <el-table-column
                            prop="answerPhone"
                            label="提醒方式"
                            align="center"
                            width="">
                        </el-table-column>
                        <el-table-column
                            prop="notAnswerPhone"
                            label="客服第一次提醒"
                            align="center"
                            width="">
                        </el-table-column>
                        <el-table-column
                            prop="completedComplete"
                            label="客服第二次提醒"
                            align="center"
                            width="">
                        </el-table-column>
                        <el-table-column
                            prop="completedComplete"
                            label="规则状态"
                            align="center"
                            width="">
                        </el-table-column>
                        <el-table-column
                            label="操作"
                            align="center"
                            width="">
                            <template>
                                <el-link type="warning" @click="">编辑</el-link>
                                <el-link type="warning" @click="open">停用</el-link>
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
                currentPage: 1,
                tableData: [{
                    type: '2019-5-2',
                    come: '15',
                    answerPhone: '12',
                    notAnswerPhone: '30',
                    completedComplete: '5',
                    Processing: '10',
                    returnVisit: '90%',
                },],//
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
             * 新增规则
             */
            ruleReminderAdd(){
                this.$router.push({'path': '/ruleReminderAdd'})
            },

            /**
             * 是否停用
             */
            open() {
                this.$confirm('此操作将停用, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$message({
                        type: 'success',
                        message: '停用成功!'
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消停用'
                    });
                });
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
