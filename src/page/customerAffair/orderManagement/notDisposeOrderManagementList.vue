<template>
    <div class="fillcontain">
        <el-dialog
            title="回访未接单商家"
            :visible.sync="dialogFormVisible"
        >
            <el-form
                :model="visitInfo"
                label-width="100px"
            >
                <el-form-item label="订单号：">
                    {{ visitInfo.orderNo }}
                </el-form-item>
                <el-form-item label="回访记录：">
                    <el-input
                        type="textarea"
                        :autosize="{ minRows: 6, maxRows: 20 }"
                        placeholder="请输入内容"
                        :disabled="visitDisabled"
                        v-model="visitInfo.visitInfo"
                    >
                    </el-input>
                </el-form-item>
            </el-form>
            <div
                slot="footer"
                class="dialog-footer"
            >
                <el-button @click="dialogFormVisible = false">关闭</el-button>
                <el-button
                    v-if="!visitDisabled"
                    type="primary"
                    @click="submitVisit"
                >提交</el-button>
            </div>
        </el-dialog>
        <el-card class="box-card mb20">
            <div slot="header">
                <b>商家未处理自动取消订单列表</b>
            </div>
            <div class="text item">
                <div>
                    <el-form
                        ref="queryForm"
                        :model="queryCondition"
                        :inline="true"
                        class="demo-form-inline"
                    >
                        <el-form-item
                            label="订单号:"
                            prop="orderNo"
                        >
                            <el-input
                                v-model="queryCondition.orderNo"
                                placeholder="请输入订单号"
                            ></el-input>
                        </el-form-item>
                        <el-form-item
                            label="状态:"
                            prop="status"
                        >
                            <el-select
                                v-model="queryCondition.status"
                                placeholder="请选择状态"
                            >
                                <el-option
                                    label="未回访"
                                    :value="1"
                                >
                                </el-option>
                                <el-option
                                    label="已回访"
                                    :value="2"
                                >
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item
                            label="取消时间:"
                            prop="queryTime"
                        >
                            <el-date-picker
                                v-model="queryCondition.queryTime"
                                type="datetimerange"
                                value-format="yyyy-MM-dd HH:mm:ss"
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期"
                            >
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item>
                            <el-button
                                type="primary"
                                @click="init"
                            >查询</el-button>
                            <el-button @click="resetForm">重置</el-button>
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
                    prop="cancelTime"
                    label="取消时间"
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
                    prop="Processing"
                    label="商家电话"
                    align="center"
                    width="230"
                >
                    <template slot-scope="scope">
                        <div>
                            <p class="xhx"><label>经办人:</label>{{scope.row.seller.applierPhone}}</p>
                            <p class="xhx"><label>负责人:</label>{{scope.row.seller.managerPhone}}</p>
                            <p class="xhx"><label>法人:</label>{{scope.row.seller.legalPresonMobile}}</p>
                        </div>
                    </template>
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
                    prop="orderAmount"
                    label="订单金额"
                    align="center"
                    width="100"
                >
                    <template slot-scope="scope">
                        <b style="font-size: 12px;color: #6b8f66;">￥{{ scope.row.orderAmount }}</b>
                    </template>
                </el-table-column>
                <el-table-column
                    label="操作"
                    align="center"
                    width="90"
                    fixed="right"
                >
                    <template slot-scope="scope">
                        <el-link
                            v-if="scope.row.status === 2"
                            type="primary"
                            @click="openVisitDialog(scope.row)"
                        >回访详情</el-link>
                        <el-link
                            v-else
                            type="warning"
                            @click="openVisitDialog(scope.row)"
                        >回访</el-link>
                        <el-link
                            type="primary"
                            @click="orderManagementListDetails(scope.row)"
                        >订单详情</el-link>
                    </template>
                </el-table-column>
            </el-table>
            <div class="list-page">
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

import headTop from '../../../components/headTop'
//import GetBasicOrderInfoList from '../../../api/customerAffair/getBasicOrderInfoList'
import GetOrderUntreatedList from '../../../api/customerAffair/order/getOrderUntreatedList'
import SubmitOrderUntreatedVisit from '../../../api/customerAffair/order/submitOrderUntreatedVisit'

export default {
    components: {
        headTop,
    },
    data() {
        return {
            queryCondition: { // 查询条件
                orderNo: '',
                status: 1, // 回访状态
                businessStatus: 9, // 9 商家未接单自动取消
                goodsTitle: '',
                queryTime: [],
                startTime: '',
                endTime: '',
            },
            visitInfo: {
                orderNo: '',
                visitInfo: ''
            },
            visitDisabled: false,
            paging: { // 分页条件
                pageIndex: 1, // 当前页
                pageSize: 10, // 每页多少条数据
                total: 0 // 数据总条数
            },
            tableList: [],
            initLoading: false, // 是否显示加载表格数据时的加载动画
            dialogFormVisible: false
        }
    },

    methods: {
        init() {
            this.tableList = new Array();
            this.initLoading = true;
            this.paging.total = 0;
            GetOrderUntreatedList.call(this, { ...this.queryCondition, ...this.paging }).then(res => {
                console.log(res);
                if (res.Code === 1 && res.Data) {
                    this.paging.pageIndex = res.Data.pageIndex;
                    this.paging.total = res.Data.total;
                    this.tableList = res.Data.list && res.Data.list.map(n => {
                        let orderInfo = JSON.parse(n.orderIno);
                        orderInfo.status = n.status;
                        orderInfo.visitInfo = n.visitInfo;
                        orderInfo.cancelTime = n.createTime;
                        return orderInfo;
                    });
                    console.log(this.tableList, 'this.tableList');
                }
                this.initLoading = false;
            });
        },
        openVisitDialog(row) {
            console.log('row ===>>> ', row)
            if (row.visitInfo) {
                this.visitInfo.visitInfo = row.visitInfo;
                this.visitDisabled = true;
            } else {
                this.visitInfo.visitInfo = '';
                this.visitDisabled = false;
            }
            this.visitInfo.orderNo = row.orderNo;
            this.dialogFormVisible = true;
        },
        submitVisit() {
            console.log('===>>> this.visitInfo', this.visitInfo);
            if (!this.visitInfo.orderNo) {
                this.$message.error('程序错误[订单号缺失]，请稍后再试');
                return;
            }
            if (!this.visitInfo.visitInfo) {
                this.$message.error('请输入回访记录');
                return;
            }
            SubmitOrderUntreatedVisit.call(this, this.visitInfo).then(res => {
                if (res.Code === 1) {
                    this.$message.success('记录成功');
                    this.init();
                    this.dialogFormVisible = false;
                } else {
                    this.$message.console.error(res.Desc);
                }
            })

        },
        /**
         * 搜索按钮
         */
        onSubmit() {
            this.init();
        },
        orderManagementListDetails(row) {
            this.$router.push({ 'path': `orderManagementListDetails/${row.orderNo}` })
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
        resetForm() {
            this.$refs.queryForm.resetFields();
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
.xhx {
    text-decoration: underline;
}
</style>
