<template>
    <div class="fillcontain">
        <el-dialog
            title="用户申请提醒发货列表"
            :visible.sync="remindRecordDialog"
            width="80%"
        >
            <el-dialog
                width="60%"
                title="商家回复信息"
                :visible.sync="visitRemarkDialog"
                append-to-body
            >
                <el-form
                    ref="visitRemark"
                    :model="visitRemark"
                    :rules="rules"
                    label-width="130px"
                >
                    <el-form-item label="订单号：">
                        {{ visitRemark.orderNo}}
                    </el-form-item>
                    <el-form-item
                        label="回复备注："
                        prop="remark"
                    >
                        <el-input
                            type="textarea"
                            v-model="visitRemark.remark"
                            :autosize="{ minRows: 3, maxRows: 6}"
                        ></el-input>
                    </el-form-item>
                </el-form>
                <span
                    slot="footer"
                    class="dialog-footer"
                >
                    <el-button @click="visitRemarkDialog = false">取 消</el-button>
                    <el-button
                        type="primary"
                        @click="submitVisitRemark"
                    >提交</el-button>
                </span>
            </el-dialog>
            <el-table :data="remindRecordList">
                <el-table-column
                    prop="num"
                    type="index"
                    label="序号"
                    align="center"
                    width="50"
                >
                </el-table-column>
                <el-table-column
                    property="date"
                    label="次数"
                    align="center"
                    width="180"
                >
                    <template slot-scope="scope">
                        <span>第{{ scope.row.remindNum }}次申请提醒</span>
                    </template>
                </el-table-column>
                <el-table-column
                    property="orderNo"
                    label="订单号"
                    align="center"
                    minWidth="200"
                ></el-table-column>
                <el-table-column
                    property="name"
                    label="提醒人"
                    align="center"
                    width="160"
                >
                    <template slot-scope="scope">
                        <span v-if="scope.row.remindNum === 2">负责人</span>
                        <span v-else-if="scope.row.remindNum === 3">法人</span>
                        <span v-else> - </span>
                    </template>
                </el-table-column>
                <el-table-column
                    property="phone"
                    label="提醒人电话"
                    align="center"
                    width="160"
                ></el-table-column>
                <el-table-column
                    property="createTime"
                    label="申请时间"
                    align="center"
                    width="160"
                ></el-table-column>
                <el-table-column
                    label="操作"
                    align="center"
                    width="130"
                    fixed="right"
                >
                    <template slot-scope="scope">
                        <el-link
                            type="danger"
                            v-if="!scope.row.already"
                            @click="openVisitRemark(scope.row.id, scope.row.orderNo)"
                        >立即提醒</el-link>
                        <span v-else>已提醒</span>
                    </template>
                </el-table-column>
            </el-table>
        </el-dialog>
        <el-card class="box-card">
            <div slot="header">
                <b>待发货订单( <span class="ts-day">* 最近2天的订单</span> )</b>
            </div>
            <el-table
                :data="tableList"
                v-loading="initLoading"
                border
                stripe
                class="list-table"
                height="calc(100vh - 170px)"
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
                    prop="executetime"
                    label="执行时间"
                    align="center"
                    width="160"
                >
                </el-table-column>
                <el-table-column
                    prop="remaining_hour"
                    label="剩余时限(小时)"
                    align="center"
                    width="130"
                >
                </el-table-column>
                <el-table-column
                    prop="remark"
                    label="执行操作"
                    align="center"
                    width="130"
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
                    prop="real_amount"
                    label="订单金额"
                    align="center"
                    width="100"
                >
                    <template slot-scope="scope">
                        <b style="font-size: 12px;color: #6b8f66;">￥{{ scope.row.real_amount }}</b>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="add_time"
                    label="下单时间"
                    align="center"
                    width="160"
                >
                </el-table-column>
                <el-table-column
                    prop="user_name"
                    label="下单人"
                    align="center"
                    minWidth="200"
                    show-overflow-tooltip
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
                    prop="shopTel"
                    label="店铺座机号"
                    align="center"
                    width="130"
                >
                </el-table-column>
                <el-table-column
                    prop="telephone"
                    label="集团/公司座机号"
                    align="center"
                    width="130"
                >
                </el-table-column>
                <el-table-column
                    prop="legalPersonMobile"
                    label="法人电话"
                    align="center"
                    width="130"
                >
                </el-table-column>
                <el-table-column
                    prop="applierPhone"
                    label="经办人电话"
                    align="center"
                    width="130"
                >
                </el-table-column>
                <el-table-column
                    prop="managerPhone"
                    label="负责人电话"
                    align="center"
                    width="130"
                >
                </el-table-column>
                <el-table-column
                    label="操作"
                    align="center"
                    width="130"
                    fixed="right"
                >
                    <template slot-scope="scope">
                        <el-link
                            type="danger" 
                            v-if="scope.row.isRemind"
                            @click="openRemindRecord(scope.row.order_no)"
                        >提醒发货</el-link>
                    </template>
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

import List from '../../api/orderMonitor/queryWaitSendOut';
import OrderRemindRecordList from '../../api/orderMonitor/orderRemindRecordList';
import SubmitRemindRemark from '../../api/orderMonitor/submitRemindRemark';

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
            remindRecordList: [],
            remindRecordDialog: false,
            visitRemarkDialog: false,
            visitRemark: {
                id: '',
                orderNo: '',
                remark: ''
            },
            rules: {
                remark: [{ required: true, message: '请输入商家回复备注', trigger: 'blur' }]
            }
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
        openRemindRecord(orderNo) {
            this.getRemindRecordList(orderNo);
        },
        getRemindRecordList(orderNo) {
            OrderRemindRecordList.call(this, { orderNo: orderNo }).then(res => {
                if (res.Code === 1) {
                    this.remindRecordDialog = true;
                    this.remindRecordList = res.Data;
                } else {
                    this.$message.error(res.Desc);
                }
            })
        },
        openVisitRemark(id, orderNo) {
            this.visitRemark.id = id;
            this.visitRemark.orderNo = orderNo;
            this.visitRemarkDialog = true;
        },
        submitVisitRemark() {
            this.$refs['visitRemark'].validate((valid) => {
                if (valid) {
                    SubmitRemindRemark.call(this, this.visitRemark).then(res => {
                        if (res.Code === 1) {
                            this.getRemindRecordList(this.visitRemark.orderNo);
                            this.visitRemarkDialog = false;
                            this.$message.success('提交成功');
                            this.$refs['visitRemark'].resetFields();
                        } else {
                            this.$message.error(res.Desc);
                        }
                    })
                }
            })
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
.ts-day{
    color: #25ada3;
    font-size: 11px;
}
</style>