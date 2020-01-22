<template>
    <aside class="audit-history">
        <span @click="open">审核记录</span>
        <el-drawer
            title="审核历史记录"
            :visible.sync="openWindow"
            @opened="openHandler"
            size="50%"
            custom-class="audit-history-drawer"
        >
            <div
                v-loading="loading"
                style="width: 100%; height: calc(100vh - 50px);"
            >
                <vue-scroll v-if="list.length > 0">
                    <ul class="audit-info">
                        <li
                            v-for="(n, idx) in list"
                            :key="idx"
                        >
                            <p class="time">
                                {{ n.auditTime }}
                                <span class="fr">
                                    <i
                                        :class="n.notifyResult === 'OK' ? 'el-icon-success pass' : 'el-icon-warning not-pass' "
                                        :title="`回调次数：${ n.callbackCount }次`"
                                    ></i>
                                </span>
                                <span
                                    v-if="n.notifyResult !== 'OK'"
                                    class="fr mr5"
                                >
                                    <i
                                        class="el-icon-refresh pass"
                                        style="cursor: pointer;"
                                        title="重试回调"
                                        @click="callback(n.id)"
                                    ></i>
                                    <i
                                        v-if="n.callbackCount < 5"
                                        class="el-icon-switch-button not-pass"
                                        style="cursor: pointer;"
                                        title="停止自动回调"
                                        @click="stopCallback(n.id)"
                                    ></i>
                                </span>
                            </p>
                            <el-form
                                size="mini"
                                labelWidth="130px"
                                class="audit-history-list-form"
                                v-if="n._type === 1"
                            >
                                <div
                                    v-for="(n2, idx2) in n.auditResultDesc.fields"
                                    :key="idx2"
                                >
                                    <el-form-item :label="(find(n2[keyName]).audit_type_str || nullLabel || ('结果' + ++idx2)) + '：'"><span :class="n2.audit_status == 1 ? 'pass' : 'not-pass'"><i class="el-icon-circle-check"></i> {{ n2.audit_status == 1 ? '审核通过' : '审核不通过' }}</span></el-form-item>
                                    <el-form-item
                                        v-if="n2.audit_status == 0"
                                        label="原因："
                                    >{{ n2.audit_remark }}</el-form-item>
                                </div>
                            </el-form>
                            <el-form
                                size="mini"
                                labelWidth="130px"
                                class="audit-history-list-form"
                                v-else-if="n.auditResult != 1"
                            >
                                <el-form-item label="审核结果："><span :class="n.auditResultDesc.whole.audit_status == 1 ? 'pass' : 'not-pass'"><i class="el-icon-circle-check"></i> {{ n.auditResultDesc.whole.audit_status == 1 ? '审核通过' : '审核不通过' }}</span></el-form-item>
                                <el-form-item
                                    v-if="n.auditResultDesc.whole.audit_status != 1"
                                    label="原因："
                                >{{ n.auditResultDesc.whole.audit_remark }}</el-form-item>
                            </el-form>
                            <footer>
                                <p>最终结果： <span :class="n.auditResult == 1 ? 'pass' : 'not-pass'"><i class="el-icon-circle-check"></i>{{ n.auditResult == 1 ? '审核通过' : '审核不通过' }}</span></p>
                                <p>审核人：{{ n.auditUsername }}</p>
                            </footer>
                        </li>
                    </ul>
                </vue-scroll>
                <div class="not-have">
                    <center>无历史审核记录</center>
                </div>
            </div>
        </el-drawer>
    </aside>
</template>
<script>

import AuditHistory from '../../api/audit/queryTaskHistory'
import ManualCallback from '../../api/audit/manualCallback'
import StopCallback from '../../api/audit/stopCallback'

export default {
    props: {
        auditTypeResult: {
            type: Object,
            default: {}
        },
        keyName: {
            type: String,
            default: 'audit_type'
        },
        nullLabel: {
            type: String,
            default: null
        }
    },
    data() {
        return {
            openWindow: false,
            loading: true,
            list: []
        }
    },
    computed: {
        historyQueryCondition() {
            return this.$store.state.audit.historyQueryCondition;
        }
    },
    methods: {
        init() {
            AuditHistory.call(this, {
                entity_id: this.historyQueryCondition.entityId,
                taskTypeName: this.historyQueryCondition.taskTypeName
            }).then(res => {
                console.log(res, '历史记录查询结果');
                if (res.Code === 1) {
                    if (res.Data && res.Data.length > 0) {
                        this.taskId = res.Data.id;
                        this.list = res.Data.map(n => {
                            let auditResultDesc = JSON.parse(n.auditResultDesc);
                            n._type = auditResultDesc.fields.length > 0 ? 1 : 0;
                            n.auditResultDesc = auditResultDesc;
                            return n;
                        });
                        console.log(this.list, ' --->>> this.list');
                    }
                    this.$nextTick(() => {
                        this.loading = false;
                    })
                }
            })
        },
        find(typeStr) {
            for (let key in this.auditTypeResult) {
                if (this.auditTypeResult[key].audit_type === typeStr) {
                    return this.auditTypeResult[key];
                }
            }
            return {};
        },
        callback(taskId) {
            this.$confirm('<p>可能导致重复回调，确定吗？</p><p style="color:red;font-size:12px;">注意：回调次数超过5次将不再自动回调</p>', '手动回调', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                center: true,
                dangerouslyUseHTMLString: true
            }).then(() => {
                ManualCallback.call(this, {
                    taskId: taskId
                }).then(res => {
                    if (res.Code === 1) {
                        this.$message.success('回调成功');
                    } else {
                        this.$message.error(res.Desc);
                    }
                })
            }).catch(() => {});
        },
        stopCallback(taskId) {
            this.$confirm('停止回调后可能导致审核状态永久不改变，确定吗？', '停止回调', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                center: true
            }).then(() => {
                StopCallback.call(this, {
                    taskId: taskId
                }).then(res => {
                    if (res.Code === 1) {
                        this.$message.success('操作成功，改任务不再自动回调');
                    } else {
                        this.$message.error(res.Desc);
                    }
                })
            }).catch(() => {});
        },
        open() {
            this.openWindow = true;
        },
        openHandler() {
            if (this.list.length === 0) {
                this.init();
            }
        }
    },
    mounted() {
        //this.init();
    }
}
</script>
<style>
.audit-history-list-form .el-form-item {
    margin-bottom: 0px !important;
}
.audit-history-list-form .el-form-item--mini {
    margin-bottom: 0px !important;
}
.audit-history-list-form {
    color: #135752;
}
.audit-history-drawer .el-drawer__header {
    margin-bottom: 0px !important;
}
</style>
<style lang="less" scoped>
.audit-history {
    float: right;
    font-size: 14px;
    color: #25ada3;
    cursor: pointer;
}
.audit-info {
    padding: 10px;
    > li {
        margin-top: 10px;
        border: 1px solid #ebeef5;
        border-radius: 2px;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        -webkit-box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        padding: 10px;
    }
    .time {
        font-size: 14px;
        border-left: 3px solid #1cc1b4;
        padding-left: 5px;
    }
}
.audit-history-drawer {
    .pass {
        color: #0dd30d;
    }
    .not-pass {
        color: red;
    }
}
.audit-history-list-form {
    margin-top: 5px;
}
footer {
    font-size: 14px;
    color: #606266;
    margin-top: 10px;
}
.not-have {
    padding-top: 50px;
    color: #bbb3b3;
}
</style>