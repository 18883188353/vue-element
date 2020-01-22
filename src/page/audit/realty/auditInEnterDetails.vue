<template>
    <div class="fillcontain">
        <el-card class="box-card">
            <div slot="header">
                <b>房地产入驻审核详情</b>
                <audit-history-drawer
                    v-bind:auditTypeResult="auditTypeResult"
                    v-bind:keyName="'audit_name'"
                    v-bind:nullLabel="'周边配套'"
                ></audit-history-drawer>
            </div>
            <el-row>
                <el-col :span="24">
                    <el-tabs
                        v-model="currentTabName"
                        class="pl10 mb20"
                    >
                        <el-tab-pane
                            name="baseInfo"
                            label="企业信息"
                        >
                            <el-form
                                label-width="150px"
                                size="mini"
                                v-if="detailEntity.company"
                            >
                                <el-form-item label="企业名称：">
                                    <audit-select
                                        v-bind:value="detailEntity.company.company_name"
                                        v-bind:oneAudit="auditTypeResult.companyName"
                                        v-bind:resultSelect="resultSelect.text"
                                        v-bind:isAudit="isAudit"
                                    ></audit-select>
                                </el-form-item>
                                <el-form-item label="负责人姓名：">
                                    <audit-select
                                        v-bind:value="detailEntity.company.manager_person_name"
                                        v-bind:oneAudit="auditTypeResult.managerPersonName"
                                        v-bind:resultSelect="resultSelect.text"
                                        v-bind:isAudit="isAudit"
                                    ></audit-select>
                                </el-form-item>
                                <el-form-item label="负责人电话：">
                                    <audit-select
                                        v-bind:value="detailEntity.company.manager_person_phone"
                                        v-bind:oneAudit="auditTypeResult.managerPersonPhone"
                                        v-bind:resultSelect="resultSelect.text"
                                        v-bind:isAudit="isAudit"
                                    ></audit-select>
                                </el-form-item>
                                <el-form-item label="营业执照号：">
                                    <audit-select
                                        v-bind:value="detailEntity.company.business_license_number"
                                        v-bind:oneAudit="auditTypeResult.businessLicenseNumber"
                                        v-bind:resultSelect="resultSelect.text"
                                        v-bind:isAudit="isAudit"
                                    ></audit-select>
                                </el-form-item>
                                <el-form-item label="营业执照：">
                                    <audit-select
                                        v-bind:type="'image'"
                                        v-bind:value="detailEntity.company.business_license_picture"
                                        v-bind:oneAudit="auditTypeResult.businessLicensePicture"
                                        v-bind:resultSelect="resultSelect.image"
                                        v-bind:isAudit="isAudit"
                                    ></audit-select>
                                </el-form-item>
                                <el-form-item label="有效期至：">
                                    <audit-select
                                        v-bind:value="detailEntity.company.effective_date"
                                        v-bind:oneAudit="auditTypeResult.validTime"
                                        v-bind:resultSelect="resultSelect.text"
                                        v-bind:isAudit="isAudit"
                                    ></audit-select>
                                </el-form-item>
                                <el-form-item label="法人姓名：">
                                    <audit-select
                                        v-bind:value="detailEntity.company.legal_person_name"
                                        v-bind:oneAudit="auditTypeResult.legalPersonName"
                                        v-bind:resultSelect="resultSelect.text"
                                        v-bind:isAudit="isAudit"
                                    ></audit-select>
                                </el-form-item>
                                <el-form-item
                                    label=" "
                                    v-if="isAudit"
                                >
                                    <el-link
                                        type="primary"
                                        @click="allPass('baseInfo', 1)"
                                    >全部通过</el-link>
                                </el-form-item>
                            </el-form>
                        </el-tab-pane>
                        <el-tab-pane
                            name="houseInfo"
                            label="楼盘信息"
                        >
                            <div class="info-title">基本信息</div>
                            <el-form
                                label-width="150px"
                                size="mini"
                                class="mt10"
                                v-if="detailEntity.project"
                            >
                                <el-form-item label="楼盘名称：">
                                    <audit-select
                                        v-bind:value="detailEntity.project.name"
                                        v-bind:oneAudit="auditTypeResult.name"
                                        v-bind:resultSelect="resultSelect.text"
                                        v-bind:isAudit="isAudit"
                                    ></audit-select>
                                </el-form-item>
                                <el-form-item label="楼盘logo：">
                                    <audit-select
                                        v-bind:type="'image'"
                                        v-bind:value="detailEntity.project.project_logo"
                                        v-bind:oneAudit="auditTypeResult.logo"
                                        v-bind:resultSelect="resultSelect.image"
                                        v-bind:isAudit="isAudit"
                                    ></audit-select>
                                </el-form-item>
                                <el-form-item label="楼盘效果图：">
                                    <audit-select
                                        v-bind:type="'image'"
                                        v-bind:value="detailEntity.project.effect_img"
                                        v-bind:oneAudit="auditTypeResult.effectImg"
                                        v-bind:resultSelect="resultSelect.image"
                                        v-bind:isAudit="isAudit"
                                    ></audit-select>
                                </el-form-item>
                                <el-form-item label="楼盘详情图：">
                                    <audit-select
                                        v-bind:type="'image'"
                                        v-bind:value="detailEntity.project.detail_img"
                                        v-bind:oneAudit="auditTypeResult.detailImg"
                                        v-bind:resultSelect="resultSelect.image"
                                        v-bind:isAudit="isAudit"
                                    ></audit-select>
                                </el-form-item>
                                <el-form-item label="楼盘类型：">
                                    <audit-select
                                        v-bind:value="detailEntity.project.building_type"
                                        v-bind:oneAudit="auditTypeResult.buildingType"
                                        v-bind:resultSelect="resultSelect.text"
                                        v-bind:isAudit="isAudit"
                                    ></audit-select>
                                </el-form-item>
                                <el-form-item label="楼盘地址：">
                                    <audit-select
                                        v-bind:value="detailEntity.project.detail_address"
                                        v-bind:oneAudit="auditTypeResult.detailAddress"
                                        v-bind:resultSelect="resultSelect.text"
                                        v-bind:isAudit="isAudit"
                                    ></audit-select>
                                </el-form-item>
                                <el-form-item label="售楼部电话：">
                                    <audit-select
                                        v-bind:value="detailEntity.project.area_code + detailEntity.project.sale_tel"
                                        v-bind:oneAudit="auditTypeResult.saleTelphone"
                                        v-bind:resultSelect="resultSelect.text"
                                        v-bind:isAudit="isAudit"
                                    ></audit-select>
                                </el-form-item>
                                <el-form-item label="售楼部地址：">
                                    <audit-select
                                        v-bind:value="detailEntity.project.sale_address"
                                        v-bind:oneAudit="auditTypeResult.saleAddress"
                                        v-bind:resultSelect="resultSelect.text"
                                        v-bind:isAudit="isAudit"
                                    ></audit-select>
                                </el-form-item>
                                <el-form-item label="楼盘标签：">
                                    <audit-select
                                        v-bind:value="detailEntity.project.property_label"
                                        v-bind:oneAudit="auditTypeResult.propertyLabel"
                                        v-bind:resultSelect="resultSelect.text"
                                        v-bind:isAudit="isAudit"
                                    ></audit-select>
                                </el-form-item>
                                <el-form-item label="楼盘简介：">
                                    <audit-select
                                        v-bind:type="'textarea'"
                                        v-bind:value="detailEntity.project.project_introduce"
                                        v-bind:oneAudit="auditTypeResult.projectIntroduce"
                                        v-bind:resultSelect="resultSelect.text"
                                        v-bind:isAudit="isAudit"
                                    ></audit-select>
                                </el-form-item>
                            </el-form>
                            <div class="info-title">规划指标</div>
                            <el-form
                                label-width="150px"
                                size="mini"
                                class="mt10"
                                v-if="detailEntity.project"
                            >
                                <el-form-item label="物业类型：">
                                    <audit-select
                                        v-bind:value="detailEntity.project.property_type"
                                        v-bind:oneAudit="auditTypeResult.propertyType"
                                        v-bind:resultSelect="resultSelect.text"
                                        v-bind:isAudit="isAudit"
                                    ></audit-select>
                                </el-form-item>
                                <el-form-item label="物业公司：">
                                    <audit-select
                                        v-bind:value="detailEntity.project.property_company"
                                        v-bind:oneAudit="auditTypeResult.propertyCompany"
                                        v-bind:resultSelect="resultSelect.text"
                                        v-bind:isAudit="isAudit"
                                    ></audit-select>
                                </el-form-item>
                                <el-form-item label="物业费：">
                                    <audit-select
                                        v-bind:value="detailEntity.project.property_cost"
                                        v-bind:oneAudit="auditTypeResult.propertyCost"
                                        v-bind:resultSelect="resultSelect.text"
                                        v-bind:isAudit="isAudit"
                                    ></audit-select>
                                </el-form-item>
                                <el-form-item label="产权年限：">
                                    <audit-select
                                        v-bind:value="detailEntity.project.rights_years"
                                        v-bind:oneAudit="auditTypeResult.rightsYears"
                                        v-bind:resultSelect="resultSelect.text"
                                        v-bind:isAudit="isAudit"
                                    ></audit-select>
                                </el-form-item>
                                <el-form-item label="占地面积：">
                                    <audit-select
                                        v-bind:value="detailEntity.project.floor_area"
                                        v-bind:oneAudit="auditTypeResult.floorArea"
                                        v-bind:resultSelect="resultSelect.text"
                                        v-bind:isAudit="isAudit"
                                    ></audit-select>
                                </el-form-item>
                                <el-form-item label="建筑面积：">
                                    <audit-select
                                        v-bind:value="detailEntity.project.building_area"
                                        v-bind:oneAudit="auditTypeResult.buildingArea"
                                        v-bind:resultSelect="resultSelect.text"
                                        v-bind:isAudit="isAudit"
                                    ></audit-select>
                                </el-form-item>
                                <el-form-item label="容积率：">
                                    <audit-select
                                        v-bind:value="detailEntity.project.volume_rate"
                                        v-bind:oneAudit="auditTypeResult.volumeRate"
                                        v-bind:resultSelect="resultSelect.text"
                                        v-bind:isAudit="isAudit"
                                    ></audit-select>
                                </el-form-item>
                                <el-form-item label="绿化率：">
                                    <audit-select
                                        v-bind:value="detailEntity.project.greening_rate"
                                        v-bind:oneAudit="auditTypeResult.greeningRate"
                                        v-bind:resultSelect="resultSelect.text"
                                        v-bind:isAudit="isAudit"
                                    ></audit-select>
                                </el-form-item>
                                <el-form-item label="楼栋总数：">
                                    <audit-select
                                        v-bind:value="detailEntity.project.plan_build_number"
                                        v-bind:oneAudit="auditTypeResult.planBuildNumber"
                                        v-bind:resultSelect="resultSelect.text"
                                        v-bind:isAudit="isAudit"
                                    ></audit-select>
                                </el-form-item>
                                <el-form-item label="规划户数：">
                                    <audit-select
                                        v-bind:value="detailEntity.project.plan_total_room"
                                        v-bind:oneAudit="auditTypeResult.planTotalRoom"
                                        v-bind:resultSelect="resultSelect.text"
                                        v-bind:isAudit="isAudit"
                                    ></audit-select>
                                </el-form-item>
                                <el-form-item label="停车位：">
                                    <audit-select
                                        v-bind:value="detailEntity.project.parking_space"
                                        v-bind:oneAudit="auditTypeResult.parkingSpace"
                                        v-bind:resultSelect="resultSelect.text"
                                        v-bind:isAudit="isAudit"
                                    ></audit-select>
                                </el-form-item>
                                <el-form-item
                                    label=" "
                                    v-if="isAudit"
                                >
                                    <el-link
                                        type="primary"
                                        @click="allPass('houseInfo', 1)"
                                    >全部通过</el-link>
                                </el-form-item>

                            </el-form>
                        </el-tab-pane>
                        <el-tab-pane
                            name="rimInfo"
                            label="周边配套"
                        >
                            <el-form
                                label-width="150px"
                                size="mini"
                                class="mt10"
                                v-if="detailEntity.peripheral"
                            >
                                <el-form-item
                                    v-for="(n, idx) in detailEntity.peripheral"
                                    :key="n.peripheral_type"
                                    :label="n.peripheral_name + '：'"
                                >
                                    <audit-select
                                        v-bind:type="'peripheral'"
                                        v-bind:value="n.peripheralList"
                                        v-bind:oneAudit="auditTypeResult.peripheral[idx]"
                                        v-bind:resultSelect="resultSelect.text"
                                        v-bind:isAudit="isAudit"
                                    ></audit-select>
                                </el-form-item>
                                <el-form-item
                                    label=" "
                                    v-if="isAudit"
                                >
                                    <el-link
                                        type="primary"
                                        @click="allPass('rimInfo', 2)"
                                    >全部通过</el-link>
                                </el-form-item>
                            </el-form>
                        </el-tab-pane>
                        <el-tab-pane
                            name="bankCardInfo"
                            label="银行卡信息"
                        >
                            <el-form
                                label-width="180px"
                                size="mini"
                                class="mt10"
                                v-if="detailEntity.Bank"
                            >
                                <el-form-item label="公司名称：">{{ detailEntity.Bank.company_name }}</el-form-item>
                                <el-form-item label="银行账号：">{{ detailEntity.Bank.bankcard_number }}</el-form-item>
                                <el-form-item label="开户银行：">{{ detailEntity.Bank.account_bank }}</el-form-item>
                                <el-form-item label="开户银行省市：">{{ detailEntity.Bank.bank_province }}</el-form-item>
                                <el-form-item label="所属支行：">{{ detailEntity.Bank.branch }}</el-form-item>
                                <el-form-item label="开户行预留手机号：">{{ detailEntity.Bank.bank_telephone_no }}</el-form-item>
                                <el-form-item label="开户许可证或印鉴卡照片：">
                                    <div class="img-w100-h-auto">
                                        <viewer :images="[detailEntity.Bank.license]">
                                            <img :src="detailEntity.Bank.license" />
                                        </viewer>
                                    </div>
                                </el-form-item>
                            </el-form>
                            <el-row v-if="isAudit">
                                <el-divider></el-divider>
                                <p class="mt20">审核结论：</p>
                                <el-form
                                    label-width="50px"
                                    class="audit-result-form"
                                >
                                    <el-form-item label="">
                                        <el-radio
                                            v-model="auditTypeResult.license.audit_status"
                                            :label="1"
                                        >通过</el-radio>
                                        <el-radio
                                            v-model="auditTypeResult.license.audit_status"
                                            :label="0"
                                        >不通过</el-radio>
                                    </el-form-item>
                                    <el-form-item
                                        v-if="auditTypeResult.license.audit_status === 0"
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
                                                    v-model="auditTypeResult.license.audit_remark"
                                                ></el-input>
                                            </vue-scroll>
                                        </el-col>
                                        <el-col :span="12">
                                            <ul>
                                                <vue-scroll>
                                                    <li
                                                        v-for="(result, idx) in resultSelect.bankCard"
                                                        :key="idx"
                                                        @click="auditTypeResult.license.audit_remark += result"
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
                            name="auditIssue"
                            label="审核问题"
                        >
                            <el-row>
                                <el-col :span="12">
                                    <el-form
                                        label-position="top"
                                        size="mini"
                                    >
                                        <el-form-item label="负责人电话："><span class="stress">{{ detailEntity.company && detailEntity.company.manager_person_phone }}</span></el-form-item>
                                        <el-form-item
                                            v-for="n in issues.filter(n => n.object === 1)"
                                            :key="n.id + n.type"
                                            :label="n.request"
                                            class="insert-answer"
                                        >
                                            <el-input
                                                type="textarea"
                                                v-model="n.answer"
                                                placeholder="请输入负责人回馈信息"
                                            ></el-input>
                                        </el-form-item>
                                    </el-form>
                                </el-col>
                                <el-col :span="12">
                                    <el-form
                                        label-position="top"
                                        size="mini"
                                    >
                                        <el-form-item label="售楼部电话："><span class="stress">{{ detailEntity.project && detailEntity.project.sale_tel }}</span></el-form-item>
                                        <el-form-item
                                            v-for="n in issues.filter(n => n.object === 4)"
                                            :key="n.id + n.type"
                                            :label="n.request"
                                            class="insert-answer"
                                        >
                                            <el-input
                                                type="textarea"
                                                v-model="n.answer"
                                                placeholder="请输入售楼部回馈信息"
                                            ></el-input>
                                        </el-form-item>
                                    </el-form>
                                </el-col>
                            </el-row>
                        </el-tab-pane>
                    </el-tabs>
                </el-col>
            </el-row>
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
import AuditIssues from '../../../api/audit/queryAuditIssues'
import AuditIssueRecord from '../../../api/audit/queryAuditIssuesRecord'
import InsertAuditIssueRecord from '../../../api/audit/insertAuditIssueRecord'

import AuditSelect from './auditSelect';
import AuditHistoryDrawer from '../auditHistory'

export default {
    components: {
        AuditSelect,
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
                companyName: {
                    dusit_type: 'company',
                    audit_type: 'company_name',
                    audit_status: '',
                    audit_remark: '',
                    tabName: 'baseInfo',
                    audit_type_str: '企业名称'
                },
                managerPersonName: {
                    dusit_type: 'company',
                    audit_type: 'manager_person_name',
                    audit_status: '',
                    audit_remark: '',
                    tabName: 'baseInfo',
                    audit_type_str: '负责人名称'
                },
                managerPersonPhone: {
                    dusit_type: 'company',
                    audit_type: 'manager_person_phone',
                    audit_status: '',
                    audit_remark: '',
                    tabName: 'baseInfo',
                    audit_type_str: '负责人电话'
                },
                businessLicenseNumber: {
                    dusit_type: 'company',
                    audit_type: 'business_license_number',
                    audit_status: '',
                    audit_remark: '',
                    tabName: 'baseInfo',
                    audit_type_str: '营业执照号'
                },
                businessLicensePicture: {
                    dusit_type: 'company',
                    audit_type: 'company_qualification_picture',
                    audit_status: '',
                    audit_remark: '',
                    tabName: 'baseInfo',
                    audit_type_str: '营业执照'
                },
                validTime: {
                    dusit_type: 'company',
                    audit_type: 'effetive_date',
                    audit_status: '',
                    audit_remark: '',
                    tabName: 'baseInfo',
                    audit_type_str: '有效期'
                },
                legalPersonName: {
                    dusit_type: 'company',
                    audit_type: 'legal_person_name',
                    audit_status: '',
                    audit_remark: '',
                    tabName: 'baseInfo',
                    audit_type_str: '法人姓名'
                },
                name: {
                    dusit_type: 'project',
                    audit_type: 'name',
                    audit_status: '',
                    audit_remark: '',
                    tabName: 'houseInfo',
                    audit_type_str: '楼盘名称'
                },
                logo: {
                    dusit_type: 'project',
                    audit_type: 'project_logo',
                    audit_status: '',
                    audit_remark: '',
                    tabName: 'houseInfo',
                    audit_type_str: '楼盘Logo'
                },
                effectImg: {
                    dusit_type: 'project',
                    audit_type: 'effect_img',
                    audit_status: '',
                    audit_remark: '',
                    tabName: 'houseInfo',
                    audit_type_str: '楼盘效果图'
                },
                detailImg: {
                    dusit_type: 'project',
                    audit_type: 'detail_img',
                    audit_status: '',
                    audit_remark: '',
                    tabName: 'houseInfo',
                    audit_type_str: '楼盘详情图'
                },
                buildingType: {
                    dusit_type: 'project',
                    audit_type: 'building_type',
                    audit_status: '',
                    audit_remark: '',
                    tabName: 'houseInfo',
                    audit_type_str: '楼盘类型'
                },
                detailAddress: {
                    dusit_type: 'project',
                    audit_type: 'detail_address',
                    audit_status: '',
                    audit_remark: '',
                    tabName: 'houseInfo',
                    audit_type_str: '楼盘地址'
                },
                saleTelphone: {
                    dusit_type: 'project',
                    audit_type: 'sale_tel',
                    audit_status: '',
                    audit_remark: '',
                    tabName: 'houseInfo',
                    audit_type_str: '售楼部电话'
                },
                saleAddress: {
                    dusit_type: 'project',
                    audit_type: 'sale_address',
                    audit_status: '',
                    audit_remark: '',
                    tabName: 'houseInfo',
                    audit_type_str: '售楼部地址'
                },
                propertyLabel: {
                    dusit_type: 'project',
                    audit_type: 'property_label',
                    audit_status: '',
                    audit_remark: '',
                    tabName: 'houseInfo',
                    audit_type_str: '楼盘标签'
                },
                projectIntroduce: {
                    dusit_type: 'project',
                    audit_type: 'project_introduce',
                    audit_status: '',
                    audit_remark: '',
                    tabName: 'houseInfo',
                    audit_type_str: '楼盘简介'
                },
                propertyType: {
                    dusit_type: 'project',
                    audit_type: 'property_type',
                    audit_status: '',
                    audit_remark: '',
                    tabName: 'houseInfo',
                    audit_type_str: '物业类型'
                },
                propertyCompany: {
                    dusit_type: 'project',
                    audit_type: 'property_company',
                    audit_status: '',
                    audit_remark: '',
                    tabName: 'houseInfo',
                    audit_type_str: '物业公司'
                },
                propertyCost: {
                    dusit_type: 'project',
                    audit_type: 'property_cost',
                    audit_status: '',
                    audit_remark: '',
                    tabName: 'houseInfo',
                    audit_type_str: '物业费'
                },
                rightsYears: {
                    dusit_type: 'project',
                    audit_type: 'rights_years',
                    audit_status: '',
                    audit_remark: '',
                    tabName: 'houseInfo',
                    audit_type_str: '产权年限'
                },
                floorArea: {
                    dusit_type: 'project',
                    audit_type: 'floor_area',
                    audit_status: '',
                    audit_remark: '',
                    tabName: 'houseInfo',
                    audit_type_str: '占地面积'
                },
                buildingArea: {
                    dusit_type: 'project',
                    audit_type: 'building_area',
                    audit_status: '',
                    audit_remark: '',
                    tabName: 'houseInfo',
                    audit_type_str: '建筑面积'
                },
                volumeRate: {
                    dusit_type: 'project',
                    audit_type: 'volume_rate',
                    audit_status: '',
                    audit_remark: '',
                    tabName: 'houseInfo',
                    audit_type_str: '容积率'
                },
                greeningRate: {
                    dusit_type: 'project',
                    audit_type: 'greening_rate',
                    audit_status: '',
                    audit_remark: '',
                    tabName: 'houseInfo',
                    audit_type_str: '绿化率'
                },
                planBuildNumber: {
                    dusit_type: 'project',
                    audit_type: 'plan_build_number',
                    audit_status: '',
                    audit_remark: '',
                    tabName: 'houseInfo',
                    audit_type_str: '楼栋总数'
                },
                planTotalRoom: {
                    dusit_type: 'project',
                    audit_type: 'plan_total_room',
                    audit_status: '',
                    audit_remark: '',
                    tabName: 'houseInfo',
                    audit_type_str: '规划户数'
                },
                parkingSpace: {
                    dusit_type: 'project',
                    audit_type: 'parking_space',
                    audit_status: '',
                    audit_remark: '',
                    tabName: 'houseInfo',
                    audit_type_str: '停车位'
                },
                peripheral: [ // 动态的、接口返回数据

                ],
                license: {
                    dusit_type: 'bank',
                    audit_type: 'license',
                    audit_status: '',
                    audit_remark: '',
                    tabName: 'bankCardInfo',
                    audit_type_str: '银行卡'
                }
            },
            resultSelect: {
                text: [
                    '存在违禁词（恶心、暴恐、辱骂、威胁、政治）',
                    '姓名错误（多字、少字、错字、存在符号）',
                    '电话号码错误',
                    '营业执照号码错误',
                    '内容错误，不符合当前场景',
                    '时间格式有误'
                ],
                image: [
                    '图片错误（无法显示、不符合当前场景）',
                    '图片存在违禁内容（恶心、暴恐、辱骂、威胁、政治）',
                    '图片清晰度低',
                    '营业执照错误',
                    'Logo图片错误',
                    '楼盘详情图第【】张不合符当前场景',
                    '开户许可证或印鉴卡照片错误'
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
            },
            currentTabName: 'baseInfo',
            issues: [], // 审核问题列表
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
                    if (res.Data.auditStatus === 0) {
                        this.isAudit = true;
                    }
                    let entityInfo = JSON.parse(res.Data.entityInfo);
                    entityInfo.queryEntityUserId_ = res.Data.entityUserid;
                    this.auditTypeResult.peripheral = entityInfo.peripheral ? entityInfo.peripheral.map(n => {
                        return {
                            dusit_type: 'peripheral',
                            audit_type: `${n.peripheral_type}`,
                            audit_status: '',
                            audit_remark: ''
                        }
                    }) : new Array();
                    this.detailEntity = entityInfo;
                    this.initHistory(res.Data);
                    this.initIssues();
                } else {
                    this.$message.error('查询审核任务失败，请稍后再试');
                }
            });
        },
        initHistory(entity) {
            let _historyQueryCondition = {};
            _historyQueryCondition.entityId = entity.entityId;
            _historyQueryCondition.taskTypeName = entity.taskTypeName;
            this.$store.dispatch('setHistoryQueryCondition', _historyQueryCondition);
        },
        initIssues() {
            AuditIssues.call(this, { type: 2 }).then(res => {
                if (res.code === '0000') {
                    this.initIssueRecord(res.data.result);
                } else {
                    this.$message.error('获取审核问题失败');
                }
            })
        },
        initIssueRecord(issues) {
            AuditIssueRecord.call(this, { tem_shop_id: this.detailEntity.queryEntityUserId_ }).then(res => {
                if (res.code === '0000') {
                    if (res.data.result && res.data.result.length > 0) {
                        let list = res.data.result;
                        issues.forEach(issue => {
                            issue.answer = '';
                            let issRec = list.find(n => n.id === issue.id);
                            if (issRec) {
                                issue.conId = issRec.conId;
                                if (issRec.answer) {
                                    issue.answer = issRec.answer;
                                }
                            }

                        })
                    }
                    this.issues = issues;
                }
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
                let one = this.auditTypeResult[key];
                if (key === 'peripheral') {
                    for (let i = 0; i < one.length; i++) {
                        let peripheral = one[i];
                        if (peripheral.audit_status === '') {
                            this.$message.warning('请先完成周边配套审核');
                            this.currentTabName = 'rimInfo';
                            return;
                        }
                        if (peripheral.audit_status === 0 && !peripheral.audit_remark) {
                            this.$message.warning('请填写不通过理由');
                            this.currentTabName = 'rimInfo';
                            return;
                        }
                        auditResult.fields.push({
                            dusit_type: peripheral.dusit_type,
                            audit_name: peripheral.audit_type,
                            audit_status: peripheral.audit_status,
                            audit_remark: peripheral.audit_remark
                        });
                    }
                } else {
                    if (one.audit_status === '') {
                        this.$message.warning(`请先完成${one.audit_type_str}审核`);
                        this.currentTabName = one.tabName;
                        return;
                    }
                    if (one.audit_status === 0 && !one.audit_remark) {
                        this.$message.warning('请填写不通过理由');
                        this.currentTabName = one.tabName;
                        return;
                    }
                    auditResult.fields.push({
                        dusit_type: one.dusit_type,
                        audit_name: one.audit_type,
                        audit_status: one.audit_status,
                        audit_remark: one.audit_remark
                    })
                }
            }

            let issRecResult = {
                concernResponsesList: this.issues.map(n => {
                    return {
                        answer: n.answer,
                        id: n.conId,
                        req_id: n.id
                    }
                }),
                tem_shop_id: this.detailEntity.queryEntityUserId_,
                status: 1
            }

            console.log(issRecResult, 'issRecResult');

            auditResult.audit_status = auditResult.fields.filter(n => n.audit_status === 0).length > 0 ? 0 : 1;

            console.log(auditResult, 'auditResult');

            InsertAuditIssueRecord.call(this, issRecResult).then(res => {
                if (res.code === '0000') {
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
                            this.$message.error('提交审核失败');
                        }
                    })
                } else {
                    this.$message.error('审核问题提交失败');
                }
            });

        },
        allPass(type, name) {
            if (name === 1) {
                for (let key in this.auditTypeResult) {
                    let o = this.auditTypeResult[key];
                    if (o.tabName === type) {
                        o.audit_status = 1;
                    }
                }
            } else {
                this.auditTypeResult.peripheral.forEach(n => n.audit_status = 1);
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

<style lang="less" scoped>
.insert-answer {
    padding-right: 20px;
}
.stress {
    font-size: 16px;
    color: #119219;
}
</style>
