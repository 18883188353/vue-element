<template>
    <el-dialog
        title="违规处理规则"
        :visible.sync="open"
        width="80%"
        :before-close="beforeCloseHandler"
    >
        <div class="plot-desc-content">
            <el-form
                ref="plotDescQueryForm"
                :inline="true"
                :model="plotDescQuery"
                class="demo-form-inline"
            >
                <el-form-item
                    label="违规分类:"
                    prop="ruleTypeCode"
                >
                    <el-select
                        v-model="plotDescQuery.ruleTypeCode"
                        placeholder="请选择违规分类"
                    >
                        <el-option
                            label="全部"
                            value=""
                        ></el-option>
                        <el-option
                            v-for="(n, idx) in ruleTypeList"
                            :key="idx"
                            :label="n.name"
                            :value="n.code"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item
                    label="违规行为:"
                    prop="ruleBehaviorCode"
                >
                    <el-select
                        v-model="plotDescQuery.ruleBehaviorCode"
                        placeholder="请选择违规行为"
                    >
                        <el-option
                            label="全部"
                            value=""
                        ></el-option>
                        <el-option
                            v-for="(n, idx) in behaviorList"
                            :key="idx"
                            :label="n.notes"
                            :value="n.code"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item
                    label="情节描述:"
                    prop="notes"
                >
                    <el-input
                        v-model="plotDescQuery.notes"
                        type="text"
                        placeholder="请输入关键字"
                        clearable
                    ></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button
                        type="primary"
                        @click="plotDescQuery.pageNumber = 1; initPlotDescList()"
                    >查询</el-button>
                </el-form-item>
            </el-form>
            <el-table
                ref="pdTable"
                :data="plotDescDataList"
                v-loading="tableLoading"
                highlight-current-row
                current-row-key="id"
                class="plot-desc"
                @select="plotSelectHandler"
            >
                <el-table-column
                    type="selection"
                    width="60"
                >
                </el-table-column>
                <el-table-column
                    property="ruleTypeNotes"
                    label="违规分类"
                    width="100"
                    align="center"
                ></el-table-column>
                <el-table-column
                    property="ruleBehaviorNotes"
                    label="违规行为"
                    width="150"
                    align="center"
                    show-overflow-tooltip
                ></el-table-column>
                <el-table-column
                    property="notes"
                    label="情节描述"
                    align="center"
                    minWidth="260"
                    show-overflow-tooltip
                ></el-table-column>
                <el-table-column
                    property="scoreValue"
                    label="分数"
                    width="100"
                    align="center"
                ></el-table-column>
            </el-table>
        </div>
        <div class="list-page">
            <el-pagination
                :small="true"
                @current-change="pagingCurrentHandler"
                @size-change="pagingSizeHandler"
                :current-page.sync="plotDescQuery.pageNumber"
                :page-size="plotDescQuery.pageSize"
                :page-sizes="[5, 10, 15, 20]"
                :total="plotDescQuery.total"
                layout="total, sizes, prev, pager, next"
            >
            </el-pagination>
        </div>
        <span
            slot="footer"
            class="dialog-footer"
        >
            <el-button
                type="primary"
                @click="confirmSelect"
            >确 定</el-button>
        </span>
    </el-dialog>
</template>
<script>

import SelectPlotDescList from '../../api/businessCredit/reputation/selectPlotDescList';
import GetAllRuleTypeList from '../../api/businessCredit/reputation/getAllRuleTypeList';
import GetAllBehaviorList from '../../api/businessCredit/reputation/getAllBehaviorList';

export default {
    props: {
        // value: [String, Number, Boolean, Date, Array],
        open: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            tableLoading: false,
            behaviorList: [],
            ruleTypeList: [],
            plotDescDialog: false,
            plotDescDataList: [],
            plotDescId: '',
            currentSelectId: '',
            plotDescQuery: { // 分页条件
                pageNumber: 1, // 当前页
                pageSize: 10, // 每页多少条数据
                total: 0, // 数据总条数
                ruleTypeCode: '',
                ruleBehaviorCode: '',
                notes: '',
                operation: ''
            },
        }
    },
    methods: {
        initPlotDescList() {
            this.tableLoading = true;
            SelectPlotDescList.call(this, this.plotDescQuery).then(res => {
                if (res.Code === 1) {
                    this.plotDescDataList = res.Data.list;
                    this.plotDescQuery.pageNumber = res.Data.pageNumber;
                    this.plotDescQuery.pageSize = res.Data.pageSize;
                    this.plotDescQuery.total = parseInt(res.Data.total);
                } else {
                    this.$message.error('获取商家违规处罚规则失败，请稍后再试');
                }
                this.tableLoading = false;
            })
        },
        initReputationType() {
            GetAllRuleTypeList.call(this, {}).then(res => {
                if (res.Code === 1) {
                    this.ruleTypeList = res.Data;
                }
            });
            GetAllBehaviorList.call(this, {}).then(res => {
                if (res.Code === 1) {
                    this.behaviorList = res.Data;
                }
            })
        },
        plotSelectHandler(selection, row) {
            this.$refs.pdTable.clearSelection();
            this.$refs.pdTable.toggleRowSelection(row, true);
            this.currentSelectId = row.id;
        },
        confirmSelect() {
            if (!this.currentSelectId) {
                this.$message.warning('请先选择一条商家违规处理规则');
                return;
            }
            let row = this.plotDescDataList.find(n => n.id === this.currentSelectId);
            let result = {
                selectId: row.id,
                selectScore: row.scoreValue
            }
            //this.$emit('update:selectResult', result);
            this.$emit('selectCallback', result);
            this.$emit("update:open", false);
        },
        pagingCurrentHandler(value) {
            console.log(' 选择页 ==>> ', value)
            this.plotDescQuery.pageNumber = value;
            this.initPlotDescList();
        },
        pagingSizeHandler(value) {
            console.log(' 每页数量 ==>> ', value)
            this.plotDescQuery.pageSize = value;
            this.initPlotDescList();
        },
        beforeCloseHandler(event) {
            this.$emit("update:open", false);
        }
    },
    mounted() {
        this.initPlotDescList();
        this.initReputationType();
    }
}
</script>
<style>
.plot-desc .el-table__header-wrapper .el-checkbox {
    display: none;
}
</style>
<style lang="less" scoped>
</style>
