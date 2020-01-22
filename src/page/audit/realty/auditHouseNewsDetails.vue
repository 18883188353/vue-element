<template>
    <div class="fillcontain">
        <!--营业执照到期开始-->
        <el-card class="box-card">
            <div slot="header">
                <b>房地产消息审核详情</b>
                <audit-history-drawer v-bind:auditTypeResult="auditTypeResult"></audit-history-drawer>
            </div>
            <div class="text item">
                <el-row style="padding: 0 10%">

                    <el-col :span="24">
                        <el-form
                            label-width="150px"
                            size="mini"
                        >
                            <el-form-item label="模板类型：">{{ detailEntity.templateType }}</el-form-item>
                            <el-form-item label="模板名称：">{{ detailEntity.templateName }}</el-form-item>
                            <el-form-item label="模板内容：">{{ detailEntity.templateContent }}</el-form-item>
                        </el-form>
                    </el-col>
                    <el-col
                        :span="24"
                        v-if="isAudit"
                    >
                        <el-divider></el-divider>
                        <p class="mt20">审核结论：</p>
                        <el-form
                            label-width="50px"
                            class="audit-result-form"
                        >
                            <el-form-item label="">
                                <el-radio
                                    v-model="auditTypeResult.audit_status"
                                    :label="1"
                                >通过</el-radio>
                                <el-radio
                                    v-model="auditTypeResult.audit_status"
                                    :label="0"
                                >不通过</el-radio>
                            </el-form-item>
                            <el-form-item
                                v-if="auditTypeResult.audit_status === 0"
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
                                            v-model="auditTypeResult.audit_remark"
                                        ></el-input>
                                    </vue-scroll>
                                </el-col>
                                <el-col :span="12">
                                    <ul>
                                        <vue-scroll>
                                            <li
                                                v-for="(result, idx) in resultSelect"
                                                :key="idx"
                                                @click="auditTypeResult.audit_remark += result"
                                            >
                                                {{ result }}
                                            </li>
                                        </vue-scroll>
                                    </ul>
                                </el-col>
                            </el-form-item>
                        </el-form>
                    </el-col>
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
        <!--营业执照到期结束-->

        <!--<bottom-footer></bottom-footer>-->

    </div>
</template>

<script>

import AuditDetail from '../../../api/audit/queryTaskDetail'
import AuditHistory from '../../../api/audit/queryTaskHistory'
import SubmitAudit from '../../../api/audit/submitAudit'
//import bottomFooter from '../../components/bottomFooter'

import AuditHistoryDrawer from '../auditHistory'

export default {
    components: {
        //bottomFooter,
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
            auditTypeResult: {
                audit_status: '',
                audit_remark: ''
            },
            resultSelect: [
                '模板类型有误',
                '模板名称用语不当（辱骂、政治内容、漏字、错字）',
                '模板内容用语不当（辱骂、政治内容、漏字、错字）'
            ]
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

            if (this.auditTypeResult.audit_status === '') {
                this.$message.warning('请先完成审核');
                return;
            }

            auditResult.whole.audit_status = this.auditTypeResult.audit_status;
            auditResult.whole.audit_remark = this.auditTypeResult.audit_remark;
            auditResult.audit_status = auditResult.whole.audit_status;

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
        back() {
            this.$router.go(-1);
        }
    },

    created() {

    }
}
</script>

<style lang="less" scoped>
</style>
