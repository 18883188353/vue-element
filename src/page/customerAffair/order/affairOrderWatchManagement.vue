<template>
    <div>
        <el-card class="box-card mb20">
            <div slot="header">
                <b>订单监控管理列表</b>
            </div>
            <div class="text item">
                <div>
                    <el-form
                        :inline="true"
                        :model="queryCondition"
                        class="demo-form-inline"
                    >
                        <!-- <el-form-item label="商家类型：">
                            <el-select
                                v-model="queryCondition.goodsType"
                                placeholder="请选择商家类型"
                            >
                                <el-option
                                    v-for="(n, idx) in goodsTypes"
                                    :key="idx"
                                    :label="n.label"
                                    :value="n.value"
                                ></el-option>
                            </el-select>
                        </el-form-item> -->
                        <el-form-item label="订单号：">
                            <el-input
                                v-model="queryCondition.orderNo"
                                placeholder="订单号"
                            ></el-input>
                        </el-form-item>
                        <el-form-item label="商家名称：">
                            <el-input
                                v-model="queryCondition.shopName"
                                placeholder="商家名称"
                            ></el-input>
                        </el-form-item>
                        <el-form-item label="买家名称：">
                            <el-input
                                v-model="queryCondition.buyerName"
                                placeholder="买家名称"
                            ></el-input>
                        </el-form-item>
                        <el-form-item label="订单状态：">
                            <el-select
                                v-model="queryCondition.orderState"
                                placeholder="订单状态"
                            >
                                <el-option
                                    value=""
                                    label="全部"
                                >全部</el-option>
                                <el-option
                                    v-for="(item, index) in orderStateOption"
                                    :label="item.label"
                                    :value="item.label"
                                    :key="index"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="处理状态：">
                            <el-select
                                v-model="queryCondition.settleState"
                                placeholder="处理状态"
                            >
                                <el-option
                                    v-for="(item, index) in settleStateOption"
                                    :label="item.label"
                                    :value="item.value"
                                    :key="index"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="下单时间：">
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
                                @click="init"
                            >查询</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
        </el-card>
        <el-card class="box-card">
            <el-table
                :data="tableList"
                v-loading="initLoading"
                border
                style="width: 100%; margin-top: 20px;"
            >
                <el-table-column
                    label="序号"
                    type="index"
                    prop="num"
                    align="center"
                    minWidth="50"
                    :show-overflow-tooltip="true"
                >
                </el-table-column>
                <el-table-column
                    prop="order_no"
                    label="订单号"
                    align="center"
                    minWidth="150"
                    :show-overflow-tooltip="true"
                >
                </el-table-column>
                <el-table-column
                    prop="order_amount"
                    label="金额"
                    align="center"
                    width="160"
                >
                </el-table-column>
                <el-table-column
                    prop="shop_name"
                    label="商家"
                    align="center"
                    width="160"
                >
                </el-table-column>
                <el-table-column
                    prop="buyer_name"
                    label="买家"
                    align="center"
                    width="160"
                >
                </el-table-column>
                <el-table-column
                    prop="payment_time"
                    label="下单时间"
                    align="center"
                    width="160"
                >
                </el-table-column>
                <el-table-column
                    prop="order_state"
                    label="订单状态"
                    align="center"
                    width="200"
                >
                </el-table-column>
                <el-table-column
                    label="处理状态"
                    align="center"
                    width="160"
                >
                    <template slot-scope="scope">
                        {{getSettleStateDesc(scope.row.settle_state)}}
                    </template>
                </el-table-column>
                <el-table-column
                    prop="mobile"
                    label="倒计时"
                    align="center"
                    width="160"
                >
                    <template slot-scope="scope">
                        {{time(scope.row.lave_time)}}
                    </template>
                </el-table-column>
                <el-table-column
                    prop="taskId"
                    label="操作"
                    align="center"
                    fixed="right"
                    width="150"
                >
                    <template slot-scope="scope">
                        <el-button
                            :type="scope.row.settle_state === 3 ? '' : 'primary'"
                            @click="auditCheckInDetails(scope.row)"
                        >{{scope.row.settle_state === 3 ? '详情' : '处理'}}</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="page">
                <el-pagination
                    :small="true"
                    @current-change="pagingCurrentHandler"
                    @size-change="pagingSizeHandler"
                    :current-page.sync="paging.pageIndex"
                    :page-size="paging.pageSize"
                    :page-sizes="[10, 30, 50, 100]"
                    :total="paging.total"
                    layout="total, sizes, prev, pager, next"
                >
                </el-pagination>
            </div>
        </el-card>
    </div>
</template>

<script>

import QueryOrderMonitorList from '../../../api/customerAffair/queryOrderMonitorList'

export default {
    components: {},
    data() {
        return {
            goodsTypes: [{
                value: 'goods',
                label: '国内购'
            }, {
                value: 'global',
                label: '全球购'
            }, {
                value: 'luxury',
                label: '奢侈品'
            }],
            queryCondition: { // 查询条件
                orderNo: '',
                orderState: '待接单', //订单状态
                // goodsType: 'goods',
                shopName: '',// 商家名称
                buyerName: '',//卖家名称
                startTime: '',// 筛选开始时间
                endTime: '',// 筛选结束时间
                settleState: '', // 0已发送短信 1 自动拨打 2 人工拨打 3 处理完毕
                settleResult: '', // 0 成功 1 未接通 2未接听 3一接听 4失败
                pageNumber: 1,
                pageSize: 10,
            },
            orderStateOption: [
                { label: "待接单", value: 0 },
                { label: "待发货", value: 1 },
                { label: "已发货", value: 2 },
                { label: "待收货", value: 3 },
                { label: "取消订单", value: 4 },
                { label: "已结算", value: 5 },
                { label: "已关闭", value: 6 },
                { label: "售后", value: 7 },
            ],
            settleStateOption: [
                { label: "全部", value: '' },
                { label: "已发送短信", value: 0 },
                { label: "自动拨打电话", value: 1 },
                { label: "人工处理中", value: 2 },
                { label: "人工处理完毕", value: 3 },
            ],
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
    // keep-alive 组件激活时调用，如果不走缓存请使用其他生命周期钩子，例如 mounted
    activated() {
        this.init();
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
            //清除定时器
            this.endTimer();
            this.tableList = new Array();
            this.initLoading = true;
            // this.paging.total = 0;
            this.queryCondition.pageNumber = this.paging.pageIndex;
            this.queryCondition.pageSize = this.paging.pageSize;
            QueryOrderMonitorList.call(this, this.queryCondition).then(res => {
                console.log(res);
                if (res.Code === 1) {
                    this.paging.total = res.Data.total;
                    res.Data.list.map(item => {
                        item.lave_time = item.down_time - new Date().getTime();
                    });
                    this.tableList = res.Data.list;
                    this.$nextTick(() => {
                        this.beginTimer();
                    })
                    console.log(this.tableList, 'this.tableList');
                }
                this.initLoading = false;
            });
        },
        time(time) {
            if (time > 0) {
                let d = Math.floor(time / 1000 / 60 / 60 / 24);
                let h = Math.floor((time / 1000 / 60 / 60) % 24);
                let m = Math.floor((time / 1000 / 60) % 60);
                let s = Math.floor((time / 1000) % 60);
                let _hh = h > 9 ? h + '' : '0' + h;
                let _mm = m > 9 ? m + '' : '0' + m;
                let _ss = s > 9 ? s + '' : '0' + s;
                return _hh + ':' + _mm + ':' + _ss;
            } else {
                return '超时'
            }
        },
        //开启倒计时 定时器
        beginTimer() { //这个计时器是每秒减去数组中指定字段的时间
            this.ticker = setInterval(() => {
                for (let i = 0, len = this.tableList.length; i < len; i++) {
                    const item = this.tableList[i];
                    if (item.lave_time > 0) {
                        item.lave_time = item.lave_time - 1000;
                    }
                }
            }, 1000);
        },
        //关闭定时器
        endTimer() {
            if (this.ticker !== '') {
                clearInterval(this.ticker);
            }
        },
        pagingCurrentHandler(value) {
            console.log(' 选择页 ==>> ', value)
            this.paging.pageIndex = value;
            this.init();
        },
        pagingSizeHandler(value) {
            console.log(' 每页数量 ==>> ', value)
            this.paging.pageSize = value;
            this.init();
        },
        getSettleStateDesc(status) {
            let _desc = '';
            this.settleStateOption.map(item => {
                if (item.value === status) {
                    _desc = item.label;
                }
            });
            return _desc;
        },

        /**
         * 搜索按钮
         */
        onSubmit() {
            console.log('submit!');
        },
        auditCheckInDetails(row) {
            this.$router.push({ 'path': `affairOrderWatchManagementDetail/${row.mon_id}` });
        }

    }
}
</script>

<style lang="less" scoped>
.page {
    text-align: right;
    padding: 20px;
}
</style>
