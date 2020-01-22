<template>
    <div class="fillcontain">
        <el-card class="box-card">
            <div slot="header">
                <b>拼购活动审核详情</b>
                <audit-history-drawer v-bind:auditTypeResult="auditTypeResult"></audit-history-drawer>
            </div>
            <div class="text item mb30">
                <el-row style="padding: 0 5%">
                    <el-form
                        label-width="150px"
                        size="mini"
                    >
                        <el-form-item label="拼购标题：">{{ detailEntity.activityName }}</el-form-item>
                        <el-form-item label="商家名称：">{{ detailEntity.shopName }}</el-form-item>
                        <el-form-item label="活动时间：">{{ detailEntity.startTime }} 至 {{detailEntity.endTime}}</el-form-item>
                    </el-form>
                    <el-divider></el-divider>
                    <p class="mt20">审核结论：</p>
                    <table class="table_top">
                        <thead>
                            <tr>
                                <th width="10%">商品缩略图</th>
                                <th>规格属性</th>
                                <th>原价（元）</th>
                                <th>拼购价(元)</th>
                                <th>商品库存(实时)</th>
                                <th>拼购商品数量</th>
                                <th>每人限购</th>
                            </tr>
                        </thead>
                    </table>
                    <div v-if="detailEntity && detailEntity.crowdGoodsInfoDto">
                        <table
                            class="table_content"
                            v-for="(n, idx) in detailEntity.crowdGoodsInfoDto"
                            :key="idx"
                        >
                            <thead>
                                <tr>
                                    <th colSpan="7">
                                        <span class="name">商品：{{ n.title }}</span>
                                        <span class="select">拼购类型：{{ n.crowdActivityGoods[0].crowdorderNumDtoList[0].crowdNumber }}人拼</span>
                                        <span class="time">拼购有效时间：{{ n.crowdActivityGoods[0].crowdorderTotalTime }}分钟</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr
                                    v-for="(n2, idx) in n.crowdActivityGoods"
                                    :key="idx"
                                >
                                    <th width="10%">
                                        <viewer :images=[n2.goodsImg]>
                                            <img
                                                :src="n2.goodsImg"
                                                style="width: 50px; height: 50px; verticalAlign: 'middle'"
                                            />
                                        </viewer>

                                    </th>
                                    <th>{{ n2.goodsDesc }}</th>
                                    <th>{{ n2.goodsOriPrice }}</th>
                                    <th>{{ n2.crowdorderNumDtoList[0].goodsCrowdPrice }}</th>
                                    <th>{{ n2.stockTotal }}</th>
                                    <th>{{ n2.crowdorderStock }}</th>
                                    <th>{{ n2.limitNumber == 0 ? '不限购' : n2.limitNumber }}</th>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <el-form
                        label-width="50px"
                        class="audit-result-form"
                        v-if="isAudit"
                    >
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
            ]
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
                    let entityInfo = JSON.parse(res.Data.entityInfo);
                    this.detailEntity = entityInfo;
                    if (res.Data.auditStatus === 0) {
                        this.isAudit = true;
                    } else {
                        let _auditResultDesc = JSON.parse(res.Data.auditResultDesc);
                        console.log(_auditResultDesc, '_auditResultDesc+++++');
                        if (_auditResultDesc && _auditResultDesc.whole) {
                            this.auditTypeResult.audit_status = _auditResultDesc.whole.audit_status === 2 ? 0 : 1;
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
                this.$message.warning('请先完成审核');
                return;
            }

            auditResult.whole.audit_status = this.auditTypeResult.audit_status === 1 ? 1 : 2;
            auditResult.whole.audit_remark = this.auditTypeResult.audit_remark;
            auditResult.whole.audit_id = this.detailEntity.id;
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

<style lang="less" scoped>
.html-content {
    border: 2px solid #ddd;
    border-radius: 2px;
    padding: 5px;
    height: 455px;
    overflow-y: auto;
}
.activityInformationTable {
    margin-top: 20px;
}
.table_top {
    width: 100%;
    height: auto;
    thead {
        width: 100%;
        height: auto;
        tr {
            width: 100%;
            height: auto;
            th {
                width: 14%;
                height: 50px;
                border: 1px #ddd solid;
                color: #666;
                font-size: 14px;
                background: #eaeaea;
            }
        }
    }
}
.table_content {
    width: 100%;
    height: auto;
    margin-top: 10px;
    thead {
        width: 100%;
        height: auto;
        tr {
            width: 100%;
            height: auto;
            th {
                width: 14%;
                height: 50px;
                border: 1px #eaeaea solid;
                color: #666;
                font-size: 14px;
                text-align: left !important;
                .name {
                    margin-left: 20px;
                }
                .select {
                    margin-left: 50px;
                }
                .time {
                    margin-left: 50px;
                }
            }
        }
    }
    tbody {
        width: 100%;
        height: auto;
        tr {
            width: 100%;
            height: auto;
            th {
                width: 14%;
                height: 50px;
                border: 1px #eaeaea solid;
                color: #666;
                font-size: 14px;
            }
        }
    }
}
</style>
