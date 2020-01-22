<template>
    <div class="fillcontain">

        <div class="main">

            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span>考试考核列表：</span>
                    <el-link type="primary" class="fr" @click="titleEditorial">新增考试</el-link>
                </div>
                <div class="text item">

                    <div class="mt20">
                        <el-form :inline="true" :model="postData" class="demo-form-inline">
                            <el-form-item label="考试名称:">
                                <el-input v-model="postData.title" placeholder="请输入考试名称"></el-input>
                            </el-form-item>
                            <!--<el-form-item label="考试对象:">
                                <el-input v-model="postData.type" placeholder="请输入考试对象"></el-input>
                            </el-form-item>-->
                            <el-form-item label="发布时间:">
                                <el-date-picker
                                    v-model="postData.startTime"
                                    type="datetime"
                                    placeholder="开始时间">
                                </el-date-picker> -
                                <el-date-picker
                                    v-model="postData.endTime"
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
                        prop="id"
                        label="ID"
                        align="center"
                        width="">
                    </el-table-column>
                    <el-table-column
                        prop="title"
                        label="考试标题"
                        align="center"
                        width="">
                    </el-table-column>
                    <el-table-column
                        prop="examScope"
                        label="考试对象"
                        align="center"
                        width="">
                    </el-table-column>
                    <el-table-column
                        prop="examDuration"
                        label="考试时长（秒）"
                        align="center"
                        width="">
                    </el-table-column>
                    <el-table-column
                        prop="startTime"
                        label="考试开始时间"
                        align="center"
                        width="">
                    </el-table-column>
                    <el-table-column
                        prop="endTime"
                        label="考试截止时间"
                        align="center"
                        width="">
                    </el-table-column>
                    <el-table-column
                        prop="createTime"
                        label="发布时间"
                        align="center"
                        width="">
                    </el-table-column>
                    <el-table-column
                        label="操作"
                        align="center"
                        width="">
                        <template slot-scope="scope">
                            <el-link type="primary" @click="titleEditorial(scope.row)">编辑题目</el-link>
                            <el-link type="warning" @click="del(scope.row)">删除</el-link>
                            <el-link type="primary" @click="examination(scope.row)">参加考试</el-link>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="page">
                    <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="postData.pageNum"
                        :page-sizes="[10, 20, 30, 40]"
                        :page-size="postData.pageSize"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="postData.total">
                    </el-pagination>
                </div>
            </el-card>

        </div>

    </div>
</template>

<script>
    import queryExamPaperList from '../../api/other/queryExamPaperList'
    import delExamPaperOne from '../../api/other/delExamPaperOne'

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
                tableData: [],//用户使用规则

                postData: {
                    pageNum: 1,
                    pageSize: 10,
                    title: '',
                    startTime: '',
                    endTime: '',
                    status: '',  //0待审核 1使用中 2已下架
                    total: 0,
                },
            }
        },

        methods:{

            /**
             * 搜索按钮
             */
            onSubmit() {
                this.postData.pageNum = 1;
                this.searchList();
            },

            titleEditorial(row){
                this.$router.push({'path': 'titleEditorial', query: {
                    id: row.id
                    }})
            },

            /**
             * 参加考试
             */
            examination(row){
                this.$router.push({'path': 'examination', query: {
                        id: row.id
                    }})
            },


            /**
             * 结束解冻
             */
            del(row) {
                this.$confirm('此操作将删除, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    delExamPaperOne.call(this, {id: row.id}).then(res =>{
                        if (res.Code === 1){
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                            if (this.postData.total > this.postData.pageSize && this.postData.total % this.postData.pageSize === 1 && this.postData.pageNum > this.postData.total / this.postData.pageSize) {
                                //删除后 回到上一页
                                --this.postData.pageNum;
                            }
                            this.searchList();
                        } else {
                            this.$message.error('删除失败')
                        }
                    })
                }).catch(() => {
                    /*this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });*/
                });
            },


            /**
             * 页码
             * @param val
             */
            handleSizeChange(val) {
                this.postData.pageSize = val;
                this.searchList();
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                this.postData.pageNum = val;
                this.searchList();
                console.log(`当前页: ${val}`);
            },
            searchList(){
                let _postData = {
                    pageNum:1,
                    pageSize:10,
                };
                for(let key  in this.postData){
                    if (this.postData[key]){
                        _postData[key] = this.postData[key];
                    }
                }
                queryExamPaperList.call(this,_postData).then(res => {
                    if (res.Code === 1){
                        this.postData.total = res.Data.total;
                        this.tableData = res.Data.list;
                    } else {
                        this.$message.error('系统异常')
                    }
                });
            },

        },

        created(){
            this.searchList();
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
