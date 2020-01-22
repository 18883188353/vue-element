<template>
    <div class="fillcontain">
        <div class="welcome-content">待我处理工单列表</div>
        <!--审核管理开始-->
        <el-card class="box-card">
            <div class="text item">
                <el-table
                    :data="tableData"
                    v-loading="initLoading"
                    border
                    class="list-table"
                >
                    <el-table-column
                        prop="type"
                        label="工单来源"
                        align="center"
                    >
                        <template slot-scope="scope">
                            {{getTypeValueText('Source',scope.row.source)}}
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="sheetNo"
                        label="工单编号"
                        align="center"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="startTime"
                        label="创建时间"
                        align="center"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="emergencyLevel"
                        label="紧急程度"
                        align="center"
                    >
                        <template slot-scope="scope">
                            {{getTypeValueText('EmergencyLevelData',scope.row.emergencyLevel)}}
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="sheetType"
                        label="工单类型"
                        align="center"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="isEstimate"
                        label="是否评价"
                        align="center"
                    >
                        <template slot-scope="scope">
                            {{scope.row.isEstimate ? '是' : '否'}}
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="isBackVisit"
                        label="回访"
                        align="center"
                    >
                        <template slot-scope="scope">
                            {{scope.row.isBackVisit ? '是' : '否'}}
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="solvedMans"
                        label="处理人员"
                        align="center"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="satisfactionDegree"
                        label="满意度评价"
                        align="center"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="sheetStatus"
                        label="处理状态"
                        align="center"
                    >
                    </el-table-column>
                    <el-table-column
                        label="操作"
                        align="center"
                    >
                        <template slot-scope="scope">
                            <el-link
                                type="primary"
                                @click="toDetail(scope.row.sheetType, scope.row.id, 'deal')"
                            >处理</el-link>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="list-page">
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
            </div>
        </el-card>
        <bottom-footer></bottom-footer>
    </div>
</template>

<script>
import bottomFooter from '../../components/bottomFooter'
import testGet from '../../api/text'
import selectCServiceSheetMyList from '../../api/sheet/selectCServiceSheetMyList'

export default {
    components: {
        bottomFooter,
    },
    data() {
        return {
            initLoading: false, // 是否显示加载表格数据时的加载动画
            tableData: [],//审核任务
            paging: { // 分页条件
                pageIndex: 1, // 当前页
                pageSize: 10, // 每页多少条数据
                total: 0 // 数据总条数
            },
        }
    },
    computed: {
        sheetData() {
            return this.$store.state.sheetData
        }
    },
    methods: {
        /**
         * 跳转工单详情
         */
        toWorkOrderDetails() {
            this.$router.push({ path: '/workOrderDetails' })
        },
        searchList() {
            this.initLoading = true;
            let queryParams = {
                pageNum: this.paging.pageIndex,
                pageSize: this.paging.pageSize,
                orPlate: 2
            }
            selectCServiceSheetMyList.call(this, queryParams).then(res => {
                if (res.Code === 1) {
                    this.paging.total = res.Data.total;
                    this.tableData = res.Data.list;
                } else {
                    this.$message.error('系统异常')
                }
                 this.initLoading = false;
            });
        },
        /**
         *  根据value 获取 text
         */
        getTypeValueText(type, value) {
            // console.log(this.sheetData[type].find(n => n.value === value), type, value , 'this.sheetData[type].find(n => n.value === value)');
            let _typeData = this.sheetData[type].find(n => n.value === value);
            return _typeData ? _typeData.text : '';
        },
        toDetail(sheetType, sheetId, showType) {
            if (sheetType === '交易纠纷') {
                // 交易纠纷
                this.$router.push({
                    path: `/workListLookReportDispute/${sheetId}`,
                    query: {
                        type: showType
                    }
                });
            } else {
                //来源页面
                this.$router.push({
                    path: `/workListSource/${sheetId}`,
                    query: {
                        type: showType
                    }
                })
            }
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
    },
    created() {
        this.searchList();
    }
}
</script>

<style lang="less" scoped>
.welcome-content {
    width: 100%;
    height: 45px;
    line-height: 45px;
    padding-left: 20px;
    background-color: #11ccf6;
    font-size: 18px;
    font-weight: 400;
}
.box-card {
    margin-bottom: 20px;
}
.callList {
    width: 100%;
    height: auto;
    margin-top: 10px;
    ul {
        width: 100%;
        height: auto;
        display: table;
        li {
            width: auto;
            display: table-cell;
            vertical-align: middle;
            text-align: center;
        }
    }
}
.page {
    text-align: right;
    padding: 20px;
}
</style>
