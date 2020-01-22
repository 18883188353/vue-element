<template>
    <div class="fillcontain">
        <el-card class="box-card">
            <div slot="header">
                <b>商品核价审核详情</b>
                <audit-history-drawer v-bind:auditTypeResult="{}"></audit-history-drawer>
            </div>
            <div class="text item">
                <el-row style="padding-left: 3%;">
                    <el-form
                        label-width="115px"
                        size="mini"
                    >
                        <el-form-item label="商家名称：">{{ detailEntity.ShopName }}</el-form-item>
                        <el-form-item label="商品名称：">{{ detailEntity.ArticleName }}</el-form-item>
                        <el-form-item label="申请原因：">{{ detailEntity.ShopRemark }}</el-form-item>
                        <el-form-item label="核价规格列表："></el-form-item>
                        <el-form-item label-width="0px">
                            <el-table
                                :data="detailEntity.Datalist"
                                :expand-row-keys="expandRowKeys"
                                border
                                stripe
                                row-key="Id"
                                class="dataTable"
                            >
                                <el-table-column type="expand">
                                    <template slot-scope="scope">
                                        <el-form label-width="0px">
                                            <el-form-item
                                                v-if="auditTypeResult[scope.$index].audit_status === 0"
                                                class="audit-result"
                                            >
                                                <el-col
                                                    :span="12"
                                                    class="print-result"
                                                >
                                                    <vue-scroll>
                                                        <el-input
                                                            type="textarea"
                                                            :autosize="true"
                                                            placeholder="请输入不通过理由"
                                                            v-model="auditTypeResult[scope.$index].audit_remark"
                                                        ></el-input>
                                                    </vue-scroll>
                                                </el-col>
                                                <el-col :span="12">
                                                    <ul>
                                                        <vue-scroll>
                                                            <li
                                                                v-for="(result, idx) in resultSelect"
                                                                :key="idx"
                                                                @click="auditTypeResult[scope.$index].audit_remark += result"
                                                            >
                                                                {{ result }}
                                                            </li>
                                                        </vue-scroll>
                                                    </ul>
                                                </el-col>
                                            </el-form-item>
                                        </el-form>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                    prop="ArticleGoodsName"
                                    label="规格"
                                    align="center"
                                    minWidth="300"
                                    show-overflow-tooltip
                                >
                                </el-table-column>
                                <el-table-column
                                    prop="CurrentPrice"
                                    label="销售价"
                                    align="center"
                                    minWidth="80"
                                    show-overflow-tooltip
                                >
                                </el-table-column>
                                <el-table-column
                                    prop="ExpectPrice"
                                    label="申请售价"
                                    align="center"
                                    minWidth="80"
                                    show-overflow-tooltip
                                >
                                </el-table-column>
                                <el-table-column
                                    prop="Price_adjustment"
                                    label="调价差额"
                                    align="center"
                                    minWidth="80"
                                    show-overflow-tooltip
                                >
                                    <template slot-scope="scope">
                                        {{ Math.round((scope.row.ExpectPrice - scope.row.CurrentPrice) * 1000)/1000 }}
                                    </template>
                                </el-table-column>
                                <el-table-column
                                    prop="Id"
                                    label="操作"
                                    align="center"
                                    width="200"
                                >
                                    <template slot-scope="scope">
                                        <el-radio-group
                                            v-model="auditTypeResult[scope.$index].audit_status"
                                            @change="(v) => auditChange(v, scope.row.Id, scope.$index)"
                                            v-if="isAudit"
                                        >
                                            <el-radio :label="1">通过</el-radio>
                                            <el-radio :label="0">不通过</el-radio>
                                        </el-radio-group>
                                    </template>

                                </el-table-column>
                            </el-table>
                        </el-form-item>
                    </el-form>
                </el-row>
            </div>
        </el-card>
        <div class="audit-footer">
            <el-button @click="back">返回列表</el-button>
            <el-button
                type="primary"
                @click="submitAudit"
                v-if="isAudit"
            >提交</el-button>
        </div>
    </div>
</template>

<script>

import AuditDetail from '../../../api/audit/queryTaskDetail'
import AuditHistory from '../../../api/audit/queryTaskHistory'
import SubmitAudit from '../../../api/audit/submitAudit'

import AuditHistoryDrawer from '../auditHistory'

export default {
    components: {
        AuditHistoryDrawer
    },
    data() {
        return {
            isAudit: false,
            userInfo: JSON.parse(window.sessionStorage.getItem('USER_INFO')),
            id: this.$route.params.id,
            detailEntity: {},
            historyQueryCondition: { // 审核历史查询条件
                entity_id: '',
                taskTypeName: '',
                Auditor: '',
                AuditUserName: ''
            },
            auditHistoryList: [], // 审核历史记录列表
            auditTypeResult: [], // { id, audit_remark, audit_status }
            resultSelect: [
                '商品售价过低',
                '商品售价过高',
                '商品销售价大于市场价',
                '商品销售价不符合相关规定'
            ]
            ,
            expandRowKeys: []
        }
    },
    mounted() {
        this.init();
    },
    methods: {
        init() {
            AuditDetail.call(this, { taskId: this.id }).then(res => {
                if (res.Code === 1) {
                    let entityInfo = JSON.parse(res.Data.entityInfo);
                    if (res.Data.auditStatus === 0) {
                        this.isAudit = true;
                    }
                    entityInfo.Datalist && entityInfo.Datalist.forEach(n => {
                        this.auditTypeResult.push({
                            id: n.Id,
                            audit_status: '',
                            audit_remark: ''
                        });
                    });
                    this.detailEntity = entityInfo;
                    this.initHistory(res.Data);
                }
            });
        },
        initHistory(entity) {
            let _historyQueryCondition = {};
            _historyQueryCondition.entityId = entity.entityId;
            _historyQueryCondition.taskTypeName = entity.taskTypeName;
            this.$store.dispatch('setHistoryQueryCondition', _historyQueryCondition);
        },
        submitAudit() {

            // 构造审核结果数据
            let auditResult = {};
            auditResult.whole = {};
            auditResult.version = '1.0.0';
            auditResult.audit_status = 1; // 0不通过 1通过
            auditResult.fields = [];

            for (let i = 0; i < this.auditTypeResult.length; i++) {
                let n = this.auditTypeResult[i];
                if (n.audit_status === 0 && !n.audit_remark) {
                    this.$message.warning(`第${i + 1}件商品请输入不通过理由`);
                    return;
                }
                if (n.audit_status === 0) {
                    auditResult.audit_status = 0; // 0不通过 1通过
                }
                auditResult.fields.push(n);
            }

            console.log(auditResult, 'auditResult');

            SubmitAudit.call(this, {
                auditor: this.userInfo.id,
                auditUserName: this.userInfo.rel_name,
                task_id: this.id,
                status: auditResult.audit_status,
                taskTypeName: this.$store.getters.getHistoryQueryCondition.taskTypeName,
                result: auditResult
            }).then(res => {
                if (res.Code == 1) {
                    this.$message.success('操作成功');
                    this.back();
                } else {
                    this.$message.error(res.Desc || '提交失败');
                }
            })

        },
        auditChange(e, id, index) {
            if (e === 0) {
                this.expandRowKeys.push(id);
            } else {
                this.auditTypeResult[index].audit_remark = '';
                this.expandRowKeys = this.expandRowKeys.filter(n => n !== id);
            }
        },
        back() {
            this.$router.go(-1);
        }
    },

    created() {

    }
}
</script>
<style>
.el-table__expand-column {
    border-right: none !important;
}
.dataTable .el-table__expand-icon {
    display: none;
}
</style>
<style lang="less" scoped>
.dataTable {
    width: 100%;
}
.img-size {
    img {
        width: 100px;
        height: 100px;
        margin-right: 3px;
    }
}

.el-checkbox {
    margin-top: 20px;
    margin-left: 20px;
}
</style>
