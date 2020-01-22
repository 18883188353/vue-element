<template>
    <div class="fillcontain">

        <div class="main">

            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span>用户帮助文档列表：</span>
                    <el-link type="primary" class="fr" @click="ruleUserAdd">新增文档</el-link>
                </div>
                <div class="text item">
                    <!--<div>
                        <el-radio-group v-model="postData.status" size="medium">
                            <el-radio-button label="全部" ></el-radio-button>
                            <el-radio-button label="使用中" ></el-radio-button>
                            <el-radio-button label="审批中" ></el-radio-button>
                            <el-radio-button label="已下架" ></el-radio-button>
                            <el-radio-button label="未通过" ></el-radio-button>
                        </el-radio-group>
                    </div>-->
                    <div class="mt20">
                        <el-form :inline="true" :model="postData" class="demo-form-inline">
                            <el-form-item label="关键词:">
                                <el-input v-model="postData.title" placeholder="请输入搜索关键词"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="onSearch">查询<i class="el-icon-search el-icon--right"></i></el-button>
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
                        prop="num"
                        type="index"
                        label="序号"
                        align="center"
                        width="">
                    </el-table-column>
                    <el-table-column
                        prop="title"
                        label="文档标题"
                        align="center"
                        width="">
                    </el-table-column>
                    <el-table-column
                        prop="create_time"
                        label="创建时间"
                        align="center"
                        width="">
                    </el-table-column>
                    <el-table-column
                        prop="create_person"
                        label="创建人"
                        align="center"
                        width="">
                    </el-table-column>
                    <el-table-column
                        prop="read_count"
                        label="查看人数"
                        align="center"
                        width="">
                    </el-table-column>
                    <el-table-column
                        label="操作"
                        align="center"
                        width="">
                        <template slot-scope="scope">
                            <el-link type="primary" @click="ruleUserAdd(scope.row, 'edit')">编辑</el-link>
                            <el-link type="primary" @click="ruleUserAdd(scope.row, 'view')">查看</el-link>
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
    import queryRuleDocumentList from '../../api/document/queryRuleDocumentList'
    import delRuleDocumentOne from '../../api/document/delRuleDocumentOne'

    import headTop from '../../components/headTop'
    export default {
        components: {
            headTop,
        },
        data(){
            return {
                postData: {
                    pageNum: 1,
                    pageSize: 10,
                    title: '',
                    type: 4,  // 1用户规则 2商家规则 3平台规则 4用户帮助文档 5商家帮助文档 6平台帮助文档 7财务系统国家政策8财务系统业务规则
                    total: 0,
                },
                tableData: [],//用户使用规则
            }
        },

        methods:{


            /**
             * 新增用户规则
             */
            ruleUserAdd(row, type){
                if (row.id){
                    this.$router.push({'path': '/ruleUserAdd', query: {
                            id: row.id,
                            type: type
                        }});
                } else {
                    this.$router.push({'path': '/ruleUserAdd', query: {
                            type: 'edit',
                            rule_type: this.postData.type + ''
                        }});
                }
            },

            /**
             * 是否删除
             */
            del(row) {
                this.$confirm('此操作将永久删除该条数据, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    delRuleDocumentOne.call(this, {id: row.id}).then(res =>{
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
            onSearch() {
                this.postData.pageNum = 1;
                this.searchList();
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
                queryRuleDocumentList.call(this,_postData).then(res => {
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
