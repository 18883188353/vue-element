<template>
    <div>
        <el-card class="box-card mb20">
            <div
                slot="header"
                class="clearfix"
            >
                <span>广告审核列表：</span>
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
                            label="申请日期："
                            prop="dateTime"
                        >
                            <el-date-picker
                                v-model="queryCondition.dateTime"
                                type="datetimerange"
                                value-format="yyyy-MM-dd HH:mm:ss"
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期"
                            >
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item
                            label="审核状态："
                            prop="status"
                        >
                            <el-select
                                v-model="queryCondition.status"
                                placeholder="审核状态"
                            >
                                <el-option
                                    label="待审核"
                                    :value="0"
                                ></el-option>
                                <el-option
                                    label="已通过"
                                    :value="1"
                                ></el-option>
                                <el-option
                                    label="未通过"
                                    :value="2"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item
                            label="商家名称："
                            prop="parms"
                        >
                            <el-input
                                v-model="queryCondition.parms"
                                type="text"
                                placeholder="请输入关键字"
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
                style="width: 100%; margin-top: 20px;"
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
                    prop="goodsNum"
                    label="上架商品数量"
                    align="center"
                    width="110"
                >
                </el-table-column>
                <el-table-column
                    prop="isHandle"
                    label="是否处理"
                    align="center"
                    width="100"
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
                    width="100"
                >
                    <template slot-scope="scope">
                        <span v-if="scope.row.shopMonitorDealRecord">{{ scope.row.shopMonitorDealRecord.resultRemark }}</span>
                        <span v-else> - </span>
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

import PutawayMonitoringList from '../../api/shopMonitoring/queryGoodsMonitoringList'

export default {
    components: {},
    data() {
        return {

            queryCondition: { // 查询条件
                taskTypeName: 'AdvertMaterialAudit', // 审核任务名称
                status: 0, // 审核任务结果状态 0：待审核,1：审核通过,2：审核不通过
                dateTime: [], // 下标0开始时间、下标1结束时间（数据添加时间）
                parms: '', // 查询参数
            },
            paging: { // 分页条件
                pageIndex: 1, // 当前页
                pageSize: 10, // 每页多少条数据
                total: 0 // 数据总条数
            },
            tableList: [],
            initLoading: false, // 是否显示加载表格数据时的加载动画


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
    },

    methods: {

        init() {
            this.initLoading = true;
            this.tableList = new Array();
            this.paging.total = 0;
            PutawayMonitoringList.call(this, { ...this.queryCondition, ...this.paging }).then(res => {
                if (res.Code === 1) {
                    if (res.Data.shopList) {
                        this.tableList = res.Data.shopList;
                    }
                } else {
                    this.$message.error(res.Desc);
                }
                this.initLoading = false;
            })
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
            window.sessionStorage.setItem('GOODS_MONITORING_ROW', JSON.stringify(row));
            this.$router.push({ path: '/putawayMonitoringDetails' })
        }

    },

    created() {

    }
}
</script>

<style lang="less" scoped>
.page {
    text-align: right;
    padding: 20px;
}
</style>
