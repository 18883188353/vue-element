<template>
    <div class="fillcontain">
        <el-card class="none-border">
            <div slot="header">
                <b>激活店铺审核详情</b>
                <audit-history-drawer v-bind:auditTypeResult="auditTypeResult"></audit-history-drawer>
            </div>
            <div class="text item mb30">
                <el-tabs
                    v-model="activeName"
                    class="pl10"
                >

                    <!--公司信息-->
                    <el-tab-pane
                        label="公司信息"
                        name="company"
                    >
                        <!--二次审核-->
                        <el-form
                            :inline="true"
                            label-width="150px"
                            size="mini"
                            v-if="auditHistoryList.length > 0"
                        >
                            <el-form-item label="上次审核结果：">{{ auditHistoryList[0].auditResult }}</el-form-item>
                            <el-form-item label="审核人员：">{{ auditHistoryList[0].auditUsername }}</el-form-item>
                            <el-form-item label="审核时间：">{{ auditHistoryList[0].auditTime }}</el-form-item>
                            <el-form-item label="说明：">
                                {{ 
                                    auditHistoryList[0].auditResult === 1 ? '审核通过' : '审核不通过'
                                }}
                            </el-form-item>
                        </el-form>
                        <el-row v-if="detailEntity.company">
                            <el-col :span="24">
                                <div class="info-title">联系方式</div>
                                <el-form
                                    label-width="150px"
                                    size="mini"
                                    class="mt20"
                                >
                                    <el-form-item label="经办人姓名：">{{ detailEntity.company.applier_name }}</el-form-item>
                                    <el-form-item label="经办人手机：">{{ detailEntity.company.applier_phone }}</el-form-item>
                                    <el-form-item label="负责人姓名：">{{ detailEntity.company.manager_name }}</el-form-item>
                                    <el-form-item label="负责人手机：">{{ detailEntity.company.manager_phone }}</el-form-item>
                                    <el-form-item label="公司座机号：">{{ detailEntity.company.company_tel }}</el-form-item>
                                    <el-form-item label="资料上传人："> - </el-form-item>
                                </el-form>
                            </el-col>
                        </el-row>
                        <el-divider></el-divider>
                        <el-row v-if="detailEntity.company">
                            <el-col :span="24">
                                <div class="info-title">公司信息</div>
                                <el-form
                                    label-width="150px"
                                    size="mini"
                                    class="mt20"
                                >
                                    <el-form-item label="公司类型：">{{ detailEntity.company.company_type }}</el-form-item>
                                    <el-form-item label="公司名称：">{{ detailEntity.company.company_name }}</el-form-item>
                                    <el-form-item label="公司地址：">{{ `${detailEntity.company.area} ${detailEntity.company.address}` }}</el-form-item>
                                    <div v-if="detailEntity.company.is_license !== 0">
                                        <el-form-item label="营业执照号：">{{ detailEntity.company.license_number }}</el-form-item>
                                        <el-form-item
                                            label="营业成立日期："
                                            v-if="detailEntity.company.is_license !== 0"
                                        >{{ detailEntity.company.license_start_time }}</el-form-item>
                                        <el-form-item label="营业执照有效期：">{{ detailEntity.company.license_type === 2 ? detailEntity.company.license_end_time : '长期有效' }}</el-form-item>
                                        <el-form-item label="营业执照图片：">
                                            <div class="img-w100-h-auto">
                                                <viewer>
                                                    <img :src="detailEntity.company && detailEntity.company.license_pic_url">
                                                </viewer>
                                            </div>
                                        </el-form-item>
                                    </div>
                                    <div v-else>
                                        <el-form-item label="办证日期（最迟补交营业执照日期）：">{{ detailEntity.company.commitment_repair_time }}</el-form-item>
                                        <el-form-item label="承诺书：">
                                            <div class="img-w100-h-auto">
                                                <viewer>
                                                    <img :src="detailEntity.company.commitment_url">
                                                </viewer>
                                            </div>
                                        </el-form-item>
                                    </div>
                                </el-form>
                            </el-col>
                        </el-row>
                        <el-divider></el-divider>
                        <el-row v-if="detailEntity.company">
                            <el-col :span="24">
                                <div class="info-title">法人信息</div>
                                <el-form
                                    label-width="150px"
                                    size="mini"
                                    class="mt20"
                                >
                                    <el-form-item label="法人姓名：">{{ detailEntity.company.legal_person_name }}</el-form-item>
                                    <el-form-item label="法人联系电话：">{{ detailEntity.company.legal_person_phone }}</el-form-item>
                                    <el-form-item label="法人身份证号：">{{ detailEntity.company.legal_person_idcard }}</el-form-item>
                                    <el-form-item label="法人身份证照片：">
                                        <div class="img-hw100">
                                            <viewer>
                                                <img :src="detailEntity.company.legal_idcard_positive_url">
                                                <img :src="detailEntity.company.legal_idcard_negative_url">
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

                    <!--店铺信息-->
                    <el-tab-pane
                        label="店铺信息"
                        name="shop"
                    >
                        <el-row v-if="detailEntity.shopInfo">
                            <el-col :span="24">
                                <div class="info-title">网店信息</div>
                                <el-form
                                    label-width="150px"
                                    size="mini"
                                    class="mt20"
                                >
                                    <el-form-item label="网店名称：">{{ detailEntity.shopInfo.shop_name }}</el-form-item>
                                    <el-form-item label="网店联系电话：">{{ detailEntity.shopInfo.shop_phone }}</el-form-item>
                                    <el-form-item label="相关资质：">
                                        <div
                                            class="img-hw100"
                                            v-if="detailEntity.shopInfo.shop_other_credentials"
                                        >
                                            <viewer :images="detailEntity.shopInfo.shop_other_credentials.split(',') || []">
                                                <img
                                                    v-for="url in detailEntity.shopInfo.shop_other_credentials.split(',')"
                                                    :key="url"
                                                    :src="url"
                                                    style="margin-right:3px"
                                                />
                                            </viewer>
                                        </div>
                                    </el-form-item>
                                    <el-form-item label="公司LOGO：">
                                        <div class="img-w100-h-auto">
                                            <viewer>
                                                <img :src="detailEntity.shopInfo.shop_logo" />
                                            </viewer>
                                        </div>
                                    </el-form-item>
                                    <el-form-item label="网店形象照片：">
                                        <div class="img-w100-h-auto">
                                            <viewer>
                                                <img :src="detailEntity.shopInfo.shop_pics" />
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
                                        v-model="auditTypeResult.shop.audit_status"
                                        :label="1"
                                    >通过</el-radio>
                                    <el-radio
                                        v-model="auditTypeResult.shop.audit_status"
                                        :label="0"
                                    >不通过</el-radio>
                                </el-form-item>
                                <el-form-item
                                    v-if="auditTypeResult.shop.audit_status === 0"
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
                                                v-model="auditTypeResult.shop.audit_remark"
                                            ></el-input>
                                        </vue-scroll>
                                    </el-col>
                                    <el-col :span="12">
                                        <ul>
                                            <vue-scroll>
                                                <li
                                                    v-for="(result, idx) in resultSelect.shop"
                                                    :key="idx"
                                                    @click="auditTypeResult.shop.audit_remark += result"
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
                    <!-- <el-tab-pane
                        label="银行卡信息"
                        name="bankCard"
                    >
                        <el-row v-if="detailEntity.shopInfo">
                            <el-col :span="24">
                                <el-form
                                    label-width="180px"
                                    size="mini"
                                    class="mt10"
                                    v-if="detailEntity.bankInfo"
                                >
                                    <el-form-item label="账户类型：">
                                        <span v-if="detailEntity.bankInfo.account_type == 0">小微商户</span>
                                        <span v-else-if="detailEntity.bankInfo.account_type == 1">个体商户</span>
                                        <span v-else-if="detailEntity.bankInfo.account_type == 2">企业商户</span>
                                        <span v-else> - </span>
                                    </el-form-item>
                                    <el-form-item
                                        label="公司名称："
                                        v-if="detailEntity.bankInfo.account_type == 2"
                                    >{{ detailEntity.bankInfo.account_userName }}</el-form-item>
                                    <el-form-item
                                        label="持卡人姓名："
                                        v-else
                                    >{{ detailEntity.bankInfo.account_userName }}</el-form-item>
                                    <el-form-item label="银行账号：">{{ detailEntity.bankInfo.bank_code }}</el-form-item>
                                    <el-form-item label="开户银行：">{{ detailEntity.bankInfo.bank_type_name }}</el-form-item>
                                    <el-form-item label="开户银行省市：">{{ detailEntity.bankInfo.area }}</el-form-item>
                                    <el-form-item label="所属支行：">{{ detailEntity.bankInfo.branch_name }}</el-form-item>
                                    <el-form-item
                                        label="银行预留手机号："
                                        v-if="detailEntity.bankInfo.account_type != 2"
                                    >{{ detailEntity.bankInfo.mobile }}</el-form-item>
                                    <el-form-item
                                        label="银行卡照片："
                                        v-if="detailEntity.bankInfo.account_type != 2"
                                    >
                                        <div class="img-w100-h-auto">
                                            <viewer :images="[detailEntity.bankInfo.idcard_positive_url,detailEntity.bankInfo.idcard_negative_url]">
                                                <img :src="detailEntity.bankInfo.idcard_positive_url" />
                                                <img :src="detailEntity.bankInfo.idcard_negative_url" />
                                            </viewer>
                                        </div>
                                    </el-form-item>
                                    <el-form-item
                                        label="开户许可证或印鉴卡照片："
                                        v-else
                                    >
                                        <div
                                            class="img-w100-h-auto"
                                            v-if="detailEntity.shopInfo.license_url"
                                        >
                                            <viewer :images="[detailEntity.shopInfo.license_url]">
                                                <img :src="detailEntity.shopInfo.license_url" />
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

                    </el-tab-pane> -->
                    <!--经营范围-->
                    <el-tab-pane
                        label="经营范围"
                        name="scopeInfo"
                        style="padding-bottom: 30px;"
                    >
                        <el-row>
                            <el-col :span="12">
                                <p
                                    class="mt20"
                                    style="font-size:16px"
                                >温馨提示：<span style="color: red;">❉选择的经营类目必须属于营业执照经营范围内</span></p>
                                <div class="mt20 scope-all">
                                    <el-input
                                        placeholder="可选择经营范围"
                                        v-model="filterText"
                                        suffix-icon="el-icon-search"
                                    ></el-input>
                                    <div
                                        class="mt20"
                                        style="height: 250px;"
                                    >
                                        <vue-scroll>
                                            <el-tree
                                                class="filter-tree"
                                                :data="categoryTree"
                                                :props="categoryProps"
                                                node-key="oldId"
                                                show-checkbox
                                                default-expand-all
                                                :filter-node-method="filterNode"
                                                ref="categoryTree"
                                            ></el-tree>
                                        </vue-scroll>
                                    </div>
                                </div>
                                <div class="mt20">
                                    <table class="managementRange">
                                        <thead>
                                            <tr>
                                                <th colspan="4">已选经营范围(<span class="cor4">选择经营范围</span>)</th>
                                            </tr>
                                            <tr>
                                                <th>一级分类</th>
                                                <th>二级分类</th>
                                                <th>技术服务费(%)</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr
                                                v-for="(n, idx) in selectCategoryData"
                                                :key="idx"
                                            >
                                                <th>{{ n.firstClassName }}</th>
                                                <th>{{ n.secondClassName }}</th>
                                                <th>{{ n.servicePrice }}</th>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </el-col>
                            <el-col
                                :span="12"
                                v-if="detailEntity.company && detailEntity.company.is_license !== 0"
                            >
                                <p class="tc mt20 fw">营业执照</p>
                                <div class="tc mt20">
                                    <viewer :images="[detailEntity.company.license_pic_url]">
                                        <img
                                            :src="detailEntity.company.license_pic_url"
                                            style="max-width: 300px; max-height: 100%;"
                                        />
                                    </viewer>
                                </div>
                            </el-col>
                            <el-col
                                :span="12"
                                v-else
                            >
                                <p class="tc mt20 fw">承诺书</p>
                                <div class="tc mt20">
                                    <viewer>
                                        <img
                                            :src="detailEntity.company && detailEntity.company.commitment_url"
                                            style="max-width: 300px; max-height: 100%;"
                                        />
                                    </viewer>
                                </div>
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
                                        v-model="auditTypeResult.scopeInfo.audit_status"
                                        :label="1"
                                    >通过</el-radio>
                                    <el-radio
                                        v-model="auditTypeResult.scopeInfo.audit_status"
                                        :label="0"
                                    >不通过</el-radio>
                                </el-form-item>
                                <el-form-item
                                    v-if="auditTypeResult.scopeInfo.audit_status === 0"
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
                                                v-model="auditTypeResult.scopeInfo.audit_remark"
                                            ></el-input>
                                        </vue-scroll>
                                    </el-col>
                                    <el-col :span="12">
                                        <ul>
                                            <vue-scroll>
                                                <li
                                                    v-for="(result, idx) in resultSelect.scopeInfo"
                                                    :key="idx"
                                                    @click="auditTypeResult.scopeInfo.audit_remark += result"
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
import GetFees from '../../api/category/getFees'
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
                    id: 0,
                    audit_type: 'company',
                    audit_status: '',
                    audit_remark: '',
                    audit_type_str: '公司信息'
                },
                shop: {
                    id: 0,
                    audit_type: 'shopInfo',
                    audit_status: '',
                    audit_remark: '',
                    audit_type_str: '店铺信息'
                },
                // bankCard: {
                //     id: 0,
                //     audit_type: 'bankCardInfo',
                //     audit_status: '',
                //     audit_remark: '',
                //     audit_type_str: '银行卡信息'
                // },
                scopeInfo: {
                    id: 0,
                    audit_type: 'scopeInfo',
                    audit_status: '',
                    audit_remark: '',
                    audit_type_str: '经营范围'
                }
            },
            auditResult: { // 审核结果
                audit_status: 0, // 0不通过 1通过
                fields: [],
                version: '1.0.0',
                whole: {}
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
                shop: [
                    '店铺名称有误（与门头照不符、错字、漏字、多字）',
                    '网店联系电话未填写正确',
                    '区域未选择或选择有误',
                    '图片不美观（杂乱、模糊不清、未显示全、有路人、水印）',
                    '图片与店铺经营不符',
                    '区域与详细地址不符',
                    '地址有误（不详细、错字、漏字、多字）'
                ],
                // bankCard: [
                //     '账户类型错误',
                //     '持卡人姓名未正确填写',
                //     '银行卡账号不正确',
                //     '开户银行未正确填写',
                //     '开户银行省市未正确填写',
                //     '所属支行未正确填写',
                //     '银行预留手机号不正确',
                //     '银行卡照片正面模糊',
                //     '银行卡照片反面模糊'
                // ],
                scopeInfo: [
                    '所选经营范围和营业执照不对应'
                ]
            },
            categoryTree: [], // 所有经营范围
            categoryProps: {
                label: 'title',
                children: 'children'
            },
            categorySelectValue: [], // 经营范围已选择ID
            selectCategoryData: [], // 经营范围已选择数据列表
            filterText: '' // 经营范围搜索关键字
        }
    },
    computed: {

    },
    mounted() {
        this.init();
    },
    methods: {
        init() {
            AuditDetail.call(this, { taskId: this.id }).then(res => {
                if (res.Code === 1) {
                    let entityInfo = JSON.parse(res.Data.entityInfo);
                    this.detailEntity = entityInfo;
                    if (this.detailEntity.scopeInfo.business_scope) {
                        this.categorySelectValue = this.detailEntity.scopeInfo.business_scope.split(',');
                    }
                    this.auditTypeResult.company.id = this.detailEntity.company.id
                    this.auditTypeResult.shop.id = this.detailEntity.shopInfo.id
                    // this.auditTypeResult.bankCard.id = this.detailEntity.shopInfo.id
                    this.auditTypeResult.scopeInfo.id = this.detailEntity.shopInfo.id
                    if (res.Data.auditStatus === 0) {
                        this.isAudit = true;
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

            this.initCategory(entity.taskTypeName);
        },
        initCategory(taskTypeName) {
            GetCategory.call(this, {
                categoryType: 'Goods',
                isGolb: 'DomesticActivation' === taskTypeName ? 0 : 1
            }).then(res => {
                console.log(res, 'category');
                if (res.code == '1') {
                    // 为对象添加禁止点击的属性
                    let dg = function (list) {
                        if (list && list.length > 0) {
                            for (let i = 0; i < list.length; i++) {
                                let e = list[i];
                                e.disabled = true;
                                dg(e.children);
                            }
                        }
                    }
                    dg(res.data.category);
                    this.categoryTree = res.data.category;
                    // 设置营业范围选中值
                    this.$nextTick(() => {
                        if (this.categorySelectValue) {
                            this.$refs.categoryTree.setCheckedKeys(this.categorySelectValue);
                            this.$nextTick(() => {
                                this.getSelectCategory();
                            })
                        }
                    })
                }
            })
        },
        getSelectCategory() {
            let selectValue = this.$refs.categoryTree.getCheckedNodes();
            console.log(selectValue, 'selectValue');
            selectValue = selectValue.filter(n => n.parentId != 0);
            let selectIds = new Array();
            // 构造table数据
            let selectCategoryData = selectValue.map(n => {
                let parent = this.categoryTree.find(f => f.oldId == n.parentId);
                selectIds.push(n.oldId);
                return {
                    id: n.oldId,
                    firstClassName: parent.title ? parent.title : '',
                    secondClassName: n.title,
                    servicePrice: 0
                }
            });
            GetFees.call(this, { ids: selectIds.join(',') }).then(res => {
                if (res.Code === 1) {
                    selectCategoryData.forEach(n => {
                        try {
                            let o = res.Data.find(q => q.oldId = n.id);
                            let r = o.fees.find(f => f.shopType === 2);
                            n.servicePrice = r.rate;
                        } catch (e) {
                            console.error('服务费获取失败', n);
                            n.servicePrice = 0;
                        }
                    });
                } else {
                    this.$message.error('技术服务费获取失败');
                }
                this.selectCategoryData = selectCategoryData;
            })

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
            // // 这里经营范围默认通过
            // auditResult.fields.push({
            //     id: this.detailEntity.shopInfo.id,
            //     type: 'scopeInfo', // 经营范围
            //     audit_status: 1,
            //     audit_remark: ''
            // })

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
        changeTab(nextTabName) {
            this.activeName = nextTabName;
        },
        /**
         * 树形控件
         * @param value
         * @param data
         * @returns {boolean}
         */
        filterNode(value, data) {
            if (!value) return true;
            return data.title.indexOf(value) !== -1;
        },
        back() {
            this.$router.go(-1);
        }
    },
    watch: {
        filterText(value) {
            this.$refs.categoryTree.filter(value);
        }
    }
}
</script>

<style lang="less" scoped>
.scope-all {
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 5px;
    height: 310px;
}
.managementRange {
    width: 100%;
    height: auto;
    color: #666;
    border-collapse: collapse;
    thead {
        background: #eaeaea;
        tr {
            width: 100%;
            height: auto;
            th {
                width: 25%;
                height: 50px;
                font-weight: normal;
                border: 1px #ddd solid;
            }
        }
    }
    tbody {
        background: #fff;
        tr {
            width: 100%;
            height: auto;
            th {
                width: 25%;
                height: 40px;
                font-size: 14px;
                border: 1px #ddd solid;
                font-weight: normal;
            }
        }
    }
}
</style>
