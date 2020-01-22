<template>
    <div class="fillcontain">
        <el-card class="box-card">
            <div slot="header">
                <b class="mr10">广告审核详情</b>
            </div>
            <div class="text item">
                <el-row style="padding: 0 5%">
                    <el-form
                        label-width="150px"
                        size="mini"
                    >
                        <el-form-item label="广告标题：">{{ detailEntity.title }}</el-form-item>
                        <el-form-item label="广告展示端口：">{{ detailEntity.type }}</el-form-item>
                        <el-form-item label="广告图片：">
                            <div
                                class="img_size"
                                v-if="detailEntity.up_path"
                            >
                                <viewer :images=[detailEntity.up_path]>
                                    <img :src="detailEntity.up_path" />
                                </viewer>
                            </div>
                        </el-form-item>
                        <el-form-item label="广告跳转方式：">
                            <span v-if="detailEntity.material_type === 0">商品</span>
                            <span v-else-if="detailEntity.material_type === 1">店铺</span>
                            <span v-else-if="detailEntity.material_type === 2">内部链接</span>
                            <span v-else-if="detailEntity.material_type === 3">外部链接</span>
                            <span v-else-if="detailEntity.material_type === 4">品牌</span>
                        </el-form-item>
                        <el-form-item
                            label="商品信息："
                            v-if="detailEntity.material_type === 0"
                        >
                            <!---->
                            <div
                                class="goods-content"
                                v-if="detailEntity.productInfo"
                            >
                                <div>
                                    <img :src="detailEntity.productInfo.img_url" />
                                </div>
                                <div class="goods-info">
                                    <p
                                        class="goods-title"
                                        v-if="detailEntity.productInfo.title"
                                    >{{ detailEntity.productInfo.title.length > 30 ? detailEntity.productInfo.title.substring(0, 30) + '...' : detailEntity.productInfo.title }}</p>
                                    <p class="shop-title">
                                        <img
                                            class="shop-img"
                                            src="http://oss-cn-shenzhen.aliyuncs.com/kuailian-upload/RechargeFileTest/4ed2d979-93ac-46fe-a77d-f771ca886844manji.png"
                                        />
                                        {{ detailEntity.productInfo.shopName }}
                                    </p>
                                    <p class="price">￥ {{ detailEntity.productInfo.sellPrice }}</p>
                                    <p class="sales">销量：2000</p>
                                </div>
                            </div>
                        </el-form-item>
                        <el-form-item
                            label="品牌信息："
                            v-if="detailEntity.material_type === 4"
                        >
                            <div
                                class="brand-content"
                                v-if="detailEntity.productInfo"
                            >
                                <div>
                                    <img :src="detailEntity.productInfo.logo" />
                                </div>
                                <p class="brand-title">{{ detailEntity.productInfo.name}}</p>
                            </div>
                        </el-form-item>
                        <el-form-item
                            label="店铺信息："
                            v-if="detailEntity.material_type === 1"
                        >
                            <div
                                class="shop-content"
                                v-if="detailEntity.productInfo"
                            >
                                <div>
                                    <img :src="detailEntity.productInfo.pcLogo" />
                                </div>
                                <p class="shop-title">{{ detailEntity.productInfo.name }}</p>
                            </div>
                        </el-form-item>
                        <el-form-item
                            label="内部链接地址："
                            v-if="detailEntity.material_type === 2"
                        >
                            <div v-if="detailEntity.target_url">
                                <el-link
                                    :href="detailEntity.target_url"
                                    target="_blank"
                                >{{ detailEntity.target_url }}</el-link>
                            </div>
                        </el-form-item>
                        <el-form-item
                            label="外部链接地址："
                            v-if="detailEntity.material_type === 3"
                        >
                            <div v-if="detailEntity.target_url">
                                <el-link
                                    :href="detailEntity.target_url"
                                    target="_blank"
                                >{{ detailEntity.target_url }}</el-link>
                            </div>
                        </el-form-item>
                        <el-form-item label="素材上传人：">{{ detailEntity.up_user_name }}</el-form-item>
                        <el-form-item label="素材上传时间：">{{ detailEntity.up_time }}</el-form-item>
                    </el-form>
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
import GetCategory from '../../api/category/getClassList'
import InsertOptional from '../../api/audit/insertOptional'
import SubmitAudit from '../../api/audit/submitAudit'


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
                '主标题不符合要求（错字、漏字、多字、辱骂、威胁、政治）',
                '副标题不符合要求（错字、漏字、多字、辱骂、威胁、政治）',
                '素材图片不清晰',
                '素材图片美观度不足',
                '素材图片存在违禁内容（恶心、暴恐、政治）',
                '推广商品不符合要求',
                '链接地址不合规',
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
        height: 150px;
    }
}
.goods-content {
    width: 200px;
    height: 320px;
    border: 1px solid #ddd;
    img {
        width: 200px;
        height: 200px;
    }
    p {
        height: 30px;
    }
    .shop-img {
        width: 20px;
        height: 20px;
        vertical-align: middle;
        margin-right: 5px;
    }
    .goods-info {
        padding: 0px 5px;
    }
    .goods-title {
        font-size: 11px;
        line-height: 14px;
        color: #5e5353;
    }
    .shop-title {
        height: 30px;
        line-height: 30px;
    }
    .price {
        color: red;
    }
    .sales {
        text-align: right;
        font-size: 11px;
        margin-top: -8px;
    }
}
.brand-content {
    width: 300px;
    height: 180px;
    border: 1px solid #ddd;
    img {
        width: 300px;
        height: 150px;
    }
    .brand-title {
        text-align: center;
        margin-top: -8px;
    }
}
.shop-content {
    width: 200px;
    height: 230px;
    border: 1px solid #ddd;
    img {
        width: 200px;
        height: 200px;
    }
    .shop-title {
        text-align: center;
        margin-top: -8px;
    }
}
</style>
