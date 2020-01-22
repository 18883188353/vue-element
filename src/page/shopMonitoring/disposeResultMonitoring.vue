<template>
    <div>
        <el-card class="box-card mb20">
            <div
                slot="header"
                class="clearfix"
            >
                <span>商家监控处理结果列表：</span>
            </div>
            <div class="text item">
                <div>
                    <el-form
                        ref="queryForm"
                        :inline="true"
                        :model="queryCondition"
                        class="demo-form-inline"
                    >
                        <el-form-item label="商家店铺：" prop="shopName">
                            <el-input v-model="queryCondition.shopName" type="text" placeholder="请输入关键字"></el-input>
                        </el-form-item>
                        <el-form-item label="监控类型：" prop="type">
                            <el-select v-model="queryCondition.type" placeholder="审核状态">
                                <el-option label="全部" value=""></el-option>
                                <el-option v-for="(item, index) in typeOption" :label="item.label" :value="item.value" :key="index"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="商家定性：" prop="resultCode">
                            <el-select v-model="queryCondition.resultCode" placeholder="审核状态">
                                <el-option label="全部" value=""></el-option>
                                <el-option v-for="(item, index) in resultCodeOption" :label="item.label" :value="item.value" :key="index"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item>
                            <el-button
                                type="primary"
                                @click="submit"
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
                    prop="num"
                    label="序号"
                    type="index"
                    align="center"
                    minWidth="50"
                    :show-overflow-tooltip="true"
                >
                </el-table-column>
                <el-table-column
                    prop="shopName"
                    label="商家店铺"
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
                    width="110"
                >
                </el-table-column>
                <el-table-column
                    prop="type"
                    label="监控类型"
                    align="center"
                    width="100"
                >
                    <template slot-scope="scope">
                        {{getTypeOptionDesc(scope.row.type)}}
                    </template>
                </el-table-column>
                <el-table-column
                    prop="num"
                    label="异常数量"
                    align="center"
                    width="100"
                >
                    <template slot-scope="scope">
                        {{scope.row.type === 1 ? '上架数量:' + scope.row.goodsNum : '未接单：'+ (scope.row.unAcceptNum || 0) + ',退单：' + (scope.row.unShippedNum || 0)}}
                    </template>
                </el-table-column>

                <el-table-column
                    prop="resultCode"
                    label="商家真伪"
                    align="center"
                    width="100"
                >
                    <template slot-scope="scope">
                        {{getResultCodeDesc(scope.row.resultCode)}}
                    </template>
                </el-table-column>
                <el-table-column
                    prop="shopMonitorDealRecord"
                    label="是否处理"
                    align="center"
                    width="100"
                >
                    <template slot-scope="scope">
                        {{scope.row.shopMonitorDealRecord ? '已处理' : '未处理'}}
                    </template>
                </el-table-column>
                <el-table-column
                    prop="resultRemark"
                    label="备注"
                    align="center"
                    width="100"
                >
                </el-table-column>
                <el-table-column
                    prop="dealUserName"
                    label="处理人"
                    align="center"
                    width="100"
                >
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
                            v-if="scope.row.auditResult === 0"
                        >审核</el-link>
                        <el-link
                            type="primary"
                            @click="auditCheckInDetails(scope.row)"
                            v-else
                        >查看详情</el-link>
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

import QueryShopDealRecord from '../../api/shopMonitoring/queryShopDealRecord'

export default {
    components: {},
    data() {
        return {

            queryCondition: { // 查询条件
                type: '', //1:上架监控 2：订单监控
                shopName: '',
                resultCode: '', //商家定性：1：真实商家 2 ：可疑商家 3：虚假商家 ，4：其他
            },
            paging: { // 分页条件
                pageIndex: 1, // 当前页
                pageSize: 10, // 每页多少条数据
                total: 0 // 数据总条数
            },
            tableList: [],
            initLoading: false, // 是否显示加载表格数据时的加载动画
            typeOption: [
                {
                    label: '上架监控',
                    value: 1
                },{
                    label: '订单监控',
                    value: 2
                },
            ],
            resultCodeOption: [
                {
                    label: '真实商家',
                    value: 1
                },{
                    label: '可疑商家',
                    value: 2
                },{
                    label: '虚假商家',
                    value: 3
                },{
                    label: '其他',
                    value: 4
                },
            ],


        }
    },
    mounted() {
        this.init();
    },

    methods: {
        submit() {
            this.paging.pageIndex = 1;
            this.init();
        },
        init() {
            this.initLoading = true;
            this.tableList = new Array();
            this.paging.total = 0;
            QueryShopDealRecord.call(this, { ...this.queryCondition, ...this.paging }).then(res => {
                console.log(res);
                if (res.Code === 1) {
                    this.paging.total = res.Data.total;
                    this.tableList = res.Data.list;
                    console.log(this.tableList, 'this.tableList');
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
        resetForm(){
            this.$refs.queryForm.resetFields();
            this.init();
        },
        getTypeOptionDesc(status){
            let _desc = '';
            this.typeOption.map(item =>{
                if (item.value === status) {
                    _desc = item.label;
                }
            });
            return _desc;
        },
        getResultCodeDesc(status){
            let _desc = '';
            this.resultCodeOption.map(item =>{
                if (item.value === status) {
                    _desc = item.label;
                }
            });
            return _desc;
        },
        auditCheckInDetails(row) {
            sessionStorage.setItem('dealShop', JSON.stringify(row))
            this.$router.push({ name: `disposeResultMonitoringDetails`})
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
