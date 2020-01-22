<template>
    <div class="fillcontain">
        <el-card class="box-card">
            <div slot="header">
                <b>商家信用信誉</b>
                <!--<el-link type="primary" class="fr" @click="ruleUserAdd">新增规则</el-link>-->
            </div>
            <div class="text item">

                <div class="mt20">
                    <el-form
                        :inline="true"
                        :model="queryCondition"
                        class="demo-form-inline"
                    >
                        <el-form-item label="商家名称：">
                            <el-input
                                v-model="queryCondition.shopName"
                                placeholder="请输入商家名称"
                            ></el-input>
                        </el-form-item>
                        <el-form-item label="信誉等级：">
                            <el-select
                                v-model="queryCondition.rgId"
                                placeholder="请选择信誉等级"
                            >
                                <el-option
                                    label="全部"
                                    :value="-1"
                                ></el-option>
                                <el-option
                                    v-for="(item,index) in lvList"
                                    :key="index"
                                    :label="item.rgReputationGrade"
                                    :value="item.rgId"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="最小信用分：">
                            <el-input
                                v-model="queryCondition.minCreditScore"
                                placeholder="请输入最小信用分"
                            ></el-input>
                        </el-form-item>
                        <el-form-item label="最大信用分：">
                            <el-input
                                v-model="queryCondition.maxCreditScore"
                                placeholder="请输入最大信用分"
                            ></el-input>
                        </el-form-item>
                        <el-form-item label="最小信誉分：">
                            <el-input
                                v-model="queryCondition.minReputationScore"
                                placeholder="请输入最小信誉分"
                            ></el-input>
                        </el-form-item>
                        <el-form-item label="最大信誉分：">
                            <el-input
                                v-model="queryCondition.maxReputationScore"
                                placeholder="请输入最大信誉分"
                            ></el-input>
                        </el-form-item>
                        <el-form-item label="时间：">
                            <el-date-picker
                                v-model="queryCondition.startTime"
                                type="datetime"
                                value-format="yyyy-MM-dd HH:mm:ss"
                                :picker-options="pickerOptionsStart"
                                @change="changeStartTime"
                                placeholder="开始时间"
                            >
                            </el-date-picker> -
                            <el-date-picker
                                v-model="queryCondition.endTime"
                                type="datetime"
                                value-format="yyyy-MM-dd HH:mm:ss"
                                :picker-options="pickerOptionsEnd"
                                @change="changeEndTime"
                                placeholder="结束时间"
                            >
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item>
                            <el-button
                                type="primary"
                                @click="onSubmit"
                            >查询<i class="el-icon-search el-icon--right"></i></el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
        </el-card>

        <el-card class="box-card">
            <el-table
                :data="tableList"
                border
                style="width: 100%; margin-top: 20px;"
            >
                <el-table-column
                    prop="num"
                    type="index"
                    label="序号"
                    align="center"
                    width=""
                >
                </el-table-column>
                <el-table-column
                    prop="shopTime"
                    label="开店时间"
                    align="center"
                    width=""
                >
                </el-table-column>
                <el-table-column
                    prop="shopName"
                    label="商家名称"
                    align="center"
                    width=""
                >
                </el-table-column>
                <el-table-column
                    prop="creditScore"
                    label="信用分"
                    align="center"
                    width=""
                >
                </el-table-column>
                <el-table-column
                    prop="reputationScore"
                    label="信誉分"
                    align="center"
                    width=""
                >
                </el-table-column>
                <el-table-column
                    prop="reNames"
                    label="信誉等级"
                    align="center"
                    width=""
                >
                </el-table-column>
                <el-table-column
                    prop="average"
                    label="店铺商品评分"
                    align="center"
                    width=""
                >
                </el-table-column>
                <el-table-column
                    label="操作"
                    align="center"
                    width=""
                >
                    <template slot-scope="scope">
                        <el-link
                            type="warning"
                            @click="businessCreditReputationListDetails(scope.row)"
                        >查看</el-link>
                    </template>
                </el-table-column>
            </el-table>
            <div class="page">
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="paging.pageIndex"
                    :page-sizes="[10, 30, 50, 100]"
                    :page-size="paging.pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="paging.total"
                >
                </el-pagination>
            </div>
        </el-card>
    </div>
</template>

<script>
import headTop from '../../../components/headTop'
import QueryBusinessCreditReputationList from '../../../api/customerAffair/queryBusinessCreditReputationList'
import QueryShopGradeList from '../../../api/customerAffair/queryShopGradeList'

export default {
    components: {
        headTop,
    },
    data() {
        return {
            queryCondition: { // 查询条件
                shopName: '', // 店铺名称
                rgId: -1, // 信誉等级
                startTime: '', // 开始时间
                endTime: '', // 结束时间
                minCreditScore: '', // 最小信用分
                maxCreditScore: '', // 最大信用分
                minReputationScore: '', // 最小信誉分
                maxReputationScore: '', // 最大信誉分
            },
            lvList: [],
            paging: { // 分页条件
                pageIndex: 1, // 当前页
                pageSize: 10, // 每页多少条数据
                total: 0 // 数据总条数
            },
            tableList: [],
            initLoading: false, // 是否显示加载表格数据时的加载动画
            ticker: '',  //定时器
            pickerOptionsStart: {
                disabledDate(time) {

                }
            },
            pickerOptionsEnd: {
                disabledDate(time) {

                }
            },
        }
    },

    methods: {

        //开始时间变化
        changeStartTime() {
            let _start = Date.parse(this.queryCondition.startTime);
            let _end = Date.parse(this.queryCondition.endTime);
            if (_start > _end) {
                this.queryCondition.endTime = '';
            }
            console.log(_start, _end, 'changeStartTime');
            this.pickerOptionsEnd = {
                disabledDate: (time) => {
                    if (this.queryCondition.startTime && this.queryCondition.startTime !== '') {
                        return time.getTime() - 86400000 < _start;
                    }
                }
            }
        },
        //结束时间变化
        changeEndTime() {
            let _start = Date.parse(this.queryCondition.startTime);
            let _end = Date.parse(this.queryCondition.endTime);
            if (_start > _end) {
                this.queryCondition.startTime = '';
            }
            console.log(_start, _end, 'changeEndTime');
            this.pickerOptionsStart = {
                disabledDate: (time) => {
                    if (this.queryCondition.endTime && this.queryCondition.endTime !== '') {
                        return time.getTime() + 86400000 > _end;
                    }
                }
            }
        },
        init() {
            this.tableList = new Array();
            this.initLoading = true;
            let _postData = {};
            _postData.pageNo = this.paging.pageIndex;
            _postData.pageSize = this.paging.pageSize;
            if (this.queryCondition.shopName) {
                _postData.shopName = this.queryCondition.shopName;
            }
            if (this.queryCondition.startTime) {
                _postData.startTime = this.queryCondition.startTime;
            }
            if (this.queryCondition.endTime) {
                _postData.endTime = this.queryCondition.endTime;
            }
            _postData.minCreditScore = this.queryCondition.minCreditScore ? this.queryCondition.minCreditScore : 0.1;
            _postData.maxCreditScore = this.queryCondition.maxCreditScore ? this.queryCondition.maxCreditScore : 0.1;
            _postData.minReputationScore = this.queryCondition.minReputationScore ? this.queryCondition.minReputationScore : 0.1;
            _postData.maxReputationScore = this.queryCondition.maxReputationScore ? this.queryCondition.maxReputationScore : 0.1;
            _postData.rgId = this.queryCondition.rgId ? this.queryCondition.rgId : -1;
            // this.paging.total = 0;
            QueryBusinessCreditReputationList.call(this, _postData).then(res => {
                console.log(res);
                if (res.code === 1) {
                    this.paging.total = res.data.pageInfo.total;
                    this.tableList = res.data.pageInfo.list;
                    console.log(this.tableList, 'this.tableList');
                }
                this.initLoading = false;
            });
        },
        getLv() {
            QueryShopGradeList.call(this).then(res => {
                console.log(res);
                if (res.code === 1) {
                    this.lvList = res.data.merchantReputationGradeList;
                    console.log(this.lvList, 'this.lvList');
                }
            });
        },
        /**
         * 搜索按钮
         */
        onSubmit() {
            this.paging.pageIndex = 1;
            this.init();
        },
        getBusinessStatusDesc(status) {
            let _desc = '';
            this.businessStatusOption.map(item => {
                if (item.value === status) {
                    _desc = item.label;
                }
            });
            return _desc;
        },

        businessCreditReputationListDetails(row) {
            this.$router.push({ 'path': `businessCreditReputationListDetails/${row.shopId}` })
        },

        /**
         * 页码
         * @param val
         */
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
            this.paging.pageSize = val;
            this.init();
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
            this.paging.pageIndex = val;
            this.init();
        }

    },
    // keep-alive 组件激活时调用，如果不走缓存请使用其他生命周期钩子，例如 mounted
    activated() {
        this.getLv();
        this.init();
    }

}
</script>

<style lang="less" scoped>
.box-card {
    margin-bottom: 20px;
}
.page {
    text-align: right;
    padding: 20px;
}
</style>
