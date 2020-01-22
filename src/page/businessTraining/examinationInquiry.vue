<template>
    <div class="fillcontain">

        <div class="main">

            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span>考试查询：</span>
                </div>
                <div class="text item">

                    <div class="mt20">
                        <el-form :inline="true" :model="postData" class="demo-form-inline">

                            <el-form-item label="考试人员:">
                                <el-select v-model="postData.personnelId">
                                    <el-option label="全部" value=""></el-option>
                                    <el-option v-for="(item, index) in userList" :key="index" :value="item.id" :label="item.rel_name"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="考试名称:">
                                <el-select v-model="postData.paperId">
                                    <el-option label="全部" value=""></el-option>
                                    <el-option v-for="(item, index) in paperList" :key="index" :value="item.id" :label="item.title"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="考试结果:">
                                <el-input v-model="postData.result" placeholder="考试结果"></el-input>
                            </el-form-item>

                            <!--<el-form-item label="发布时间:">
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
                            </el-form-item>-->
                            <el-form-item>
                                <el-button type="primary" @click="onSubmit">查询<i class="el-icon-search el-icon--right"></i></el-button>
                            </el-form-item>
                        </el-form>
                    </div>
                </div>
            </el-card>

            <el-card class="box-card">
                <div class="text item">
                    <div class="mt20">
                        <el-table
                            :data="tableData"
                            border
                            style="width: 100%; margin-top: 20px;">
                            <el-table-column
                                prop="testPersonnel"
                                label="考试人员"
                                align="center"
                                width="">
                            </el-table-column>
                            <el-table-column
                                prop="title"
                                label="考试名称"
                                align="center"
                                width="">
                            </el-table-column>
                            <el-table-column
                                prop="testNum"
                                label="考试题数"
                                align="center"
                                width="">
                            </el-table-column>
                            <el-table-column
                                prop="correctNum"
                                label="答对题数"
                                align="center"
                                width="">
                            </el-table-column>
                            <el-table-column
                                prop="testResult"
                                label="考试结果"
                                align="center"
                                width="">
                            </el-table-column>
                            <el-table-column
                                prop="startTime"
                                label="考试时长"
                                align="center"
                                width="">
                                <template slot-scope="scope">
                                    {{scope.row.startTime}} 至 {{scope.row.submitTime}}
                                </template>
                            </el-table-column>
                            <el-table-column
                                label="操作"
                                align="center"
                                width="">
                                <template slot-scope="scope">
                                    <el-link type="primary" @click="examination(scope.row)">查看</el-link>
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
                    </div>
                </div>
            </el-card>


        </div>

    </div>
</template>

<script>
    import queryExamPaperAll from '../../api/other/queryExamPaperAll'
    import queryExamPaperTestList from '../../api/other/queryExamPaperTestList'
    import getUserBySysCode from '../../api/user/getUserBySysCode'

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
                },],//用户使用规则

                postData: {
                    pageNum: 1,
                    pageSize: 10,
                    personnelId: '',
                    paperId: '',
                    result: '',
                    total: 0,
                },
                userList: [], //用户
                paperList: [], //试卷
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
            /**
             * 参加考试
             */
            examination(row){
                this.$router.push({'path': 'examinationInquiryDetail', query: {
                        id: row.id
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
                let _postData = {};
                for(let key  in this.postData){
                    if (this.postData[key]){
                        _postData[key] = this.postData[key];
                    }
                }
                queryExamPaperTestList.call(this,_postData).then(res => {
                    if (res.Code === 1){
                        this.postData.total = res.Data.total;
                        this.tableData = res.Data.list;
                    } else {
                        this.$message.error('系统异常')
                    }
                });
            },
            getUserBySysCode(){
                getUserBySysCode.call(this,{pageNum: 1, pageSize: 1000}).then(res => {
                    if (res.code === '0000'){
                        this.userList = res.data.data.list;
                    } else {
                        // this.$message.error('系统异常')
                    }
                });
            },
            queryExamPaperAll(){
                queryExamPaperAll.call(this, null).then(res => {
                    if (res.Code === 1){
                        this.paperList = res.Data;
                    } else {
                        // this.$message.error('系统异常');
                    }
                });
            }

        },

        created(){
            this.searchList();
            this.getUserBySysCode();
            this.queryExamPaperAll();
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
