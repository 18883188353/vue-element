<template>
    <div class="fillcontain">
        <el-card class="box-card">
            <div slot="header">
                <b>用户评价信息</b>
                <audit-history-drawer
                    v-bind:auditTypeResult="auditTypeResult"
                    v-bind:keyName="'type'"
                ></audit-history-drawer>
            </div>
            <div class="text item">
                <el-row style="padding: 0 10%">
                    <el-col :span="24">
                        <el-form
                            label-width="150px"
                            size="mini"
                        >
                            <el-form-item label="订单编号：">{{ detailEntity.order_no }}</el-form-item>
                            <el-form-item label="商品名称：">{{ detailEntity.title }}</el-form-item>
                            <el-form-item label="商品评分：">{{ detailEntity.score ? detailEntity.score : ' - ' }}分</el-form-item>
                            <el-form-item
                                label="评价内容："
                                style="word-wrap:break-word;"
                            >{{ detailEntity.content }}</el-form-item>
                            <el-form-item
                                label="评价图片："
                                v-if="detailEntity.pics"
                            >
                                <div class="img-size">
                                    <viewer :images="detailEntity.pics.split(',')">
                                        <img
                                            v-for="url in detailEntity.pics.split(',')"
                                            :key="$md5(url)"
                                            :src="url"
                                        />
                                    </viewer>
                                </div>
                            </el-form-item>
                            <el-form-item label="评价时间：">{{ detailEntity.comment_time }}</el-form-item>
                        </el-form>
                    </el-col>
                    <el-col
                        :span="24"
                        v-if="isAudit"
                    >
                        <el-divider></el-divider>
                        <div v-if="detailEntity.pics">
                            <p class="mt20">图片审核结论：</p>
                            <el-form
                                label-width="50px"
                                class="audit-result-form"
                            >
                                <el-form-item label="">
                                    <el-radio
                                        v-model="auditTypeResult.image.audit_status"
                                        :label="1"
                                    >通过</el-radio>
                                    <el-radio
                                        v-model="auditTypeResult.image.audit_status"
                                        :label="0"
                                    >不通过</el-radio>
                                </el-form-item>
                                <el-form-item
                                    v-if="auditTypeResult.image.audit_status === 0"
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
                                                v-model="auditTypeResult.image.audit_remark"
                                            ></el-input>
                                        </vue-scroll>
                                    </el-col>
                                    <el-col :span="12">
                                        <ul>
                                            <vue-scroll>
                                                <li
                                                    v-for="(result, idx) in resultSelect.image"
                                                    :key="idx"
                                                    @click="auditTypeResult.image.audit_remark += result"
                                                >
                                                    {{ result }}
                                                </li>
                                            </vue-scroll>
                                        </ul>
                                    </el-col>
                                </el-form-item>
                            </el-form>
                        </div>
                        <div>
                            <p class="mt20">文字审核结论：</p>
                            <el-form
                                label-width="50px"
                                class="audit-result-form"
                            >
                                <el-form-item label="">
                                    <el-radio
                                        v-model="auditTypeResult.text.audit_status"
                                        :label="1"
                                    >通过</el-radio>
                                    <el-radio
                                        v-model="auditTypeResult.text.audit_status"
                                        :label="0"
                                    >不通过</el-radio>
                                </el-form-item>
                                <el-form-item
                                    v-if="auditTypeResult.text.audit_status === 0"
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
                                                v-model="auditTypeResult.text.audit_remark"
                                            ></el-input>
                                        </vue-scroll>
                                    </el-col>
                                    <el-col :span="12">
                                        <ul>
                                            <vue-scroll>
                                                <li
                                                    v-for="(result, idx) in resultSelect.text"
                                                    :key="idx"
                                                    @click="auditTypeResult.text.audit_remark += result"
                                                >
                                                    {{ result }}
                                                </li>
                                            </vue-scroll>
                                        </ul>
                                    </el-col>
                                </el-form-item>
                            </el-form>
                        </div>

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
                image: {
                    audit_type: 'pics_status',
                    audit_status: '',
                    audit_remark: '',
                    audit_type_str: '评价图片'
                },
                text: {
                    audit_type: 'status',
                    audit_status: '',
                    audit_remark: '',
                    audit_type_str: '评价内容'
                }
            },
            resultSelect: {
                image: [
                    '第【】张图片存在水印、二维码、条形码',
                    '第【】张图片存在恶心内容',
                    '第【】张图片存在政治内容',
                    '第【】张图片模糊',
                    '第【】张图片不符合此场景'
                ],
                text: [
                    '存在违禁词（辱骂、威胁、政治）',
                    '内容无意义',
                    '内容不符合此场景'
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
                    if (!entityInfo.pics) {
                        this.auditTypeResult.image.audit_status = 1;
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
                    this.$message.warning('请先完成审核');
                    return;
                }
                if (oneType.audit_status == 0) {
                    auditResult.audit_status = 0;
                }
                auditResult.fields.push({
                    type: oneType.audit_type,
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
</style>
