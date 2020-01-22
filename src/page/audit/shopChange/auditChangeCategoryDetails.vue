<template>
    <div class="fillcontain">
        <el-card class="box-card">
            <div slot="header">
                <b>经营范围变更审核详情</b>
                <audit-history-drawer v-bind:auditTypeResult="auditTypeResult"></audit-history-drawer>
            </div>
            <div class="text item">
                <el-row>
                    <el-col :span="9">
                        <div class="hint">变更前信息</div><span class="xzt">橘色背景为删除内容</span>
                    </el-col>
                    <el-col :span="9">
                        <div class="hint">变更后信息</div><span class="xzt">绿色背景为新增内容</span>
                    </el-col>
                    <el-col :span="6">
                        <div>营业执照</div>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="9">
                        <el-form
                            label-width="1px"
                            size="mini"
                            class="mt20"
                        >
                            <el-form-item>
                                <el-table
                                    :data="beforeCategoryTable"
                                    height="525px"
                                    border
                                    style="width: 100%; margin-top: 20px;"
                                    :row-class-name="tableRowClassNameBefore"
                                >
                                    <el-table-column
                                        label="序号"
                                        type="index"
                                        prop="num"
                                        align="center"
                                        :show-overflow-tooltip="true"
                                    >
                                    </el-table-column>
                                    <el-table-column
                                        prop="parentTitle"
                                        label="一级分类"
                                        align="center"
                                        :show-overflow-tooltip="true"
                                    >
                                    </el-table-column>
                                    <el-table-column
                                        prop="title"
                                        label="二级分类"
                                        align="center"
                                    >
                                    </el-table-column>
                                </el-table>
                                <div class="list-page">
                                    <el-pagination
                                        :small="true"
                                        @current-change="pagingCurrentHandlerBefore"
                                        @size-change="pagingSizeHandlerBefore"
                                        :current-page.sync="pagingBefore.pageIndex"
                                        :page-size="pagingBefore.pageSize"
                                        :page-sizes="[10, 30, 50, 100]"
                                        :total="pagingBefore.total"
                                        layout="total, sizes, prev, pager, next"
                                    >
                                    </el-pagination>
                                </div>
                            </el-form-item>
                        </el-form>
                    </el-col>
                    <el-col :span="9">
                        <el-form
                            label-width="1px"
                            size="mini"
                            class="mt20"
                        >
                            <el-form-item>
                                <el-table
                                    :data="afterCategoryTable"
                                    border
                                    height="525px"
                                    :row-class-name="tableRowClassNameAfter"
                                    style="width: 100%; margin-top: 20px;"
                                >
                                    <el-table-column
                                        label="序号"
                                        type="index"
                                        prop="num"
                                        align="center"
                                        :show-overflow-tooltip="true"
                                    >
                                    </el-table-column>
                                    <el-table-column
                                        prop="parentTitle"
                                        label="一级分类"
                                        align="center"
                                        :show-overflow-tooltip="true"
                                    >
                                    </el-table-column>
                                    <el-table-column
                                        prop="title"
                                        label="二级分类"
                                        align="center"
                                    >
                                    </el-table-column>
                                </el-table>
                                <div class="list-page">
                                    <el-pagination
                                        :small="true"
                                        @current-change="pagingCurrentHandlerAfter"
                                        @size-change="pagingSizeHandlerAfter"
                                        :current-page.sync="pagingAfter.pageIndex"
                                        :page-size="pagingAfter.pageSize"
                                        :page-sizes="[10, 30, 50, 100]"
                                        :total="pagingAfter.total"
                                        layout="total, sizes, prev, pager, next"
                                    >
                                    </el-pagination>
                                </div>
                            </el-form-item>
                        </el-form>
                    </el-col>
                    <el-col :span="6">
                        <el-form
                            label-width="50px"
                            size="mini"
                            class="mt20"
                        >
                            <el-form-item>
                                <viewer :images=[detailEntity.CardPics]>
                                    <img
                                        :src="detailEntity.CardPics"
                                        style="width: 150px; height: 200px;"
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
            categoryTree: [],
            beforeCategory: [],
            afterCategory: [],
            afterCategoryTable: [],
            beforeCategoryTable: [],
            pagingBefore: { // 分页条件
                pageIndex: 1, // 当前页
                pageSize: 10, // 每页多少条数据
                total: 0 // 数据总条数
            },
            pagingAfter: { // 分页条件
                pageIndex: 1, // 当前页
                pageSize: 10, // 每页多少条数据
                total: 0 // 数据总条数
            },
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
                    //获取分类
                    this.initCategory(res.Data.taskTypeName);
                    this.beforeData = entityInfo.OldCompanyInfo ? entityInfo.OldCompanyInfo : {};
                    this.afterData = entityInfo.NewCompanyInfo ? entityInfo.NewCompanyInfo : {};

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
        initCategory(taskTypeName) {
            let isGolb;
            switch (taskTypeName) {
                case 'DomesticCategoryAudit': isGolb = 0; break;
                case 'GlobalCategoryAudit': isGolb = 1; break;
                case 'LuxuryCategoryAudit': isGolb = 2; break;
                default: break;
            }
            if (undefined === isGolb || null === isGolb) {
                this.$message.error('不能确定商家类型');
                return;
            }
            GetCategory.call(this, {
                categoryType: 'Goods',
                isGolb: isGolb
            }).then(res => {
                console.log(res, 'category');
                if (res.code == '1') {
                    // 为对象添加禁止点击的属性
                    /*let dg = function(list){
                        if(list && list.length > 0){
                            for (let i = 0; i < list.length; i++) {
                                let e = list[i];
                                e.disabled = true;
                                dg(e.children);
                            }
                        }
                    }
                    dg(res.data.category);*/
                    this.categoryTree = res.data.category;
                    console.log(this.categoryTree, 'this.categoryTree++++');
                    //以前
                    let beforeCategory = [];
                    //现在
                    let afterCategory = [];
                    //新增
                    this.categoryTree.map(one => {
                        one.children.map(two => {
                            if (this.detailEntity.Add.indexOf(two.oldId) > -1) {
                                two.parentTitle = one.title;
                                two.isAdd = true;
                                afterCategory.push(two);
                            }
                        });
                    });
                    //以前 后删除后的现在的
                    this.categoryTree.map(one => {
                        one.children.map(two => {
                            if (this.detailEntity.threeCateIds.indexOf(two.oldId) > -1) {
                                //有这个二级分类
                                two.parentTitle = one.title;
                                if (this.detailEntity.Del.indexOf(two.oldId) > -1) {
                                    two.isDel = true;
                                } else {
                                    afterCategory.push(two);
                                    two.isDel = false;
                                }
                                beforeCategory.push(two);
                            }
                        });
                    });
                    this.beforeCategory = beforeCategory;
                    this.afterCategory = afterCategory;
                    this.pagingBefore.total = beforeCategory.length;
                    this.pagingAfter.total = afterCategory.length;
                    this.beforeCategoryTable = this.getPageList(this.beforeCategory, this.pagingBefore);
                    this.afterCategoryTable = this.getPageList(this.afterCategory, this.pagingAfter);
                    console.log(beforeCategory, afterCategory, '////////');
                    /*// 设置营业范围选中值
                    this.$nextTick(() => {
                        if(this.categorySelectValue){
                            this.$refs.categoryTree.setCheckedKeys(this.categorySelectValue);
                            this.$nextTick(() => {
                                this.getSelectCategory();
                            });
                        }
                    })*/
                }
            })
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
        pagingCurrentHandlerBefore(value) {
            console.log(' 选择页 ==>> ', value)
            this.pagingBefore.pageIndex = value;
            this.beforeCategoryTable = this.getPageList(this.beforeCategory, this.pagingBefore);

        },
        pagingSizeHandlerBefore(value) {
            console.log(' 每页数量 ==>> ', value)
            this.pagingBefore.pageSize = value;
            this.beforeCategoryTable = this.getPageList(this.beforeCategory, this.pagingBefore);
        },
        pagingCurrentHandlerAfter(value) {
            console.log(' 选择页 ==>> ', value)
            this.pagingAfter.pageIndex = value;
            this.afterCategoryTable = this.getPageList(this.afterCategory, this.pagingAfter);

        },
        pagingSizeHandlerAfter(value) {
            console.log(' 每页数量 ==>> ', value)
            this.pagingAfter.pageSize = value;
            this.afterCategoryTable = this.getPageList(this.afterCategory, this.pagingAfter);
        },
        //表格样式
        tableRowClassNameBefore({ row, rowIndex }) {
            if (row.isDel) {
                return 'del-row';
            }
            return '';
        },
        tableRowClassNameAfter({ row, rowIndex }) {
            if (row.isAdd) {
                return 'add-row';
            }
            return '';
        },
        //获取表格数据
        getPageList(list, page) {
            return list.slice((page.pageIndex - 1) * page.pageSize, page.pageIndex * page.pageSize);
        }
    }
}
</script>

<style lang="less">
.xzt {
    display: inline-block;
    font-size: 12px;
    color: #aba3a3;
    padding-left: 15px;
}
.img_size {
    img {
        width: 150px;
        height: 100px;
        margin: 3px;
        display: block;
    }
}
.hint {
    border-left: 3px solid #25ada3;
    padding-left: 10px;
    display: inline-block;
}
.redItem .el-form-item__label {
    color: red;
}
.el-table .del-row {
    background: #fd9154;
}

.el-table .add-row {
    background: #aef950;
}
</style>
