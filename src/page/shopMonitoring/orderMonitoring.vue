<template>
    <div>
        <el-card class="box-card mb20">
            <div slot="header">
                <span>商家订单监控列表：</span>
            </div>
            <div class="text item">
                <div>
                    <el-form
                        ref="queryForm"
                        :inline="true"
                        :model="queryCondition"
                        class="demo-form-inline"
                    >
                        <el-form-item
                            label="商家店铺名称："
                            prop="shopName"
                        >
                            <el-input
                                v-model="queryCondition.shopName"
                                type="text"
                                placeholder="请输入店铺名称"
                            ></el-input>
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
                :height="autoHeight"
                class="list-table"
            >
                <el-table-column
                    prop="shopName"
                    label="商家店铺"
                    align="center"
                    minWidth="260"
                    :show-overflow-tooltip="true"
                >
                </el-table-column>
                <el-table-column
                    prop="storeName"
                    label="实体店铺"
                    align="center"
                    width="160"
                >
                </el-table-column>
                <el-table-column
                    prop="applerTel"
                    label="经办人电话"
                    align="center"
                    width="150"
                >
                </el-table-column>
                <el-table-column
                    prop="managerTel"
                    label="负责人电话"
                    align="center"
                    width="160"
                >
                </el-table-column>
                <el-table-column
                    prop="legalTel"
                    label="法人电话"
                    align="center"
                    width="160"
                >
                </el-table-column>
                <el-table-column
                    prop="signingDate"
                    label="入驻时间"
                    align="center"
                    width="160"
                >
                </el-table-column>
                <el-table-column
                    prop="unAcceptNum"
                    label="未接单"
                    align="center"
                    width="110"
                >
                </el-table-column>
                <el-table-column
                    prop="unShippedNum"
                    label="退单数"
                    align="center"
                    width="110"
                >
                </el-table-column>
                <el-table-column
                    prop="isHandle"
                    label="是否处理"
                    align="center"
                    width="110"
                >
                    <template slot-scope="scope">
                        <span v-if="scope.row.shopMonitorDealRecord">已处理</span>
                        <span v-else>未处理</span>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="isTrue"
                    label="商家真伪"
                    align="center"
                    width="160"
                >
                    <template slot-scope="scope">
                        <div v-if="scope.row.shopMonitorDealRecord">
                            <span
                                v-if="scope.row.shopMonitorDealRecord.resultCode === 1"
                                style="color: #25ada4;"
                            >真实商家</span>
                            <span
                                v-else-if="scope.row.shopMonitorDealRecord.resultCode === 2"
                                style="color: #7265e6;"
                            >可疑商家</span>
                            <span
                                v-else-if="scope.row.shopMonitorDealRecord.resultCode === 3"
                                style="color: #f53d44;"
                            >虚假商家</span>
                            <span v-else-if="scope.row.shopMonitorDealRecord.resultCode === 4">其他</span>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="remark"
                    label="备注"
                    align="center"
                    width="110"
                >
                    <template slot-scope="scope">
                        <span>{{ (scope.row.shopMonitorDealRecord && scope.row.shopMonitorDealRecord.resultRemark) ? scope.row.shopMonitorDealRecord.resultRemark : ' - ' }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="shopId"
                    label="操作"
                    align="center"
                    fixed="right"
                    width="150"
                >
                    <template slot-scope="scope">
                        <el-link
                            type="primary"
                            @click="auditCheckInDetails(scope.row)"
                            v-if="!scope.row.shopMonitorDealRecord"
                        >处理</el-link>
                        <el-link
                            type="primary"
                            @click="auditCheckInDetails(scope.row)"
                            v-else
                        >查看结果</el-link>
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

import { autoHeight } from '../../config/mUtils'
import OrderMonitoringList from '../../api/shopMonitoring/queryOrderMonitoringList'

export default {
    components: {},
    data() {
        return {

            queryCondition: { // 查询条件
                shopName: ''
            },
            paging: { // 分页条件
                pageIndex: 1, // 当前页
                pageSize: 10, // 每页多少条数据
                total: 0 // 数据总条数
            },
            tableList: [],
            initLoading: false, // 是否显示加载表格数据时的加载动画
            autoHeight: null, // 自动高度参数值，默认必须为 null


            formInline: {
                user: '',
                region: '',
                start: '',
                end: '',
            }
        }
    },
    mounted() {
        this.init();
        autoHeight(this, 'autoHeight');
    },

    methods: {

        init() {
            this.initLoading = true;
            this.tableList = new Array();
            this.paging.total = 0;
            OrderMonitoringList.call(this, { ...this.queryCondition, ...this.paging }).then(res => {
                console.log(res);
                if (res.Code === 1) {
                    this.paging.total = res.Data.totalCount;
                    if (res.Data.shopList) {
                        this.tableList = res.Data.shopList;
                    }
                }
                this.initLoading = false;
            });
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
        },
        auditCheckInDetails(row) {
            window.sessionStorage.setItem('ORDER_MONITORING_ROW', JSON.stringify(row));
            this.$router.push({ 'path': 'orderMonitoringDetails' })
        }

    },

    created() {

    }
}
</script>

<style lang="less" scoped>
</style>
