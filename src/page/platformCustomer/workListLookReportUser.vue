<template>
    <div class="fillcontain">

        <div class="main">

            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span>举报工单：</span>

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
                            <el-form-item label="举报用户姓名：">彩虹</el-form-item>
                            <el-form-item label="联系电话：">15864896547</el-form-item>
                            <el-form-item label="被举报用户姓名：">彩虹1</el-form-item>
                            <el-form-item label="联系电话：">15864896547</el-form-item>
                            <el-form-item label="工单状态：">处理中</el-form-item>
                            <el-form-item label="相关商品：">德芙巧克力情人节特推</el-form-item>
                            <el-form-item label="纠错模板：">德芙巧克力包装很好，纵享丝滑，德芙，就是如丝的感觉</el-form-item>
                            <el-form-item label="举报类型：">与话题不符</el-form-item>
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

                            <el-form-item label="举报用户奖励：">
                                <!--<el-radio v-model="form.radio" label="1">增加</el-radio>-->
                                <el-input v-model="form.input" placeholder="增加满意豆的数量" clearable width="100"></el-input>
                            </el-form-item>
                            <el-form-item label="被举报用户惩罚：">
                                <!--<el-radio v-model="form.radio" label="1">减少</el-radio>-->
                                <el-input v-model="form.input" placeholder="减少满意豆数量" clearable width="100"></el-input>
                            </el-form-item>

                            <el-form-item label="举报用户奖励：">
                                <!--<el-radio v-model="form.radio" label="1">增加</el-radio>-->
                                <el-input v-model="form.input" placeholder="增加满意豆的数量" clearable width="100"></el-input>
                            </el-form-item>
                            <el-form-item label="被举报商家惩罚：">
                                <!--<el-radio v-model="form.radio" label="1">增加</el-radio>-->
                                <el-input v-model="form.input" placeholder="减少信誉分" clearable width="100"></el-input>
                                <el-input v-model="form.input" placeholder="扣除保证金金额" clearable width="100" class="mt10"></el-input>
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
