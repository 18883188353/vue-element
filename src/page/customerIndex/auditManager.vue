<template>
    <div>
        <div class="main">

            <!--审核管理开始-->
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span>审核管理：</span>
                    <el-radio v-model="examineRadio" label="1">今日</el-radio>
                    <el-radio v-model="examineRadio" label="2">本月</el-radio>
                    <el-radio v-model="examineRadio" label="3">上月</el-radio>
                    <el-radio v-model="examineRadio" label="4">年度</el-radio>
                </div>
                <div class="text item">
                    <el-table
                        :data="examinelList"
                        border
                        style="width: 100%">
                        <el-table-column
                            prop="type"
                            label="审核类型"
                            align="center"
                            width="">
                        </el-table-column>
                        <el-table-column
                            prop="come"
                            label="总数"
                            align="center"
                            width="">
                        </el-table-column>
                        <el-table-column
                            prop="answerPhone"
                            label="待审核"
                            align="center"
                            width="">
                        </el-table-column>
                        <el-table-column
                            prop="notAnswerPhone"
                            label="未审核"
                            align="center"
                            width="">
                        </el-table-column>
                        <el-table-column
                            prop="completedComplete"
                            label="审核通过"
                            align="center"
                            width="">
                        </el-table-column>
                        <el-table-column
                            prop="Processing"
                            label="一次性通过"
                            align="center"
                            width="">
                        </el-table-column>
                        <el-table-column
                            prop="returnVisit"
                            label="未通过"
                            align="center"
                            width="">
                        </el-table-column>
                    </el-table>
                </div>
            </el-card>
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span>审核人员数量排名</span>
                </div>
                <div class="text item">
                    <el-table
                        :data="rankingList"
                        border
                        style="width: 100%">
                        <el-table-column
                            prop="type"
                            label="排名"
                            align="center"
                            width="">
                        </el-table-column>
                        <el-table-column
                            prop="come"
                            label="姓名"
                            align="center"
                            width="">
                        </el-table-column>
                        <el-table-column
                            prop="answerPhone"
                            label="审核数量"
                            align="center"
                            width="">
                        </el-table-column>
                        <el-table-column
                            prop="notAnswerPhone"
                            label="查看审核详情"
                            align="center"
                            width="">
                            <template>
                                <el-button size="mini" type="primary">查看详情</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </el-card>
            <!--审核管理结束-->

            <bottom-footer></bottom-footer>

        </div>

    </div>
</template>

<script>
    import bottomFooter from '../../components/bottomFooter'
    export default {
        components: {
            bottomFooter,
        },
        data(){
            return {

                examineRadio: '',//审核管理筛选
                examinelList: [{
                    type: '商家入驻',
                    come: '15',
                    answerPhone: '12',
                    notAnswerPhone: '30',
                    completedComplete: '5',
                    Processing: '10',
                    returnVisit: '5',
                    satisfaction: '50',
                },{
                    type: '商品审核',
                    come: '15',
                    answerPhone: '12',
                    notAnswerPhone: '30',
                    completedComplete: '5',
                    Processing: '10',
                    returnVisit: '5',
                    satisfaction: '50',
                },{
                    type: '广告审核',
                    come: '15',
                    answerPhone: '12',
                    notAnswerPhone: '30',
                    completedComplete: '5',
                    Processing: '10',
                    returnVisit: '5',
                    satisfaction: '50',
                },{
                    type: '评价审核',
                    come: '15',
                    answerPhone: '12',
                    notAnswerPhone: '30',
                    completedComplete: '5',
                    Processing: '10',
                    returnVisit: '5',
                    satisfaction: '50',
                },{
                    type: '活动审核',
                    come: '15',
                    answerPhone: '12',
                    notAnswerPhone: '30',
                    completedComplete: '5',
                    Processing: '10',
                    returnVisit: '5',
                    satisfaction: '50',
                },],//审核管理数据

                rankingList: [{
                    type: '1',
                    come: '张三',
                    answerPhone: '12',
                },{
                    type: '2',
                    come: '张三',
                    answerPhone: '12',
                },{
                    type: '3',
                    come: '张三',
                    answerPhone: '12',
                },{
                    type: '4',
                    come: '张三',
                    answerPhone: '12',
                },{
                    type: '5',
                    come: '张三',
                    answerPhone: '12',
                },],//审核管理数据

            }
        },

        methods:{

        },

        created(){

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

</style>
