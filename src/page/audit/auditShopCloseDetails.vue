<template>
    <div class="fillcontain">
        <el-card class="box-card">
            <div slot="header">
                <b>关闭店铺审核详情：</b>
                <audit-history-drawer v-bind:auditTypeResult="auditTypeResult"></audit-history-drawer>
            </div>
            <div class="text item mb30">
                <el-row>
                    <el-col :span="24">
                        <div class="info-title">公司信息</div>
                        <el-form
                            label-width="150px"
                            size="mini"
                            class="mt10" 
                            v-if="detailEntity.CompanyInfo"
                        >
                            <el-form-item label="公司名称：">{{ detailEntity.CompanyInfo.Name }}</el-form-item>
                            <el-form-item label="公司类型：">{{ detailEntity.CompanyInfo.Type }}</el-form-item>
                            <el-form-item label="法人姓名：">{{ detailEntity.CompanyInfo.LegalPerson }}</el-form-item>
                            <el-form-item label="法人电话：">{{ detailEntity.CompanyInfo.LegalPersonMobile }}</el-form-item>
                            <el-form-item label="营业执照注册号：">{{ detailEntity.CompanyInfo.CardNumber }}</el-form-item>
                            <el-form-item label="营业执照：">
                                <div class="img-w100-h-auto" v-if="detailEntity.CompanyInfo.CardPics">
                                    <viewer :images="[detailEntity.CompanyInfo.CardPics]">
                                        <img :src="detailEntity.CompanyInfo.CardPics">
                                    </viewer>
                                </div>
                            </el-form-item>
                            <el-form-item label="经办人姓名：">{{ detailEntity.CompanyInfo.Applier }}</el-form-item>
                            <el-form-item label="经办人电话：">{{ detailEntity.CompanyInfo.ApplierPhone }}</el-form-item>
                            <el-form-item label="负责人姓名：">{{ detailEntity.CompanyInfo.Manager }}</el-form-item>
                            <el-form-item label="负责人电话：">{{ detailEntity.CompanyInfo.ManagerPhone }}</el-form-item>
                        </el-form>
                    </el-col>
                    <el-col :span="24">
                        <div class="info-title">店铺信息</div>
                        <el-form
                            label-width="150px"
                            size="mini"
                            class="mt10" 
                            v-if="detailEntity.ShopInfo"
                        >
                            <el-form-item label="店铺名称：">{{ detailEntity.ShopInfo.Name }}</el-form-item>
                            <el-form-item label="店铺类型：">
                                <span v-if="detailEntity.ShopInfo.ShopType === 0">普通店</span>
                                <span v-if="detailEntity.ShopInfo.ShopType === 1">旗舰店</span>
                                <span v-if="detailEntity.ShopInfo.ShopType === 2">全球购</span>
                            </el-form-item>
                            <el-form-item label="所在区域：">{{ detailEntity.ShopInfo.Area }}</el-form-item>
                            <el-form-item label="详细地址：">{{ detailEntity.ShopInfo.Address }}</el-form-item>
                            <el-form-item label="店铺Logo：">
                                <div class="img-w100-h-auto" v-if="detailEntity.ShopInfo.PcLogo">
                                    <viewer :images="[detailEntity.ShopInfo.PcLogo]">
                                        <img :src="detailEntity.ShopInfo.PcLogo">
                                    </viewer>
                                </div>
                            </el-form-item>
                            <el-form-item label="手机店铺Logo：">
                                <div class="img-w100-h-auto" v-if="detailEntity.ShopInfo.PhoneLogo">
                                    <viewer :images="[detailEntity.ShopInfo.PhoneLogo]">
                                        <img :src="detailEntity.ShopInfo.PhoneLogo">
                                    </viewer>
                                </div>
                            </el-form-item>
                            <el-form-item label="店面图片：">
                                <div class="img-w100-h-auto" v-if="detailEntity.ShopInfo.Pics">
                                    <viewer :images="[detailEntity.ShopInfo.Pics]">
                                        <img :src="detailEntity.ShopInfo.Pics">
                                    </viewer>
                                </div>
                            </el-form-item>
                        </el-form>
                    </el-col>
                    <el-col :span="24">
                        <div class="info-title">关闭店铺原因</div>
                        <p class="reason">
                            {{ detailEntity.Reason }}
                        </p>
                    </el-col>
                    <el-col :span="24">
                        <div class="info-title">电话回访</div>
                        <div class="rel-type">
                            <p>负责人电话：<b>{{ detailEntity.CompanyInfo && detailEntity.CompanyInfo.ManagerPhone }}</b></p>
                        </div>
                        <div class="visit">
                            <el-input
                                type="textarea"
                                :autosize="{ minRows: 3, maxRows: 6 }"
                                placeholder="请输入负责人反馈内容"
                                v-model="optional.communManager.remark"
                            ></el-input>
                        </div>
                        <div class="rel-type">
                            <p>法人电话：<b>{{ detailEntity.CompanyInfo && detailEntity.CompanyInfo.LegalPersonMobile }}</b></p>
                        </div>
                        <div class="visit">
                            <el-input
                                type="textarea"
                                :autosize="{ minRows: 3, maxRows: 6 }"
                                placeholder="请输入法人反馈内容"
                                v-model="optional.communLegalPerson.remark"
                            ></el-input>
                        </div>
                    </el-col>
                    <el-col :span="24" v-if="isAudit">
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

import AuditDetail from '../../api/audit/queryTaskDetail'
import AuditHistory from '../../api/audit/queryTaskHistory'
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
                audit_status: '',
                audit_remark: '',
            },
            resultSelect: [
                '负责人不同意关闭店铺',
                '法人不同意关闭店铺'
            ],
            goodsSpecifications: [], // 商品规格列表
            dialog: {
                carriage: false,    // 运费
                visitInstall: false,    // 上门安装
                move: false,    // 搬楼
                citySend: false,    // 同城配送  
            },
            service: {
                visitInstallList: [],
                moveList: [],
                citySendList: [],
                cutPrice: ''
            },
            optional: {
                communManager: {
                    remark: ''
                },
                communLegalPerson: {
                    remark: ''
                }
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
                    // 商品规格
                    if (entityInfo.Specifications) {
                        this.goodsSpecifications = entityInfo.Specifications;
                    }
                    if(res.Data.auditResultDesc){
                        let ard = JSON.parse(res.Data.auditResultDesc);
                        if(ard.optional){
                            this.optional = ard.optional;
                        }
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
            auditResult.optional = this.optional;

            if(!this.optional.communManager.remark){
                this.$message.warning('请先电话回访并填写负责人反馈记录');
                return;
            }
            if(!this.optional.communLegalPerson.remark){
                this.$message.warning('请先电话回访并填写法人反馈记录');
                return;
            }
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
.commodityAttributes {
    width: 100%;
    height: auto;
    margin-top: 10px;
    li {
        float: left;
        p {
            width: 165px;
            height: 30px;
            border: 1px #ddd solid;
            display: block;
            float: left;
            text-align: right;
            line-height: 30px;
            background: #eaeaea;
            margin-top: -1px;
        }
        span {
            width: 120px;
            border: 1px #eaeaea solid;
            display: block;
            float: left;
            text-align: center;
            line-height: 30px;
            background: #fff;
            margin-left: -1px;
            margin-top: -1px;
        }
    }
    :after {
        content: "";
        display: block;
        clear: both;
    }
}
.visit {
    padding: 10px;
}
.reason {
    padding: 30px 15px;
}
.rel-type {
    padding: 10px;
    p {
        margin-top: 5px;
        font-size: 14px;
    }
}
</style>
