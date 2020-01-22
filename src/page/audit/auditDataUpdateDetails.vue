<template>
    <div class="fillcontain">
        <el-card class="box-card">
            <div slot="header">
                <b>资料更新审核详情</b>
                <audit-history-drawer v-bind:auditTypeResult="auditTypeResult"></audit-history-drawer>
            </div>
            <div class="text item">
                <el-tabs
                    v-model="activeName"
                    type="card"
                    class="mb30"
                >
                    <!--公司信息-->
                    <el-tab-pane
                        label="公司信息"
                        name="company"
                    >
                        <!--二次审核-->
                        <el-form
                            :inline="true"
                            label-width="220px"
                            size="mini"
                            class="mt20"
                            v-if="auditHistoryList.length > 0"
                        >
                            <el-form-item label="上次审核结果：">{{ auditHistoryList[0].auditStatus }}</el-form-item>
                            <el-form-item label="审核人员：">{{ auditHistoryList[0].auditUserName }}</el-form-item>
                            <el-form-item label="审核时间：">{{ auditHistoryList[0].auditTime }}</el-form-item>
                            <el-form-item label="说明：">{{ auditHistoryList[0].auditResultDesc }}</el-form-item>
                        </el-form>
                        <el-row
                            :gutter="20"
                            v-if="detailEntity.Company"
                        >
                            <el-col :span="24">
                                <p class="mt20 ml20">联系方式：</p>
                                <el-form
                                    label-width="220px"
                                    size="mini"
                                    class="mt20"
                                >
                                    <el-form-item label="经办人姓名：">{{ detailEntity.Company.OperatorName }}</el-form-item>
                                    <el-form-item label="经办人手机：">{{ detailEntity.Company.OperatorMobile }}</el-form-item>
                                    <el-form-item label="负责人姓名：">{{ detailEntity.Company.ManagerName }}</el-form-item>
                                    <el-form-item label="负责人手机：">{{ detailEntity.Company.MangeMobile }}</el-form-item>
                                    <el-form-item label="集团/公司座机号：">{{ detailEntity.Company.Telephone }}</el-form-item>
                                </el-form>
                                <p class="mt20 ml20">公司信息：</p>
                                <el-form
                                    label-width="220px"
                                    size="mini"
                                    class="mt20"
                                >
                                    <el-form-item label="公司类型：">{{ detailEntity.Company.Type }}</el-form-item>
                                    <el-form-item label="公司名称：">{{ detailEntity.Company.Name }}</el-form-item>
                                    <el-form-item label="法人姓名：">{{ detailEntity.Company.LegalPersonName }}</el-form-item>
                                    <el-form-item label="法人手机号：">{{ detailEntity.Company.LegalPersonMobile }}</el-form-item>
                                    <el-form-item label="法人身份证号：">{{ detailEntity.Company.LegalPersonIdCard }}</el-form-item>
                                    <el-form-item label="法人身份证照：">
                                        <div class="img_size">
                                            <viewer :images="[detailEntity.Company.LegalPersonIdCardPositiveImg, detailEntity.Company.LegalPersonIdCardNegativeImg]">
                                                <img
                                                    :src="detailEntity.Company.LegalPersonIdCardPositiveImg"
                                                    alt="身份证正面"
                                                />
                                                <img
                                                    :src="detailEntity.Company.LegalPersonIdCardNegativeImg"
                                                    alt="身份证反面"
                                                >
                                            </viewer>
                                        </div>
                                    </el-form-item>
                                </el-form>
                                <p class="mt20 ml20">营业执照：</p>
                                <el-form
                                    label-width="220px"
                                    size="mini"
                                    class="mt20"
                                >
                                    <el-form-item label="营业执照号：">{{ detailEntity.Company.BusinesLicenseCard }}</el-form-item>
                                    <el-form-item label="营业执照照片：">
                                        <div class="img_size">
                                            <viewer :images="[detailEntity.Company.BusinesLicenseImg]">
                                                <img
                                                    :src="detailEntity.Company.BusinesLicenseImg"
                                                    alt="营业执照"
                                                />
                                            </viewer>
                                        </div>
                                    </el-form-item>
                                    <el-form-item label="成立日期：">{{ detailEntity.Company.BusinesLicenseCreateTime }}</el-form-item>
                                    <el-form-item label="有效期：">{{ detailEntity.Company.BusinessLicenseValidType === 1 ? '永久有效' : detailEntity.Company.BusinesLicenseValidTime }}</el-form-item>
                                </el-form>
                            </el-col>
                        </el-row>
                        <el-row v-if="isAudit">
                            <el-divider></el-divider>
                            <p class="mt20">审核结论：</p>
                            <el-form
                                label-width="50px"
                                size="mini"
                                class="audit-result-form"
                            >
                                <el-form-item label="">
                                    <el-radio
                                        v-model="auditTypeResult.company.audit_status"
                                        :label="1"
                                    >通过</el-radio>
                                    <el-radio
                                        v-model="auditTypeResult.company.audit_status"
                                        :label="0"
                                    >不通过</el-radio>
                                </el-form-item>
                                <el-form-item
                                    v-if="auditTypeResult.company.audit_status === 0"
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
                                                v-model="auditTypeResult.company.audit_remark"
                                            ></el-input>
                                        </vue-scroll>
                                    </el-col>
                                    <el-col :span="12">
                                        <ul>
                                            <vue-scroll>
                                                <li
                                                    v-for="(result, idx) in resultSelect.company"
                                                    :key="idx"
                                                    @click="auditTypeResult.company.audit_remark += result"
                                                >
                                                    {{ result }}
                                                </li>
                                            </vue-scroll>
                                        </ul>
                                    </el-col>
                                </el-form-item>
                            </el-form>
                        </el-row>
                    </el-tab-pane>
                    <el-tab-pane
                        label="银行卡信息"
                        name="bankCard"
                    >
                        <el-row
                            :gutter="20"
                            v-if="detailEntity.Bank"
                        >
                            <p class="mt20 ml20">银行卡信息：</p>
                            <el-col :span="24">
                                <el-form
                                    label-width="220px"
                                    size="mini"
                                    class="mt20"
                                    v-if="detailEntity.Bank"
                                >
                                    <el-form-item label="账户类型：">
                                        <span v-if="detailEntity.Bank.AccountType === 0">小微商户</span>
                                        <span v-else-if="detailEntity.Bank.AccountType === 1">个体商户</span>
                                        <span v-else-if="detailEntity.Bank.AccountType === 2">企业商户</span>
                                        <span v-else>-</span>
                                    </el-form-item>
                                    <el-form-item
                                        label="公司名称："
                                        v-if="detailEntity.Bank.AccountType === 2"
                                    >{{ detailEntity.Bank.AccountName }}</el-form-item>
                                    <div v-else>
                                        <el-form-item label="持卡人姓名：">{{ detailEntity.Bank.AccountName }}</el-form-item>
                                        <el-form-item label="银行预留手机号：">{{ detailEntity.Bank.Mobile }}</el-form-item>
                                        <!--<el-form-item label="持卡人姓名：">{{ detailEntity.Company.ManagerName }}</el-form-item>
                                        <el-form-item label="银行预留手机号：">{{ detailEntity.Company.MangeMobile }}</el-form-item>-->
                                    </div>
                                    <el-form-item label="银行账号：">{{ detailEntity.Bank.Card }}</el-form-item>
                                    <el-form-item label="开户银行：">{{ detailEntity.Bank.BankName }}</el-form-item>
                                    <el-form-item label="开户银行省市：">{{ detailEntity.Bank.Province }}</el-form-item>
                                    <el-form-item label="所属支行：">{{ detailEntity.Bank.BranchName }}</el-form-item>
                                    <el-form-item
                                        label="开户许可证或印鉴卡照片："
                                        v-if="detailEntity.Bank.AccountType === 2"
                                    >
                                        <div class="img_size">
                                            <viewer :images="[detailEntity.Bank.BankLicenseImg]">
                                                <img
                                                    :src="detailEntity.Bank.BankLicenseImg"
                                                    alt="开户许可证或印鉴卡照片"
                                                />
                                            </viewer>
                                        </div>
                                    </el-form-item>
                                    <el-form-item
                                        label="银行卡照片："
                                        v-else
                                    >
                                        <div class="img_size">
                                            <viewer :images="[detailEntity.Bank.PositiveImg, detailEntity.Bank.NegativeImg]">
                                                <img
                                                    :src="detailEntity.Bank.PositiveImg"
                                                    alt="银行卡正面"
                                                />
                                                <img
                                                    :src="detailEntity.Bank.NegativeImg"
                                                    alt="银行卡反面"
                                                />
                                            </viewer>
                                        </div>
                                    </el-form-item>
                                </el-form>
                            </el-col>
                        </el-row>
                        <el-row v-if="isAudit">
                            <el-divider></el-divider>
                            <p class="mt20">审核结论：</p>
                            <el-form
                                label-width="50px"
                                class="audit-result-form"
                            >
                                <el-form-item label="">
                                    <el-radio
                                        v-model="auditTypeResult.bankCard.audit_status"
                                        :label="1"
                                    >通过</el-radio>
                                    <el-radio
                                        v-model="auditTypeResult.bankCard.audit_status"
                                        :label="0"
                                    >不通过</el-radio>
                                </el-form-item>
                                <el-form-item
                                    v-if="auditTypeResult.bankCard.audit_status === 0"
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
                                                v-model="auditTypeResult.bankCard.audit_remark"
                                            ></el-input>
                                        </vue-scroll>
                                    </el-col>
                                    <el-col :span="12">
                                        <ul>
                                            <vue-scroll>
                                                <li
                                                    v-for="(result, idx) in resultSelect.bankCard"
                                                    :key="idx"
                                                    @click="auditTypeResult.bankCard.audit_remark += result"
                                                >
                                                    {{ result }}
                                                </li>
                                            </vue-scroll>
                                        </ul>
                                    </el-col>
                                </el-form-item>
                            </el-form>
                        </el-row>
                    </el-tab-pane>
                </el-tabs>
            </div>
        </el-card>
        <div class="audit-footer">
            <el-button @click="back">返回列表</el-button>
            <!--<el-button
                type="info"
                @click="saveOptional"
                v-if="isAudit"
            >暂存</el-button>-->
            <el-button
                type="primary"
                @click="submitAudit"
                v-if="isAudit"
            >提交</el-button>
        </div>
    </div>
</template>

<script>

import AuditDetail from '../../api/audit/queryTaskDetail'
import GetCategory from '../../api/category/getClassList'
import InsertOptional from '../../api/audit/insertOptional'
import SubmitAudit from '../../api/audit/submitAudit'

import AuditHistoryDrawer from './auditHistory'

export default {
    components: {
        AuditHistoryDrawer
    },
    data() {
        return {
            isAudit: false,
            userInfo: JSON.parse(window.sessionStorage.getItem('USER_INFO')),
            activeName: 'company',
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
                company: {
                    audit_type: 'company',
                    audit_status: '',
                    audit_remark: '',
                    audit_type_str: '公司信息'
                },
                bankCard: {
                    audit_type: 'bank',
                    audit_status: '',
                    audit_remark: '',
                    audit_type_str: '银行卡信息'
                }
            },
            resultSelect: {
                company: [
                    '公司名称与证照不相符（错字、漏字、多字）',
                    '公司类型选择有误',
                    '公司地址有误（错字、漏字、多字）',
                    '证件号与证照不符',
                    '法人姓名与证照上不符',
                    '手机号码未填写正确',
                    '未上传证件图片',
                    '经营类别（行业类别）选择有误'
                ],
                bankCard: [
                    '账户类型错误',
                    '持卡人姓名未正确填写',
                    '银行卡账号不正确',
                    '开户银行未正确填写',
                    '开户银行省市未正确填写',
                    '所属支行未正确填写',
                    '银行预留手机号不正确',
                    '银行卡照片正面模糊',
                    '银行卡照片反面模糊'
                ]
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

            for (let key in this.auditTypeResult) {
                let oneType = this.auditTypeResult[key];
                console.log(oneType, 'oneType');
                if (oneType.audit_status === '') {
                    this.$message.warning(`请先完成${oneType.audit_type_str}审核`);
                    this.activeName = key;
                    return;
                }
                if (oneType.audit_status == 0) {
                    auditResult.audit_status = 0;
                }
                auditResult.fields.push({
                    id: oneType.id,
                    audit_type: oneType.audit_type,
                    audit_status: oneType.audit_status,
                    audit_remark: oneType.audit_remark
                })
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
        /*saveOptional() {
            console.log(this.verify, 'this.verify');
            InsertOptional.call(this, {
                taskId: this.id,
                optional: this.verify
            }).then(res => {
                console.log(res);
                if(res.Code == 1){
                    this.$message.success('操作记录保存成功');
                }else{
                    this.$message.error(res.Desc || '操作失败');
                }
            })
        },*/
        changeTab(nextTabName) {
            this.activeName = nextTabName;
        },
        back() {
            this.$router.go(-1);
        }
    }
}
</script>

<style lang="less" scoped>
.img_size {
    img {
        width: 150px;
        max-height: 100%;
    }
}
</style>
