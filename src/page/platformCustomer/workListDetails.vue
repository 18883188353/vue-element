<template>
    <div class="fillcontain">

        <div class="main">

            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span>工单详情：</span>

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
                            <el-form-item label="发起人姓名：">彩虹</el-form-item>
                            <el-form-item label="QQ：">562748215</el-form-item>
                            <el-form-item label="邮箱：">jkgix2@163.com</el-form-item>
                            <el-form-item label="工单状态：">处理中</el-form-item>
                            <el-form-item label="相关商品：">德芙巧克力情人节特推</el-form-item>
                            <el-form-item label="纠错模板：">德芙巧克力包装很好，纵享丝滑，德芙，就是如丝的感觉</el-form-item>
                            <el-form-item label="纠错意见：">该评论涉嫌抄袭德芙巧克力广告宣传内容，建议调整</el-form-item>
                            <el-form-item label="工单处理人：">客服部张三</el-form-item>
                            <el-form-item label="处理人意见：">
                                <el-input type="textarea" v-model="form.desc" :autosize="{ minRows: 4, maxRows: 8}"></el-input>
                            </el-form-item>
                            <el-form-item label="选择流转人：">客服部经理</el-form-item>
                            <el-form-item label="处理人意见：">
                                <el-input type="textarea" v-model="form.desc" :autosize="{ minRows: 4, maxRows: 8}"></el-input>
                            </el-form-item>
                            <el-form-item label="回访内容记录：">
                                <el-input type="textarea" v-model="form.desc" :autosize="{ minRows: 4, maxRows: 8}"></el-input>
                            </el-form-item>
                            <el-form-item label="反馈内容记录：">
                                <el-input type="textarea" v-model="form.desc" :autosize="{ minRows: 4, maxRows: 8}"></el-input>
                            </el-form-item>
                            <el-form-item label="满意度：">非常满意</el-form-item>
                            <el-form-item label="纠错用户奖励：">满意豆：10</el-form-item>

                        </el-form>
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
                },

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
    .page{
        text-align: right;
        padding: 20px;
    }

</style>
