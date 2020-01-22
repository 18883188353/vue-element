<template>
    <div>
        <div class="main">


            <!--营业执照到期开始-->
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <b class="mr10">审核话术</b>
                </div>
                <div class="text item">
                    <el-row style="padding: 0 10%">
                        <el-form :model="postData" label-width="150px" size="">
                            <el-form-item label="话术标题：">{{postData.title}}</el-form-item>
                            <el-form-item label="话术类型：">{{postData.learningType}}</el-form-item>
                            <el-form-item label="展示平台：">{{postData.clientType}}</el-form-item>
                            <el-form-item label="话术内容：">
                                <quill-editor
                                    disabled
                                    v-model="postData.content"
                                    ref="myQuillEditor"
                                    :options="editorOption"
                                    @blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
                                    @change="onEditorChange($event)">
                                </quill-editor>
                            </el-form-item>
                            <!--<el-form-item label="查看附件：">
                                <el-button size="small" type="primary">点击查看</el-button>
                            </el-form-item>-->
                            <el-form-item label="审核备注：">
                                <el-input class="mt10"
                                          type="textarea"
                                          :autosize="{ minRows: 4, maxRows: 8}"
                                          placeholder="审核备注"
                                          v-model="postData.reviewRemark">
                                </el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="" @click="onSubmit(3)">不通过</el-button>
                                <el-button type="primary" @click="onSubmit(1)">通过并发布</el-button>
                                <el-button type="" @click="back">返回</el-button>
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
    import queryBusinessLearningDetail from '../../api/other/queryBusinessLearningDetail'
    import updateBusinessLearning from '../../api/other/updateBusinessLearning'

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
                postData: {},
                fileList: [],
                editorOption: {},//富文本编辑
                id: this.$route.query.id,
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
            queryDetail(){
                queryBusinessLearningDetail.call(this, {id: this.id}).then(res => {
                    if (res.Code === 1){
                        this.postData = res.Data;
                    } else {
                        this.$message.error('系统异常')
                    }
                });
            },
            /**
             * 提交审批
             */
            onSubmit(status) {
                if (this.postData){
                    this.postData.status = status;
                }
                updateBusinessLearning.call(this, this.postData).then(res => {
                    if (res.Code === 1){
                        this.$message.success('操作成功！');
                        this.back();
                    } else {
                        this.$message.error('系统异常')
                    }
                });
            },
            back() {
                this.$router.go(-1);
            },

        },

        computed: {
            editor() {
                return this.$refs.myQuillEditor.quill;
            },
        },

        created(){
            this.queryDetail();
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
