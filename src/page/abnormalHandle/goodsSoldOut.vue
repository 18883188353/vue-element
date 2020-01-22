<template>
    <div class="fillcontain">

        <div class="main">

            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span>强制下架商品列表：</span>
                </div>
                <div class="text item">

                    <div class="mt20">
                        <el-form :inline="true" :model="formInline" class="demo-form-inline">
                            <el-form-item label="商家名称:">
                                <el-input v-model="formInline.businessName" placeholder="请输入商家名称"></el-input>
                            </el-form-item>
                            <el-form-item label="商品名称:">
                                <el-input v-model="formInline.goodsName" placeholder="请输入商品名称"></el-input>
                            </el-form-item>
                            <el-form-item label="系统分类:">
                                <el-input v-model="formInline.systemClass" placeholder="请输入系统分类"></el-input>
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
                        label="发布商家"
                        align="center"
                        width="">
                    </el-table-column>
                    <el-table-column
                        prop="answerPhone"
                        label="商品名称"
                        align="center"
                        width="">
                    </el-table-column>
                    <el-table-column
                        prop="notAnswerPhone"
                        label="系统分类"
                        align="center"
                        width="">
                    </el-table-column>
                    <el-table-column
                        prop="completedComplete"
                        label="自定义分类"
                        align="center"
                        width="">
                    </el-table-column>
                    <el-table-column
                        label="下架理由"
                        align="center"
                        width="">
                        <template>
                            <el-input v-model="formInline.input" placeholder="请输入下架理由"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="操作"
                        align="center"
                        width="">
                        <template>
                            <el-link type="warning" @click="del">强制下架</el-link>
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
                    businessName: '',
                    goodsName: '',
                    systemClass: '',
                    input: '',
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
                this.$confirm('此操作将强制下架该商品, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$message({
                        type: 'success',
                        message: '下架成功!'
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消下架'
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
