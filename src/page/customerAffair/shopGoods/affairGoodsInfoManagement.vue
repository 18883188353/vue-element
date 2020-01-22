<template>
    <div>
        <el-card class="box-card mb20">
            <div
                slot="header"
                class="clearfix"
            >
                <span>商品信息管理列表：</span>
            </div>
            <div class="text item">
                <div>
                    <el-form
                        :inline="true"
                        :model="queryCondition"
                        class="demo-form-inline"
                    >
                        <el-form-item label="商品类型：">
                            <el-select
                                v-model="queryCondition.goodsType"
                                placeholder="请选择商品类型"
                            >
                                <el-option
                                    v-for="(n, idx) in goodsTypes"
                                    :key="idx"
                                    :label="n.label"
                                    :value="n.value"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="商品名称：">
                            <el-input
                                v-model="queryCondition.articleName"
                                placeholder="请输入商品名称"
                            ></el-input>
                        </el-form-item>
                        <el-form-item label="商家名称：">
                            <el-input
                                v-model="queryCondition.shopName"
                                placeholder="请输入商家名称"
                            ></el-input>
                        </el-form-item>
                        <!-- <el-form-item label="是否全球购：">
                            <el-select
                                v-model="queryCondition.isGlobal"
                                placeholder="请选择是否全球购"
                            >
                                <el-option
                                    v-for="(item, index) in globalOption"
                                    :label="item.label"
                                    :value="item.value"
                                    :key="index"
                                ></el-option>
                            </el-select>
                        </el-form-item> -->
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
                    width="50"
                >
                </el-table-column>
                <el-table-column
                    prop="shopName"
                    label="商家名称"
                    align="center"
                    minWidth="260"
                    show-overflow-tooltip
                >
                </el-table-column>
                <el-table-column
                    prop="title"
                    label="商品名称"
                    align="center"
                    minWidth="260"
                    show-overflow-tooltip
                >
                </el-table-column>
                <el-table-column
                    prop="categoryAll"
                    label="系统分类"
                    align="center"
                    minWidth="200"
                    show-overflow-tooltip
                >
                </el-table-column>
                <el-table-column
                    prop="taskId"
                    label="操作"
                    align="center"
                    fixed="right"
                    width="200"
                >
                    <template slot-scope="scope">
                        <el-button
                            type="primary"
                            size="mini"
                            @click="auditCheckInDetails(scope.row)"
                        >商品详情</el-button>
                        <el-button
                            type="primary"
                            size="mini"
                            @click="seeCorePriceRecord(scope.row.articleId)"
                        >调价记录</el-button>
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

import GetGoodsBriefInfoByPage from '../../../api/customerAffair/getGoodsBriefInfoByPage'

export default {
    components: {},
    data() {
        return {
            goodsTypes: [{
                value: 'goods',
                label: '国内购'
            }, {
                value: 'global',
                label: '全球购'
            },{
                value: 'luxury',
                label: '奢侈品'
            }],
            queryCondition: { // 查询条件
                goodsType: 'goods',
                shopName: '', // 商家名称
                articleName: '', // 商品名称
                // pageIndex: 1, // 页码
                // pageSize: 10, // 行数
                isGlobal: '', // 是否签约1是/0否
            },
            globalOption: [
                { label: "全部", value: '' },
                { label: "否", value: 0 },
                { label: "是", value: 1 },
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
            GetGoodsBriefInfoByPage.call(this, { ...this.queryCondition, ...this.paging }).then(res => {
                console.log(res);
                if (res.Code === 1) {
                    this.paging.total = res.Data.totalCount;
                    this.tableList = res.Data.list;
                    console.log(this.tableList, 'this.tableList');
                }
                this.initLoading = false;
            });
        },
        seeCorePriceRecord(articleId) {
            this.$router.push({ path: `affairGoodsInfoCorePriceRecord/${articleId}` });
        },
        auditCheckInDetails(row) {
            this.$router.push({ 'path': `affairGoodsInfoManagementDetail/${row.articleId}` });
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
        }
    }
}
</script>

<style lang="less" scoped>
.page {
    text-align: right;
    padding: 20px;
}
</style>
