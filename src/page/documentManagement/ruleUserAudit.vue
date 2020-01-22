<template>

    <div class="main">


        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <b class="mr10">审核用户规则</b>
            </div>
            <div class="text item">

                <el-row style="padding: 0 10%">
                    <el-col :span="24">
                        <el-col :span="24">
                            <el-card shadow="hover">

                                <h3 class="mb20">审核用户规则</h3>
                                <el-form ref="form" :model="form" label-width="150px">
                                    <el-form-item label="用户规则：" prop="name">用户订单取消规则</el-form-item>
                                    <el-form-item label="生效时间：" prop="name">2019-05-02</el-form-item>
                                    <el-form-item label="展示平台：" prop="name">PC客户端</el-form-item>
                                    <el-form-item label="话术详情：">
                                        <quill-editor
                                            v-model="form.text"
                                            ref="myQuillEditor"
                                            :options="editorOption"
                                            @blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
                                            @change="onEditorChange($event)">
                                        </quill-editor>
                                    </el-form-item>
                                    <el-form-item label="审核备注：" prop="name">
                                        <el-input type="textarea" v-model="form.textarea" :autosize="{ minRows: 4, maxRows: 8}"></el-input>
                                    </el-form-item>
                                </el-form>


                                <div class="mt20 tr">
                                    <el-button type="" @click="$router.back(-1)">返回</el-button>
                                    <el-button type="primary">提交审批</el-button>
                                </div>
                            </el-card>
                        </el-col>
                    </el-col>
                </el-row>
            </div>
        </el-card>

        <bottom-footer></bottom-footer>

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
                form: {
                    textarea: '',
                },
                content:null,//富文本文本输入框
                editorOption:{}

            }
        },

        methods:{


            /**
             * 富文本编辑
             */
            onEditorBlur(){//失去焦点事件
            },
            onEditorFocus(){//获得焦点事件
            },
            onEditorChange(){//内容改变事件
            }


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

    .el-input{
        width: 220px;
    }


</style>

<style>
    .ql-editor{
        height: 200px;
    }
</style>
