<template>
    <div class="fillcontain">
        <el-card class="box-card">
            <div slot="header">
                <b>房地产公司变更审核详情</b>
                <audit-history-drawer v-bind:auditTypeResult="auditTypeResult"></audit-history-drawer>
            </div>
            <div class="text item mb30">
                <el-row>
                    <el-col :span="12">
                        <div class="hint">变更前信息</div>
                    </el-col>
                    <el-col :span="12">
                        <div class="hint">变更后信息</div>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form
                            label-width="150px"
                            size="mini"
                            class="mt20"
                        >
                            <el-form-item label="负责人姓名：">{{ beforeData.manager_person_name }}</el-form-item>
                            <el-form-item label="负责人手机：">{{ beforeData.manager_person_phone }}</el-form-item>
                            <el-form-item label="集团公司座机号：">{{ (beforeData.fixedPhone1 ? beforeData.fixedPhone1 : '')+ '-' + (beforeData.fixedPhone2 ? beforeData.fixedPhone2 : '') }}</el-form-item>
                            <el-form-item label="公司名称：">{{ beforeData.company_name }}</el-form-item>
                            <el-form-item label="法人姓名：">{{ beforeData.legal_person_name }}</el-form-item>
                            <el-form-item label="法人联系人电话：">{{ beforeData.legal_person_phone }}</el-form-item>
                            <el-form-item label="法人身份证号：">{{ beforeData.identity_card }}</el-form-item>
                            <el-form-item label="法人身份证照片：">
                                <div class="img_size">
                                    <viewer :images="cradImgsBefore">
                                        <img
                                            v-for="img in cradImgsBefore"
                                            :key="img"
                                            :src="img"
                                        />
                                    </viewer>
                                </div>
                            </el-form-item>
                        </el-form>
                    </el-col>
                    <el-col :span="12">
                        <el-form
                            label-width="150px"
                            size="mini"
                            class="mt20"
                        >
                            <el-form-item
                                :class="beforeData.manager_person_name === afterData.manager_person_name ? '' : 'redItem'"
                                label="负责人姓名："
                            >{{ afterData.manager_person_name }}</el-form-item>
                            <el-form-item
                                :class="beforeData.manager_person_phone === afterData.manager_person_phone ? '' : 'redItem'"
                                label="负责人手机："
                            >{{ afterData.manager_person_phone }}</el-form-item>
                            <el-form-item
                                :class="beforeData.fixedPhone1 === afterData.fixedPhone1 ? (beforeData.fixedPhone2 === afterData.fixedPhone2 ? '' : 'redItem') : 'redItem'"
                                label="集团公司座机号："
                            >{{ (afterData.fixedPhone1 ? afterData.fixedPhone1 : '')+ '-' + (afterData.fixedPhone2 ? afterData.fixedPhone2 : '') }}</el-form-item>
                            <el-form-item
                                :class="beforeData.company_name === afterData.company_name ? '' : 'redItem'"
                                label="公司名称："
                            >{{ afterData.company_name }}</el-form-item>
                            <el-form-item
                                :class="beforeData.legal_person_name === afterData.legal_person_name ? '' : 'redItem'"
                                label="法人姓名："
                            >{{ afterData.legal_person_name }}</el-form-item>
                            <el-form-item
                                :class="beforeData.legal_person_phone === afterData.legal_person_phone ? '' : 'redItem'"
                                label="法人联系人电话："
                            >{{ afterData.legal_person_phone }}</el-form-item>
                            <el-form-item
                                :class="beforeData.identity_card === afterData.identity_card ? '' : 'redItem'"
                                label="法人身份证号："
                            >{{ afterData.identity_card }}</el-form-item>
                            <el-form-item
                                :class="cradImgsAfterFlag ? 'redItem' : ''"
                                label="法人身份证："
                            >
                                <div class="img_size">
                                    <viewer :images=cradImgsAfter>
                                        <img
                                            v-for="img in cradImgsAfter"
                                            :key="img"
                                            :src="img"
                                        />
                                    </viewer>
                                </div>
                            </el-form-item>
                        </el-form>
                    </el-col>
                </el-row>
                <el-row v-if="isAudit">
                    <el-divider></el-divider>
                    <el-form
                        label-width="50px"
                        class="audit-result-form"
                    >
                        <p class="mt20">审核结论：</p>
                        <el-form-item label="">
                            <el-radio-group
                                :disabled="isAudit ? false : true"
                                size="small"
                                v-model="auditTypeResult.audit_status"
                            >
                                <el-radio :label="1">通过</el-radio>
                                <el-radio :label="0">不通过</el-radio>
                            </el-radio-group>
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
                                        :placeholder="isAudit ? '请输入不通过理由' : ''"
                                        :disabled="isAudit ? false : true"
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
                                            @click="addAuditRemark(result)"
                                        >
                                            {{ result }}
                                        </li>
                                    </vue-scroll>
                                </ul>
                            </el-col>
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
import GetCategory from '../../../api/category/getClassList'
import InsertOptional from '../../../api/audit/insertOptional'
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
            resData: {},
            historyQueryCondition: { // 审核历史查询条件
                entity_id: '',
                taskTypeName: '',
                Auditor: '',
                AuditUserName: ''
            },
            auditHistoryList: [], // 审核历史记录列表
            auditTypeResult: {
                audit_status: '',
                audit_remark: ''
            },
            resultSelect: [
                '标题不符合要求（错字、漏字、多字、辱骂、威胁、政治）',
                '文章类型有误',
                '内容不符合要求（错字、漏字、多字、辱骂、威胁、政治）',
                '图片不清晰',
                '图片存在违禁内容（恶心、暴恐、政治）',
                '推广商品不符合要求',
                '内容存在不合要求的连接地址'
            ],
            proxyData: null,
            beforeData: {}, //变更之前
            afterData: {}, //变更之后
            cradImgsBefore: [],  //身份证之前图片
            cradImgsAfter: [],  //身份证之后图片
            cradImgsAfterFlag: false, //身份证是否变化
        }
    },
    computed: {
        //中转  为了监听他
        audit_status() {
            return this.auditTypeResult.audit_status;
        }
    },
    watch: {
        audit_status(newVal, oldVal) {
            //监听状态变化
            if (newVal === 1) {
                //审核状态变为通过 重置审核备注
                this.auditTypeResult.audit_remark = '';
            }
        }
    },
    mounted() {
        this.init();
    },
    methods: {
        init() {
            AuditDetail.call(this, { taskId: this.id }).then(res => {
                if (res.Code === 1) {
                    this.resData = res.Data;
                    let entityInfo = JSON.parse(res.Data.entityInfo);
                    this.detailEntity = entityInfo;

                    this.beforeData = entityInfo.historycompany ? entityInfo.historycompany : {};
                    this.afterData = entityInfo.Certificateinfo ? entityInfo.Certificateinfo : {};

                    //身份证
                    let cradImgsBefore = [];
                    cradImgsBefore.push(this.beforeData.img_cert_obverse);
                    cradImgsBefore.push(this.beforeData.img_cert_reverse);
                    this.cradImgsBefore = cradImgsBefore;

                    let cradImgsAfter = [];
                    cradImgsAfter.push(this.afterData.img_cert_obverse);
                    cradImgsAfter.push(this.afterData.img_cert_reverse);
                    this.cradImgsAfter = cradImgsAfter;

                    if (this.beforeData.img_cert_obverse !== this.afterData.img_cert_obverse || this.beforeData.img_cert_reverse !== this.afterData.img_cert_reverse) {
                        this.cradImgsAfterFlag = true;
                    }

                    //是否编辑
                    if (res.Data.auditStatus === 0) {
                        this.isAudit = true;
                    } else {
                        let _auditResultDesc = JSON.parse(res.Data.auditResultDesc);
                        if (_auditResultDesc && _auditResultDesc.whole) {
                            this.auditTypeResult.audit_status = _auditResultDesc.whole.audit_status;
                            this.auditTypeResult.audit_remark = _auditResultDesc.whole.audit_remark;
                        }
                    }
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
                this.$message.warning('请先完成审核！');
                return;
            }
            if (this.auditTypeResult.audit_status === 0 && !this.auditTypeResult.audit_remark) {
                this.$message.warning('请输入审核不过原因！');
                return;
            }

            auditResult.whole.audit_status = this.auditTypeResult.audit_status;
            auditResult.whole.audit_remark = this.auditTypeResult.audit_remark;
            auditResult.audit_status = auditResult.whole.audit_status;

            console.log(auditResult, 'auditResult');
            let _data = {
                auditor: this.userInfo.id,
                auditUserName: this.userInfo.rel_name,
                task_id: this.id,
                status: this.auditTypeResult.audit_status,
                taskTypeName: this.$store.getters.getHistoryQueryCondition.taskTypeName,
                result: auditResult
            };
            console.log(_data, '_data++++++');
            SubmitAudit.call(this, _data).then(res => {
                if (res.Code == 1) {
                    this.$message.success('操作成功');
                    this.back();
                } else {
                    this.$message.error(res.Desc || '提交失败');
                }
            })
        },
        addAuditRemark(remark) {
            if (this.isAudit) {
                this.auditTypeResult.audit_remark += remark;
            }
        },
        back() {
            this.$router.go(-1);
        }
    }
}
</script>

<style lang="less">
.img_size {
    img {
        width: 150px;
        height: 100px;
        margin: 3px;
        display: block;
    }
}
.hint {
    border-left: 3px solid #25ada3;
    padding-left: 10px;
}
.redItem .el-form-item__label {
    color: red;
}
</style>
