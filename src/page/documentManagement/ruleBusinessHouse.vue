<template>
    <div class="fillcontain">

        <div class="main">

            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span>众议院规则列表：</span>
                    <el-link type="primary" class="fr" @click="ruleBusinessHouseAdd">新增众议院规则</el-link>
                </div>
                <div class="text item">
                    <div>
                        <el-radio-group v-model="addrRadio" size="medium">
                            <el-radio-button label="全部" ></el-radio-button>
                            <el-radio-button label="使用中" ></el-radio-button>
                            <el-radio-button label="审批中" ></el-radio-button>
                            <el-radio-button label="已下架" ></el-radio-button>
                            <el-radio-button label="未通过" ></el-radio-button>
                        </el-radio-group>
                    </div>
                    <div class="mt20">
                        <el-form :inline="true" :model="formInline" class="demo-form-inline">
                            <el-form-item label="关键词:">
                                <el-input v-model="formInline.user" placeholder="请输入搜索关键词"></el-input>
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
                        label="规则标题"
                        align="center"
                        width="">
                    </el-table-column>
                    <el-table-column
                        prop="answerPhone"
                        label="创建时间"
                        align="center"
                        width="">
                    </el-table-column>
                    <el-table-column
                        prop="notAnswerPhone"
                        label="创建人"
                        align="center"
                        width="">
                    </el-table-column>
                    <el-table-column
                        prop="completedComplete"
                        label="生效时间"
                        align="center"
                        width="">
                    </el-table-column>
                    <el-table-column
                        prop="Processing"
                        label="规则状态"
                        align="center"
                        width="">
                    </el-table-column>
                    <el-table-column
                        label="操作"
                        align="center"
                        width="">
                        <template>
                            <el-link type="primary" @click="">编辑</el-link>
                            <el-link type="primary" @click="">查看结果</el-link>
                            <el-link type="warning" @click="del">删除</el-link>
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
                    user: '',
                    region: '',
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
             * 新增众议院规则
             */
            ruleBusinessHouseAdd(){
                this.$router.push({'path': '/ruleBusinessHouseAdd'})
            },

            /**
             * 编辑
             */
            ruleUserAdd(){
                this.$router.push({'path': '/ruleUserAdd'})
            },

            /**
             * 是否删除
             */
            del() {
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
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
