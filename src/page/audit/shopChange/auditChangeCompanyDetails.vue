<template>
    <div class="fillcontain">
        <el-card class="box-card">
            <div slot="header">
                <b>公司信息变更审核详情</b>
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
                            <el-form-item label="经办人姓名：">{{ beforeData.applier_name }}</el-form-item>
                            <el-form-item label="经办人手机：">{{ beforeData.applier_phone }}</el-form-item>
                            <el-form-item label="负责人姓名：">{{ beforeData.manager_name }}</el-form-item>
                            <el-form-item label="负责人手机：">{{ beforeData.manager_phone }}</el-form-item>
                            <el-form-item label="集团公司座机号：">{{ beforeData.company_tel }}</el-form-item>
                        </el-form>
                    </el-col>
                    <el-col :span="12">
                        <el-form
                            label-width="150px"
                            size="mini"
                            class="mt20"
                        >
                            <el-form-item
                                :class="beforeData.applier_name === afterData.applier_name ? '' : 'redItem'"
                                label="经办人姓名："
                            >{{ afterData.applier_name }}</el-form-item>
                            <el-form-item
                                :class="beforeData.applier_phone  === afterData.applier_phone  ? '' : 'redItem'"
                                label="经办人手机："
                            >{{ afterData.applier_phone  }}</el-form-item>
                            <el-form-item
                                :class="beforeData.manager_name === afterData.manager_name ? '' : 'redItem'"
                                label="负责人姓名："
                            >{{ afterData.manager_name }}</el-form-item>
                            <el-form-item
                                :class="beforeData.manager_phone === afterData.manager_phone ? '' : 'redItem'"
                                label="负责人手机："
                            >{{ afterData.manager_phone }}</el-form-item>
                            <el-form-item
                                :class="beforeData.company_tel === afterData.company_tel ? '' : 'redItem'"
                                label="集团公司座机号："
                            >{{ afterData.company_tel }}</el-form-item>
                        </el-form>
                    </el-col>
                </el-row>
                <!--公司信息-->
                <el-row>
                    <el-col :span="12">
                        <h4 class="mt10">公司信息：</h4>
                        <el-form
                            label-width="150px"
                            size="mini"
                            class="mt20"
                        >
                            <el-form-item label="公司类型：">{{ beforeData.company_type }}</el-form-item>
                            <el-form-item label="公司名称：">{{ beforeData.company_name }}</el-form-item>
                            <el-form-item label="营业执照号：">{{ beforeData.license_number }}</el-form-item>
                            <el-form-item label="公司地址：">{{ beforeData.area }} {{beforeData.address}}</el-form-item>
                        </el-form>
                    </el-col>
                    <el-col :span="12">
                        <h4 class="mt10">公司信息：</h4>
                        <el-form
                            label-width="150px"
                            size="mini"
                            class="mt20"
                        >
                            <el-form-item
                                :class="beforeData.company_type === afterData.company_type ? '' : 'redItem'"
                                label="公司类型："
                            >{{ afterData.company_type }}</el-form-item>
                            <el-form-item
                                :class="beforeData.company_name  === afterData.company_name  ? '' : 'redItem'"
                                label="公司名称："
                            >{{ afterData.company_name  }}</el-form-item>
                            <el-form-item
                                :class="beforeData.license_number === afterData.license_number ? '' : 'redItem'"
                                label="营业执照号："
                            >{{ afterData.license_number }}</el-form-item>
                            <el-form-item
                                :class="beforeData.area === afterData.area ? (beforeData.address === afterData.address ? '' : 'redItem') : 'redItem'"
                                label="公司地址："
                            >{{afterData.area}} {{ afterData.address }}</el-form-item>
                        </el-form>
                    </el-col>
                </el-row>
                <!--法人信息-->
                <el-row>
                    <el-col :span="12">
                        <h4 class="mt10">法人信息：</h4>
                        <el-form
                            label-width="150px"
                            size="mini"
                            class="mt20"
                        >
                            <el-form-item label="法人姓名：">{{ beforeData.legal_person_name }}</el-form-item>
                            <el-form-item label="法人身份证号：">{{ beforeData.legal_person_idcard }}</el-form-item>
                            <el-form-item label="法人联系人电话：">{{ beforeData.legal_person_phone }}</el-form-item>
                            <el-form-item label="微信号：">{{ beforeData.wechat_account }}</el-form-item>
                            <el-form-item label="支付宝账号：">{{ beforeData.alipay_account }}</el-form-item>
                            <el-form-item label="法人身份证：">
                                <div class="img_size">
                                    <viewer :images="cradImgsBefore">
                                        <img
                                            v-for="(img, index) in cradImgsBefore"
                                            :key="index"
                                            :src="img"
                                        />
                                    </viewer>
                                </div>
                            </el-form-item>
                        </el-form>
                    </el-col>
                    <el-col :span="12">
                        <h4 class="mt10">法人信息：</h4>
                        <el-form
                            label-width="150px"
                            size="mini"
                            class="mt20"
                        >
                            <el-form-item
                                :class="beforeData.legal_person_name === afterData.legal_person_name ? '' : 'redItem'"
                                label="法人姓名："
                            >{{ afterData.legal_person_name }}</el-form-item>
                            <el-form-item
                                :class="beforeData.legal_person_idcard  === afterData.legal_person_idcard  ? '' : 'redItem'"
                                label="法人身份证号："
                            >{{ afterData.legal_person_idcard  }}</el-form-item>
                            <el-form-item
                                :class="beforeData.legal_person_phone === afterData.legal_person_phone ? '' : 'redItem'"
                                label="法人联系人电话："
                            >{{ afterData.legal_person_phone }}</el-form-item>
                            <el-form-item
                                :class="beforeData.wechat_account === afterData.wechat_account ? '' : 'redItem'"
                                label="微信号："
                            >{{ afterData.wechat_account }}</el-form-item>
                            <el-form-item
                                :class="beforeData.alipay_account === afterData.alipay_account ? '' : 'redItem'"
                                label="支付宝账号："
                            >{{ afterData.alipay_account }}</el-form-item>
                            <el-form-item
                                :class="cradImgsAfterFlag ? 'redItem' : ''"
                                label="法人身份证："
                            >
                                <div class="img_size">
                                    <viewer :images="cradImgsAfter">
                                        <img
                                            v-for="(img, index) in cradImgsAfter"
                                            :key="index"
                                            :src="img"
                                        />
                                    </viewer>
                                </div>
                            </el-form-item>
                        </el-form>
                    </el-col>
                </el-row>
                <!--营业执照-->
                <el-row>
                    <el-col :span="12">
                        <h4 class="mt10">营业执照：</h4>
                        <el-form
                            label-width="150px"
                            size="mini"
                            class="mt20"
                        >
                            <el-form-item label="营业执照：">
                                <viewer :images=[beforeData.license_pic_url]>
                                    <img
                                        :src="beforeData.license_pic_url"
                                        style="width: 150px; height: 200px;"
                                    />
                                </viewer>
                            </el-form-item>
                        </el-form>
                    </el-col>
                    <el-col :span="12">
                        <h4 class="mt10">营业执照：</h4>
                        <el-form
                            label-width="150px"
                            size="mini"
                            class="mt20"
                        >
                            <el-form-item
                                :class="beforeData.license_pic_url === afterData.license_pic_url ? '' : 'redItem'"
                                label="营业执照："
                            >
                                <viewer :images=[afterData.license_pic_url]>
                                    <img
                                        :src="afterData.license_pic_url"
                                        style="width: 150px; height: 200px;"
                                    />
                                </viewer>
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

                    this.beforeData = entityInfo.OldCompanyInfo ? entityInfo.OldCompanyInfo : {};
                    this.afterData = entityInfo.NewCompanyInfo ? entityInfo.NewCompanyInfo : {};

                    //身份证
                    let cradImgsBefore = [];
                    cradImgsBefore.push(this.beforeData.legal_idcard_positive_url);
                    cradImgsBefore.push(this.beforeData.legal_idcard_negative_url);
                    this.cradImgsBefore = cradImgsBefore;

                    let cradImgsAfter = [];
                    cradImgsAfter.push(this.afterData.legal_idcard_positive_url);
                    cradImgsAfter.push(this.afterData.legal_idcard_negative_url);
                    this.cradImgsAfter = cradImgsAfter;

                    if (this.beforeData.legal_idcard_positive_url !== this.afterData.legal_idcard_positive_url || this.beforeData.legal_idcard_negative_url !== this.afterData.legal_idcard_negative_url) {
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
            // return;
            SubmitAudit.call(this, _data).then(res => {
                if (res.Code == 1) {
                    this.$message.success('操作成功');
                    this.back();
                } else {
                    this.$message.error('操作失败');
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
        },
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
