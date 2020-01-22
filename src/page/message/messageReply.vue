<template>
    <div>
        <div class="main">


            <!--流转事件开始-->
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <b class="mr10">立即回复</b>
                </div>
                <div class="text item">

                    <el-row style="padding: 0 10%">
                        <el-col :span="24">
                            <el-col :span="24">
                                <el-card shadow="hover">
                                    <h3 class="tc">立即回复</h3>
                                    <ul class="tel_list">
                                        <li>短信来源 <span>151***7484</span></li>
                                        <li>接收时间 <span>4/29 11:11</span></li>
                                        <li>处理人 <span>自动获取</span></li>
                                        <li>
                                            短信内容：
                                            <el-input class="mt10"
                                                  type="textarea"
                                                  :autosize="{ minRows: 4, maxRows: 8}"
                                                  placeholder="邮件内容"
                                                  v-model="textarea1">
                                            </el-input>
                                        </li>
                                        <li>
                                            咨询分类
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
                                            回复内容：
                                            <el-input class="mt10"
                                                  type="textarea"
                                                  :autosize="{ minRows: 4, maxRows: 8}"
                                                  placeholder="回复内容"
                                                  v-model="textarea1">
                                            </el-input>
                                        </li>
                                        <li>
                                            短信内容：
                                            <el-input class="mt10"
                                                  type="textarea"
                                                  :autosize="{ minRows: 4, maxRows: 8}"
                                                  placeholder="邮件内容二"
                                                  v-model="textarea1">
                                            </el-input>
                                        </li>
                                        <li>
                                            发送时间
                                            <el-date-picker class="fr"
                                                v-model="date"
                                                size="small"
                                                type="datetime"
                                                placeholder="选择日期时间">
                                            </el-date-picker>
                                        </li>
                                    </ul>
                                    <div class="mt10 tr">
                                        <el-button type="primary">预约发送</el-button>
                                        <el-button type="primary">立即发送</el-button>
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
                date: '',//发送时间
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
