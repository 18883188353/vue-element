<template>
    <div class="fillcontain">

        <div class="main">

            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span>商家举报工单：</span>
                </div>
                <div class="text item">
                    <div>
                        <el-steps :active="3">
                            <el-step title="受理" description=""></el-step>
                            <el-step title="流转到技术部XXX" description=""></el-step>
                            <el-step title="流转到产品部XXX" description=""></el-step>
                            <el-step title="流转回客服部" description=""></el-step>
                            <el-step title="回访" description=""></el-step>
                            <el-step title="处理完成" description=""></el-step>
                        </el-steps>
                    </div>
                    <div class="mt20" style="padding: 0 10%">
                        <el-form label-width="150px" :model="form">
                            <el-form-item label="工单来源：">APP点（自动获取）</el-form-item>
                            <el-form-item label="工单编号：">GDIBB15M0J87249</el-form-item>
                            <el-form-item label="创建时间：">2019-4-29 11:11</el-form-item>
                            <el-form-item label="工单类型：">纠错</el-form-item>
                            <el-form-item label="紧急程度：">一般</el-form-item>
                            <el-form-item label="建议类型：">使用功能</el-form-item>
                            <el-form-item label="举报店铺：">德芙旗舰店</el-form-item>
                            <el-form-item label="联系电话：">15864896547</el-form-item>
                            <el-form-item label="被举报用户/商家：">彩虹1</el-form-item>
                            <el-form-item label="联系电话：">15864896547</el-form-item>
                            <el-form-item label="工单状态：">处理中</el-form-item>
                            <el-form-item label="举报详情：">
                                <el-input type="textarea" v-model="form.desc" :autosize="{ minRows: 4, maxRows: 8}"></el-input>
                            </el-form-item>
                            <el-form-item label="附件详情：">
                                <viewer>
                                    <img src="https://picsum.photos/200" alt="">
                                    <img src="https://picsum.photos/200" alt="">
                                    <img src="https://picsum.photos/200" alt="">
                                </viewer>
                            </el-form-item>
                            <el-form-item label="工单处理人：">客服部张三</el-form-item>
                            <el-form-item label="处理人意见：">
                                <el-input type="textarea" v-model="form.desc" :autosize="{ minRows: 4, maxRows: 8}"></el-input>
                                <p class="mt10 tr">
                                    <el-button type="primary">处理完成</el-button>
                                    <el-button type="">流转</el-button>
                                </p>
                            </el-form-item>
                            <el-form-item label="选择流转人：">
                                <el-select v-model="form.value" placeholder="请选择">
                                    <el-option
                                        v-for="item in options"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                                <el-button type="primary">确定</el-button>
                            </el-form-item>
                            <el-form-item label="处理人意见：">
                                <el-input type="textarea" v-model="form.desc" :autosize="{ minRows: 4, maxRows: 8}"></el-input>
                                <p class="mt10 tr">
                                    <el-button type="primary">处理完成</el-button>
                                    <el-button type="">流转</el-button>
                                </p>
                            </el-form-item>
                            <el-form-item label="回访：">
                                <el-button type="primary">电话回访</el-button>
                            </el-form-item>
                            <el-form-item label="回访内容记录：">
                                <el-input type="textarea" v-model="form.desc" :autosize="{ minRows: 4, maxRows: 8}"></el-input>
                            </el-form-item>
                            <el-form-item label="反馈内容记录：">
                                <el-input type="textarea" v-model="form.desc" :autosize="{ minRows: 4, maxRows: 8}"></el-input>
                            </el-form-item>
                            <el-form-item label="满意度：">
                                <el-select v-model="form.value" placeholder="请选择">
                                    <el-option
                                        v-for="item in options"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="是否继续流转：">
                                <el-select v-model="form.value" placeholder="请选择">
                                    <el-option
                                        v-for="item in options"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>

                            <el-form-item label="举报商家奖励：">
                                <!--<el-radio v-model="form.radio" label="1">增加</el-radio>-->
                                <el-input v-model="form.input" placeholder="增加信誉分" clearable width="100"></el-input>
                            </el-form-item>

                            <el-form-item label="被举报用户/商家惩罚：">
                                <!--<el-radio v-model="form.radio" label="1">增加</el-radio>-->
                                <el-input v-model="form.input" placeholder="减少满意豆(用户)数量" clearable width="100" class="mt10"></el-input>
                                <el-input v-model="form.input" placeholder="降级会员等级(请输入降级数，如”1“为降一级)" clearable width="100" class="mt10"></el-input>
                                <el-input v-model="form.input" placeholder="减少信誉分(商家)" clearable width="100" class="mt10"></el-input>
                                <el-input v-model="form.input" placeholder="扣除保证金(商家)" clearable width="100" class="mt10"></el-input>
                            </el-form-item>

                        </el-form>
                        <div class="tr">
                            <el-button type="primary">提交</el-button>
                            <el-button type="primary">完成</el-button>
                        </div>
                    </div>
                </div>
            </el-card>


        </div>



    </div>
</template>

<script>
    import headTop from '../../components/headTop'
    export default {
        components: {
            headTop,
        },
        data(){
            return {
                form: {
                    desc: '',
                    value: '',
                    radio: '',
                    input: '',
                },
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
    .viewer_img{
        img{
            width: 150px;
            height: 150px;
        }
    }

</style>
