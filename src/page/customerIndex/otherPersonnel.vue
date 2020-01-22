<template>
    <div>
        <div class="main">

            <!--审核管理开始-->
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span>待我处理工单列表</span>
                </div>
                <div class="text item">
                    <el-table
                        v-loading=" !loading "
                        element-loading-text="拼命加载中"
                        :data="rankingList"
                        border
                        style="width: 100%">
                        <el-table-column
                            prop="add_time"
                            label="工单来源"
                            align="center"
                            width="">
                        </el-table-column>
                        <el-table-column
                            prop="categoryName"
                            label="工单编号"
                            align="center"
                            width="">
                        </el-table-column>
                        <el-table-column
                            prop="category_id"
                            label="创建时间"
                            align="center"
                            width="">
                        </el-table-column>
                        <el-table-column
                            prop="collection_count"
                            label="紧急程度"
                            align="center"
                            width="">
                        </el-table-column>
                        <el-table-column
                            prop="publish_time"
                            label="工单类型"
                            align="center"
                            width="">
                        </el-table-column>
                        <el-table-column
                            prop="status"
                            label="是否评价"
                            align="center"
                            width="">
                        </el-table-column>
                        <el-table-column
                            prop="title"
                            label="回访"
                            align="center"
                            width="">
                        </el-table-column>
                        <el-table-column
                            prop="title"
                            label="处理人员"
                            align="center"
                            width="">
                        </el-table-column>
                        <el-table-column
                            prop="title"
                            label="满意度评价"
                            align="center"
                            width="">
                        </el-table-column>
                        <el-table-column
                            prop="notAnswerPhone"
                            label="操作"
                            align="center"
                            width="">
                            <template>
                                <el-button size="mini" type="primary" @click="toWorkOrderDetails">立即处理</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </el-card>
            <!--审核管理结束-->

            <div class="page">
                <div class="block">
                    <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="pageNum"
                        :page-sizes="[5, 10, 20, 40]"
                        :page-size="100"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="other.total">
                    </el-pagination>
                </div>
            </div>

            <bottom-footer></bottom-footer>

        </div>

    </div>
</template>

<script>
    import bottomFooter from '../../components/bottomFooter'
    import testGet from '../../api/text'
    export default {
        components: {
            bottomFooter,
        },
        data(){
            return {
                loading: false,
                pageNum: 1,//当前显示第几页
                pageSize: 5,//每页条数
                other: '',
                rankingList: [],//审核管理数据

            }
        },

        methods:{

            /**
             * 跳转工单详情
             */
            toWorkOrderDetails(){
                this.$router.push({ path: '/workOrderDetails' })
            },

            /**
             * 测试接口
             */
            testApi () {
                testGet.call(this,'?pageNum=' + this.pageNum + '&pageSize=' + this.pageSize)
                    .then(
                        (res) => {
                            console.log(res,"@@@@@@@@@@@@");
                            if(res.data.Code = 1 ){
                                this.rankingList = res.data.Data.list;
                                this.other = res.data.Data;
                                this.loading = true;
                            } else {

                            }
                        }
                    )
            },

            /**
             * 页码
             * @param val
             */
            handleSizeChange(val) {
                this.pageSize = val;
                this.testApi();
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                this.pageNum = val;
                this.testApi();
                console.log(`当前页: ${val}`);
            },

        },

        created(){
            this.testApi();
        }
    }
</script>

<style lang="less" scoped>

    .box-card{
        margin-bottom: 20px;

    }
    .callList{
        width: 100%;
        height: auto;
        margin-top: 10px;
        ul{
            width: 100%;
            height: auto;
            display: table;
            li{
                width: auto;
                display: table-cell;
                vertical-align: middle;
                text-align: center;
            }
        }
    }
    .page{
        text-align: right;
        padding: 20px;
    }

</style>
