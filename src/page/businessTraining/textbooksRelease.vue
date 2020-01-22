<template>
    <div>
        <div class="main">


            <!--营业执照到期开始-->
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <b class="mr10">编制教材</b>
                </div>
                <div class="text item">
                    <el-row style="padding: 0 10%">
                        <el-form :model="form" label-width="150px" size="">
                            <el-form-item label="教材标题：">2019年入职培训</el-form-item>
                            <el-form-item label="教材版本：">1.0</el-form-item>
                            <el-form-item label="教材类型：">入职培训</el-form-item>
                            <el-form-item label="展示平台：">PC客服系统</el-form-item>
                            <el-form-item label="创建人：">张仲景</el-form-item>
                            <el-form-item label="审核人：">张三</el-form-item>
                            <el-form-item label="教材内容：">
                                <quill-editor
                                    v-model="content"
                                    ref="myQuillEditor"
                                    :options="editorOption"
                                    @blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
                                    @change="onEditorChange($event)">
                                </quill-editor>
                            </el-form-item>
                            <el-form-item label="审核备注：">
                                <el-input class="mt10"
                                          type="textarea"
                                          :autosize="{ minRows: 4, maxRows: 8}"
                                          placeholder="审核备注"
                                          v-model="form.textarea">
                                </el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="" @click="onSubmit">不通过</el-button>
                                <el-button type="primary" @click="onSubmit">通过并发布</el-button>
                            </el-form-item>
                        </el-form>
                    </el-row>
                </div>
            </el-card>
            <!--营业执照到期结束-->



            <bottom-footer></bottom-footer>

        </div>

    </div>
</template>

<script>
    import headTop from '../../components/headTop'
    import bottomFooter from '../../components/bottomFooter'
    import { quillEditor } from "vue-quill-editor"; //调用编辑器
    export default {
        components: {
            headTop,
            bottomFooter,
            quillEditor,
        },
        data(){
            return {
                form: {
                    name: '',
                    region: '',
                    textarea: '',
                },
                fileList: [],
                editorOption: {},//富文本编辑
                content: '',//富文本编辑内容
            }
        },

        methods:{

            /**
             * 富文本编辑
             * @param editor
             */
            onEditorBlur(){}, // 失去焦点事件
            onEditorFocus(){}, // 获得焦点事件
            onEditorChange(){}, // 内容改变事件

            /**
             * 上传文件
             * @param file
             * @param fileList
             */
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePreview(file) {
                console.log(file);
            },
            handleExceed(files, fileList) {
                this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
            },
            beforeRemove(file, fileList) {
                return this.$confirm(`确定移除 ${ file.name }？`);
            },

            /**
             * 提交审批
             */
            onSubmit() {
                console.log('submit!');
            }

        },

        computed: {
            editor() {
                return this.$refs.myQuillEditor.quill;
            },
        },

        created(){

        }
    }
</script>

<style lang="less" scoped>
    .box-card{
        margin-bottom: 20px;
    }
</style>

<style>

    .edit_container {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }
    .ql-editor{
        height:200px;
    }
</style>
