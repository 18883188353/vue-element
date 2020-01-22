<template>
    <div class="fillcontain">
        <el-card class="box-card">
            <div slot="header">
                <b>店铺信息变更审核详情</b>
                <audit-history-drawer v-bind:auditTypeResult="auditTypeResult"></audit-history-drawer>
            </div>
            <div class="text item mb30">
                <el-row>
                    <el-col :span="12">
                        <div class="hint">❉变更前信息</div>
                    </el-col>
                    <el-col :span="12">
                        <div
                            class="hint"
                            style="color: red;"
                        >❉变更后信息</div>
                    </el-col>
                </el-row>
                <!--<el-row>
                    <el-col :span="12">
                        <div class="info-title">基本信息</div>
                        <el-form
                            label-width="150px"
                            size="mini"
                            class="mt10"
                        >
                            <el-form-item label="实体店名称：">{{ beforeData.store_name }}</el-form-item>
                            <el-form-item label="门店面积：">{{ beforeData.store_acreage }}</el-form-item>
                            <el-form-item label="门店地址：">{{ beforeData.store_area }}</el-form-item>
                            <el-form-item label="详细地址：">{{ beforeData.store_address }}</el-form-item>
                            <el-form-item label="店铺简介：">{{ beforeData.store_desc }}</el-form-item>
                        </el-form>
                    </el-col>
                    <el-col :span="12">
                        <div class="info-title">基本信息</div>
                        <el-form
                            label-width="150px"
                            size="mini"
                            class="mt10"
                        >
                            <el-form-item
                                :class="beforeData.store_name === afterData.store_name ? '' : 'redItem'"
                                label="实体店名称："
                            >{{ afterData.store_name }}</el-form-item>
                            <el-form-item
                                :class="beforeData.store_acreage  === afterData.store_acreage  ? '' : 'redItem'"
                                label="门店面积："
                            >{{ afterData.store_acreage  }}</el-form-item>
                            <el-form-item
                                :class="beforeData.store_area === afterData.store_area ? '' : 'redItem'"
                                label="门店地址："
                            >{{ afterData.store_area }}</el-form-item>
                            <el-form-item
                                :class="beforeData.store_address === afterData.store_address ? '' : 'redItem'"
                                label="详细地址："
                            >{{ afterData.store_address }}</el-form-item>
                            <el-form-item
                                :class="beforeData.store_desc === afterData.store_desc ? '' : 'redItem'"
                                label="店铺简介："
                            >{{ afterData.store_desc }}</el-form-item>
                        </el-form>
                    </el-col>
                </el-row>-->
                <!--网店信息-->
                <el-row>
                    <el-col :span="12">
                        <!--<div class="info-title">网店信息</div>-->
                        <el-form
                            label-width="150px"
                            size="mini"
                            class="mt20"
                        >
                            <el-form-item label="网店名称：">{{ beforeData.shop_name }}</el-form-item>
                            <el-form-item label="网店类型：">{{ beforeData.shop_type ==0 ? '普通店' : beforeData.shop_type == 1? '旗舰店' : beforeData.shop_type == 2 ? '全球购' : '' }}</el-form-item>
                            <el-form-item label="网店联系电话：">{{ beforeData.shop_mobile }}</el-form-item>
                            <el-form-item label="网店联系座机号：">{{ beforeData.shop_tel }}</el-form-item>
                            <el-form-item label="公司LOGO：">
                                <viewer :images=[beforeData.shop_logo]>
                                    <img
                                        :src="beforeData.shop_logo"
                                        style="width: 150px; height: 150px;"
                                    />
                                </viewer>
                            </el-form-item>
                            <el-form-item label="网店形象照：">
                                <viewer :images=[beforeData.shop_pics]>
                                    <img
                                        :src="beforeData.shop_pics"
                                        style="width: 150px; height: 150px;"
                                    />
                                </viewer>
                            </el-form-item>
                        </el-form>
                    </el-col>
                    <el-col :span="12">
                        <!--<div class="info-title">网店信息</div>-->
                        <el-form
                            label-width="150px"
                            size="mini"
                            class="mt20"
                        >
                            <el-form-item
                                :class="beforeData.shop_name === afterData.shop_name ? '' : 'redItem'"
                                label="网店名称："
                            >{{ afterData.shop_name }}</el-form-item>
                            <el-form-item
                                :class="beforeData.shop_type  === afterData.shop_type  ? '' : 'redItem'"
                                label="网店类型："
                            >{{ beforeData.shop_type ==0 ? '普通店' : beforeData.shop_type == 1? '旗舰店' : beforeData.shop_type == 2 ? '全球购' : '' }}</el-form-item>
                            <el-form-item
                                :class="beforeData.shop_mobile === afterData.shop_mobile ? '' : 'redItem'"
                                label="网店联系电话："
                            >{{ afterData.shop_mobile }}</el-form-item>
                            <el-form-item
                                :class="beforeData.shop_tel === afterData.shop_tel ? '' : 'redItem'"
                                label="网店联系座机号："
                            >{{ beforeData.shop_tel }}</el-form-item>
                            <el-form-item
                                :class="beforeData.area === afterData.area ? '' : 'redItem'"
                                label="公司LOGO："
                            >
                                <viewer :images=[afterData.shop_logo]>
                                    <img
                                        :src="afterData.shop_logo"
                                        style="width: 150px; height: 150px;"
                                    />
                                </viewer>
                            </el-form-item>
                            <el-form-item
                                :class="beforeData.area === afterData.area ? '' : 'redItem'"
                                label="网店形象照："
                            >
                                <viewer :images=[afterData.shop_pics]>
                                    <img
                                        :src="afterData.shop_pics"
                                        style="width: 150px; height: 150px;"
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

                    this.beforeData = entityInfo.OldShopInfo ? entityInfo.OldShopInfo : {};
                    this.afterData = entityInfo.NewShopInfo ? entityInfo.NewShopInfo : {};

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
    font-weight: 600;
    margin-bottom: 20px;
}
.redItem .el-form-item__label {
    color: red;
}
</style>
