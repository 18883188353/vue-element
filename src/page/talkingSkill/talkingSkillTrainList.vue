<template>
    <div class="fillcontain">

        <div class="main">

            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span>话术反馈列表：</span>
                </div>
                <div class="text item">
                    <el-radio-group v-model="postData.status" @change="changeRadio()" size="medium">
                        <el-radio-button label="" >全部</el-radio-button>
                        <el-radio-button label="2" >未反馈</el-radio-button>
                        <el-radio-button label="3" >已反馈</el-radio-button>
                        <el-radio-button label="0" >未查看</el-radio-button>
                        <el-radio-button label="1" >已查看</el-radio-button>
                    </el-radio-group>
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
                        prop="learnTitle"
                        label="话术标题"
                        align="center"
                        width="">
                    </el-table-column>
                    <el-table-column
                        prop="personnel"
                        label="员工"
                        align="center"
                        width="">
                    </el-table-column>
                    <el-table-column
                        prop="viewStatus"
                        label="查看状况"
                        align="center"
                        width="">
                        <template slot-scope="scope">
                            {{scope.row.viewStatus === '1' ? '已查看':'未查看'}}
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="feedbackStatus"
                        label="反馈状况"
                        align="center"
                        width="">
                        <template slot-scope="scope">
                            {{scope.row.feedbackStatus === '1' ? '已反馈':'未反馈'}}
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="操作"
                        align="center"
                        prop="content"
                        width="">
                        <template slot-scope="scope">
                            <el-link type="primary" @click="learningFeedbackLook(scope.row, 'view')">查看</el-link>
                            <el-link type="primary" v-if="scope.row.feedbackStatus === '0' && userInfo.id === scope.row.personnelId" @click="learningFeedbackLook(scope.row, 'edit')">反馈</el-link>
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
    import queryBusinessLearningFeedbackList from '../../api/other/queryBusinessLearningFeedbackList'

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
                postData: {
                    pageNum: 1,
                    pageSize: 10,
                    status: '',  //0待审核 1使用中 2已下架
                    topic: 'talkSkill',
                    total: 0,
                },
                addrRadio: '全部',
                currentPage: 1,
                tableData: [],//用户使用规则
                userInfo: JSON.parse(window.sessionStorage.getItem('USER_INFO')),
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
             * 查看
             */
            learningFeedbackLook(row,type){
                this.$router.push({'path': 'trainingFeedback', query:{
                        id: row.id,
                        type: type
                    }})
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
                queryBusinessLearningFeedbackList.call(this,_postData).then(res => {
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
