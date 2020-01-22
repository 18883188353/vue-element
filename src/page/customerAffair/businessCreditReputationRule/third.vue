<template>
    <div class="fillcontain">

        <div class="main">

            <el-card class="box-card mt20">
                <div class="text item">

                    <div class="mt20">
                        <el-form :inline="true" :model="postData" class="demo-form-inline">

                            <el-form-item label="评价项目:">
                                <el-select v-model="postData.ssScoringItems" placeholder="请选择评价项目">
                                    <el-option v-for="(item,index) in ssScoringItemsOption" :label="item.label" :value="item.value" :key="index"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="评价等级:">
                                <el-select v-model="postData.ssEvaluate" placeholder="请选择评价等级">
                                    <el-option v-for="(item,index) in ssEvaluateOption" :label="item.label" :value="item.value" :key="index"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="onSubmit">查询<i class="el-icon-search el-icon--right"></i></el-button>
                                <el-button type="primary" @click="addScoreRule(-1)">添加规则</el-button>
                            </el-form-item>

                        </el-form>
                    </div>
                </div>
            </el-card>
            <el-card class="box-card">
                <el-table
                    :data="scoreList"
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
                        prop="ssScoringItems"
                        label="评分项目"
                        align="center"
                        width="">
                        <template slot-scope="scope">
                            {{getScoringDesc(scope.row.ssScoringItems)}}
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="ssEvaluate"
                        label="评价等级"
                        align="center"
                        width="">
                        <template slot-scope="scope">
                            {{getEvaluateDesc(scope.row.ssEvaluate)}}
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="ssScore"
                        label="分值"
                        align="center"
                        width="">
                    </el-table-column>
                    <el-table-column
                        label="操作"
                        align="center"
                        width="">
                        <template slot-scope="scope">
                            <el-link type="primary" @click="addScoreRule(scope.row.ssId)">编辑</el-link>
                            <el-link type="warning" @click="delScore(scope.row.ssId)">删除</el-link>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="page">
                    <el-pagination
                        @size-change="handleSizeChangeScore"
                        @current-change="handleCurrentChangeScore"
                        :current-page="pagingScore.pageIndex"
                        :page-sizes="[10, 30, 50, 100]"
                        :page-size="pagingScore.pageSize"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="pagingScore.total">
                    </el-pagination>
                </div>
            </el-card>

        </div>

    </div>
</template>

<script>

    import QueryOverallStoreScoringRulesList from '../../../api/customerAffair/queryOverallStoreScoringRulesList'
    import UpdateOverallStoreScoringRules from '../../../api/customerAffair/updateOverallStoreScoringRules'
    import { setCookie } from '../../../assets/js/store'

    export default {
        props: {
            listData: {
                pageIndex: 1, // 当前页
                pageSize: 10, // 每页多少条数据
                total: 0, // 数据总条数
                ssScoringItems: -1,
                ssEvaluate: -1,
            }
        },
        data(){
            return {
                activeName: 'first',
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


                pagingScore: { // 分页条件  信用
                    pageIndex: 1, // 当前页
                    pageSize: 10, // 每页多少条数据
                    total: 0 // 数据总条数
                },
                scoreList: [], //列表
                postData: {
                    ssScoringItems: -1,
                    ssEvaluate: -1,
                },
                ssScoringItemsOption: [
                    {
                        value: -1,
                        label: '全部'
                    },{
                        value: 1,
                        label: '商品'
                    },{
                        value: 2,
                        label: '包装'
                    },{
                        value: 3,
                        label: '服务'
                    },{
                        value: 4,
                        label: '物流'
                    },
                ],
                ssEvaluateOption: [
                    {
                        value: -1,
                        label: '全部'
                    },{
                        value: 1,
                        label: '较差'
                    },{
                        value: 2,
                        label: '一般'
                    },{
                        value: 3,
                        label: '满意'
                    },{
                        value: 4,
                        label: '超赞'
                    },
                ],
            }
        },

        methods:{

            /**
             * 搜索按钮
             */
            onSubmit() {
                this.pagingScore.pageIndex = 1;
                this.queryOverallStoreScoringRulesList();
            },

            addScoreRule(id){
                setCookie('listData', { ...this.pagingScore, ...this.postData}, 1);
                this.$router.push({'path': `addScoreRule/${id}`})
            },

            /**
             * 选项卡
             */
            handleClick(tab, event) {
                console.log(tab, event);
            },


            /**
             * 页码
             * @param val
             */
            handleSizeChangeScore(val) {
                console.log(`每页 ${val} 条`);
                this.pagingScore.pageSize = val;
                this.queryOverallStoreScoringRulesList();
            },
            handleCurrentChangeScore(val) {
                console.log(`当前页: ${val}`);
                this.pagingScore.pageIndex = val;
                this.queryOverallStoreScoringRulesList();
            },
            queryOverallStoreScoringRulesList() {
                QueryOverallStoreScoringRulesList.call(this, {
                    pageNo: this.pagingScore.pageIndex,
                    pageSize: this.pagingScore.pageSize,
                    ssScoringItems: this.postData.ssScoringItems,
                    ssEvaluate: this.postData.ssEvaluate,
                }).then(res => {
                    if (res.code === 1){
                        this.pagingScore.total = res.data.pageInfo.total;
                        this.scoreList = res.data.pageInfo.list;
                    } else {
                        this.$message.error("查询失败！");
                    }
                });
            },
            delScore(id){
                this.$confirm('此操作将永久删除该规则, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    UpdateOverallStoreScoringRules.call(this, {
                        ssId: id,
                        ssState: 0
                    }).then(res => {
                        if (res.code === 1) {
                            this.$message.success('删除成功！');
                            // this.pagingScore.pageIndex = 1;
                            if (this.pagingScore.total > this.pagingScore.pageSize && this.pagingScore.total % this.pagingScore.pageSize === 1 && this.pagingScore.pageIndex > this.pagingScore.total / this.pagingScore.pageSize) {
                                //删除后 回到上一页
                                --this.pagingScore.pageIndex;
                            }
                            this.queryOverallStoreScoringRulesList();
                        }
                    });
                }).catch(() => {
                    /*this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });*/
                });
            },
            getScoringDesc(val) {
                let _desc = '';
                this.ssScoringItemsOption.map(item =>{
                   if (item.value === val){
                       _desc = item.label;
                   }
                });
                return _desc;
            },
            getEvaluateDesc(val) {
                let _desc = '';
                this.ssEvaluateOption.map(item =>{
                    if (item.value === val){
                        _desc = item.label;
                    }
                });
                return _desc;
            }

        },

        created(){
            if (this.listData){
                this.pagingScore.pageIndex = this.listData.pageIndex;
                this.pagingScore.pageSize = this.listData.pageSize;
                this.postData.ssScoringItems = this.listData.ssScoringItems;
                this.postData.ssEvaluate = this.listData.ssEvaluate;
            }
            this.queryOverallStoreScoringRulesList();
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
