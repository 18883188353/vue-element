<template>
    <div class="fillcontain">
        <el-card class="box-card mb20">
            <div slot="header">
                <b class="mr10">订单监控管理详情</b>
            </div>
            <div class="text item">
                <div class="hint">基本信息</div>
                <el-row>
                    <el-col :span="12">
                        <el-form
                            label-width="150px"
                            size="mini"
                            class="mt20"
                        >
                            <el-form-item label="订单号：">{{resData.order_no}}</el-form-item>
                            <el-form-item label="金额：">{{resData.order_amount}}</el-form-item>
                            <el-form-item label="买家：">{{resData.buyer_name}}</el-form-item>
                            <el-form-item label="下单时间：">{{resData.payment_time}}</el-form-item>
                            <el-form-item label="订单状态：">{{ resData.order_state}}</el-form-item>
                        </el-form>
                    </el-col>
                    <el-col :span="12">
                        <el-form
                            label-width="150px"
                            size="mini"
                            class="mt20"
                        >
                            <el-form-item label="处理状态：">{{getSettleStateDesc(resData.settle_state)}}</el-form-item>
                            <el-form-item label="商家：">{{resData.shop_name}}</el-form-item>
                            <el-form-item label="经办人电话：">{{resData.agent_tel}}</el-form-item>
                            <el-form-item label="负责人电话：">{{resData.header_tel}}</el-form-item>
                            <el-form-item label="店铺电话："> {{resData.shop_tel}} </el-form-item>
                        </el-form>
                    </el-col>
                </el-row>
            </div>
        </el-card>

        <el-card class="none-border-buttom">
            <div class="text item">
                <div class="hint">电话记录</div>
                <span class="span_ts">自动电话结果码102为“已接听”,101为“未接听”，其他状态码，运营商自带备注。</span>
                <el-button v-if="resData.settle_state !== 3" type="primary" @click="dialogFormVisible = true">新增记录</el-button>
                <el-table
                    :data="recordsList"
                    border
                    class="list-table"
                >
                    <el-table-column
                        prop="call_time"
                        label="拨打时间"
                        align="center"
                        width="180"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="call_type"
                        label="拨打方式"
                        align="center"
                        width="180"
                    >
                        <template slot-scope="scope">
                            {{scope.row.call_type === 1 ? '自动' : (scope.row.call_type === 0 ? '人工' : '其它')}}
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="phone_type"
                        label="电话类型"
                        align="center"
                        width="180"
                    >
                        <template slot-scope="scope">
                            {{getPhoneTypeDesc(scope.row.phone_type)}}
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="phone"
                        label="电话"
                        align="center">
                    </el-table-column>
                    <el-table-column
                        prop="call_code"
                        label="自动电话结果码"
                        align="center"
                        width="180"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="call_remark"
                        label="备注"
                        align="center"
                        width="180"
                    >
                        <template slot-scope="scope">
                            {{getRemark(scope.row)}}
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="operator_name"
                        label="拨打人"
                        align="center"
                        width="180"
                    >
                    </el-table-column>
                </el-table>
                <div class="list-page">
                    <el-pagination
                        :small="true"
                        @current-change="pagingCurrentHandler"
                        @size-change="pagingSizeHandler"
                        :current-page.sync="pram.pageIndex"
                        :page-size="pram.pageSize"
                        :page-sizes="[10, 30, 50, 100]"
                        :total="pram.total"
                        layout="total, sizes, prev, pager, next"
                    >
                    </el-pagination>
                </div>
            </div>
        </el-card>

        <el-dialog title="拨打电话" :visible.sync="dialogFormVisible">
            <el-form :model="form">
                <el-form-item label="拨打对象：" :label-width="formLabelWidth">
                    <el-radio-group v-model="form.phone_type">
                        <el-radio :label="1">经办人-{{resData.agent_tel}}</el-radio>
                        <el-radio :label="2">负责人-{{resData.header_tel}}</el-radio>
                        <el-radio :label="3">店铺-{{resData.shop_tel}}</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="结果：" :label-width="formLabelWidth">
                    <el-radio-group v-model="form.call_code">
                        <el-radio :label="101">未接听</el-radio>
                        <el-radio :label="102">已接听</el-radio>
                        <el-radio :label="500">其他</el-radio>
                    </el-radio-group>
                </el-form-item>

                <el-form-item label="备注：" :label-width="formLabelWidth">
                    <el-input type="textarea"  v-model="form.call_remark" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="addRecord">确 定</el-button>
            </div>
        </el-dialog>

        <div class="audit-footer">
            <el-button
                type=""
                @click="back"
            >返回列表</el-button>
            <el-button v-if="resData.settle_state !== 3" type="primary" @click="complete">处理完成</el-button>
        </div>
    </div>
</template>

<script>

import QueryOrderMonitorById from '../../../api/customerAffair/queryOrderMonitorById'
import QueryCallRecords from '../../../api/customerAffair/queryCallRecords'
import AddCallRecordOne from '../../../api/customerAffair/addCallRecordOne'
import CompleteOrderMonitor from '../../../api/customerAffair/completeOrderMonitor'

export default {
    components: {},
    data() {
        return {
            userInfo: JSON.parse(window.sessionStorage.getItem('USER_INFO')),
            id: this.$route.params.id,
            resData: {},
            recordsList: [], //记录列表
            settleStateOption: [
                {label: "全部", value: ''},
                {label: "已发送短信", value: 0},
                {label: "自动拨打电话", value: 1},
                {label: "人工处理中", value: 2},
                {label: "人工处理完毕", value: 3},
            ],
            pram: {
                pageIndex: 1,
                pageSize: 10,
                monId: this.$route.params.id,
                total: 0,
            },
            dialogFormVisible: false, //新增记录是否打开
            form: {
                phone_type: '',
                call_code: '',
                call_remark: '',
                mon_id: this.$route.params.id,
                call_type:2,
                phone:null,
                operator_id:'',
                operator_name:''
            }, //记录数据
            formLabelWidth: '120px',
        }
    },
    mounted() {
        this.init();
        this.getData();
    },
    methods: {
        init() {
            QueryOrderMonitorById.call(this, { monId: this.id }).then(res => {
                if (res.Code === 1) {
                    this.resData = res.Data;
                }
            });
        },
        /**
         *  获取拨打记录
         */
        getData() {
            QueryCallRecords.call(this, this.pram).then(res => {
                if (res.Code === 1) {
                    this.recordsList = res.Data.list;
                    this.pram.total = res.Data.total;
                }
            });
        },
        getSettleStateDesc(status){
            let _desc = '';
            this.settleStateOption.map(item =>{
                if (item.value === status) {
                    _desc = item.label;
                }
            });
            return _desc;
        },
        //电话类型
        getPhoneTypeDesc(text) {
            switch (text) {
                case 1:return "经办人";break;
                case 2:return "负责人";break;
                case 3:return "法人";break;
            }
        },
        //备注
        getRemark(row){
            if (row.call_remark) {
                return row.call_remark;
            }else {
                return row.call_code == "102" ? "已接听":"未接听";
            }
        },
        //提交通话记录
        addRecord() {

            if(!this.form.phone_type){
                this.$message.warning("请选择拨打对象");
                return false;
            }
            if(!this.form.call_code){
                this.$message.warning("请选择结果类型");
                return false;
            }
            if(!this.form.call_remark){
                this.$message.warning("请填写备注");
                return false;
            }
            switch (this.form.phone_type) {
                case 1:
                    this.form.phone = this.resData.agent_tel;
                    break;
                case 2:
                    this.form.phone = this.resData.header_tel;
                    break;
                case 3:
                    this.form.phone = this.resData.shop_tel;
                    break;
            }
            this.form.operator_id = this.userInfo.id;
            this.form.operator_name = this.userInfo.rel_name;
            console.log(this.form, 'this.form ++++++++++');
            // return;
            AddCallRecordOne.call(this, this.form).then(res => {
                if (res.Code === 1) {
                    this.dialogFormVisible = false;
                    this.$message.success('新增成功');
                    this.getData();
                }else {
                    this.$message.error("操作失败");
                }
            });
        },
        //提交处理
        complete(){
            this.$confirm('你确定要完成处理，完成之后将无法再手动添加记录吗?', '完成确认?', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                CompleteOrderMonitor.call(this, { monId: this.id }).then(res => {
                    if (res.Code === 1) {
                        this.$message.success('处理成功');
                        this.init();
                    }else {
                        this.$message.error("操作失败");
                    }
                });
            }).catch(() => {
                /*this.$message({
                    type: 'info',
                    message: '已取消删除'
                });*/
            });
        },
        pagingCurrentHandler(value) {
            console.log(' 选择页 ==>> ', value)
            this.pram.pageIndex = value;
            this.getData();
        },
        pagingSizeHandler(value) {
            console.log(' 每页数量 ==>> ', value)
            this.pram.pageSize = value;
            this.getData();
        },
        back() {
            // this.$router.push({ path: '/auditChangeCompany' });
            this.$router.back(-1);
        },
    }
}
</script>

<style lang="less">
.img_size {
    img {
        width: 200px;
        margin: 3px;
        display: inline-block;
    }
}
.hint {
    border-left: 3px solid #25ada3;
    padding-left: 10px;
}
.span_ts {
    color: #DD444D;
    fontSize: 12;
    paddingLeft: 20
}
.label_inline {
    display: inline-block;
}
</style>
