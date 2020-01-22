<template>
    <div>
        <div class="main">


            <!--营业执照到期开始-->
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <b class="mr10">新增知识</b>
                </div>
                <div class="text item">
                    <el-row style="padding: 0 10%">
                        <el-form :model="postData" label-width="150px" size="">
                            <el-form-item label="知识标题：">
                                <el-input :disabled="type === 'view'" v-model="postData.title"></el-input>
                            </el-form-item>
                            <el-form-item label="知识类型：">
                                <el-select :disabled="type === 'view'" v-model="postData.learningType" placeholder="请选择知识类型">
                                    <el-option :disabled="type === 'view'" label="运营知识" value="运营知识"></el-option>
                                    <el-option :disabled="type === 'view'" label="学习知识" value="学习知识"></el-option>
                                </el-select>
                            </el-form-item>
                            <!--<el-form-item label="展示平台：">
                                <el-select :disabled="type === 'view'" v-model="postData.clientType" placeholder="请选择展示平台">
                                    <el-option label="APP" value="APP"></el-option>
                                    <el-option label="PC" value="PC"></el-option>
                                    <el-option label="WAP" value="WAP"></el-option>
                                </el-select>
                            </el-form-item>-->

                            <!--<el-form-item label="上传教材：">
                                <el-upload
                                    class="upload-demo"
                                    action="https://jsonplaceholder.typicode.com/posts/"
                                    :on-preview="handlePreview"
                                    :on-remove="handleRemove"
                                    :before-remove="beforeRemove"
                                    multiple
                                    :limit="3"
                                    :on-exceed="handleExceed"
                                    :file-list="fileList">
                                    <el-button size="small" type="primary">点击上传</el-button>
                                </el-upload>
                            </el-form-item>-->
                            <el-form-item label="知识内容：">
                                <el-upload
                                    class="avatar-uploader"
                                    action="https://jsonplaceholder.typicode.com/posts/"
                                    :show-file-list="false"
                                    :http-request="uploadSectionFile"
                                    :on-success="handleAvatarSuccess"
                                    :before-upload="beforeAvatarUpload">
                                </el-upload>
                                <quill-editor
                                    v-if="type === 'edit'"
                                    v-model="postData.content"
                                    ref="myQuillEditor"
                                    :options="editorOption"
                                    @blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
                                    @change="onEditorChange($event)">
                                </quill-editor>
                                <p v-if="type === 'view'" v-html="postData.content"></p>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="" @click="back">返回</el-button>
                                <el-button type="primary" v-if="type !== 'view'" @click="onSubmit">提交</el-button>
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
    import insertBusinessLearning from '../../api/other/insertBusinessLearning'
    import updateBusinessLearning from '../../api/other/updateBusinessLearning'
    import uploadFile from '../../api/upload/uploadFile'

    import headTop from '../../components/headTop'
    import bottomFooter from '../../components/bottomFooter'
    import { quillEditor } from "vue-quill-editor"; //调用编辑器

    const toolbarOptions = [
        ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
        ['blockquote', 'code-block'],

        [{'header': 1}, {'header': 2}],               // custom button values
        [{'list': 'ordered'}, {'list': 'bullet'}],
        [{'script': 'sub'}, {'script': 'super'}],      // superscript/subscript
        [{'indent': '-1'}, {'indent': '+1'}],          // outdent/indent
        [{'direction': 'rtl'}],                         // text direction

        [{'size': ['small', false, 'large', 'huge']}],  // custom dropdown
        [{'header': [1, 2, 3, 4, 5, 6, false]}],

        [{'color': []}, {'background': []}],          // dropdown with defaults from theme
        [{'font': []}],
        [{'align': []}],
        ['link', 'image', 'video'],
        ['clean']                                         // remove formatting button
    ]
    export default {
        components: {
            headTop,
            bottomFooter,
            quillEditor,
        },
        data(){
            return {
                postData: {
                    clientType: 'PC',
                    content: '',
                    learningType: '',
                    title: '',
                    topic: 'knowLedge',
                    version: '1.0',
                },
                id: this.$route.query.id,
                type: this.$route.query.type,
                fileList: [],
                editorOption: {
                    placeholder: '',
                    theme: 'snow',  // or 'bubble'
                    modules: {
                        toolbar: {
                            container: toolbarOptions,  // 工具栏
                            handlers: {
                                'image': function (value) {
                                    if (value) {
                                        //根据选择器找到对应的图片上传
                                        document.querySelector('.avatar-uploader input').click()
                                    } else {
                                        this.quill.format('image', false)
                                    }
                                }
                            }
                        }
                    }
                },
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
                if (this.id){
                    //编辑
                    updateBusinessLearning.call(this, this.postData).then(res => {
                        if (res.Code === 1){
                            this.$message.success('更新成功！');
                            this.back();
                        } else {
                            this.$message.error('系统异常')
                        }
                    });
                } else {
                    //新增
                    insertBusinessLearning.call(this, this.postData).then(res => {
                        if (res.Code === 1){
                            this.$message.success('新增成功！');
                            this.back();
                        } else {
                            this.$message.error('系统异常')
                        }
                    });
                }
                console.log(this.postData, 'submit!');
            },
            queryDetail(){
                queryBusinessLearningDetail.call(this, {id: this.id, type: this.type}).then(res => {
                    if (res.Code === 1){
                        this.postData = res.Data;
                    } else {
                        this.$message.error('系统异常')
                    }
                });
            },
            back() {
                this.$router.go(-1);
            },

            //富文本 图片
            uploadSectionFile (file) {
                // alert('111')
                let param = new FormData(); //创建form对象
                param.append('file', file.file);//通过append向form对象添加数据
                uploadFile.call(this, param).then(res => {
                    if (res.Code === 1) {
                        // 获取富文本组件实例
                        let quill = this.$refs.myQuillEditor.quill;
                        // 如果上传成功
                        // 获取光标所在位置
                        let length = quill.getSelection().index;
                        // 插入图片  res.info为服务器返回的图片地址
                        quill.insertEmbed(length, 'image', res.Data);
                        // 调整光标到最后
                        quill.setSelection(length + 1);
                    } else {
                        this.$message.error(res.Desc);
                    }
                })
            },
            handleAvatarSuccess (res, file) {
                this.imageUrl = URL.createObjectURL(file.raw)
            },
            beforeAvatarUpload (file) {
                const isJPG = file.type === 'image/jpeg'
                const isLt2M = file.size / 1024 / 1024 < 2
                // /tesystem/uploadFile

                /*if (!isJPG) {
                  alert('上传头像图片只能是 JPG 格式!');
                }
                if (!isLt2M) {
                  alert('上传头像图片大小不能超过 2MB!');
                }*/
                return true
            },
        },

        computed: {
            editor() {
                return this.$refs.myQuillEditor.quill;
            },
        },

        created(){
            if(this.id){
                this.queryDetail();
            }
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
