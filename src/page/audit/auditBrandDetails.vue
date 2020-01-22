<template>
    <div class="fillcontain">
        <el-card class="box-card">
            <div slot="header">
                <b>品牌审核详情</b>
                <audit-history-drawer v-bind:auditTypeResult="auditTypeResult"></audit-history-drawer>
            </div>
            <div class="text item mb30">
                <el-row style="padding: 0 5%">
                    <el-col :span="12">
                        <el-form
                            label-width="150px"
                            size="mini"
                        >
                            <el-form-item label="申请类型：">{{ detailEntity.apply_type === 0 ? '已有品牌授权' : '新品牌申请' }}</el-form-item>
                            <el-form-item label="申请商家：">{{ detailEntity.shop_name }}</el-form-item>
                            <el-form-item label="授权品牌：">{{ detailEntity.name }}</el-form-item>
                            <el-form-item label="品牌Logo：">
                                <div
                                    class="img_size"
                                    v-if="detailEntity.logo"
                                >
                                    <viewer :images=[detailEntity.logo]>
                                        <img :src="detailEntity.logo" />
                                    </viewer>
                                </div>
                            </el-form-item>
                            <el-form-item label="品牌所有人：">{{ detailEntity.ascription_person }}</el-form-item>
                            <el-form-item label="商标注册号/申请号：">{{ detailEntity.register_no }}</el-form-item>
                            <!--<el-form-item label="商标注册证/授权书：">
                                <div
                                    class="img_size"
                                    v-if="detailEntity.authorize_pics"
                                >
                                    <viewer :images="detailEntity.authorize_pics.split(',')">
                                        <img
                                            v-for="(url, idx) in detailEntity.authorize_pics.split(',')"
                                            :key="idx"
                                            :src="url"
                                        />
                                    </viewer>
                                </div>
                            </el-form-item>-->
                            <el-form-item label="授权到期时间：">{{ detailEntity.authorize_time }}</el-form-item>
                        </el-form>
                    </el-col>
                    <el-col
                        :span="12"
                        class="lce-content"
                    >
                        <div>商标注册证/授权书</div>
                        <div v-if="detailEntity.authorize_pics">
                            <viewer :images="detailEntity.authorize_pics.split(',')">
                                <img
                                    v-for="(url, idx) in detailEntity.authorize_pics.split(',')"
                                    :key="idx"
                                    :src="url"
                                />
                            </viewer>
                        </div>
                    </el-col>
                    <el-col
                        :span="24"
                        v-if="isAudit"
                    >
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
                audit_remark: ''
            },
            resultSelect: [
                '品牌Logo不正确',
                '品牌Logo图片模糊',
                '品牌Logo涉嫌侵权',
                '品牌和品牌Logo不对应',
                '商标注册证/授权书图片模糊',
                '商标注册证/授权书图片不正确',
                '授权到期时间不正确',
                '商标注册号/申请号不正确'
            ]
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
.lce-content {
    text-align: center;
    font-size: 20px;
    font-weight: 600;
    img {
        width: 300px;
        max-height: 100%;
        margin: 5px;
    }
}
</style>
