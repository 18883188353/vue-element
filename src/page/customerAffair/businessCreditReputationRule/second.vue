<template>
    <div class="fillcontain">

        <div class="main">

            <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
                <el-tab-pane label="信誉计分规则" name="first">
                    <el-card class="box-card mt20">
                        <div class="text item">

                            <div class="mt20">
                                <el-form :inline="true" :model="postData" class="demo-form-inline">

                                    <el-form-item label="来源分类:">
                                        <el-select v-model="postData.reType" @change="reTypeChange" placeholder="请选择来源分类">
                                            <el-option label="全部" value=""></el-option>
                                            <el-option v-for="(item, index) in reTypeList" :label="item.dicName" :value="item.code" :key="index"></el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item label="事件:">
                                        <el-select v-model="postData.reEvent" placeholder="请选择事件">
                                            <el-option label="全部" value=""></el-option>
                                            <el-option v-for="(item, index) in reEventList" :label="item.dicName" :value="item.code" :key="index"></el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item>
                                        <el-button type="primary" @click="onSubmit">查询<i class="el-icon-search el-icon--right"></i></el-button>
                                        <el-button type="primary" @click="reputationScoringRule(-1)">添加规则</el-button>
                                    </el-form-item>

                                </el-form>
                            </div>
                        </div>
                    </el-card>
                    <el-card class="box-card">
                        <el-table
                            :data="reputationRuleList"
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
                                prop="reTypeName"
                                label="来源分类"
                                align="center"
                                width="">
                            </el-table-column>
                            <el-table-column
                                prop="reEventName"
                                label="事件"
                                align="center"
                                width="">
                            </el-table-column>
                            <el-table-column
                                prop="reEventStandard"
                                label="事件标准"
                                align="center"
                                width="">
                            </el-table-column>
                            <el-table-column
                                prop="reScore"
                                label="分值"
                                align="center"
                                width="">
                            </el-table-column>
                            <el-table-column
                                prop="reChannelName"
                                label="渠道"
                                align="center"
                                width="">
                            </el-table-column>
                            <el-table-column
                                prop="reResultJudgementName"
                                label="结果判定"
                                align="center"
                                width="">
                            </el-table-column>
                            <el-table-column
                                prop="reModeExecutionName"
                                label="执行方式"
                                align="center"
                                width="">
                            </el-table-column>
                            <el-table-column
                                label="操作"
                                align="center"
                                width="">
                                <template slot-scope="scope">
                                    <el-link type="primary" @click="reputationScoringRule(scope.row.reId)">编辑</el-link>
                                    <el-link type="warning" @click="del(scope.row.reId)">删除</el-link>
                                </template>
                            </el-table-column>
                        </el-table>
                        <div class="page">
                            <el-pagination
                                @current-change="pagingCurrentHandlerReputation"
                                @size-change="pagingSizeHandlerReputation"
                                :current-page.sync="pagingReputation.pageIndex"
                                :page-size="pagingReputation.pageSize"
                                :page-sizes="[10, 30, 50, 100]"
                                :total="pagingReputation.total"
                                layout="total, sizes, prev, pager, next, jumper">
                            </el-pagination>
                        </div>
                    </el-card>
                </el-tab-pane>
                <!-- <el-tab-pane label="信誉等级规则" name="second">
                    <el-card class="box-card mt20">
                        <div class="text item">
                            <div class="mt20">
                                <el-form :inline="true" class="demo-form-inline">
                                    <el-form-item>
                                        <el-button type="primary" @click="addGradeRule(-1)">添加规则</el-button>
                                    </el-form-item>
                                </el-form>
                            </div>
                        </div>
                    </el-card>
                    <el-card class="box-card">
                        <el-table
                            :data="gradeList"
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
                                prop="rgMinScore"
                                label="信用分数"
                                align="center"
                                width="">
                                <template slot-scope="scope">
                                    {{scope.row.rgMaxScore > 30000 ? scope.row.rgMinScore +"+分" : scope.row.rgMinScore +"-" + scope.row.rgMaxScore+"分"}}
                                </template>
                            </el-table-column>
                            <el-table-column
                                prop="rgReputationGrade"
                                label="荣誉等级"
                                align="center"
                                width="">
                            </el-table-column>
                            <el-table-column
                                label="操作"
                                align="center"
                                width="">
                                <template slot-scope="scope">
                                    <el-link type="primary" @click="addGradeRule(scope.row.rgId)">编辑</el-link>
                                    <el-link type="warning" @click="delGrade(scope.row.rgId)">删除</el-link>
                                </template>
                            </el-table-column>
                        </el-table>
                        <div class="page">
                            <el-pagination
                                @size-change="handleSizeChangeGrade"
                                @current-change="handleCurrentChangeGrade"
                                :current-page="pagingGrade.pageIndex"
                                :page-sizes="[10, 30, 50, 100]"
                                :page-size="pagingGrade.pageSize"
                                layout="total, sizes, prev, pager, next, jumper"
                                :total="pagingGrade.total">
                            </el-pagination>
                        </div>
                    </el-card>
                </el-tab-pane>
                <el-tab-pane label="信誉权益规则" name="third">
                    <el-card class="box-card mt20">
                        <div class="text item">

                            <div class="mt20">
                                <el-form :inline="true" class="demo-form-inline">
                                    <el-form-item>
                                        <el-button type="primary" @click="addEquityRule(-1)">添加规则</el-button>
                                    </el-form-item>
                                </el-form>
                            </div>
                        </div>
                    </el-card>
                    <el-card class="box-card">
                        <el-table
                            :data="equityList"
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
                                prop="reMinScore"
                                label="信誉分数"
                                align="center"
                                width="">
                                <template slot-scope="scope">
                                    {{scope.row.reMinScore > 50000 ? "50001分以上" : scope.row.reMinScore +"-" + scope.row.reMaxScore+"分"}}
                                </template>
                            </el-table-column>
                            <el-table-column
                                prop="reNextAdvertisingFeeProportion"
                                label="次年广告位费用"
                                align="center"
                                width="">
                                <template slot-scope="scope">
                                    {{"减少"+scope.row.reNextAdvertisingFeeProportion+"%"}}
                                </template>
                            </el-table-column>
                            <el-table-column
                                prop="reNextHotsearchProportion"
                                label="次年热搜词费用"
                                align="center"
                                width="">
                                <template slot-scope="scope">
                                    {{"减少"+scope.row.reNextHotsearchProportion+"%"}}
                                </template>
                            </el-table-column>
                            <el-table-column
                                prop="reNextBondProportion"
                                label="次年商品保证金"
                                align="center"
                                width="">
                                <template slot-scope="scope">
                                    {{"减少"+scope.row.reNextBondProportion+"%"}}
                                </template>
                            </el-table-column>
                            <el-table-column
                                prop="reReturnUsagefeeProportion"
                                label="次年平台使用年费"
                                align="center"
                                width="">
                                <template slot-scope="scope">
                                    {{"减少"+scope.row.reReturnUsagefeeProportion+"%"}}
                                </template>
                            </el-table-column>
                            <el-table-column
                                label="操作"
                                align="center"
                                width="">
                                <template slot-scope="scope">
                                    <el-link type="primary" @click="addEquityRule(scope.row.reId)">编辑</el-link>
                                    <el-link type="warning" @click="delEquity(scope.row.reId)">删除</el-link>
                                </template>
                            </el-table-column>
                        </el-table>
                        <div class="page">
                            <el-pagination
                                @size-change="handleSizeChangeEquity"
                                @current-change="handleCurrentChangeEquity"
                                :current-page="pagingEquity.pageIndex"
                                :page-sizes="[10, 30, 50, 100]"
                                :page-size="pagingEquity.pageSize"
                                layout="total, sizes, prev, pager, next, jumper"
                                :total="pagingEquity.total">
                            </el-pagination>
                        </div>
                    </el-card>
                </el-tab-pane> -->
            </el-tabs>

        </div>

    </div>
</template>

<script>

    import QueryDictionary from '../../../api/customerAffair/queryDictionary'
    import QueryReputationRuleList from '../../../api/customerAffair/queryReputationRuleList'
    import UpdateReputationRule from '../../../api/customerAffair/updateReputationRule'
    import QueryReputationGradeList from '../../../api/customerAffair/queryReputationGradeList'
    import UpdateReputationGrade from '../../../api/customerAffair/updateReputationGrade'
    import QueryReputationEquityList from '../../../api/customerAffair/queryReputationEquityList'
    import UpdateMerchantReputationEquity from '../../../api/customerAffair/updateMerchantReputationEquity'
    import { setCookie } from '../../../assets/js/store'

    export default {
        props: {
            listData: {
                activeName: '',
                pageIndex: 1, // 当前页
                pageSize: 10, // 每页多少条数据
                total: 0, // 数据总条数
                reType: '', // 类型code码
                reEvent: '', // 行为code码
            }
        },
        data(){
            return {
                activeName: 'first',

                // --------------------------- 信誉计分规则
                pagingReputation: { // 分页条件  信用
                    pageIndex: 1, // 当前页
                    pageSize: 10, // 每页多少条数据
                    total: 0 // 数据总条数
                },
                postData: {
                    reType: '', // 类型code码
                    reEvent: '', // 行为code码
                },
                reEventList: [], //信用事件列表
                reTypeList: [],  //信用来源列表
                reputationRuleList: [], //信誉列表

                // --------------------------- 信誉等级规则
                pagingGrade: { // 分页条件  信用
                    pageIndex: 1, // 当前页
                    pageSize: 10, // 每页多少条数据
                    total: 0 // 数据总条数
                },
                gradeList: [], //等级数据列表

                // --------------------------- 信誉权益规则
                pagingEquity: { // 分页条件  信用
                    pageIndex: 1, // 当前页
                    pageSize: 10, // 每页多少条数据
                    total: 0 // 数据总条数
                },
                equityList: [], //权益数据列表
            }
        },

        methods:{

            /**
             * 搜索按钮
             */
            onSubmit() {
                this.pagingReputation.pageIndex = 1;
                this.queryReputationRuleList();
            },

            reputationScoringRule(id){
                setCookie('listData', { ...this.pagingReputation, ...this.postData, activeName: this.activeName }, 1);
                this.$router.push({'path': `reputationScoringRule/${id}`})
            },

            addGradeRule(id){
                setCookie('listData', { ...this.pagingGrade, activeName: this.activeName }, 1);
                this.$router.push({'path': `addGradeRule/${id}`})
            },

            addEquityRule(id){
                setCookie('listData', { ...this.pagingEquity, activeName: this.activeName }, 1);
                this.$router.push({'path': `addEquityRule/${id}`})
            },

            /**
             * 选项卡
             */
            handleClick(tab, event) {
                switch (tab.name) {
                    case 'first':
                        if (!this.reTypeList || this.reTypeList.length === 0) {
                            this.queryDictionary();
                        }
                        this.queryReputationRuleList();
                        break;
                    case 'second':
                        this.queryReputationGradeList();
                        break;
                    case 'third':
                        this.queryReputationEquityList();
                        break;
                }
            },

            /**
             * 删除
             */
            del(reId) {
                this.$confirm('此操作将永久删除该规则 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    UpdateReputationRule.call(this, {
                        reId: reId,
                        reState: 0
                    }).then(res => {
                        if (res.code === 1) {
                            this.$message.success('删除成功！');
                            // this.pagingReputation.pageIndex = 1;
                            if (this.pagingReputation.total > this.pagingReputation.pageSize && this.pagingReputation.total % this.pagingReputation.pageSize === 1 && this.pagingReputation.pageIndex > this.pagingReputation.total / this.pagingReputation.pageSize) {
                                //删除后 回到上一页
                                --this.pagingReputation.pageIndex;
                            }
                            this.queryReputationRuleList();
                        }
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },

            // -------------------------- 信誉计分规则
            pagingCurrentHandlerReputation(value) {
                console.log(' 选择页 ==>> ', value)
                this.pagingReputation.pageIndex = value;
                this.queryReputationRuleList();
            },
            pagingSizeHandlerReputation(value) {
                console.log(' 每页数量 ==>> ', value)
                this.pagingReputation.pageSize = value;
                this.queryReputationRuleList();
            },
            //信用列表
            queryReputationRuleList(){
                let _postData = {
                    pageNo: this.pagingReputation.pageIndex, // 页码
                    pageSize: this.pagingReputation.pageSize, // 每页条数
                };
                if (this.postData.reType) {
                    _postData.reType = this.postData.reType;
                }
                if (this.postData.reEvent) {
                    _postData.reEvent = this.postData.reEvent;
                }
                QueryReputationRuleList.call(this, _postData).then(res => {
                    console.log(res, 'QueryReputationRuleList');
                    if (res.code === 1) {
                        this.reputationRuleList = res.data.pageInfo.list;
                        this.pagingReputation.total = res.data.pageInfo.total;
                    }else {
                        this.$message.error("操作失败！");
                    }
                });
            },
            /**
             * 来源字典  code 如果有参数，则就是查事件
             */
            queryDictionary(code){
                let _postData = {
                    handIs: -1,
                    parentId: code ? code : 2000
                };
                QueryDictionary.call(this, _postData).then(res => {
                    console.log(res, 'queryDictionary');
                    if (res.code === 1) {
                        if (code){
                            //reEventList  事件
                            this.reEventList = res.data.commodityScoreDictionaryList;
                        }else {
                            //reTypeList  分类
                            this.reTypeList = res.data.commodityScoreDictionaryList;
                        }
                    }
                });
            },
            //来源类型改变
            reTypeChange(){
                this.postData.reEvent = '';
                this.reEventList = [];
                if (this.postData.reType) {
                    this.queryDictionary(this.postData.reType);
                }
            },
            // -------------------------- 信誉等级规则
            queryReputationGradeList() {
                QueryReputationGradeList.call(this, {
                    pageNo: this.pagingGrade.pageIndex,
                    pageSize: this.pagingGrade.pageSize
                }).then(res => {
                    if (res.code === 1){
                        this.pagingGrade.total = res.data.pageInfo.total;
                        this.gradeList = res.data.pageInfo.list;
                    } else {
                        this.$message.error("查询失败！");
                    }
                });
            },
            /**
             * 页码
             * @param val
             */
            handleSizeChangeGrade(val) {
                console.log(`每页 ${val} 条`);
                this.pagingGrade.pageSize = val;
                this.queryReputationGradeList();
            },
            handleCurrentChangeGrade(val) {
                console.log(`当前页: ${val}`);
                this.pagingGrade.pageIndex = val;
                this.queryReputationGradeList();
            },
            //次年保证金
            delGrade(id){
                this.$confirm('此操作将永久删除该规则, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    UpdateReputationGrade.call(this, {
                        rgId: id,
                        rgState: 0
                    }).then(res => {
                        if (res.code === 1) {
                            this.$message.success('删除成功！');
                            // this.pagingGrade.pageIndex = 1;
                            if (this.pagingGrade.total > this.pagingGrade.pageSize && this.pagingGrade.total % this.pagingGrade.pageSize === 1 && this.pagingGrade.pageIndex > this.pagingGrade.total / this.pagingGrade.pageSize) {
                                //删除后 回到上一页
                                --this.pagingGrade.pageIndex;
                            }
                            this.queryReputationGradeList();
                        }
                    });
                }).catch(() => {
                    /*this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });*/
                });
            },


            // -------------------------- 信誉权益规则
            /**
             * 页码
             * @param val
             */
            handleSizeChangeEquity(val) {
                console.log(`每页 ${val} 条`);
                this.pagingEquity.pageSize = val;
                this.queryReputationEquityList();
            },
            handleCurrentChangeEquity(val) {
                console.log(`当前页: ${val}`);
                this.pagingEquity.pageIndex = val;
                this.queryReputationEquityList();
            },
            queryReputationEquityList() {
                QueryReputationEquityList.call(this, {
                    pageNo: this.pagingEquity.pageIndex,
                    pageSize: this.pagingEquity.pageSize
                }).then(res => {
                    if (res.code === 1){
                        this.pagingEquity.total = res.data.pageInfo.total;
                        this.equityList = res.data.pageInfo.list;
                    } else {
                        this.$message.error("查询失败！");
                    }
                });
            },
            delEquity(id){
                this.$confirm('此操作将永久删除该规则, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    UpdateMerchantReputationEquity.call(this, {
                        reId: id,
                        reState: 0
                    }).then(res => {
                        if (res.code === 1) {
                            this.$message.success('删除成功！');
                            // this.pagingEquity.pageIndex = 1;
                            if (this.pagingEquity.total > this.pagingEquity.pageSize && this.pagingEquity.total % this.pagingEquity.pageSize === 1 && this.pagingEquity.pageIndex > this.pagingEquity.total / this.pagingEquity.pageSize) {
                                //删除后 回到上一页
                                --this.pagingEquity.pageIndex;
                            }
                            this.queryReputationEquityList();
                        }
                    });
                }).catch(() => {
                    /*this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });*/
                });
            },

        },

        created(){
            if (this.listData){
                this.activeName = this.listData.activeName;
                switch (this.activeName) {
                    case 'first':
                        this.pagingReputation.pageIndex = this.listData.reEvent && this.listData.reType ? 1 : this.listData.pageIndex;
                        this.pagingReputation.pageSize = this.listData.pageSize;
                        this.postData.reType = this.listData.reType;
                        this.postData.reEvent = this.listData.reEvent;
                        this.queryDictionary();
                        this.queryReputationRuleList();
                        if (this.postData.reType) {
                            this.queryDictionary(this.postData.reType);
                        }
                        break;
                    case 'second':
                        this.pagingGrade.pageIndex = this.listData.pageIndex;
                        this.pagingGrade.pageSize = this.listData.pageSize;
                        this.queryReputationGradeList();
                        break;
                    case 'third':
                        this.pagingEquity.pageIndex = this.listData.pageIndex;
                        this.pagingEquity.pageSize = this.listData.pageSize;
                        this.queryReputationEquityList();
                        break;
                }
            }else {
                this.queryDictionary();
                this.queryReputationRuleList();
            }
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
