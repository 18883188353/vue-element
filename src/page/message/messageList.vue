<template>
    <div class="fillcontain">
        <el-card class="box-card mb20">
            <div slot="header">
                <b>短信管理：</b>
                <span class="fr">
                    <el-link
                        type="success"
                        @click="messageSend"
                    >发送短信</el-link>
                    <!--<el-link
                        type="success"
                        @click="messageSendWebsocket"
                    >发送测试消息</el-link>-->
                </span>
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
                            label="消息类型:"
                            prop="messageType"
                        >
                            <el-select
                                v-model="queryCondition.messageType"
                                placeholder="消息类型"
                            >
                                <el-option
                                    label="全部"
                                    value=""
                                ></el-option>
                                <el-option
                                    label="节日祝福"
                                    :value="1"
                                ></el-option>
                                <el-option
                                    label="售后反馈"
                                    :value="2"
                                ></el-option>
                                <el-option
                                    label="任务派送"
                                    :value="3"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item
                            label="发送方式:"
                            prop="sendType"
                        >
                            <el-select
                                v-model="queryCondition.sendType"
                                placeholder="发送方式"
                            >
                                <el-option
                                    label="全部"
                                    value=""
                                ></el-option>
                                <el-option
                                    label="手动发送"
                                    :value="1"
                                ></el-option>
                                <el-option
                                    label="自动发送"
                                    :value="2"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item
                            label="发送状态:"
                            prop="status"
                        >
                            <el-select
                                v-model="queryCondition.status"
                                placeholder="发送状态"
                            >
                                <el-option
                                    label="全部"
                                    value=""
                                ></el-option>
                                <el-option
                                    label="等待发送"
                                    :value="1"
                                ></el-option>
                                <el-option
                                    label="发送成功"
                                    :value="2"
                                ></el-option>
                                <el-option
                                    label="发送失败"
                                    :value="3"
                                ></el-option>
                            </el-select>
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
                    prop="createTime"
                    label="发送时间"
                    align="center"
                    width="180"
                >
                </el-table-column>
                <el-table-column
                    prop="createUserName"
                    label="发送人"
                    align="center"
                    width="100"
                >
                </el-table-column>
                <el-table-column
                    prop="messageTypeStr"
                    label="消息类型"
                    align="center"
                    width="100"
                >
                </el-table-column>
                <el-table-column
                    prop="smsContent"
                    label="消息类容"
                    align="center"
                    minWidth="300"
                    show-overflow-tooltip
                >
                </el-table-column>
                <el-table-column
                    prop="sendTypeStr"
                    label="发送类型"
                    align="center"
                    width="100"
                >
                </el-table-column>
                <el-table-column
                    prop="statusStr"
                    label="发送状态"
                    align="center"
                    width="100"
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
                            type="primary"
                            @click="messageSendByUpdate(scope.row, 1)"
                            v-if="scope.row.status === 1"
                        >编辑</el-link>
                        <el-link
                            type="primary"
                            @click="messageSendByUpdate(scope.row, 0)"
                        >查看</el-link>
                        <el-link
                            type="primary"
                            @click="deleteTask(scope.row.id, scope.row.status)"
                        >删除</el-link>
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

import headTop from '../../components/headTop';
import QuerySendList from '../../api/sms/smsSendRecordList';
import DeleteSendRecord from '../../api/sms/smsTaskDelete';
import { sendMessage } from '../../websocket/websocket'

export default {
    components: {
        headTop,
    },
    data() {
        return {
            queryCondition: {
                messageType: '',  // 1：节日祝福 2：售后反馈 3：任务派送
                sendType: '',  // 1：立即发送 2：预约发送
                status: 1  // 1：等待发送 2：发送成功 3：发送失败
            },
            paging: { // 分页条件
                pageIndex: 1, // 当前页
                pageSize: 10, // 每页多少条数据
                total: 0 // 数据总条数
            },
            tableList: [],
            initLoading: false, // 是否显示加载表格数据时的加载动画
        }
    },
    // keep-alive 组件激活时调用，如果不走缓存请使用其他生命周期钩子，例如 mounted
    activated() {
        this.init();
    },
    methods: {
        init() {
            this.initLoading = true;
            this.tableList = new Array();
            this.paging.total = 0;
            QuerySendList.call(this, { ...this.queryCondition, ...this.paging }).then(res => {
                console.log(res);
                if (res.Code === 1) {
                    this.paging.pageIndex = res.Data.pageIndex;
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
        /**
         * 跳转到模板管理
         */
        messageModule() {
            this.$router.push({ 'path': '/messageModule' })
        },

        /**
         * 跳转到发送短信
         */
        messageSend() {
            this.$router.push({ path: '/messageSend/0', query: { s0: 1 } })
        },
        messageSendByUpdate(row, updateOrSee) {
            this.$router.push({ path: `/messageSend/${row.id}`, query: { s0: updateOrSee } })
        },
        /**
         * 是否删除
         */
        deleteTask(taskId, status) {
            let hint = status === 1 ? '删除后此发送任务将会终止且不可恢复！确定删除吗？' : '删除后数据不可恢复，确定删除吗？'
            this.$confirm(hint, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                DeleteSendRecord.call(this, { id: taskId }).then(res => {
                    if (res.Code === 1) {
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                        this.init();
                    } else {
                        this.$message.error(res.Desc);
                    }
                })

            }).catch(() => {

            });
        },
        resetForm() {
            this.$refs.queryForm.resetFields();
            this.init();
        },
        messageSendWebsocket() {
            sendMessage('/customer/insertChatRecord', {
                "clientTimespan": "2019-11-09 18:03:10",
                "fromRoleType": 1,
                "from_Account": "Tx26ff6b0200bfbfad8fb3afd48c980104",
                "msgBody": [{
                    "msgContent": {
                        "text": "测试消息是这个"
                    },
                    "msgType": "TIMTextElem"
                }],
                "msgTimestamp": 1573292590,
                "toRoleType": 2,
                "to_Account": "Txf5abda937a6cc91b4e1f4a9e008fb1ef",
                "sdkAppId": "1400065004"
            })
        }
    }
}
</script>

<style lang="less" scoped>
</style>
