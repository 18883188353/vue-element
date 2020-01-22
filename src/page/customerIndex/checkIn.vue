<template>
    <div>
        <div class="main">


            <!--审核管理开始-->
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <b class="mr10">徐杰欢迎您登陆客服系统!</b>
                    <el-button type="primary" size="mini">签到</el-button>
                    <el-button type="primary" size="mini">暂时挂起</el-button>
                    <el-button type="primary" size="mini">结束退出</el-button>
                </div>
                <div class="text item">
                    <div class="tel_top">
                        <i class="el-icon-phone-outline"></i>商家来电：<b>151****8545</b>来电中!
                        <el-button type="success" size="small">接听</el-button>
                        <el-button type="danger" size="small">拒绝</el-button>
                    </div>
                    <el-row style="padding: 0 10%">
                        <el-col :span="12">
                            <el-col :span="20">
                                <el-card shadow="hover">
                                    <h3 class="tc">来电信息</h3>
                                    <ul class="tel_list">
                                        <li>店铺名称 <span>满集旗舰店</span></li>
                                        <li>联系电话 <span>132****5641</span></li>
                                        <li>联系人 <span>张三</span></li>
                                        <li>经营范围 <span>数码</span></li>
                                    </ul>
                                </el-card>
                                <el-card shadow="hover" class="mt20">
                                    <h3 class="tc">店铺信息</h3>
                                    <ul class="tel_list">
                                        <li>店铺类别 <span>旗舰店</span></li>
                                        <li>店铺区域 <span>重庆</span></li>
                                        <li>店铺信用 <span>100</span></li>
                                        <li>店铺信誉 <span>100</span></li>
                                        <li>交易纠纷 <span>100</span></li>
                                        <li>评价纠纷 <span>100</span></li>
                                    </ul>
                                </el-card>
                            </el-col>
                        </el-col>
                        <el-col :span="12">
                            <el-col :span="20">
                                <el-card shadow="hover">
                                    <h3 class="tc">来电详情记录</h3>
                                    <ul class="tel_list">
                                        <li>通话ID <span>SJ0429001</span></li>
                                        <li>记录人 <span>自动获取</span></li>
                                        <li>号码归属地 <span>自动获取</span></li>
                                        <li>
                                            电话内容记录：
                                            <el-input class="mt10"
                                                type="textarea"
                                                :autosize="{ minRows: 4, maxRows: 8}"
                                                placeholder="电话内容记录"
                                                v-model="textarea1">
                                            </el-input>
                                        </li>
                                        <li>
                                            回复内容记录：
                                            <el-input class="mt10"
                                                type="textarea"
                                                :autosize="{ minRows: 4, maxRows: 8}"
                                                placeholder="回复内容记录"
                                                v-model="textarea2">
                                            </el-input>
                                        </li>
                                        <li>
                                            号码归属地
                                            <el-select v-model="value" placeholder="请选择" size="small" class="fr">
                                                <el-option
                                                    v-for="item in options"
                                                    :key="item.value"
                                                    :label="item.label"
                                                    :value="item.value">
                                                </el-option>
                                            </el-select>
                                        </li>
                                        <li>问题状态 <span>已受理</span></li>
                                        <li>是否评价 <span>是（*从系统获取）</span></li>
                                        <li>是否满意 <span>是（*从系统获取）</span></li>
                                        <li>
                                            流转
                                            <el-select v-model="value" placeholder="请选择" size="small" class="fr">
                                                <el-option
                                                    v-for="item in options"
                                                    :key="item.value"
                                                    :label="item.label"
                                                    :value="item.value">
                                                </el-option>
                                            </el-select>
                                        </li>
                                    </ul>
                                    <div class="mt10 tr">
                                        <el-button type="primary">提交</el-button>
                                    </div>
                                </el-card>
                            </el-col>
                        </el-col>
                    </el-row>
                </div>
            </el-card>
            <!--审核管理结束-->

            <!--今日数据开始-->
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span>今日数据：</span>
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
                </div>
            </el-card>
            <!--今日数据结束-->

            <!--咨询处理开始-->
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span>咨询处理（处理数量）</span>
                </div>
                <div class="text item">
                    <el-table
                        :data="tableData"
                        border
                        style="width: 100%; margin-top: 20px;">
                        <el-table-column
                            prop="type"
                            label="日期"
                            align="center"
                            width="">
                        </el-table-column>
                        <el-table-column
                            prop="come"
                            label="Q Q 咨询"
                            align="center"
                            width="">
                        </el-table-column>
                        <el-table-column
                            prop="answerPhone"
                            label="邮箱咨询"
                            align="center"
                            width="">
                        </el-table-column>
                        <el-table-column
                            prop="notAnswerPhone"
                            label="平台留言"
                            align="center"
                            width="">
                        </el-table-column>
                        <el-table-column
                            prop="completedComplete"
                            label="在线咨询"
                            align="center"
                            width="">
                        </el-table-column>
                        <el-table-column
                            prop="Processing"
                            label="总数"
                            align="center"
                            width="">
                        </el-table-column>
                        <el-table-column
                            prop="returnVisit"
                            label="满意度"
                            align="center"
                            width="">
                        </el-table-column>
                    </el-table>
                </div>
            </el-card>
            <!--咨询处理结束-->

            <!--异常处理（用户检测）开始-->
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span>异常处理（用户检测）</span>
                </div>
                <div class="text item">
                    <el-table
                        :data="tableData"
                        border
                        style="width: 100%; margin-top: 20px;">
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
                            prop="Processing"
                            label="聊天监控"
                            align="center"
                            width="">
                        </el-table-column>
                        <el-table-column
                            prop="Processing"
                            label="文章分享"
                            align="center"
                            width="">
                        </el-table-column>
                        <el-table-column
                            prop="Processing"
                            label="用户评价"
                            align="center"
                            width="">
                        </el-table-column>
                        <el-table-column
                            prop="Processing"
                            label="活动监控"
                            align="center"
                            width="">
                        </el-table-column>
                    </el-table>
                </div>
            </el-card>
            <!--异常处理（用户检测）结束-->

            <!--异常处理（商家监测）开始-->
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span>异常处理（商家监测）</span>
                </div>
                <div class="text item">
                    <el-table
                        :data="tableData"
                        border
                        style="width: 100%; margin-top: 20px;">
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
                            prop="Processing"
                            label="聊天监控"
                            align="center"
                            width="">
                        </el-table-column>
                        <el-table-column
                            prop="Processing"
                            label="文章发布"
                            align="center"
                            width="">
                        </el-table-column>
                        <el-table-column
                            prop="Processing"
                            label="评价管理"
                            align="center"
                            width="">
                        </el-table-column>
                        <el-table-column
                            prop="Processing"
                            label="活动监控"
                            align="center"
                            width="">
                        </el-table-column>
                    </el-table>
                </div>
            </el-card>
            <!--异常处理（用户检测）结束-->

            <!--更多任务—呼叫任务（*由系统自动分配）开始-->
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span>更多任务—呼叫任务（*由系统自动分配）</span>
                </div>
                <div class="text item">
                    <el-table
                        :data="tableData"
                        border
                        style="width: 100%; margin-top: 20px;">
                        <el-table-column
                            prop="type"
                            label="客户类型"
                            align="center"
                            width="">
                        </el-table-column>
                        <el-table-column
                            prop="come"
                            label="来电号码"
                            align="center"
                            width="">
                        </el-table-column>
                        <el-table-column
                            prop="answerPhone"
                            label="呼入时间"
                            align="center"
                            width="">
                        </el-table-column>
                        <el-table-column
                            prop="notAnswerPhone"
                            label="接听状态"
                            align="center"
                            width="">
                        </el-table-column>
                        <el-table-column
                            prop="completedComplete"
                            label="通话时长"
                            align="center"
                            width="">
                        </el-table-column>
                        <el-table-column
                            prop="Processing"
                            label="咨询分类"
                            align="center"
                            width="">
                        </el-table-column>
                        <el-table-column
                            prop="Processing"
                            label="是否评价"
                            align="center"
                            width="">
                        </el-table-column>
                        <el-table-column
                            prop="Processing"
                            label="回访"
                            align="center"
                            width="">
                        </el-table-column>
                        <el-table-column
                            prop="Processing"
                            label="处理人员"
                            align="center"
                            width="">
                        </el-table-column>
                        <el-table-column
                            prop="Processing"
                            label="满意度评价"
                            align="center"
                            width="">
                        </el-table-column>
                        <el-table-column
                            prop="Processing"
                            label="处理状态"
                            align="center"
                            width="">
                        </el-table-column>
                        <el-table-column
                            prop="Processing"
                            label="操作"
                            align="center"
                            width="">
                        </el-table-column>
                    </el-table>
                </div>
            </el-card>
            <!--更多任务—呼叫任务（*由系统自动分配）结束-->

            <bottom-footer></bottom-footer>

        </div>

    </div>
</template>

<script>
    import headTop from '../../components/headTop'
    import bottomFooter from '../../components/bottomFooter'
    export default {
        components: {
            headTop,
            bottomFooter,
        },
        data(){
            return {
                textarea1: '',//电话内容记录
                textarea2: '',//回复内容记录
                options: [{
                    value: '选项1',
                    label: '黄金糕'
                }, {
                    value: '选项2',
                    label: '双皮奶'
                }, {
                    value: '选项3',
                    label: '蚵仔煎'
                }, {
                    value: '选项4',
                    label: '龙须面'
                }, {
                    value: '选项5',
                    label: '北京烤鸭'
                }],
                value: '',

                tableData: [{
                    type: '2019-5-2',
                    come: '15',
                    answerPhone: '12',
                    notAnswerPhone: '30',
                    completedComplete: '5',
                    Processing: '10',
                    returnVisit: '90%',
                },],//咨询处理表格内容

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

    .tel_top{
        padding: 20px 10%;
        font-size: 20px;
        i{
            vertical-align: middle;
            font-size: 30px;
            margin-right: 10px;
        }
        button{
            margin-left: 30px;
        }
        b{
            color: #13ce66;
            margin-left: 30px;
            vertical-align: middle;
        }
    }

    .tel_list{
        width: 100%;
        height: auto;
        margin-top: 10px;
        li{
            width: 100%;
            height: auto;
            border-bottom: 1px #eaeaea solid;
            padding: 10px 0;
            span{
                float: right;
            }
            &:after{
                clear: both;
                display: block;
                content: '';
            }
        }
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
