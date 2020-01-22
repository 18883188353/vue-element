<template>
    <div>
        <div class="main">


            <!--审核管理开始-->
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span>工单详情</span>
                </div>
                <div class="text item">
                    <el-steps :active="2" align-center>
                        <el-step title="受理" ></el-step>
                        <el-step title="流转到技术部XXX" ></el-step>
                        <el-step title="流转到产品部XXX" ></el-step>
                        <el-step title="流转回客服部" ></el-step>
                        <el-step title="回访" ></el-step>
                        <el-step title="处理完成" ></el-step>
                    </el-steps>
                </div>
                <div class="height20"></div>
                <el-row>
                    <el-col :span="24" style="padding: 0 15%">
                        <el-form label-width="100px"  size="">
                            <el-form-item label="工单来源：">APP点（自动获取）</el-form-item>
                            <el-form-item label="工单编号：">GDIBB15M0J87249</el-form-item>
                            <el-form-item label="创建时间：">2019-4-29 11:11</el-form-item>
                            <el-form-item label="工单类型：">纠错</el-form-item>
                            <el-form-item label="紧急程度：">一般</el-form-item>
                            <el-form-item label="发起人姓名：">彩虹</el-form-item>
                            <el-form-item label="联系电话：">15864896547</el-form-item>
                            <el-form-item label="QQ：">562748215</el-form-item>
                            <el-form-item label="邮箱：">jkgix2@163.com</el-form-item>
                            <el-form-item label="工单状态：">处理中</el-form-item>
                            <el-form-item label="相关商品：">德芙巧克力情人节特推</el-form-item>
                            <el-form-item label="纠错模板：">德芙巧克力包装很好，纵享丝滑，德芙，就是如丝的感觉</el-form-item>
                            <el-form-item label="纠错意见：">该评论涉嫌抄袭德芙巧克力广告宣传内容，建议调整</el-form-item>
                            <el-form-item label="附件详情：">
                                <div class="annex_list">
                                    <viewer>
                                        <img src="../../assets/img/pic1.png" alt="">
                                        <img src="../../assets/img/pic1.png" alt="">
                                        <img src="../../assets/img/pic1.png" alt="">
                                    </viewer>
                                </div>
                            </el-form-item>
                            <el-form-item label="工单处理人：">
                                <el-select v-model="value" placeholder="请选择">
                                    <el-option
                                        v-for="item in options"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                                <span>自动分配非客服部同事</span>
                            </el-form-item>
                            <el-form-item label="处理人意见：">
                                <el-input style="margin-bottom: 20px;"
                                    type="textarea"
                                    autosize
                                    :autosize="{ minRows: 2, maxRows: 4}"
                                    placeholder="处理人意见"
                                    v-model="textarea">
                                </el-input>
                                <div>
                                    <el-button type="primary">处理完成</el-button>
                                    <el-button type="">流转</el-button>
                                </div>
                            </el-form-item>

                            <el-form-item label="选择流转人：">
                                <el-select v-model="value" placeholder="请选择">
                                    <el-option
                                        v-for="item in options"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="处理人意见：">
                                <el-input style="margin-bottom: 20px;"
                                    type="textarea"
                                    autosize
                                    :autosize="{ minRows: 2, maxRows: 4}"
                                    placeholder="处理人意见"
                                    v-model="textarea">
                                </el-input>
                                <div>
                                    <el-button type="primary">处理完成</el-button>
                                    <el-button type="">流转</el-button>
                                </div>
                            </el-form-item>

                            <el-form-item label="选择流转人：">
                                <el-select v-model="value" placeholder="请选择">
                                    <el-option
                                        v-for="item in options"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>

                        </el-form>

                        <div class="tr"><el-button type="primary">提交</el-button></div>

                    </el-col>
                </el-row>


            </el-card>
            <!--审核管理结束-->

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
                options: [{
                    value: '1',
                    label: '否'
                }, {
                    value: '2',
                    label: '客服部张三'
                }, {
                    value: '3',
                    label: '技术部李四'
                }, {
                    value: '4',
                    label: '运营部'
                }, {
                    value: '5',
                    label: '监察部'
                }],//工单处理人列表
                value: '',//工单处理人
                textarea: '',//处理人意见
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
    .annex_list{
        width: 100%;
        height: auto;
        img{
            width: 150px;
            height: 150px;
            display: inline-block;
            margin-right: 5px;
            margin-bottom: 5px;
        }
    }

</style>
