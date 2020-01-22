<template>
    <div class="fillcontain">

        <div class="main">

            <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
                <el-tab-pane label="信用计分规则" name="first">
                    <el-card class="box-card mt20">
                        <div class="text item">

                            <div class="mt20">
                                <el-form :inline="true" :model="postData1" class="demo-form-inline">

                                    <el-form-item label="来源分类:">
                                        <el-select v-model="postData1.crType" @change="crTypeChange" placeholder="请选择来源分类">
                                            <el-option label="全部" value=""></el-option>
                                            <el-option v-for="(item, index) in crTypeList" :label="item.dicName" :value="item.code" :key="index"></el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item label="事件:">
                                        <el-select v-model="postData1.crBehavior" placeholder="请选择事件">
                                            <el-option label="全部" value=""></el-option>
                                            <el-option v-for="(item, index) in crBehaviorList" :label="item.dicName" :value="item.code" :key="index"></el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item>
                                        <el-button type="primary" @click="onSubmit">查询<i class="el-icon-search el-icon--right"></i></el-button>
                                        <el-button type="primary" @click="scoringRules(-1)">添加规则</el-button>
                                    </el-form-item>
                                </el-form>
                            </div>
                        </div>
                    </el-card>
                    <el-card class="box-card">
                        <el-table
                            :data="creditRuleList"
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
                                prop="crTypeName"
                                label="来源分类"
                                align="center"
                                width="">
                            </el-table-column>
                            <el-table-column
                                prop="crBehaviorName"
                                label="事件"
                                align="center"
                                width="">
                            </el-table-column>
                            <el-table-column
                                prop="crPlot"
                                label="事件标准"
                                align="center"
                                width="400">
                            </el-table-column>
                            <el-table-column
                                prop="crSeverity"
                                label="严重程度"
                                align="center"
                                width="">
                            </el-table-column>
                            <el-table-column
                                prop="crScore"
                                label="分值"
                                align="center"
                                width="">
                            </el-table-column>
                            <el-table-column
                                prop="crOtherPunish"
                                label="其它处罚/处理"
                                align="center"
                                width="">
                            </el-table-column>
                            <el-table-column
                                prop="crChannerName"
                                label="渠道"
                                align="center"
                                width="">
                            </el-table-column>
                            <el-table-column
                                prop="resultName"
                                label="结果判定"
                                align="center"
                                width="">
                            </el-table-column>
                            <el-table-column
                                prop="executionName"
                                label="执行方式"
                                align="center"
                                width="">
                            </el-table-column>
                            <el-table-column
                                label="操作"
                                align="center"
                                width="">
                                <template slot-scope="scope">
                                    <el-link type="primary" @click="scoringRules(scope.row.crId)">编辑</el-link>
                                    <el-link type="warning" @click="del(scope.row)">删除</el-link>
                                </template>
                            </el-table-column>
                        </el-table>
                        <div class="page">
                            <el-pagination
                                @current-change="pagingCurrentHandlerCredit"
                                @size-change="pagingSizeHandlerCredit"
                                :current-page.sync="pagingCredit.pageIndex"
                                :page-size="pagingCredit.pageSize"
                                :page-sizes="[10, 30, 50, 100]"
                                :total="pagingCredit.total"
                                layout="total, sizes, prev, pager, next, jumper">
                            </el-pagination>
                        </div>
                    </el-card>
                </el-tab-pane>
                <el-tab-pane label="信用分节点处规则" name="second">
                    <el-card class="box-card mt20">
                        <div class="text item">
                            <div class="mt20">
                                <el-form :inline="true" class="demo-form-inline">
                                    <el-form-item>
                                        <el-button type="primary" @click="addNodeRule(-1)">添加规则</el-button>
                                    </el-form-item>
                                </el-form>
                            </div>
                        </div>
                    </el-card>
                    <el-card class="box-card">
                        <el-table
                            :data="nodeList"
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
                                prop="nminScore"
                                label="信用分数"
                                align="center"
                                width="">
                                <template slot-scope="scope">
                                    {{scope.row.nmaxScore > 100 ? scope.row.nminScore +"+分" : (scope.row.nmaxScore <= 50 ? '50分以下' : scope.row.nminScore +"-" + scope.row.nmaxScore+"分")}}
                                </template>
                            </el-table-column>
                            <el-table-column
                                prop="nmarginChanges"
                                label="次年商品保证金"
                                align="center"
                                width="">
                                <template slot-scope="scope">
                                    {{getNmarginChanges(scope.row)}}
                                </template>
                            </el-table-column>
                            <el-table-column
                                prop="nreturnUsagefeeProportion"
                                label="次年平台使用费"
                                align="center"
                                width="">
                                <template slot-scope="scope">
                                    {{scope.row.nreturnUsagefeeProportion > 0 ? "返"+scope.row.nreturnUsagefeeProportion+"%" : scope.row.nreturnUsagefeeProportion}}
                                </template>
                            </el-table-column>
                            <el-table-column
                                prop="npayPenalty"
                                label="支付违约金"
                                align="center"
                                width="">
                                <template slot-scope="scope">
                                    {{scope.row.npayPenalty > 0 ? scope.row.npayPenalty+"元" : scope.row.npayPenalty}}
                                </template>
                            </el-table-column>
                            <el-table-column
                                prop="ncloseShop"
                                label="关闭店铺"
                                align="center"
                                width="">
                                <template slot-scope="scope">
                                    {{scope.row.ncloseShop === 1 ? '不关闭' : '关闭'}}
                                </template>
                            </el-table-column>
                            <el-table-column
                                label="操作"
                                align="center"
                                width="">
                                <template slot-scope="scope">
                                    <el-link type="primary" @click="addNodeRule(scope.row.nid)">编辑</el-link>
                                    <el-link type="warning" @click="delNode(scope.row.nid)">删除</el-link>
                                </template>
                            </el-table-column>
                        </el-table>
                        <div class="page">
                            <el-pagination
                                @size-change="handleSizeChangeNode"
                                @current-change="handleCurrentChangeNode"
                                :current-page="pagingNode.pageIndex"
                                :page-sizes="[10, 30, 50, 100]"
                                :page-size="pagingNode.pageSize"
                                layout="total, sizes, prev, pager, next, jumper"
                                :total="pagingNode.total">
                            </el-pagination>
                        </div>
                    </el-card>
                </el-tab-pane>
                <el-tab-pane label="信用分清零规则" name="third">
                    <el-card class="box-card mt20">
                        <div class="text item">

                            <div class="mt20">
                                <el-form :inline="true" class="demo-form-inline">
                                    <el-form-item>
                                        <el-button type="primary" @click="addZeroRule(-1)">添加规则</el-button>
                                    </el-form-item>
                                </el-form>
                            </div>
                        </div>
                    </el-card>
                    <el-card class="box-card">
                        <el-table
                            :data="zeroList"
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
                                prop="come"
                                label="信用分分数"
                                align="center"
                                width="">
                                <template slot-scope="scope">
                                    {{scope.row.zmaxScore > 100 ? scope.row.zminScore +"+分" : (scope.row.zmaxScore <= 50 ? '50分以下' : scope.row.zminScore +"-" + scope.row.zmaxScore+"分")}}
                                </template>
                            </el-table-column>
                            <el-table-column
                                prop="zzeroClearingRules"
                                label="清零规则"
                                align="center"
                                width="">
                            </el-table-column>
                            <el-table-column
                                prop="notAnswerPhone"
                                label="关闭店铺"
                                align="center"
                                width="">
                                <template slot-scope="scope">
                                    {{scope.row.state ? '不关闭' : '关闭'}}
                                </template>
                            </el-table-column>
                            <el-table-column
                                label="操作"
                                align="center"
                                width="">
                                <template slot-scope="scope">
                                    <el-link type="primary" @click="addZeroRule(scope.row.zid)">编辑</el-link>
                                    <el-link type="warning" @click="delZero(scope.row.zid)">删除</el-link>
                                </template>
                            </el-table-column>
                        </el-table>
                        <div class="page">
                            <el-pagination
                                @size-change="handleSizeChangeZero"
                                @current-change="handleCurrentChangeZero"
                                :current-page="pagingZero.pageIndex"
                                :page-sizes="[10, 30, 50, 100]"
                                :page-size="pagingZero.pageSize"
                                layout="total, sizes, prev, pager, next, jumper"
                                :total="pagingZero.total">
                            </el-pagination>
                        </div>
                    </el-card>
                </el-tab-pane>
            </el-tabs>

        </div>

    </div>
</template>

<script>

    import QueryDictionary from '../../../api/customerAffair/queryDictionary'
    import QueryCreditRuleList from '../../../api/customerAffair/queryCreditRuleList'
    import UpdateCreditRule from '../../../api/customerAffair/updateCreditRule'
    import QueryCreditNodeList from '../../../api/customerAffair/queryCreditNodeList'
    import UpdateCreditNode from '../../../api/customerAffair/updateCreditNode'
    import QueryCreditClearanceList from '../../../api/customerAffair/queryCreditClearanceList'
    import UpdateMerchantCreditClearanceRule from '../../../api/customerAffair/updateMerchantCreditClearanceRule'
    import { setCookie } from '../../../assets/js/store'

    export default {
        props: {
            listData: {
                activeName: '',
                pageIndex: 1, // 当前页
                pageSize: 10, // 每页多少条数据
                total: 0, // 数据总条数
                crType: '', // 类型code码
                crBehavior: '', // 行为code码
            }
        },
        data(){
            return {
                activeName: 'first',

                //---------------------信用
                pagingCredit: { // 分页条件  信用
                    pageIndex: 1, // 当前页
                    pageSize: 10, // 每页多少条数据
                    total: 0 // 数据总条数
                },
                postData1: {
                    crType: '', // 类型code码
                    crBehavior: '', // 行为code码
                },
                crBehaviorList: [], //信用事件列表
                crTypeList: [],  //信用来源列表
                scoreOption: [
                    {
                        label: '全部',
                        value: -1
                    }, {
                        label: '加分',
                        value: 0
                    }, {
                        label: '扣分',
                        value: 1
                    },
                ],
                creditRuleList: [], //信用列表

                // ----------------节点
                pagingNode: { // 分页条件  信用
                    pageIndex: 1, // 当前页
                    pageSize: 10, // 每页多少条数据
                    total: 0 // 数据总条数
                },
                nodeList: [], //节点数据列表

                // ----------------清零
                pagingZero: { // 分页条件  信用
                    pageIndex: 1, // 当前页
                    pageSize: 10, // 每页多少条数据
                    total: 0 // 数据总条数
                },
                zeroList: [], //节点数据列表
            }
        },

        methods:{

            /**
             * 搜索按钮
             */
            onSubmit() {
                // console.log('submit!');
                this.pagingCredit.pageIndex = 1;
                this.queryCreditRuleList();
            },

            scoringRules(crId){
                setCookie('listData', { ...this.pagingCredit, ...this.postData1, activeName: this.activeName }, 1);
                this.$router.push({'path': `scoringRules/${crId}`})
            },

            addNodeRule(nId){
                setCookie('listData', { ...this.pagingNode, activeName: this.activeName }, 1);
                this.$router.push({'path': `addNodeRule/${nId}`})
            },

            addZeroRule(zId){
                setCookie('listData', { ...this.pagingZero, activeName: this.activeName }, 1);
                this.$router.push({'path': `addZeroRule/${zId}`})
            },

            /**
             * 选项卡
             */
            handleClick(tab, event) {
                // console.log(tab, event, 'sssssssssssssssss', tab.name);
                switch (tab.name) {
                    case 'first':
                        if (!this.crTypeList || this.crTypeList.length === 0) {
                            this.queryDictionary();
                        }
                        this.queryCreditRuleList();
                        break;
                    case 'second':
                        this.queryCreditNodeList();
                        break;
                    case 'third':
                        this.queryCreditClearanceList();
                        break;
                }
            },

            /**
             * 删除
             */
            del(row) {
                this.$confirm('此操作将永久删除该规则, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    UpdateCreditRule.call(this, {
                        crId: row.crId,
                        crState: 0
                    }).then(res => {
                        if (res.code === 1) {
                            this.$message.success('删除成功！');
                            // this.pagingCredit.pageIndex = 1;
                            if (this.pagingCredit.total > this.pagingCredit.pageSize && this.pagingCredit.total % this.pagingCredit.pageSize === 1 && this.pagingCredit.pageIndex > this.pagingCredit.total / this.pagingCredit.pageSize) {
                                //删除后 回到上一页
                                --this.pagingCredit.pageIndex;
                            }
                            this.queryCreditRuleList();
                        }
                    });
                }).catch(() => {
                    /*this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });*/
                });
            },

            //-------------------信用
            pagingCurrentHandlerCredit(value) {
                console.log(' 选择页 ==>> ', value)
                this.pagingCredit.pageIndex = value;
                this.queryCreditRuleList();
            },
            pagingSizeHandlerCredit(value) {
                console.log(' 每页数量 ==>> ', value)
                this.pagingCredit.pageSize = value;
                this.queryCreditRuleList();
            },
            //信用列表
            queryCreditRuleList(){
                let _postData = {
                    pageNo: this.pagingCredit.pageIndex, // 页码
                    pageSize: this.pagingCredit.pageSize, // 每页条数
                };
                if (this.postData1.crType) {
                    _postData.crType = this.postData1.crType;
                }
                if (this.postData1.crBehavior) {
                    _postData.crBehavior = this.postData1.crBehavior;
                }
                QueryCreditRuleList.call(this, _postData).then(res => {
                    console.log(res, 'QueryCreditRuleList');
                    if (res.code === 1) {
                        this.creditRuleList = res.data.pageInfo.list;
                        this.pagingCredit.total = res.data.pageInfo.total;
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
                    parentId: code ? code : 1000
                };
                QueryDictionary.call(this, _postData).then(res => {
                    console.log(res, 'queryDictionary');
                    if (res.code === 1) {
                        if (code){
                            //crBehaviorList  事件
                            this.crBehaviorList = res.data.commodityScoreDictionaryList;
                        }else {
                            //crTypeList  分类
                            this.crTypeList = res.data.commodityScoreDictionaryList;
                        }
                    }
                });
            },
            //来源类型改变
            crTypeChange(){
                this.postData1.crBehavior = '';
                this.crBehaviorList = [];
                if (this.postData1.crType) {
                    this.queryDictionary(this.postData1.crType);
                }
            },

            // -------------------------节点处理规则
            queryCreditNodeList() {
                QueryCreditNodeList.call(this, {
                    pageNo: this.pagingNode.pageIndex,
                    pageSize: this.pagingNode.pageSize
                }).then(res => {
                    if (res.code === 1){
                        this.pagingNode.total = res.data.pageInfo.total;
                        this.nodeList = res.data.pageInfo.list;
                    } else {
                        this.$message.error("查询失败！");
                    }
                });
            },
            /**
             * 页码
             * @param val
             */
            handleSizeChangeNode(val) {
                console.log(`每页 ${val} 条`);
                this.pagingNode.pageSize = val;
                this.queryCreditNodeList();
            },
            handleCurrentChangeNode(val) {
                console.log(`当前页: ${val}`);
                this.pagingNode.pageIndex = val;
                this.queryCreditNodeList();
            },
            //次年保证金
            getNmarginChanges(row){
                switch (row.nmarginChanges) {
                    case 1:
                        return '增加'+row.nreduceBondProportion+"%";
                        break;
                    case 2:
                        return '减少'+row.nreduceBondProportion+"%";
                        break;
                    case 3:
                        return '/';
                        break;
                }
            },
            delNode(nId){
                this.$confirm('此操作将永久删除该规则, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    UpdateCreditNode.call(this, {
                        nid: nId,
                        nstate: 0
                    }).then(res => {
                        if (res.code === 1) {
                            this.$message.success('删除成功！');
                            // this.pagingNode.pageIndex = 1;
                            if (this.pagingNode.total > this.pagingNode.pageSize && this.pagingNode.total % this.pagingNode.pageSize === 1 && this.pagingNode.pageIndex > this.pagingNode.total / this.pagingNode.pageSize) {
                                //删除后 回到上一页
                                --this.pagingNode.pageIndex;
                            }
                            this.queryCreditNodeList();
                        }
                    });
                }).catch(() => {
                    /*this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });*/
                });
            },
            // ----------------------------信用分清零
            /**
             * 页码
             * @param val
             */
            handleSizeChangeZero(val) {
                console.log(`每页 ${val} 条`);
                this.pagingZero.pageSize = val;
                this.queryCreditClearanceList();
            },
            handleCurrentChangeZero(val) {
                console.log(`当前页: ${val}`);
                this.pagingZero.pageIndex = val;
                this.queryCreditClearanceList();
            },
            queryCreditClearanceList() {
                QueryCreditClearanceList.call(this, {
                    pageNo: this.pagingZero.pageIndex,
                    pageSize: this.pagingZero.pageSize
                }).then(res => {
                    if (res.code === 1){
                        this.pagingZero.total = res.data.pageInfo.total;
                        this.zeroList = res.data.pageInfo.list;
                    } else {
                        this.$message.error("查询失败！");
                    }
                });
            },
            delZero(zId){
                this.$confirm('此操作将永久删除该规则, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    UpdateMerchantCreditClearanceRule.call(this, {
                        zid: zId,
                        zstate: 0
                    }).then(res => {
                        if (res.code === 1) {
                            this.$message.success('删除成功！');
                            // this.pagingZero.pageIndex = 1;
                            if (this.pagingZero.total > this.pagingZero.pageSize && this.pagingZero.total % this.pagingZero.pageSize === 1 && this.pagingZero.pageIndex > this.pagingZero.total / this.pagingZero.pageSize) {
                                //删除后 回到上一页
                                --this.pagingZero.pageIndex;
                            }
                            this.queryCreditClearanceList();
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
                        this.pagingCredit.pageIndex = this.listData.crBehavior && this.listData.crType ? 1 : this.listData.pageIndex;
                        this.pagingCredit.pageSize = this.listData.pageSize;
                        this.postData1.crType = this.listData.crType;
                        this.postData1.crBehavior = this.listData.crBehavior;
                        this.queryDictionary();
                        this.queryCreditRuleList();
                        if (this.postData1.crType) {
                            this.queryDictionary(this.postData1.crType);
                        }
                        break;
                    case 'second':
                        this.pagingNode.pageIndex = this.listData.pageIndex;
                        this.pagingNode.pageSize = this.listData.pageSize;
                        this.queryCreditNodeList();
                        break;
                    case 'third':
                        this.pagingZero.pageIndex = this.listData.pageIndex;
                        this.pagingZero.pageSize = this.listData.pageSize;
                        this.queryCreditClearanceList();
                        break;
                }
            }else {
                this.queryDictionary();
                this.queryCreditRuleList();
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
