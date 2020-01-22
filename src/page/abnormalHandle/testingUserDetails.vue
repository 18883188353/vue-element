<template>
    <div>
        <div class="main">


            <!--流转事件开始-->
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <b class="mr10">异常处理</b>
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
                        <el-col :span="24">
                            <el-col :span="24">
                                <el-card shadow="hover">
                                    <h3 class="tc">异常详情</h3>
                                    <ul class="tel_list">
                                        <li>用户账号 <span>a13658945236</span></li>
                                        <li>
                                            异常类型
                                            <el-popover
                                                placement="right"
                                                width="400"
                                                trigger="click">
                                                <el-col :span="24">
                                                    <el-col :span="24">
                                                        <el-card shadow="hover">
                                                            <h3 class="tc">用户积分情况</h3>
                                                            <ul class="tel_list" style="height: 500px; overflow-y: auto">
                                                                <li>登录 <br>2019-3-22 14:41<span>+10</span></li>
                                                                <li>登录 <br>2019-3-22 14:41<span>+10</span></li>
                                                                <li>登录 <br>2019-3-22 14:41<span>+10</span></li>
                                                                <li>登录 <br>2019-3-22 14:41<span>+10</span></li>
                                                                <li>登录 <br>2019-3-22 14:41<span>+10</span></li>
                                                                <li>登录 <br>2019-3-22 14:41<span>+10</span></li>
                                                                <li>登录 <br>2019-3-22 14:41<span>+10</span></li>
                                                                <li>登录 <br>2019-3-22 14:41<span>+10</span></li>
                                                                <li>登录 <br>2019-3-22 14:41<span>+10</span></li>
                                                                <li>登录 <br>2019-3-22 14:41<span>+10</span></li>
                                                                <li>登录 <br>2019-3-22 14:41<span>+10</span></li>
                                                                <li>登录 <br>2019-3-22 14:41<span>+10</span></li>
                                                                <li>登录 <br>2019-3-22 14:41<span>+10</span></li>
                                                                <li>登录 <br>2019-3-22 14:41<span>+10</span></li>
                                                                <li>登录 <br>2019-3-22 14:41<span>+10</span></li>
                                                                <li>登录 <br>2019-3-22 14:41<span>+10</span></li>
                                                                <li>登录 <br>2019-3-22 14:41<span>+10</span></li>
                                                                <li>登录 <br>2019-3-22 14:41<span>+10</span></li>
                                                                <li>登录 <br>2019-3-22 14:41<span>+10</span></li>
                                                                <li>登录 <br>2019-3-22 14:41<span>+10</span></li>

                                                            </ul>
                                                        </el-card>

                                                    </el-col>
                                                </el-col>

                                                <el-link slot="reference" type="primary">用户积分</el-link>
                                            </el-popover>
                                        </li>
                                        <li>异常情况 <span>积分减少</span></li>
                                        <li>处理人 <span>自动获取</span></li>
                                        <li>
                                            异常描述：
                                            <el-input class="mt10"
                                                      type="textarea"
                                                      :autosize="{ minRows: 4, maxRows: 8}"
                                                      placeholder="电话内容记录"
                                                      v-model="textarea1">
                                            </el-input>
                                        </li>
                                        <li>
                                            客服部处理详情：
                                            <el-input class="mt10"
                                                      type="textarea"
                                                      :autosize="{ minRows: 4, maxRows: 8}"
                                                      placeholder="电话内容记录"
                                                      v-model="textarea1">
                                            </el-input>
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
                                            客服部处理详情：
                                            <el-input class="mt10"
                                                      type="textarea"
                                                      :autosize="{ minRows: 4, maxRows: 8}"
                                                      placeholder="电话内容记录"
                                                      v-model="textarea1">
                                            </el-input>
                                        </li>
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
