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
                        <el-form-item label="商家名称：" prop="name">
                            <el-input v-model="queryCondition.name" placeholder="请输入关键字"></el-input>
                        </el-form-item>
                        <el-form-item label="提醒状态：" prop="status">
                            <el-select
                                v-model="queryCondition.status"
                                placeholder="审核状态"
                            >
                                <el-option
                                    label="全部"
                                    value=""
                                ></el-option>
                                <el-option
                                    label="待提醒"
                                    :value="0"
                                ></el-option>
                                <el-option
                                    label="已提醒"
                                    :value="1"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="申请日期：" prop="lastLoginTime">
                            <el-date-picker
                                v-model="queryCondition.lastLoginTime"
                                type="date"
                                value-format="yyyy-MM-dd"
                                placeholder="最后登录时间"
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
                style="width: 100%; margin-top: 20px;"
            >
                <el-table-column
                    prop="num"
                    type="index"
                    label="序号"
                    align="center"
                    width="50"
                    :show-overflow-tooltip="true"
                >
                </el-table-column>
                <el-table-column
                    prop="shopName"
                    label="店铺名称"
                    align="center"
                    width="160"
                    :show-overflow-tooltip="true"
                >
                </el-table-column>
                <el-table-column
                    prop="managName"
                    label="负责人姓名"
                    align="center"
                    width="160"
                >
                </el-table-column>
                <el-table-column
                    prop="managMobile"
                    label="负责人电话"
                    align="center"
                    width="150"
                >
                </el-table-column>
                <el-table-column
                    prop="operator"
                    label="经办人姓名"
                    align="center"
                    width="160"
                >
                </el-table-column>
                <el-table-column
                    prop="operatorMobile"
                    label="经办人电话"
                    align="center"
                    width="160"
                >
                </el-table-column>
                <el-table-column
                    prop="lastLoginTime"
                    label="最后登录时间"
                    align="center"
                    width="160"
                >
                </el-table-column>
                <el-table-column
                    prop="customerName"
                    label="提醒客服"
                    align="center"
                    width="110"
                >
                </el-table-column>
                <el-table-column
                    prop="statusDesc"
                    label="操作状态"
                    align="center"
                    width="100"
                >
                    <template slot-scope="scope">
                        <el-link type="primary" v-if="scope.row.status === '0'" @click="remindChange(scope.$index)">立即提醒</el-link>
                        <el-link v-if="scope.row.status === '1'">已提醒</el-link>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="remidRemark"
                    label="详情"
                    align="center"
                    min-width="250"
                >
                    <template slot-scope="scope">
                        <p v-if="scope.row.status === '1'">{{scope.row.remidRemark}}</p>
                        <el-input v-if="scope.row.showButton" v-model="scope.row.remidRemark"></el-input>
                        <el-button type="primary" v-if="scope.row.showButton" @click="submit(scope.row)">确定</el-button>
                    </template>
                </el-table-column>
                <!--<el-table-column
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
                </el-table-column>-->
            </el-table>
            <div class="page">
                <el-pagination
                    :small="true"
                    @current-change="pagingCurrentHandler"
                    @size-change="pagingSizeHandler"
                    :current-page.sync="paging.pageNum"
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

import QueryShopLoginRemindList from '../../api/shopMonitoring/queryShopLoginRemindList'
import SubmitShopLoginRemind from '../../api/shopMonitoring/submitShopLoginRemind'

export default {
    components: {},
    data() {
        return {

            queryCondition: { // 查询条件
                name: '', //  店铺名称
                status: '', // 提醒 0：待提醒,1：已提醒
                lastLoginTime: '', // 时间
            },
            paging: { // 分页条件
                pageNum: 1, // 当前页
                pageSize: 10, // 每页多少条数据
                total: 0 // 数据总条数
            },
            tableList: [],
            initLoading: false, // 是否显示加载表格数据时的加载动画

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
            QueryShopLoginRemindList.call(this, { ...this.queryCondition, ...this.paging }).then(res => {
                console.log(res);
                if (res.Code === 1) {
                    this.paging.total = res.Data.total;
                    this.tableList = res.Data.data;
                    console.log(this.tableList, 'this.tableList');
                }
                this.initLoading = false;
            });
        },
        pagingCurrentHandler(value) {
            console.log(' 选择页 ==>> ', value)
            this.paging.pageNum = value;
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
        auditCheckInDetails(row) {
            this.$router.push({ 'path': `auditAdvertDataDetails/${row.taskId}` })
        },
        //提醒按钮
        remindChange(index) {
            console.log(index, 'index++++++', this.tableList[index]);

            this.tableList[index].showButton = '1';
            this.tableList = [...this.tableList];
        },
        //提交 提醒
        submit(row){
            this.$confirm('此操作将删除, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                SubmitShopLoginRemind.call(this, {id: row.id, remidRemark: row.remidRemark} ).then(res => {
                    console.log(res);
                    if (res.Code === 1) {
                        this.$message.success('提醒已记录');
                        this.init();
                    }else {
                        this.$message.success('操作失败');
                    }
                });
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        },


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
