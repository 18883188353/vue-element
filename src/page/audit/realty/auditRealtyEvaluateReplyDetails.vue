<template>
    <div class="fillcontain">
        <el-card class="mb20">
            <div slot="header">
                <b>用户评价信息</b>
                <audit-history-drawer v-bind:auditTypeResult="auditTypeResult"></audit-history-drawer>
            </div>
            <div class="text item">
                <el-row style="padding: 0 5%">
                    <el-form
                        label-width="150px"
                        size="mini"
                    >
                        <el-form-item label="楼盘名称：">{{ detailEntity.projectName }}</el-form-item>
                        <el-form-item label="评价内容：">{{ detailEntity.content }}</el-form-item>
                        <el-form-item label="评价图片：">
                            <div
                                class="img-size"
                                v-if="detailEntity.img_url"
                            >
                                <viewer :images="detailEntity.img_url.split(',')">
                                    <img
                                        v-for="url in detailEntity.img_url.split(',')"
                                        :key="$md5(url)"
                                        :src="url"
                                    />
                                </viewer>
                            </div>
                            <span v-else> - </span>
                        </el-form-item>
                        <el-form-item label="评价时间：">{{ detailEntity.add_time }}</el-form-item>
                    </el-form>
                </el-row>
            </div>
        </el-card>
        <el-card>
            <div
                slot="header"
                class="clearfix"
            >
                <b class="mr10">回复信息</b>
            </div>
            <div class="text item">
                <el-row style="padding: 0 5%">

                    <el-col :span="24">
                        <el-form
                            label-width="150px"
                            size="mini"
                        >
                            <el-form-item label="楼盘名称：">{{ detailEntity.projectName }}</el-form-item>
                            <el-form-item label="回复内容：">{{ detailEntity.reply_content }}</el-form-item>
                            <el-form-item label="回复时间：">{{ detailEntity.add_time }}</el-form-item>
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
            auditTypeResult: {
                id: '',
                audit_status: '',
                audit_remark: '',
            },
            resultSelect: [
                '评价内容存在违禁词（恶心、暴恐、辱骂、威胁、政治）',
                '第【】张图片存在水印、二维码、条形码',
                '第【】张图片存在恶心内容',
                '第【】张图片存在政治内容',
                '第【】张图片模糊',
                '第【】张图片不符合此场景'

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
                    this.auditTypeResult.id = res.Data.entityId;
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

            auditResult.whole.id = this.auditTypeResult.id;
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
