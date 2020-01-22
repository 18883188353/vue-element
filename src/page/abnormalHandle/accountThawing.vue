<template>
    <div class="fillcontain">

        <div class="main">

            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span>账号解冻：</span>
                    <!--<el-link type="primary" class="fr" @click="ruleUserAdd">新增规则</el-link>-->
                </div>
                <div class="text item">

                    <div class="mt20">
                        <el-form :inline="true" :model="formInline" class="demo-form-inline">
                            <el-form-item label="账号:">
                                <el-input v-model="formInline.name" placeholder="请输入账号"></el-input>
                            </el-form-item>
                            <el-form-item label="账号类型:">
                                <el-input v-model="formInline.type" placeholder="请输入账号类型"></el-input>
                            </el-form-item>
                            <el-form-item label="冻结时间:">
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
                        label="账号"
                        align="center"
                        width="">
                    </el-table-column>
                    <el-table-column
                        prop="answerPhone"
                        label="账号类型"
                        align="center"
                        width="">
                    </el-table-column>
                    <el-table-column
                        prop="notAnswerPhone"
                        label="冻结时间"
                        align="center"
                        width="">
                    </el-table-column>
                    <el-table-column
                        prop="completedComplete"
                        label="冻结人"
                        align="center"
                        width="">
                    </el-table-column>
                    <el-table-column
                        prop="Processing"
                        label="冻结原因"
                        align="center"
                        width="">
                    </el-table-column>
                    <el-table-column
                        label="操作"
                        align="center"
                        width="">
                        <template>
                            <el-link type="warning" @click="del">结束解冻</el-link>
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
                    type: '',
                    start: '',
                    end: '',
                },
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
             * 结束解冻
             */
            del() {
                this.$confirm('此操作将解除解冻, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$message({
                        type: 'success',
                        message: '解除成功!'
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消解除'
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
