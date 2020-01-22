<template>
    <div>
        <div class="main">


            <!--流转事件开始-->
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <b class="mr10">流转事件</b>
                </div>
                <div class="text item">
                    <div class="tel_top">
                        <el-steps :active="4">
                            <el-step title="受理" description=""></el-step>
                            <el-step title="流转到技术部" description=""></el-step>
                            <el-step title="流转到产品部" description=""></el-step>
                            <el-step title="流转回客服部" description=""></el-step>
                            <el-step title="反馈到商家/用户" description=""></el-step>
                            <el-step title="回访" description=""></el-step>
                            <el-step title="满意度评价" description=""></el-step>
                            <el-step title="处理完成" description=""></el-step>
                        </el-steps>
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
                                        <li>来电类型 <span>商家</span></li>
                                        <li>
                                            问题类型
                                            <el-select v-model="value" placeholder="请选择" size="small" class="fr">
                                                <el-option
                                                    v-for="item in options"
                                                    :key="item.value"
                                                    :label="item.label"
                                                    :value="item.value">
                                                </el-option>
                                            </el-select>
                                        </li>
                                        <li>
                                            问题分类
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
                                        <li>处理时长 <span>2019/4/23 11:05至今</span></li>
                                        <li>处理部门 <span>技术部</span></li>
                                        <li>是否评价 <span>是</span></li>
                                        <li>是否满意 <span>是</span></li>
                                        <li>
                                            满意度
                                            <el-select v-model="value" placeholder="请选择" size="small" class="fr">
                                                <el-option
                                                    v-for="item in options"
                                                    :key="item.value"
                                                    :label="item.label"
                                                    :value="item.value">
                                                </el-option>
                                            </el-select>
                                        </li>
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
                                            技术部意见：
                                            <el-input class="mt10"
                                                type="textarea"
                                                :autosize="{ minRows: 4, maxRows: 8}"
                                                placeholder="回复内容记录"
                                                v-model="textarea2">
                                            </el-input>
                                        </li>
                                        <li>
                                            是否继续流转
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
            <!--流转事件结束-->

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
