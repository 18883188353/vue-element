<template>
    <div class="fillcontain">
        <el-card class="box-card mb20">
            <div slot="header">
                <b>短信模板管理：</b>
                <el-link
                    type="primary"
                    @click="insertTemplate"
                    class="fr"
                >新增模板</el-link>
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
                            label="消息类型:"
                            prop="messageType"
                        >
                            <el-select
                                v-model="queryCondition.messageType"
                                placeholder="消息类型"
                            >
                                <el-option
                                    label="全部"
                                    value=""
                                ></el-option>
                                <el-option
                                    label="节日祝福"
                                    :value="1"
                                ></el-option>
                                <el-option
                                    label="售后反馈"
                                    :value="2"
                                ></el-option>
                                <el-option
                                    label="任务派送"
                                    :value="3"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item>
                            <el-button
                                type="primary"
                                @click="init"
                            >查询</el-button>
                            <el-button @click="resetForm">重置</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
        </el-card>
        <el-card>
            <el-table
                :data="tableList"
                v-loading="initLoading"
                border
                class="list-table"
            >
                <el-table-column
                    prop="messageType"
                    label="模板类型"
                    align="center"
                    width="100"
                >
                    <template slot-scope="scope">
                        <span v-if="scope.row.messageType === 1">节日祝福</span>
                        <span v-else-if="scope.row.messageType === 2">售后反馈</span>
                        <span v-else-if="scope.row.messageType === 3">任务派送</span>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="templateName"
                    label="模板名称"
                    align="center"
                    minWidth="260"
                    show-overflow-tooltip
                >
                </el-table-column>
                <el-table-column
                    prop="templateContent"
                    label="模板内容"
                    align="center"
                    minWidth="300"
                    show-overflow-tooltip
                >
                </el-table-column>
                <el-table-column
                    prop="createUserName"
                    label="创建人"
                    align="center"
                    width="100"
                >
                </el-table-column>
                <el-table-column
                    prop="createTime"
                    label="创建时间"
                    align="center"
                    width="160"
                >
                </el-table-column>
                <el-table-column
                    label="操作"
                    align="center"
                    width="130"
                    fixed="right"
                >
                    <template slot-scope="scope">
                        <el-link
                            type="primary"
                            @click="updateTemplate(scope.row)"
                        >编辑</el-link>
                        <el-link
                            type="warning"
                            @click="deleteTemplate(scope.row)"
                        >删除</el-link>
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
        </el-card>
    </div>
</template>

<script>

import headTop from '../../components/headTop';
import TemplateList from '../../api/sms/smsTemplateList'
import TemplateDelete from '../../api/sms/smsTemplateDelete'

export default {
    components: {
        headTop,
    },
    data() {
        return {
            queryCondition: {
                messageType: ''  // 1：节日祝福 2：售后反馈 3：任务派送
            },
            paging: { // 分页条件
                pageIndex: 1, // 当前页
                pageSize: 10, // 每页多少条数据
                total: 0 // 数据总条数
            },
            tableList: [],
            initLoading: false // 是否显示加载表格数据时的加载动画
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
            TemplateList.call(this, { ...this.queryCondition, ...this.paging }).then(res => {
                console.log(res);
                if (res.Code === 1) {
                    this.paging.pageIndex = res.Data.pageIndex;
                    this.paging.total = res.Data.total;
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
        resetForm() {
            this.$refs.queryForm.resetFields();
            this.init();
        },
        /**
         * 跳转邮箱详情
         */
        onSubmit() {
            console.log('submit!');
        },
        insertTemplate(){
            this.$router.push({ path: '/messageTemplateInsert/0'})
        },
        updateTemplate(row){
            this.$router.push({ path: `/messageTemplateInsert/${row.id}`})
        },
        deleteTemplate(row){
            console.log(row);
            this.$confirm('确定删除这条数据吗？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                TemplateDelete.call(this, { id: row.id }).then(res => {
                if(res.Code === 1){
                    this.$message.success('删除成功');
                    this.init();
                }else{
                    this.$message.success('删除失败')
                }
            })
            }).catch(() => {

            });
        },

        /**
         * 跳转邮箱详情
         */
        messageDetails() {
            this.$router.push({ 'path': '/messageDetails' })
        },

        /**
         * 跳转邮箱回复
         */
        messageReply() {
            this.$router.push({ 'path': '/messageReply' })
        },

        /**
         * 立即外呼
         */
        callNow() {
            this.$router.push({ 'path': '/callUser' })
        },

        /**
         * 跳转短信列表
         */
        messageList() {
            this.$router.push({ 'path': '/messageList' })
        },

        /**
         * 页码
         * @param val
         */
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
        }


    },

    created() {

    }
}
</script>

<style lang="less" scoped>
.box-card {
    margin-bottom: 20px;
}
.page {
    text-align: right;
    padding: 20px;
}
</style>
