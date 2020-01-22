<template>
    <div class="fillcontain">
        <el-card class="none-border">
            <div slot="header">
                <b>平台活动审核详情</b>
            </div>
            <div class="text item mb30">
                <el-row style="padding: 0 5%">
                    <el-form
                        label-width="150px"
                        size="mini"
                    >
                        <el-form-item label="活动名称：">{{ detailEntity.activity && detailEntity.activity.majoreName }}</el-form-item>
                        <el-form-item label="活动时间：">{{ detailEntity.activity && detailEntity.activity.activityTime }}</el-form-item>
                        <el-form-item label="报名时间：">{{ detailEntity.activity && detailEntity.activity.enrollTime }}</el-form-item>
                        <el-form-item
                            label="商品类目："
                            v-if="detailEntity.activity"
                        >
                            <el-table
                                :data="detailEntity.activity.categoryShow"
                                style="width: 100%;margin-bottom: 20px;"
                                row-key="category_id"
                                :indent="0"
                                border
                                default-expand-all
                            >
                                <el-table-column
                                    prop="onecategory_name"
                                    label="一级分类"
                                    align="center"
                                >
                                </el-table-column>
                                <el-table-column
                                    prop="twocategory_name"
                                    label="二级分类"
                                    align="center"
                                >
                                </el-table-column>
                            </el-table>
                        </el-form-item>
                    </el-form>
                    <el-divider></el-divider>
                    <p class="mt20">商品：</p>
                    <!--{{activityType}}-->
                    <el-table
                        ref="multipleGoodsTable"
                        :data="detailEntity.goods"
                        style="width: 100%"
                        :row-key="rowKeyMethod"
                    >
                        <el-table-column type="expand">
                            <template slot-scope="scope">
                                <el-form label-width="0px">
                                    <el-form-item
                                        v-if="detailEntity.goods[scope.$index].audit_status === 0"
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
                                                    v-model="detailEntity.goods[scope.$index].audit_remark"
                                                ></el-input>
                                            </vue-scroll>
                                        </el-col>
                                        <el-col :span="12">
                                            <ul>
                                                <vue-scroll>
                                                    <li
                                                        v-for="(result, idx) in resultSelect"
                                                        :key="idx"
                                                        @click="addAuditRemark(result, scope.$index)"
                                                    >
                                                        {{ result }}
                                                    </li>
                                                </vue-scroll>
                                            </ul>
                                        </el-col>
                                    </el-form-item>
                                </el-form>
                            </template>
                        </el-table-column>
                        <el-table-column
                            label="编号"
                            type="index"
                            prop="num"
                        >
                        </el-table-column>
                        <el-table-column
                            label="商品名称"
                            prop="title"
                        >
                        </el-table-column>

                        <div v-if="activityType == 1 || activityType == 11">
                            <div v-if="activityType == 1">
                                <el-table-column
                                    label="折扣价"
                                    prop="discountPrice"
                                >
                                </el-table-column>
                            </div>
                            <div v-else>
                                <el-table-column
                                    label="秒杀价"
                                    prop="shotgun_price"
                                >
                                </el-table-column>
                            </div>
                            <el-table-column
                                label="商品编号"
                                prop="article_id"
                            >
                            </el-table-column>
                            <el-table-column
                                label="规格编号"
                                prop="goods_id"
                            >
                            </el-table-column>
                            <el-table-column
                                label="限购数量"
                                prop="limit_num"
                            >
                            </el-table-column>
                            <el-table-column
                                label="活动库存"
                                prop="stock"
                            >
                            </el-table-column>
                        </div>

                        <el-table-column
                            label="销售价"
                            prop="sell_price"
                        >
                        </el-table-column>

                        <el-table-column label="审核" v-if="isAudit">
                            <template slot-scope="scope">
                                <el-radio-group
                                    :disabled="isAudit ? false : true"
                                    v-model="detailEntity.goods[scope.$index].audit_status"
                                    @change="changeRadio(scope.row, scope.$index)"
                                    size="small"
                                >
                                    <el-radio :label="1">通过</el-radio>
                                    <el-radio :label="0">不通过</el-radio>
                                </el-radio-group>
                                <!--<el-button @click="changeSSS(scope.$index, scope.row)">hahah</el-button>-->
                            </template>
                        </el-table-column>
                    </el-table>
                    <!-- <el-form
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
                    </el-form>-->
                </el-row>
            </div>
        </el-card>
        <div class="audit-footer">
            <el-button @click="back">返回列表</el-button>
            <el-button
                type="primary"
                @click="submitAudit(0)"
                v-if="isAudit"
            >提交</el-button>
            <el-button
                type="danger"
                @click="submitAudit(1)"
                v-if="isAudit"
            >全部通过</el-button>
        </div>
    </div>
</template>

<script>

import AuditDetail from '../../../api/audit/queryTaskDetail'
import AuditHistory from '../../../api/audit/queryTaskHistory'
import GetCategory from '../../../api/category/getClassList'
import InsertOptional from '../../../api/audit/insertOptional'
import SubmitAudit from '../../../api/audit/submitAudit'

export default {
    components: {},
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
            ],
            activityType: '', //类型
            rowKeyNum: 0,
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
                    if (res.Data.auditStatus === 0) {
                        this.isAudit = true;
                        entityInfo.goods && entityInfo.goods.map(item => {
                            item.audit_status = 1;
                            item.audit_remark = '';
                        });
                    } else {
                        let _auditResultDesc = JSON.parse(res.Data.auditResultDesc);
                        entityInfo.goods && entityInfo.goods.map(item => {
                            let _auditIt = {};
                            _auditResultDesc.fields && _auditResultDesc.fields.map(it => {
                                if (item.article_id === it.article_id && item.goods_id === it.goods_id) {
                                    _auditIt = it;
                                }
                            });
                            console.log(_auditIt, '_auditIt--------------');
                            item.audit_status = _auditIt ? _auditIt.status : '';
                            item.audit_remark = _auditIt ? _auditIt.reason : '';
                            if (item.audit_status === 0) {
                                this.$refs.multipleGoodsTable.toggleRowExpansion(item, true);
                            }
                        });
                    }
                    let activityType = entityInfo.activity.majore_type || '';
                    if ('' === activityType) {
                        switch (entityInfo.activity.majoreTypeName) {
                            case '折扣': activityType = '1'; break;
                            case '满折': activityType = '2'; break;
                            case '满减券': activityType = '3'; break;
                            case '满额返券': activityType = '4'; break;
                            case '指定赠': activityType = '5'; break;
                            case '买赠': activityType = '6'; break;
                            case '满赠': activityType = '7'; break;
                            case '包邮': activityType = '8'; break;
                            case '满减': activityType = '9'; break;
                            case '折扣券': activityType = '10'; break;
                            case '秒杀': activityType = '11'; break;
                            default: break;
                        }
                    }
                    this.detailEntity = entityInfo;
                    this.activityType = activityType;
                    console.log(this.detailEntity, 'this.detailEntity');
                    this.initHistory(res.Data);
                }
            });
        },
        initHistory(entity) {
            let _historyQueryCondition = {};
            _historyQueryCondition.entityId = entity.entityId;
            _historyQueryCondition.taskTypeName = entity.taskTypeName;
            this.$store.dispatch('setHistoryQueryCondition', _historyQueryCondition);
            /*this.historyQueryCondition.entity_id = entity.entityId;
            this.historyQueryCondition.taskTypeName = entity.taskTypeName;
            AuditHistory.call(this, this.historyQueryCondition).then(res => {
                if (res.Code === 1) {
                    if (res.Data && res.Data.Data && res.Data.Data.length > 0) {
                        this.auditHistoryList = res.Data.Data;
                    }
                }
            })*/
        },
        submitAudit(isAll) {

            let Status = 1;

            let fields = new Array();

            let passCount = 0;
            let _goods = JSON.parse(JSON.stringify(this.detailEntity.goods));
            _goods.forEach((item, i) => {
                if (isAll) {
                    item.audit_status = 1;
                    item.audit_remark = '';
                }
                let res = {
                    article_id: item.article_id,
                    goods_id: item.goods_id,
                    status: item.audit_status,    //状态  1：通过 0：不通过
                    reason: item.audit_remark,    //原因
                };
                if (item.audit_status === 0) {
                    Status = 0;
                } else {
                    passCount++;
                }
                fields.push(res);
            });
            this.$confirm(_goods.length === passCount ? '确定要全部通过吗？' : `${passCount}条商品通过,${_goods.length - passCount}条商品不通过，确定吗？`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.detailEntity.goods = _goods;
                let result = {
                    version: "1.0",
                    audit_status: Status,
                    whole: {},
                    fields: fields
                };

                let dat = {
                    auditor: this.userInfo.id,
                    auditUserName: this.userInfo.rel_name,
                    task_id: this.id,
                    status: Status,
                    taskTypeName: this.$store.getters.getHistoryQueryCondition.taskTypeName,
                    result: result
                };

                console.log(dat, 'dat');
                // return;
                SubmitAudit.call(this, dat).then(res => {
                    if (res.Code == 1) {
                        this.$message.success('操作记录保存成功');
                        this.back();
                    } else {
                        this.$message.error(res.Desc || '操作失败');
                    }
                })
            });
        },
        /**
         * 选择单选
         * @param row
         */
        changeRadio(row, index) {
            // console.log(row,index, '单选组');
            if (row.audit_status === 1) {
                this.detailEntity.goods[index].audit_remark = '';
                this.$refs.multipleGoodsTable.toggleRowExpansion(row, false);
            } else {
                this.$refs.multipleGoodsTable.toggleRowExpansion(row, true);
            }
        },
        rowKeyMethod(row) {
            return row.goods_id + '_' + row.article_id;
        },
        addAuditRemark(remark, index) {
            if (this.isAudit) {
                this.detailEntity.goods[index].audit_remark += remark;
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
</style>
