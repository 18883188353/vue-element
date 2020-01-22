<template>
    <div>
        <el-card class="box-card mb20">
            <div slot="header">
                <b>平台品牌管理列表</b>
            </div>
            <div class="text item">
                <div>
                    <el-form
                        :inline="true"
                        :model="queryCondition"
                        class="demo-form-inline"
                    >
                        <el-form-item label="品牌状态：">
                            <el-select v-model="queryCondition.status">
                                <el-option
                                    v-for="(item, index) in brandStatusOption"
                                    :label="item.label"
                                    :value="item.value"
                                    :key="index"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="品牌名称：">
                            <el-input
                                v-model="queryCondition.brandName"
                                placeholder="请输入品牌名称"
                            ></el-input>
                        </el-form-item>

                        <el-form-item>
                            <el-button
                                type="primary"
                                @click="init"
                            >查询</el-button>
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
                style="width: 100%; margin-top: 20px;"
            >
                <el-table-column
                    label="序号"
                    type="index"
                    prop="num"
                    align="center"
                    minWidth="50"
                    :show-overflow-tooltip="true"
                >
                </el-table-column>
                <el-table-column
                    prop="name"
                    label="申请品牌"
                    align="center"
                    minWidth="80"
                    :show-overflow-tooltip="true"
                >
                </el-table-column>
                <el-table-column
                    prop="logo"
                    label="品牌logo"
                    align="center"
                    width="140"
                >
                    <template slot-scope="scope">
                        <viewer :images=[scope.row.logo]>
                            <img
                                :src="scope.row.logo"
                                style="width: 100px; height: 50px; verticalAlign: 'middle'"
                            />
                        </viewer>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="introduction"
                    label="申请类型"
                    align="center"
                    min-width="300"
                >
                </el-table-column>
                <el-table-column
                    prop="updateTime"
                    label="申请时间"
                    align="center"
                    min-width="120"
                >
                </el-table-column>
                <el-table-column
                    prop="state"
                    label="当前状态"
                    align="center"
                    width="60"
                >
                    <template slot-scope="scope">
                        <span
                            v-if="scope.row.state === 1"
                            style="color: #13ce66"
                        >正常</span>
                        <span
                            v-else
                            style="color: red"
                        >禁用</span>
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
                        <el-button
                            type="primary"
                            @click="auditCheckInDetails(scope.row)"
                        >查看</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="page">
                <el-pagination
                    :small="true"
                    @current-change="pagingCurrentHandler"
                    @size-change="pagingSizeHandler"
                    :current-page.sync="paging.pageIndex"
                    :page-size="paging.pageSize"
                    :page-sizes="[10, 30, 50, 100]"
                    :total="paging.total"
                    layout="total, sizes, prev, pager, next"
                >
                </el-pagination>
            </div>
        </el-card>
    </div>
</template>

<script>

import GetBrandList from '../../../api/customerAffair/getBrandList'

export default {
    components: {},
    data() {
        return {

            queryCondition: { // 查询条件
                status: 1,
                isLogoImg: 0,
                brandName: '',
            },
            brandStatusOption: [
                { label: "禁用", value: 0 },
                { label: "启用", value: 1 },
            ],
            paging: { // 分页条件
                pageIndex: 1, // 当前页
                pageSize: 10, // 每页多少条数据
                total: 0 // 数据总条数
            },
            tableList: [],
            initLoading: false, // 是否显示加载表格数据时的加载动画
        }
    },
    // keep-alive 组件激活时调用，如果不走缓存请使用其他生命周期钩子，例如 mounted
    activated() {
        this.init();
    },

    methods: {
        init() {
            this.tableList = new Array();
            this.initLoading = true;
            // this.paging.total = 0;
            GetBrandList.call(this, { ...this.queryCondition, ...this.paging }).then(res => {
                console.log(res);
                if (res.Code === 1) {
                    this.paging.total = res.Data.totalCount;
                    this.tableList = res.Data.list;
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

        /**
         * 搜索按钮
         */
        onSubmit() {
            console.log('submit!');
        },
        auditCheckInDetails(row) {
            this.$router.push({ 'path': `plateBrandManagementDetail/${row.Id}` });
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
