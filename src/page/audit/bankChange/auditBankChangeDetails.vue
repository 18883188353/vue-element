<template>
    <div class="fillcontain">
        <el-card class="box-card">
            <div slot="header">
                <b>银行变更审核详情</b>
                <audit-history-drawer v-bind:auditTypeResult="auditTypeResult"></audit-history-drawer>
            </div>
            <div class="text item mb30">
                <div v-if="proxyData">
                    <h4 class="mt10">授权代理人信息：</h4>
                    <el-form
                        label-width="150px"
                        size="mini"
                    >
                        <el-form-item label="代理人姓名：">{{ proxyData.name }}</el-form-item>
                        <el-form-item label="代理人手机：">{{ proxyData.tel }}</el-form-item>
                        <el-form-item label="代理人身份证号：">{{ proxyData.cert_no }}</el-form-item>
                        <el-form-item label="代理人身份证号：">
                            <viewer :images="proxyImgs">
                                <img
                                    v-for="(img, index) in proxyImgs"
                                    :key="index"
                                    :src="img"
                                    style="width: 150px; max-height: 100%; margin: 3px;"
                                />
                            </viewer>
                        </el-form-item>
                        <el-form-item label="授权委托书：">
                            <viewer :images=[proxyData.img_trust_instrument]>
                                <img
                                    :src="proxyData.img_trust_instrument"
                                    style="width: 150px; max-height: 100%;"
                                />
                            </viewer>
                        </el-form-item>
                    </el-form>
                    <el-divider></el-divider>
                </div>
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
                        <h4 class="mt20">联系方式：</h4>
                        <el-form
                            label-width="150px"
                            size="mini"
                            class="mt20"
                        >
                            <el-form-item label="经办人姓名：">{{ BusinessBefore.applier }}</el-form-item>
                            <el-form-item label="经办人手机：">{{ BusinessBefore.applierPhone }}</el-form-item>
                            <el-form-item label="负责人姓名：">{{ BusinessBefore.manager }}</el-form-item>
                            <el-form-item label="负责人手机：">{{ BusinessBefore.managerPhone }}</el-form-item>
                            <el-form-item label="集团/公司座机号：">{{ BusinessBefore.telephone }}</el-form-item>
                        </el-form>
                    </el-col>
                    <el-col :span="12">
                        <h4 class="mt20">联系方式：</h4>
                        <el-form
                            label-width="150px"
                            size="mini"
                            class="mt20"
                        >
                            <el-form-item
                                :class="BusinessBefore.applier === BusinessAfter.OperatorName ? '' : 'redItem'"
                                label="经办人姓名："
                            >{{ BusinessAfter.OperatorName }}</el-form-item>
                            <el-form-item
                                :class="BusinessBefore.applierPhone === BusinessAfter.OperatorMobile ? '' : 'redItem'"
                                label="经办人手机："
                            >{{ BusinessAfter.OperatorMobile }}</el-form-item>
                            <el-form-item
                                :class="BusinessBefore.manager === BusinessAfter.ManagerName ? '' : 'redItem'"
                                label="负责人姓名："
                            >{{ BusinessAfter.ManagerName }}</el-form-item>
                            <el-form-item
                                :class="BusinessBefore.managerPhone === BusinessAfter.MangeMobile ? '' : 'redItem'"
                                label="负责人手机："
                            >{{ BusinessAfter.MangeMobile }}</el-form-item>
                            <el-form-item
                                :class="BusinessBefore.telephone === BusinessAfter.Telephone ? '' : 'redItem'"
                                label="集团/公司座机号："
                            >{{ BusinessAfter.Telephone }}</el-form-item>
                        </el-form>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <h4 class="mt10">公司信息：</h4>
                        <el-form
                            label-width="150px"
                            size="mini"
                            class="mt20"
                        >
                            <el-form-item label="公司类型：">{{ BusinessBefore.type }}</el-form-item>
                            <el-form-item label="公司名称：">{{ BusinessBefore.name }}</el-form-item>
                            <el-form-item label="公司地址：">{{ BusinessBefore.area }} {{BusinessBefore.address}}</el-form-item>
                            <el-form-item label="法人姓名：">{{ BusinessBefore.legalPerson }}</el-form-item>
                            <el-form-item label="法人手机：">{{ BusinessBefore.legalPersonMobile }}</el-form-item>
                            <el-form-item label="法人身份证号：">{{ BusinessBefore.legalPersonIdcard }}</el-form-item>
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
                            <el-form-item label="变更后营业执照：">
                                <viewer :images=[BusinessLicenseBefore.LicenseImg]>
                                    <img
                                        :src="BusinessLicenseBefore.LicenseImg"
                                        style="width: 150px; height: 200px;"
                                    />
                                </viewer>
                            </el-form-item>
                            <el-form-item label="营业执照号：">{{ BusinessLicenseBefore.LicenseCard }}</el-form-item>
                            <el-form-item label="成立日期：">{{ BusinessLicenseBefore.LicenseCreateTime }}</el-form-item>
                            <el-form-item label="有效期：">{{ BusinessLicenseBefore.IsEver == 1 ? '长期有效' : BusinessLicenseBefore.LicenseValidTime }}</el-form-item>
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
                                :class="BusinessBefore.type === BusinessAfter.Type ? '' : 'redItem'"
                                label="公司类型："
                            >{{ BusinessAfter.Type }}</el-form-item>
                            <el-form-item
                                :class="BusinessBefore.name === BusinessAfter.Name ? '' : 'redItem'"
                                label="公司名称："
                            >{{ BusinessAfter.Name }}</el-form-item>
                            <el-form-item
                                :class="BusinessBefore.area === BusinessAfter.Area ? (BusinessBefore.address === BusinessAfter.Address ? '' : redItem) : 'redItem'"
                                label="公司地址："
                            >{{ BusinessAfter.Area }} {{BusinessAfter.Address}}</el-form-item>
                            <el-form-item
                                :class="BusinessBefore.legalPerson === BusinessAfter.LegalPersonName ? '' : 'redItem'"
                                label="法人姓名："
                            >{{ BusinessAfter.LegalPersonName }}</el-form-item>
                            <el-form-item
                                :class="BusinessBefore.legalPersonMobile === BusinessAfter.LegalPersonMobile ? '' : 'redItem'"
                                label="法人手机："
                            >{{ BusinessAfter.LegalPersonMobile }}</el-form-item>
                            <el-form-item
                                :class="BusinessBefore.legalPersonIdcard === BusinessAfter.LegalPersonIdCard ? '' : 'redItem'"
                                label="法人身份证号："
                            >{{ BusinessAfter.LegalPersonIdCard }}</el-form-item>
                            <el-form-item
                                :class="cradImgsAfterFlag ? 'redItem' : ''"
                                label="法人身份证："
                            >
                                <div class="img_size">
                                    <viewer :images=cradImgsAfter>
                                        <img
                                            v-for="(img, index) in cradImgsAfter"
                                            :key="index"
                                            :src="img"
                                        />

                                    </viewer>
                                </div>
                            </el-form-item>
                            <el-form-item
                                :class="BusinessLicenseBefore.LicenseImg === BusinessAfter.BusinesLicenseImg ? '' : 'redItem'"
                                label="变更后营业执照："
                            >
                                <viewer :images=[BusinessAfter.BusinesLicenseImg]>
                                    <img
                                        :src="BusinessAfter.BusinesLicenseImg"
                                        style="width: 150px; height: 200px;"
                                    />
                                </viewer>
                            </el-form-item>
                            <el-form-item
                                :class="BusinessLicenseBefore.LicenseCard === BusinessAfter.BusinesLicenseCard ? '' : 'redItem'"
                                label="营业执照号："
                            >{{ BusinessAfter.BusinesLicenseCard }}</el-form-item>
                            <el-form-item
                                :class="BusinessLicenseBefore.LicenseCreateTime === BusinessAfter.BusinesLicenseCreateTime ? '' : 'redItem'"
                                label="成立日期："
                            >{{ BusinessAfter.BusinesLicenseCreateTime }}</el-form-item>
                            <el-form-item
                                :class="(BusinessLicenseBefore.IsEver == BusinessAfter.BusinessLicenseValidType && BusinessAfter.BusinessLicenseValidType === 1) ? '' : (BusinessLicenseBefore.LicenseValidTime === BusinessAfter.BusinesLicenseValidTime ? '' : 'redItem')"
                                label="有效期："
                            >{{ BusinessAfter.BusinessLicenseValidType === 1 ? '长期有效' : BusinessAfter.BusinesLicenseValidTime }}</el-form-item>
                        </el-form>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <h4 class="mt10">银行卡信息：</h4>
                        <el-form
                            label-width="150px"
                            size="mini"
                            class="mt20"
                        >
                            <el-form-item label="账户类型：">{{ detailEntity.BIZTypeBefore }}</el-form-item>
                            <el-form-item label="持卡人姓名：">{{ BIZDataBefore.bank_account_name }}</el-form-item>
                            <el-form-item label="预留手机号：">{{ BIZDataBefore.bank_telephone_no }}</el-form-item>
                            <el-form-item label="银行账号：">{{ BIZDataBefore.bank_account_no }}</el-form-item>
                            <el-form-item label="开户银行：">{{ BIZDataBefore.bank_type }}</el-form-item>
                            <el-form-item label="开户银行省市：">{{ BIZDataBefore.bank_province }} {{BIZDataBefore.bank_city}}</el-form-item>
                            <el-form-item label="所属支行：">{{ BIZDataBefore.bank_name }}</el-form-item>
                            <el-form-item
                                v-if="detailEntity.BIZTypeBefore === '企业商户'"
                                label="开户许可证或印鉴卡照片："
                            >
                                <viewer :images=[BIZDataAfter.img_account_license]>
                                    <div class="img-w150-h-auto">
                                        <img :src="BIZDataAfter.img_account_license" />
                                    </div>
                                </viewer>
                            </el-form-item>
                            <el-form-item
                                v-if="detailEntity.BIZTypeBefore !== '企业商户'"
                                label="银行卡正反面："
                            >
                                <viewer :images=bankCardImgsBefore>
                                    <div class="img_size">
                                        <img
                                            v-for="(img, index) in bankCardImgsBefore"
                                            :key="index"
                                            :src="img"
                                        />
                                    </div>
                                </viewer>
                            </el-form-item>
                            <el-divider></el-divider>
                            <el-form-item label="变更理由：">
                                <div v-if="BIZExcelData.reason_list">
                                    <p
                                        v-for="(item,index) in BIZExcelData.reason_list"
                                        :key="index"
                                    >{{ item }}</p>
                                </div>
                            </el-form-item>
                        </el-form>
                    </el-col>
                    <el-col :span="12">
                        <h4 class="mt10">银行卡信息：</h4>
                        <el-form
                            label-width="150px"
                            size="mini"
                            class="mt20"
                        >
                            <el-form-item
                                :class="detailEntity.BIZTypeBefore === detailEntity.BIZTypeAfter ? '' : 'redItem'"
                                label="账户类型："
                            >{{ detailEntity.BIZTypeAfter }}</el-form-item>
                            <el-form-item
                                :class="BIZDataBefore.bank_account_name === BIZDataAfter.bank_account_name ? '' : 'redItem'"
                                label="持卡人姓名："
                            >{{ BIZDataAfter.bank_account_name }}</el-form-item>
                            <el-form-item
                                :class="BIZDataBefore.bank_telephone_no === BIZDataAfter.bank_telephone_no ? '' : 'redItem'"
                                label="预留手机号："
                            >{{ BIZDataAfter.bank_telephone_no }}</el-form-item>
                            <el-form-item
                                :class="BIZDataBefore.bank_account_no === BIZDataAfter.bank_account_no? '' : 'redItem'"
                                label="银行账号："
                            >{{ BIZDataAfter.bank_account_no }}</el-form-item>
                            <el-form-item
                                :class="BIZDataBefore.bank_type === BIZDataAfter.bank_type ? '' : 'redItem'"
                                label="开户银行："
                            >{{ BIZDataAfter.bank_type }}</el-form-item>
                            <el-form-item
                                :class="BIZDataBefore.bank_province === BIZDataAfter.bank_province ? (BIZDataBefore.bank_city === BIZDataAfter.bank_city ? '' : 'redItem') : 'redItem'"
                                label="开户银行省市："
                            >{{ BIZDataAfter.bank_province }} {{BIZDataAfter.bank_city}}</el-form-item>
                            <el-form-item
                                :class="BIZDataBefore.bank_name === BIZDataAfter.bank_name ? '' : 'redItem'"
                                label="所属支行："
                            >{{ BIZDataAfter.bank_name }}</el-form-item>
                            <el-form-item
                                :class="bankCardImgsAfterFlag ? 'redItem' : ''"
                                v-if="detailEntity.BIZTypeAfter === '企业商户'"
                                label="开户许可证或印鉴卡照片："
                            >
                                <viewer :images=[BIZDataAfter.img_account_license]>
                                    <div class="img-w150-h-auto">
                                        <img :src="BIZDataAfter.img_account_license" />
                                    </div>
                                </viewer>
                            </el-form-item>
                            <el-form-item
                                :class="bankCardImgsAfterFlag ? 'redItem' : ''"
                                v-if="detailEntity.BIZTypeAfter !== '企业商户'"
                                label="银行卡正反面："
                            >
                                <div class="img_size">
                                    <viewer :images="bankCardImgsAfter">
                                        <img
                                            v-for="(url, index) in bankCardImgsAfter"
                                            :key="index"
                                            :src="url"
                                        />
                                    </viewer>
                                </div>
                            </el-form-item>
                        </el-form>
                        <el-divider></el-divider>
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
import AuditHistory from '../../../api/audit/queryTaskHistory'
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
            BusinessBefore: {}, //商家信息之前
            BusinessAfter: {}, //商家信息之后
            BusinessLicenseBefore: {}, //变更前营业执照
            BIZDataBefore: {}, //财务数据之前
            BIZDataAfter: {}, //财务数据之后
            BIZExcelData: {}, // 变更理由
            proxyImgs: [],  //代理图片
            cradImgsBefore: [],  //身份证之前图片
            cradImgsAfter: [],  //身份证之后图片
            cradImgsAfterFlag: false, //身份证是否变化
            bankCardImgsBefore: [],  //银行卡之前图片
            bankCardImgsAfter: [],  //银行卡之后图片
            bankCardImgsAfterFlag: false, //银行卡图片是否变更
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

                    this.proxyData = entityInfo.BIZProxy;
                    this.BusinessBefore = entityInfo.BusinessBefore ? entityInfo.BusinessBefore : {};
                    this.BusinessLicenseBefore = entityInfo.BusinessLicenseBefore ? entityInfo.BusinessLicenseBefore : {};
                    this.BusinessAfter = entityInfo.BusinessAfter ? entityInfo.BusinessAfter : {};
                    this.BIZDataBefore = entityInfo.BIZDataBefore ? entityInfo.BIZDataBefore : {};
                    this.BIZDataAfter = entityInfo.BIZDataAfter ? entityInfo.BIZDataAfter : {};
                    this.BIZExcelData = entityInfo.BIZExcelData ? entityInfo.BIZExcelData : {};
                    //审核结果
                    /*let _auditResultDesc = res.Data.auditResultDesc;
                    let auditResultDesc = {};
                    if (_auditResultDesc) {
                        auditResultDesc = JSON.parse(_auditResultDesc);
                    }*/
                    //代理
                    let proxyImgs = [];
                    if (this.proxyData) {
                        proxyImgs.push(this.proxyData.img_cert_reverse);
                        proxyImgs.push(this.proxyData.img_cert_obverse);
                    }
                    this.proxyImgs = proxyImgs;

                    //法人身份证
                    let cradImgsBefore = [];
                    cradImgsBefore.push(this.BusinessBefore.legalIdcardPositiveUrl);
                    cradImgsBefore.push(this.BusinessBefore.legalIdcardNegativeUrl);
                    this.cradImgsBefore = cradImgsBefore;

                    let cradImgsAfter = [];
                    cradImgsAfter.push(this.BusinessAfter.LegalPersonIdCardPositiveImg);
                    cradImgsAfter.push(this.BusinessAfter.LegalPersonIdCardNegativeImg);
                    if (this.BusinessBefore.legalIdcardPositiveUrl !== this.BusinessAfter.LegalPersonIdCardPositiveImg || this.BusinessBefore.legalIdcardNegativeUrl !== this.BusinessAfter.LegalPersonIdCardNegativeImg) {
                        this.cradImgsAfterFlag = true;
                    }
                    this.cradImgsAfter = cradImgsAfter;
                    //银行卡
                    let bankCardImgsBefore = [];
                    bankCardImgsBefore.push(this.BIZDataBefore.img_bank_card_obverse);
                    bankCardImgsBefore.push(this.BIZDataBefore.img_bank_card_reverse);
                    this.bankCardImgsBefore = bankCardImgsBefore;

                    let bankCardImgsAfter = [];
                    bankCardImgsAfter.push(this.BIZDataAfter.img_bank_card_obverse);
                    bankCardImgsAfter.push(this.BIZDataAfter.img_bank_card_reverse);
                    this.bankCardImgsAfter = bankCardImgsAfter;

                    if (entityInfo.BIZTypeBefore !== entityInfo.BIZTypeAfter) {
                        this.bankCardImgsAfterFlag = true;
                    } else if (entityInfo.BIZTypeAfter === '企业商户') {
                        if (this.BIZDataBefore.img_account_license !== this.BIZDataAfter.img_account_license) {
                            this.bankCardImgsAfterFlag = true;
                        }
                    } else {
                        if (this.BIZDataBefore.img_bank_card_obverse !== this.BIZDataAfter.img_bank_card_obverse || this.BIZDataBefore.img_bank_card_reverse !== this.BIZDataAfter.img_bank_card_reverse) {
                            this.bankCardImgsAfterFlag = true;
                        }
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
