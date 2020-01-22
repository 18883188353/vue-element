<template>
    <div>
        <div class="main">

            <!--电话客服数据开始-->
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span>电话客服数据：</span>
                    <el-radio v-model="telRadio" label="1">今日</el-radio>
                    <el-radio v-model="telRadio" label="2">本月</el-radio>
                    <el-radio v-model="telRadio" label="3">上月</el-radio>
                    <el-radio v-model="telRadio" label="4">年度</el-radio>
                </div>
                <div class="text item">
                    <el-row :gutter="20">
                        <el-col :span="12">
                            <div class="grid-content bg-purple">
                                <b>呼入</b>
                                <div class="callList">
                                    <ul>
                                        <li>
                                            <p>用户来电</p>
                                            <span>50</span>
                                        </li>
                                        <li>
                                            <p>已接</p>
                                            <span>50</span>
                                        </li>
                                        <li>
                                            <p>漏接</p>
                                            <span>50</span>
                                        </li>
                                        <li>
                                            <p>处理完成</p>
                                            <span>50</span>
                                        </li>
                                        <li>
                                            <p>处理中</p>
                                            <span>50</span>
                                        </li>
                                        <li>
                                            <p>回访</p>
                                            <span>50</span>
                                        </li>
                                        <li>
                                            <p>满意度</p>
                                            <span>50</span>
                                        </li>
                                    </ul>
                                </div>
                                <div class="callList">
                                    <ul>
                                        <li>
                                            <p>商家来电</p>
                                            <span>50</span>
                                        </li>
                                        <li>
                                            <p>已接</p>
                                            <span>50</span>
                                        </li>
                                        <li>
                                            <p>漏接</p>
                                            <span>50</span>
                                        </li>
                                        <li>
                                            <p>处理完成</p>
                                            <span>50</span>
                                        </li>
                                        <li>
                                            <p>处理中</p>
                                            <span>50</span>
                                        </li>
                                        <li>
                                            <p>回访</p>
                                            <span>50</span>
                                        </li>
                                        <li>
                                            <p>满意度</p>
                                            <span>50</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </el-col>
                        <el-col :span="12">
                            <div class="grid-content bg-purple-light">
                                <b>呼出</b>
                                <div class="callList">
                                    <ul>
                                        <li>
                                            <p>呼叫用户</p>
                                            <span>50</span>
                                        </li>
                                        <li>
                                            <p>接通数</p>
                                            <span>50</span>
                                        </li>
                                        <li>
                                            <p>有效接通数</p>
                                            <span>50</span>
                                        </li>
                                        <li>
                                            <p>达成数</p>
                                            <span>50</span>
                                        </li>
                                    </ul>
                                </div>
                                <div class="callList">
                                    <ul>
                                        <li>
                                            <p>呼叫商家</p>
                                            <span>50</span>
                                        </li>
                                        <li>
                                            <p>接通数</p>
                                            <span>50</span>
                                        </li>
                                        <li>
                                            <p>有效接通数</p>
                                            <span>50</span>
                                        </li>
                                        <li>
                                            <p>达成数</p>
                                            <span>50</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </el-col>
                    </el-row>
                    <el-table
                        :data="tableData"
                        border
                        style="width: 100%; margin-top: 20px;">
                        <el-table-column
                            prop="type"
                            label="问题类型"
                            align="center"
                            width="">
                        </el-table-column>
                        <el-table-column
                            prop="come"
                            label="来话"
                            align="center"
                            width="">
                        </el-table-column>
                        <el-table-column
                            prop="answerPhone"
                            label="已接"
                            align="center"
                            width="">
                        </el-table-column>
                        <el-table-column
                            prop="notAnswerPhone"
                            label="漏接"
                            align="center"
                            width="">
                        </el-table-column>
                        <el-table-column
                            prop="completedComplete"
                            label="处理完成"
                            align="center"
                            width="">
                        </el-table-column>
                        <el-table-column
                            prop="Processing"
                            label="处理中"
                            align="center"
                            width="">
                        </el-table-column>
                        <el-table-column
                            prop="returnVisit"
                            label="回访"
                            align="center"
                            width="">
                        </el-table-column>
                        <el-table-column
                            prop="satisfaction"
                            label="满意度"
                            align="center"
                            width="">
                        </el-table-column>
                    </el-table>
                </div>
            </el-card>
            <!--电话客服数据结束-->

            <!--平台客服数据开始-->
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span>平台客服数据：</span>
                    <el-radio v-model="platformRadio" label="1">今日</el-radio>
                    <el-radio v-model="platformRadio" label="2">本月</el-radio>
                    <el-radio v-model="platformRadio" label="3">上月</el-radio>
                    <el-radio v-model="platformRadio" label="4">年度</el-radio>
                </div>
                <div class="text item">
                    <el-table
                        :data="tableData"
                        border
                        style="width: 100%">
                        <el-table-column
                            prop="type"
                            label="咨询方式"
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
                            label="受理"
                            align="center"
                            width="">
                        </el-table-column>
                        <el-table-column
                            prop="notAnswerPhone"
                            label="未受理"
                            align="center"
                            width="">
                        </el-table-column>
                        <el-table-column
                            prop="completedComplete"
                            label="处理完成"
                            align="center"
                            width="">
                        </el-table-column>
                        <el-table-column
                            prop="Processing"
                            label="处理中"
                            align="center"
                            width="">
                        </el-table-column>
                        <el-table-column
                            prop="returnVisit"
                            label="回访"
                            align="center"
                            width="">
                        </el-table-column>
                        <el-table-column
                            prop="satisfaction"
                            label="满意度"
                            align="center"
                            width="">
                        </el-table-column>
                    </el-table>
                    <div style="height: 20px;"></div>
                    <el-table
                        :data="tableData"
                        border
                        style="width: 100%">
                        <el-table-column
                            prop="type"
                            label="问题类型"
                            align="center"
                            width="">
                        </el-table-column>
                        <el-table-column
                            prop="come"
                            label="来话"
                            align="center"
                            width="">
                        </el-table-column>
                        <el-table-column
                            prop="answerPhone"
                            label="已接"
                            align="center"
                            width="">
                        </el-table-column>
                        <el-table-column
                            prop="notAnswerPhone"
                            label="漏接"
                            align="center"
                            width="">
                        </el-table-column>
                        <el-table-column
                            prop="completedComplete"
                            label="处理完成"
                            align="center"
                            width="">
                        </el-table-column>
                        <el-table-column
                            prop="Processing"
                            label="处理中"
                            align="center"
                            width="">
                        </el-table-column>
                        <el-table-column
                            prop="returnVisit"
                            label="回访"
                            align="center"
                            width="">
                        </el-table-column>
                        <el-table-column
                            prop="satisfaction"
                            label="满意度"
                            align="center"
                            width="">
                        </el-table-column>
                    </el-table>
                </div>
            </el-card>
            <!--平台客服数据结束-->

            <!--异常处理开始-->
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span>异常处理：</span>
                    <el-radio v-model="abnormalRadio" label="1">今日</el-radio>
                    <el-radio v-model="abnormalRadio" label="2">本月</el-radio>
                    <el-radio v-model="abnormalRadio" label="3">上月</el-radio>
                    <el-radio v-model="abnormalRadio" label="4">年度</el-radio>
                </div>
                <div class="text item">
                    <el-divider content-position="left">用户监测</el-divider>
                    <el-table
                        :data="abnormalList"
                        border
                        style="width: 100%">
                        <el-table-column
                            prop="type"
                            label="用户积分"
                            align="center"
                            width="">
                        </el-table-column>
                        <el-table-column
                            prop="come"
                            label="用户订单"
                            align="center"
                            width="">
                        </el-table-column>
                        <el-table-column
                            prop="answerPhone"
                            label="用户注册"
                            align="center"
                            width="">
                        </el-table-column>
                        <el-table-column
                            prop="notAnswerPhone"
                            label="用户资金"
                            align="center"
                            width="">
                        </el-table-column>
                        <el-table-column
                            prop="completedComplete"
                            label="用户交易"
                            align="center"
                            width="">
                        </el-table-column>
                        <el-table-column
                            prop="Processing"
                            label="用户纠纷"
                            align="center"
                            width="">
                        </el-table-column>
                        <el-table-column
                            prop="returnVisit"
                            label="聊天监控"
                            align="center"
                            width="">
                        </el-table-column>
                        <el-table-column
                            prop="satisfaction"
                            label="文章分享"
                            align="center"
                            width="">
                        </el-table-column>
                        <el-table-column
                            prop="satisfaction"
                            label="用户评价"
                            align="center"
                            width="">
                        </el-table-column>
                        <el-table-column
                            prop="satisfaction"
                            label="活动监控"
                            align="center"
                            width="">
                        </el-table-column>
                    </el-table>
                    <div style="height: 20px;"></div>
                    <el-divider content-position="left">商家监测</el-divider>
                    <el-table
                        :data="abnormalList"
                        border
                        style="width: 100%">
                        <el-table-column
                            prop="type"
                            label="商家信誉"
                            align="center"
                            width="">
                        </el-table-column>
                        <el-table-column
                            prop="come"
                            label="交易订单"
                            align="center"
                            width="">
                        </el-table-column>
                        <el-table-column
                            prop="answerPhone"
                            label="商家注册"
                            align="center"
                            width="">
                        </el-table-column>
                        <el-table-column
                            prop="notAnswerPhone"
                            label="资金管理"
                            align="center"
                            width="">
                        </el-table-column>
                        <el-table-column
                            prop="completedComplete"
                            label="商品管理"
                            align="center"
                            width="">
                        </el-table-column>
                        <el-table-column
                            prop="Processing"
                            label="纠纷争议"
                            align="center"
                            width="">
                        </el-table-column>
                        <el-table-column
                            prop="returnVisit"
                            label="聊天监控"
                            align="center"
                            width="">
                        </el-table-column>
                        <el-table-column
                            prop="satisfaction"
                            label="文章发布"
                            align="center"
                            width="">
                        </el-table-column>
                        <el-table-column
                            prop="satisfaction"
                            label="评价管理"
                            align="center"
                            width="">
                        </el-table-column>
                        <el-table-column
                            prop="satisfaction"
                            label="活动监控"
                            align="center"
                            width="">
                        </el-table-column>
                    </el-table>
                </div>
            </el-card>
            <!--异常处理结束-->

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

                telRadio: '',//电话客服筛选
                platformRadio: '',//平台客服数据筛选
                abnormalRadio: '',//异常处理筛选
                examineRadio: '',//审核管理筛选
                tableData: [{
                    type: '咨询',
                    come: '15',
                    answerPhone: '12',
                    notAnswerPhone: '30',
                    completedComplete: '5',
                    Processing: '10',
                    returnVisit: '5',
                    satisfaction: '50',
                },{
                    type: '建议',
                    come: '15',
                    answerPhone: '12',
                    notAnswerPhone: '30',
                    completedComplete: '5',
                    Processing: '10',
                    returnVisit: '5',
                    satisfaction: '50',
                },{
                    type: '投诉',
                    come: '15',
                    answerPhone: '12',
                    notAnswerPhone: '30',
                    completedComplete: '5',
                    Processing: '10',
                    returnVisit: '5',
                    satisfaction: '50',
                },{
                    type: '举报',
                    come: '15',
                    answerPhone: '12',
                    notAnswerPhone: '30',
                    completedComplete: '5',
                    Processing: '10',
                    returnVisit: '5',
                    satisfaction: '50',
                },{
                    type: '其他',
                    come: '15',
                    answerPhone: '12',
                    notAnswerPhone: '30',
                    completedComplete: '5',
                    Processing: '10',
                    returnVisit: '5',
                    satisfaction: '50',
                },],

                abnormalList: [{
                    type: '咨询',
                    come: '15',
                    answerPhone: '12',
                    notAnswerPhone: '30',
                    completedComplete: '5',
                    Processing: '10',
                    returnVisit: '5',
                    satisfaction: '50',
                },],//异常处理数据

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
