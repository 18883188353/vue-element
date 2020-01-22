<template>
    <div class="fillcontain">

        <div class="main">

            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span>话术列表：</span>
                    <el-link type="primary" class="fr mr20" @click="knowledgeAdd">话术编写</el-link>
                </div>

            </el-card>

            <el-card class="box-card">
                <el-table
                    :data="tableData"
                    border
                    style="width: 100%; margin-top: 20px;">
                    <el-table-column
                        type="index"
                        prop="num"
                        label="序号"
                        align="center"
                        width="">
                    </el-table-column>
                    <el-table-column
                        prop="title"
                        label="话术标题"
                        align="center"
                        width="">
                    </el-table-column>
                    <el-table-column
                        prop="version"
                        label="版本"
                        align="center"
                        width="">
                    </el-table-column>
                    <el-table-column
                        prop="createTime"
                        label="创建时间"
                        align="center"
                        width="">
                    </el-table-column>
                    <el-table-column
                        prop="createPerson"
                        label="创建人"
                        align="center"
                        width="">
                    </el-table-column>
                    <el-table-column
                        prop="learningType"
                        label="话术类型"
                        align="center"
                        width="">
                    </el-table-column>
                   <!-- <el-table-column
                        prop="status"
                        label="状态"
                        align="center"
                        width="">
                        <template slot-scope="scope">
                            {{ getStatusDesc(scope.row.status) }}
                        </template>
                    </el-table-column>-->
                    <el-table-column
                        prop="viewNumber"
                        label="查看人数"
                        align="center"
                        width="">
                    </el-table-column>
                    <el-table-column
                        label="操作"
                        align="center"
                        width="">
                        <template slot-scope="scope">
                            <el-link type="primary" @click="knowledgeAdd(scope.row, 'edit')">编辑</el-link>
                            <el-link type="primary" @click="knowledgeAdd(scope.row, 'view')">查看</el-link>
                            <el-link v-if="postData.status === '0'" type="primary" @click="knowledgeAudit(scope.row)">审核</el-link>
                            <el-link type="warning" @click="del(scope.row)">删除</el-link>
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
    import queryBusinessLearningList from '../../api/other/queryBusinessLearningList'
    import delBusinessLearningOne from '../../api/other/delBusinessLearningOne'

    import headTop from '../../components/headTop'
    export default {
        components: {
            headTop,
        },
        data(){
            return {
                tableData: [],//用户使用规则
                postData: {
                    pageNum: 1,
                    pageSize: 10,
                    status: '',  //0待审核 1使用中 2已下架
                    topic: 'talkSkill',
                    total: 0,
                },
                statusOptions: [
                    {value: '0', label: '待审核'},
                    {value: '1', label: '使用中'},
                    {value: '2', label: '已下架'},
                    {value: '3', label: '不通过'},
                ]
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
             * 新增知识
             */
            knowledgeAdd(row, type){
                if (row.id){
                    this.$router.push({'path': 'talkingSkillEdit', query:{
                            id: row.id,
                            type: type
                        }});
                } else {
                    this.$router.push({'path': 'talkingSkillEdit', query:{
                            type: 'edit'
                        }});
                }
            },
            /**
             * 审核知识
             */
            knowledgeAudit(row){
                this.$router.push({'path': 'talkingSkillAudit', query:{
                        id: row.id,
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
                    delBusinessLearningOne.call(this, {id: row.id}).then(res =>{
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
            getStatusDesc(status){
                let _desc = '';
                this.statusOptions.map(item =>{
                    if (item.value === status) {
                        _desc = item.label;
                    }
                });
                return _desc;
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
                queryBusinessLearningList.call(this,_postData).then(res => {
                    if (res.Code === 1){
                        this.postData.total = res.Data.total;
                        this.tableData = res.Data.list;
                    } else {
                        this.$message.error('系统异常')
                    }
                });
            },
            changeRadio() {
                this.postData.pageNum = 1;
                this.searchList();
            }

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
