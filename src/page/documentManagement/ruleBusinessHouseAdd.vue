<template>

    <div class="main">


        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <b class="mr10">新增众议院规则</b>
            </div>
            <div class="text item">

                <el-row style="padding: 0 10%">
                    <el-col :span="24">
                        <el-col :span="24">
                            <el-card shadow="hover">

                                <h3 class="mb20">新增众议院规则</h3>
                                <el-form ref="form" :model="form" label-width="150px">
                                    <el-form-item label="标题：" prop="name">
                                        <el-input v-model="form.name"></el-input>
                                    </el-form-item>
                                    <el-form-item label="展示平台：">
                                        <el-radio v-model="form.radio" label="1">商家端</el-radio>
                                    </el-form-item>
                                    <el-form-item label="投票时间：">
                                        <el-date-picker
                                            v-model="form.start"
                                            type="datetime"
                                            placeholder="开始时间">
                                        </el-date-picker> -
                                        <el-date-picker
                                            v-model="form.end"
                                            type="datetime"
                                            placeholder="结束时间">
                                        </el-date-picker>
                                    </el-form-item>
                                    <el-form-item label="生效时间：">
                                        <el-date-picker
                                            v-model="form.start"
                                            type="datetime"
                                            placeholder="开始时间">
                                        </el-date-picker>
                                    </el-form-item>
                                    <el-form-item label="投票选项：">
                                        <p>
                                            <el-radio v-model="form.vote" label="1">默认</el-radio>
                                            <span class="mr10">选项一:赞同 </span>
                                            <span class="mr10">选项二:不赞同 </span>
                                        </p>
                                        <p>
                                            <el-radio v-model="form.vote" label="2">自定义</el-radio>
                                            <el-tag
                                                :key="tag"
                                                v-for="tag in dynamicTags"
                                                closable
                                                :disable-transitions="false"
                                                @close="handleClose(tag)">
                                                {{tag}}
                                            </el-tag>
                                            <el-input
                                                class="input-new-tag"
                                                v-if="inputVisible"
                                                v-model="inputValue"
                                                ref="saveTagInput"
                                                size="small"
                                                @keyup.enter.native="handleInputConfirm"
                                                @blur="handleInputConfirm"
                                            >
                                            </el-input>
                                            <el-button v-else class="button-new-tag" size="small" @click="showInput">+ 新增选项</el-button>
                                        </p>
                                    </el-form-item>
                                    <el-form-item label="问题详情：">
                                        <quill-editor
                                            v-model="form.text"
                                            ref="myQuillEditor"
                                            :options="editorOption"
                                            @blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
                                            @change="onEditorChange($event)">
                                        </quill-editor>
                                    </el-form-item>
                                </el-form>

                                <div class="mt20 tr">
                                    <el-button type="" @click="$router.back(-1)">返回</el-button>
                                    <el-button type="primary" @click="ruleUserAudit">提交审批</el-button>
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
                    start:'',
                    end:'',
                    name: '',
                    vote: '',
                    text: '',
                },
                dynamicTags: ['标签一', '标签二', '标签三'],//投票选项默认
                inputVisible: false,
                inputValue: '',
                content:null,//富文本文本输入框
                editorOption:{}

            }
        },

        methods:{

            ruleUserAudit(){
                this.$router.push({'path': '/ruleUserAudit'})
            },

            /**
             * 投票选项
             */
            handleClose(tag) {
                this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
            },
            showInput() {
                this.inputVisible = true;
                this.$nextTick(_ => {
                    this.$refs.saveTagInput.$refs.input.focus();
                });
            },
            handleInputConfirm() {
                let inputValue = this.inputValue;
                if (inputValue) {
                    this.dynamicTags.push(inputValue);
                }
                this.inputVisible = false;
                this.inputValue = '';
            },

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

    .el-tag + .el-tag {
        margin-left: 10px;
    }
    .button-new-tag {
        margin-left: 10px;
        height: 32px;
        line-height: 30px;
        padding-top: 0;
        padding-bottom: 0;
    }
    .input-new-tag {
        width: 90px;
        margin-left: 10px;
        vertical-align: bottom;
    }


</style>

<style>
    .ql-editor{
        height: 200px;
    }
</style>
