<template>
    <div class="fillcontain">

        <div class="main">

            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span>邮件管理：</span>
                </div>
                <div class="text item">
                    <el-table
                        :data="tableData"
                        border
                        style="width: 100%; margin-top: 20px;">
                        <el-table-column
                            prop="type"
                            label="发件人"
                            align="center"
                            width="">
                        </el-table-column>
                        <el-table-column
                            prop="come"
                            label="接收时间"
                            align="center"
                            width="">
                        </el-table-column>
                        <el-table-column
                            label="邮件内容"
                            align="center"
                            width="">
                            <template slot-scope="scope">
                                <el-popover trigger="hover" placement="top">
                                    <p>姓名: {{ scope.row.name }}</p>
                                    <p>住址: {{ scope.row.address }}</p>
                                    <div slot="reference" class="name-wrapper">
                                        <el-tag size="medium">{{ scope.row.name }}</el-tag>
                                    </div>
                                </el-popover>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="notAnswerPhone"
                            label="咨询分类"
                            align="center"
                            width="">
                        </el-table-column>
                        <el-table-column
                            prop="completedComplete"
                            label="处理人"
                            align="center"
                            width="">
                        </el-table-column>
                        <el-table-column
                            prop="Processing"
                            label="处理状态"
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
                            label="详情"
                            align="center"
                            width="">
                            <template>
                                <el-link type="primary" @click="emailDetails">查看结果</el-link>
                                <el-link type="primary" @click="emailReply">立即回复</el-link>
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
                formInline: {
                    user: '',
                    region: '',
                    start: '',
                    end: '',
                },
                currentPage: 1,
                tableData: [{
                    type: '2019-5-2',
                    come: '15',
                    answerPhone: '12',
                    notAnswerPhone: '30',
                    completedComplete: '5',
                    Processing: '10',
                    returnVisit: '90%',
                },],//审核任务
            }
        },

        methods:{

            /**
             * 跳转邮箱详情
             */
            onSubmit() {
                console.log('submit!');
            },

            /**
             * 跳转邮箱详情
             */
            emailDetails(){
                this.$router.push({ 'path': 'emailDetails' })
            },

            /**
             * 跳转邮箱回复
             */
            emailReply(){
                this.$router.push({ 'path': 'emailReply' })
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
