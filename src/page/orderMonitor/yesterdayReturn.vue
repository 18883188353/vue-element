<template>
    <div class="fillcontain">
        <el-card class="box-card">
            <div slot="header">
                <b>昨日被退订单</b>
            </div>
            <el-table
                :data="tableList"
                v-loading="initLoading"
                border
                stripe
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
                    prop="shopName"
                    label="商家名称"
                    align="center"
                    minWidth="200"
                    show-overflow-tooltip
                >
                </el-table-column>
                <el-table-column
                    prop="shopMobile"
                    label="店铺手机号"
                    align="center"
                    width="130"
                >
                </el-table-column>
                <el-table-column
                    prop="user_name"
                    label="下单人"
                    align="center"
                    minWidth="160"
                    show-overflow-tooltip
                >
                </el-table-column>
                <el-table-column
                    prop="add_time"
                    label="下单时间"
                    align="center"
                    width="160"
                >
                </el-table-column>
                <el-table-column
                    prop="order_no"
                    label="订单号"
                    align="center"
                    width="260"
                >
                </el-table-column>
                <el-table-column
                    prop="business_status"
                    label="订单状态"
                    align="center"
                    width="160"
                >
                </el-table-column>
                <el-table-column
                    prop="back_status"
                    label="退订状态"
                    align="center"
                    width="130"
                >
                </el-table-column>
                <el-table-column
                    prop="express_status"
                    label="发货状态"
                    align="center"
                    width="130"
                >
                </el-table-column>
                <el-table-column
                    prop="back_money_status"
                    label="退款状态"
                    align="center"
                    width="130"
                >
                </el-table-column>
                <el-table-column
                    prop="back_money_remark"
                    label="退款原因"
                    align="center"
                    width="130"
                >
                </el-table-column>
            </el-table>
            <!--<div class="list-page">
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
            </div>-->
        </el-card>
    </div>
</template>
<script>

import List from '../../api/orderMonitor/queryYesterdayReturn';

export default {
    data() {
        return {
            // paging: { // 分页条件
            //     pageIndex: 1, // 当前页
            //     pageSize: 10, // 每页多少条数据
            //     total: 0 // 数据总条数
            // },
            tableList: [],
            initLoading: false, // 是否显示加载表格数据时的加载动画
        }
    },
    mounted() {
        this.init();
    },
    methods: {
        init() {
            this.tableList = new Array();
            this.initLoading = true;
            //this.paging.total = 0;
            List.call(this, {}).then(res => {
                console.log(res);
                if (res.Code === 1) {
                    //this.paging.total = res.Data.total;
                    this.tableList = res.Data && res.Data;
                    console.log(this.tableList, 'this.tableList');
                }
                this.initLoading = false;
            });
        },
        handleSizeChange(val) {
            //this.paging.pageSize = val;
            this.init();
        },
        handleCurrentChange(val) {
            //this.paging.pageIndex = val;
            this.init();
        }
    }
}
</script>
<style lang="less" scoped>
</style>