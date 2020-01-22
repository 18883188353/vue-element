<template>
    <div class="fillcontain">
        <el-card class="box-card">
            <div slot="header">
                <b>商品下架审核详情</b>
                <audit-history-drawer v-bind:auditTypeResult="auditTypeResult"></audit-history-drawer>
            </div>
            <div class="text item mb30">
                <el-row>
                    <el-col :span="24">
                        <div class="info-title">基本信息</div>
                        <el-form
                            label-width="150px"
                            size="mini"
                            class="mt10"
                        >
                            <el-form-item label="商家名称：">{{ detailEntity.shopName }}</el-form-item>
                            <el-form-item label="商品名称：">{{ detailEntity.Title }}</el-form-item>
                            <el-form-item label="商品类目：">{{ detailEntity.SysCate }}</el-form-item>
                            <el-form-item label="商品自定义类目：">{{ detailEntity.CustomCate }}</el-form-item>
                            <el-form-item label="商品品牌：">
                                <div class="img-w100-h-auto">
                                    <viewer :images="[detailEntity.BrandLogo]">
                                        <img :src="detailEntity.BrandLogo">
                                    </viewer>
                                </div>
                            </el-form-item>
                            <el-form-item label="商品规格：">
                                <el-table
                                    :data="goodsSpecifications"
                                    border
                                    stripe
                                    size="small"
                                    style="width: 100%"
                                >
                                    <el-table-column
                                        type="index"
                                        align="center"
                                    >
                                    </el-table-column>
                                    <el-table-column
                                        property="image"
                                        label="图片"
                                        align="center"
                                        width="70"
                                    >
                                        <template slot-scope="scope">
                                            <viewer :images="[scope.row.Img]">
                                                <img
                                                    :src="scope.row.Img"
                                                    style="width: 30px; height: 30px;"
                                                />
                                            </viewer>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                        property="ProductNo"
                                        label="商品编码"
                                        align="center"
                                        minWidth="130"
                                    ></el-table-column>
                                    <el-table-column
                                        property="Count"
                                        label="总库存"
                                        align="center"
                                        width="70"
                                    ></el-table-column>
                                    <el-table-column
                                        property="SpecText"
                                        label="规格"
                                        align="center"
                                        minWidth="260"
                                        show-overflow-tooltip
                                    >
                                    </el-table-column>
                                    <el-table-column
                                        property="MarkPrice"
                                        label="市场价"
                                        align="center"
                                        width="100"
                                    >
                                        <template slot-scope="scope">
                                            <span class="price">{{ scope.row.MarkPrice ? `￥${scope.row.MarkPrice}` : '-'}}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                        property="SellPrice"
                                        label="销售价"
                                        align="center"
                                        width="100"
                                    >
                                        <template slot-scope="scope">
                                            <span class="price">{{ scope.row.SellPrice ? `￥${scope.row.SellPrice}` : '-'}}</span>
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </el-form-item>
                        </el-form>
                    </el-col>
                    <el-col :span="24">
                        <div class="info-title">下架原因</div>
                        <p class="reason">
                            {{ detailEntity.reason }}
                        </p>
                    </el-col>
                    <el-col :span="24">
                        <div class="info-title">电话回访</div>
                        <div class="rel-type">
                            <p>经办人电话：{{ detailEntity.CompanyInfo && detailEntity.CompanyInfo.ApplierPhone }}</p>
                            <p>负责人电话：{{ detailEntity.CompanyInfo && detailEntity.CompanyInfo.ManagerPhone }}</p>
                        </div>
                        <div class="visit">
                            <el-input
                                type="textarea"
                                :autosize="{ minRows: 3, maxRows: 6 }"
                                placeholder="请输入负责人反馈内容"
                                v-model="optional.commun.remark"
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
                audit_status: '',
                audit_remark: '',
            },
            resultSelect: [
                '第【】张图片存在水印、二维码、条形码',
                '第【】张图片存在恶心内容',
                '第【】张图片存在政治内容',
                '第【】张图片模糊',
                '第【】张图片不符合此场景'
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
                commun: {
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

            if(!this.optional.commun.remark){
                this.$message.warning('请先电话回访并填写反馈记录');
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
        findSpec(type) {
            if (!this.detailEntity.SpecialInfo) {
                return [];
            }
            let r = this.detailEntity.SpecialInfo.find(n => n.SpecialType === type);
            if (!r) {
                return [];
            }
            return JSON.parse(r.SpecialJson).Item;
        },
        findServiceOne() {
            if (!this.detailEntity.SpecialInfo) {
                return '';
            }
            let r = this.detailEntity.SpecialInfo.find(n => n.SpecialType === 4);
            if (!r) {
                return '';
            }
            return JSON.parse(r.SpecialJson).sprice;
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
