<template>
    <div class="fillcontain">
        <el-card class="box-card mb20">
            <div slot="header">
                <b>订单管理</b>
            </div>
            <div class="text item">
                <div>
                    <el-form
                        :inline="true"
                        :model="queryCondition"
                        class="demo-form-inline"
                    >
                    <el-form-item label="商家类型：">
                            <el-select
                                v-model="queryCondition.shopType"
                                placeholder="请选择商家类型"
                            >
                                <el-option
                                    v-for="(n, idx) in goodsTypes"
                                    :key="idx"
                                    :label="n.label"
                                    :value="n.value"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="订单号:">
                            <el-input
                                v-model="queryCondition.orderNo"
                                placeholder="请输入订单号"
                            ></el-input>
                        </el-form-item>
                        <el-form-item label="订单状态:">
                            <el-select
                                v-model="queryCondition.businessStatus"
                                placeholder="请选择订单状态"
                            >
                                <el-option
                                    v-for="(item, index) in businessStatusOption"
                                    :label="item.label"
                                    :value="item.value"
                                    :key="index"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="支付状态:">
                            <el-select
                                v-model="queryCondition.payStatus"
                                placeholder="请选择支付状态"
                            >
                                <el-option
                                    v-for="(item, index) in payStatusOption"
                                    :label="item.label"
                                    :value="item.value"
                                    :key="index"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="下单时间:">
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
                        <el-form-item label="商家名称">
                            <el-input
                                v-model="queryCondition.shopName"
                                placeholder="请输入商家名称"
                            ></el-input>
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
                class="list-table"
            >
                <el-table-column
                    prop="num"
                    type="index"
                    label="序号"
                    align="center"
                    width="50"
                >
                </el-table-column>
                <el-table-column
                    prop="createTime"
                    label="下单时间"
                    align="center"
                    width="160"
                >
                </el-table-column>
                <el-table-column
                    prop="orderNo"
                    label="订单号"
                    align="center"
                    width="200"
                >
                </el-table-column>
                <el-table-column
                    prop="buyer.nickName"
                    label="用户名称"
                    align="center"
                    minWidth="200"
                    show-overflow-tooltip
                >
                </el-table-column>
                <el-table-column
                    prop="buyer.mobile"
                    label="买家联系电话"
                    align="center"
                    width="130"
                >
                </el-table-column>
                <el-table-column
                    prop="seller.name"
                    label="商家名称"
                    align="center"
                    minWidth="200"
                    show-overflow-tooltip
                >
                </el-table-column>
                <el-table-column
                    prop="Processing"
                    label="商家电话"
                    align="center"
                    width="230"
                >
                    <template slot-scope="scope">
                        <div>
                            <p><label>经办人:</label>{{scope.row.seller.applierPhone}}</p>
                            <p><label>负责人:</label>{{scope.row.seller.managerPhone}}</p>
                            <p> <label>法人:</label>{{scope.row.seller.legalPresonMobile}}</p>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="orderAmount"
                    label="订单金额"
                    align="center"
                    width="80"
                >
                </el-table-column>
                <el-table-column
                    prop="Processing"
                    label="订单状态"
                    align="center"
                    width="80"
                >
                    <template slot-scope="scope">
                        {{getBusinessStatusDesc(scope.row.status)}}
                    </template>
                </el-table-column>
                <el-table-column
                    label="操作"
                    align="center"
                    width="80"
                    fixed="right"
                >
                    <template slot-scope="scope">
                        <el-link
                            type="warning"
                            @click="orderManagementListDetails(scope.row)"
                        >详情</el-link>
                    </template>
                </el-table-column>
            </el-table>
            <div class="list-page">
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
import GetBasicOrderInfoList from '../../../api/customerAffair/getBasicOrderInfoList'



export default {
    components: {
        headTop,
    },
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
                orderNo: "",
                shopName: '',
                shopType: 'goods',
                payStatus: 0,    //支付状态 1：未支付 2:已支付
                businessStatus: 0, //0全部订单，1待付款，2待接单，3待发货，4已发货，5已收货，6已结算，7已取消，8交易关闭
                goodsTitle: "",
                startTime: "",
                endTime: "",
            },
            businessStatusOption: [
                { label: "全部", value: 0 },
                { label: "待付款", value: 1 },
                { label: "待接单", value: 2 },
                { label: "待发货", value: 3 },
                { label: "已发货", value: 4 },
                { label: "已收货", value: 5 },
                { label: "已结算", value: 6 },
                { label: "已取消", value: 7 },
                { label: "交易关闭", value: 8 },
            ],
            payStatusOption: [
                { label: "全部", value: 0 },
                { label: "未支付", value: 1 },
                { label: "已支付", value: 2 },
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
            this.tableList = new Array();
            this.initLoading = true;
            // this.paging.total = 0;
            GetBasicOrderInfoList.call(this, { ...this.queryCondition, ...this.paging }).then(res => {
                console.log(res);
                if (res.Code === 1) {
                    this.paging.total = res.Data.recordCount;
                    this.tableList = res.Data.pageList;
                    console.log(this.tableList, 'this.tableList');
                }
                this.initLoading = false;
            });
        },
        /**
         * 搜索按钮
         */
        onSubmit() {
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
        orderManagementListDetails(row) {
            this.$router.push({ 'path': `orderManagementListDetails/${row.orderNo}` })
        },

        /**
         * 页码
         * @param val
         */
        handleSizeChange(val) {
            this.paging.pageSize = val;
            this.init();
        },
        handleCurrentChange(val) {
            this.paging.pageIndex = val;
            this.init();
        }

    },

    // keep-alive 组件激活时调用，如果不走缓存请使用其他生命周期钩子，例如 mounted
    activated() {
        this.init();

    }
}
</script>

<style lang="less" scoped>
</style>
