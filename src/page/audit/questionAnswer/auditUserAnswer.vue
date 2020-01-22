<template>
    <div class="fillcontain">
        <el-card class="box-card mb20">
            <div slot="header">
                <b>用户回答审核列表</b>
            </div>
            <div class="text item">
                <div>
                    <el-form
                        ref="queryForm"
                        :inline="true"
                        :model="queryCondition"
                        class="demo-form-inline"
                    >
                        <el-form-item
                            label="商家类型:"
                            prop="taskTypeName"
                        >
                            <el-select
                                v-model="queryCondition.taskTypeName"
                                placeholder="请选择商家类型"
                                multiple
                                collapse-tags
                                @change="(e) => {if(e.length === 1){ __last = e }; if(e.length === 0) { queryCondition.taskTypeName = __last }}"
                            >
                                <el-option
                                    v-for="(n, idx) in taskTypeNames"
                                    :key="idx"
                                    :label="n.name"
                                    :value="n.code"
                                    :disabled="queryCondition.taskTypeName[0] === n.code && queryCondition.taskTypeName.length === 1"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item
                            label="申请日期:"
                            prop="dateTime"
                        >
                            <el-date-picker
                                v-model="queryCondition.dateTime"
                                type="datetimerange"
                                value-format="yyyy-MM-dd HH:mm:ss"
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期"
                            >
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item
                            label="审核状态:"
                            prop="status"
                        >
                            <el-select
                                v-model="queryCondition.status"
                                placeholder="审核状态"
                            >
                                <el-option
                                    label="待审核"
                                    :value="0"
                                ></el-option>
                                <el-option
                                    label="已通过"
                                    :value="1"
                                ></el-option>
                                <el-option
                                    label="未通过"
                                    :value="2"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item
                            label="查询关键字:"
                            prop="parms"
                        >
                            <el-input
                                v-model="queryCondition.parms"
                                type="text"
                                placeholder="请输入关键字"
                            ></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button
                                type="primary"
                                @click="paging.pageIndex = 1; init()"
                            >查询</el-button>
                            <el-button @click="resetForm">重置</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
        </el-card>

        <el-card class="box-card">
            <el-table
                :data="tableList"
                v-loading="initLoading"
                border
                style="width: 100%;"
            >
                <el-table-column
                    prop="articleTitle"
                    label="商品信息"
                    align="center"
                    minWidth="260"
                    :show-overflow-tooltip="true"
                >
                </el-table-column>
                <el-table-column
                    prop="come"
                    label="提问用户"
                    align="center"
                    width="160"
                >
                </el-table-column>
                <el-table-column
                    prop="questionContent"
                    label="提问内容"
                    align="center"
                    minWidth="260"
                    :show-overflow-tooltip="true"
                >
                </el-table-column>
                <el-table-column
                    prop="completedComplete"
                    label="回答用户"
                    align="center"
                    width="160"
                >
                </el-table-column>
                <el-table-column
                    prop="answerContent"
                    label="回答内容"
                    align="center"
                    minWidth="260"
                    :show-overflow-tooltip="true"
                >
                </el-table-column>
                <el-table-column
                    prop="auditUserName"
                    label="审核人员"
                    align="center"
                    width="100"
                >
                </el-table-column>
                <el-table-column
                    prop="auditResult"
                    label="审核状态"
                    align="center"
                    width="100"
                >
                    <template slot-scope="scope">
                        <span v-if="scope.row.auditResult == 0">未审核</span>
                        <span v-else-if="scope.row.auditResult == 1">审核通过</span>
                        <span v-else-if="scope.row.auditResult == 2">审核不通过</span>
                        <span v-else>{{ scope.row.auditResult }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="taskId"
                    label="操作"
                    align="center"
                    fixed="right"
                    width="150"
                >
                    <template slot-scope="scope">
                        <el-link
                            type="primary"
                            @click="goAuditDetail(scope.row)"
                            v-if="scope.row.auditResult === 0"
                        >审核</el-link>
                        <el-link
                            type="primary"
                            @click="goAuditDetail(scope.row)"
                            v-else
                        >查看详情</el-link>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="Processing"
                    label="信誉分"
                    align="center"
                    width=""
                >
                </el-table-column>
            </el-table>
            <div class="page">
                <el-pagination
                    :small="true"
                    @current-change="pagingCurrentHandler"
                    @size-change="pagingSizeHandler"
                    :current-page.sync="paging.pageIndex"
                    :page-size="paging.pageSize"
                    :page-sizes="[5, 10, 15, 20]"
                    :total="paging.total"
                    layout="total, sizes, prev, pager, next"
                >
                </el-pagination>
            </div>
        </el-card>

        <!--审核弹窗-->
        <el-dialog
            title="回答审核"
            :visible.sync="auditPopup"
            width="500px"
        >
            <div>
                <el-form
                    label-width="150px"
                    size="mini"
                >
                    <el-form-item label="商品信息：">德芙巧克力情人节特推</el-form-item>
                    <el-form-item label="提问内容：">请问有礼盒包装吗？</el-form-item>
                    <el-form-item label="回答内容：">商品有精美礼盒包装的，请放心购买？</el-form-item>
                    <el-form-item label="是否通过：">
                        <el-radio
                            v-model="radio"
                            label="1"
                        >通过</el-radio>
                        <el-radio
                            v-model="radio"
                            label="2"
                        >不通过</el-radio>
                        <el-input
                            v-if="radio ==='2' "
                            type="textarea"
                            :rows="4"
                            placeholder="请输入不通过理由"
                            v-model="textarea"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="审核备注：">
                        <el-input
                            type="textarea"
                            :rows="4"
                            placeholder="请输入审核备注"
                            v-model="textarea"
                        ></el-input>
                    </el-form-item>
                    <el-form-item
                        label="信誉分增加："
                        size="medium"
                    >
                        <el-input
                            v-model="input"
                            placeholder="请输入分值，0标示不变"
                        ></el-input>
                    </el-form-item>
                    <el-form-item
                        label="信誉分减少："
                        size="medium"
                    >
                        <el-input
                            v-model="input"
                            placeholder="请输入分值，0标示不变"
                        ></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <span
                slot="footer"
                class="dialog-footer"
            >
                <el-button @click="auditPopup = false">取 消</el-button>
                <el-button
                    type="primary"
                    @click="auditPopup = false"
                >确 定</el-button>
            </span>
        </el-dialog>

        <!--审核详情弹窗-->
        <el-dialog
            title="回答审核详情"
            :visible.sync="auditDetailsPopup"
            width="500px"
        >
            <div>
                <el-form
                    label-width="150px"
                    size="mini"
                >
                    <el-form-item label="商品信息：">德芙巧克力情人节特推</el-form-item>
                    <el-form-item label="提问内容：">请问有礼盒包装吗？</el-form-item>
                    <el-form-item label="回答内容：">商品有精美礼盒包装的，请放心购买</el-form-item>
                    <el-form-item label="是否通过：">通过</el-form-item>
                    <el-form-item label="审核备注：">备注备注备注备注备注备注备注备注备注</el-form-item>
                    <el-form-item label="信誉分：">2</el-form-item>
                </el-form>
            </div>
            <span
                slot="footer"
                class="dialog-footer"
            >
                <el-button @click="auditDetailsPopup = false">取 消</el-button>
                <el-button
                    type="primary"
                    @click="auditDetailsPopup = false"
                >确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>

import QueryTaskList from '../../../api/audit/queryTaskList'

export default {
    components: {},
    data() {
        return {
            taskTypeNames: [{
                name: '国内购',
                code: 'UserAnswerAudit'
            }, {
                name: '全球购',
                code: 'GlobalUserAnswerAudit'
            }, {
                name: '奢侈品',
                code: 'LuxuryUserAnswerAudit'
            }],
            queryCondition: { // 查询条件
                taskTypeName: ['UserAnswerAudit', 'GlobalUserAnswerAudit', 'LuxuryUserAnswerAudit'], // 审核任务名称
                status: 0, // 审核任务结果状态 0：待审核,1：审核通过,2：审核不通过
                dateTime: [], // 下标0开始时间、下标1结束时间（数据添加时间）
                parms: '', // 查询参数
            },
            paging: { // 分页条件
                pageIndex: 1, // 当前页
                pageSize: 10, // 每页多少条数据
                total: 0 // 数据总条数
            },
            tableList: [],
            initLoading: false, // 是否显示加载表格数据时的加载动画


            formInline: {
                user: '',
                region: '',
                start: '',
            },
            auditPopup: false,//审核弹窗
            auditDetailsPopup: false,//审核详情弹窗
            radio: '1',//是否通过
            textarea: '',
            input: '',
            currentPage: 1,
            tableData: [{
                type: '1',
                come: '15',
                answerPhone: '12',
                notAnswerPhone: '30',
                completedComplete: '5',
                Processing: '10',
                returnVisit: '90%',
            },],//审核任务
        }
    },
    // keep-alive 组件激活时调用，如果不走缓存请使用其他生命周期钩子，例如 mounted
    activated() {
        this.init();
    },
    methods: {
        init() {
            this.initLoading = true;
            this.tableList = new Array();
            this.paging.total = 0;
            QueryTaskList.call(this, { ...this.queryCondition, ...this.paging }).then(res => {
                console.log(res);
                if (res.Code === 1) {
                    this.paging.total = res.Data.CountTotal;
                    this.paging.pageIndex = res.Data.PageIndex;
                    this.tableList = res.Data.Data && res.Data.Data.map(n => {
                        let entityInfo = JSON.parse(n.entityInfo);
                        entityInfo.taskId = n.taskId;
                        entityInfo.addTime = n.addTime;
                        entityInfo.auditResult = n.auditResult;
                        entityInfo.auditUserName = n.auditUserName;
                        //this.tableList.push(entityInfo);
                        return entityInfo;
                    });
                    console.log(this.tableList, 'this.tableList');
                }
                this.initLoading = false;
            });
        },
        pagingCurrentHandler(value) {
            console.log(' 选择页 ==>> ', value)
            this.paging.pageIndex = value;
            this.init();
        },
        pagingSizeHandler(value) {
            console.log(' 每页数量 ==>> ', value)
            this.paging.pageSize = value;
            this.init();
        },
        goAuditDetail(row) {
            this.$router.push({ path: `auditUserAnswerDetail/${row.taskId}` })
        },
        resetForm() {
            this.$refs.queryForm.resetFields();
            this.init();
        }
    },

    created() {

    }
}
</script>

<style lang="less" scoped>
.page {
    text-align: right;
    padding: 20px;
}
</style>
