<template>

    <div class="main">


        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <b class="mr10">{{getRuleTypeDesc(postData.rule_type)}}{{type === 'view' ? '查看':'编辑'}}</b>
            </div>
            <div class="text item">

                <el-row style="padding: 0 10%">
                    <el-col :span="24">
                        <el-col :span="24">
                            <el-card shadow="hover">

                                <h3 class="mb20">{{type === 'view' ? '查看':'编辑'}}{{getRuleTypeDesc(postData.rule_type)}}</h3>
                                <el-form ref="form" :model="postData" label-width="150px">
                                    <el-form-item label="标题：" prop="name">
                                        <el-input v-if="type !== 'view'" v-model="postData.title"></el-input>
                                        <p v-if="type === 'view'">{{postData.title}}</p>
                                    </el-form-item>
                                    <el-form-item label="规则类型：">
                                        <!--<el-select :disabled="type === 'view'" v-model="postData.rule_type">
                                            <el-option v-for="(item,index) in ruleTypeOptions" :key="index" :label="item.label" :value="item.value"></el-option>
                                        </el-select>-->
                                        {{getRuleTypeDesc(postData.rule_type)}}
                                    </el-form-item>
                                    <el-form-item label="内容">
                                        <el-upload
                                            class="avatar-uploader"
                                            action="https://jsonplaceholder.typicode.com/posts/"
                                            :show-file-list="false"
                                            :http-request="uploadSectionFile"
                                            :on-success="handleAvatarSuccess"
                                            :before-upload="beforeAvatarUpload">
                                        </el-upload>
                                        <quill-editor
                                            v-model="postData.content"
                                            v-if="type !== 'view'"
                                            ref="myQuillEditor"
                                            :options="editorOption"
                                            @blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
                                            @change="onEditorChange($event)">
                                        </quill-editor>
                                        <p v-if="type === 'view'" v-html="postData.content"></p>
                                    </el-form-item>
                                </el-form>

                                <div class="mt20 tr">
                                    <el-button type="" @click="back">返回</el-button>
                                    <el-button type="primary" v-if="type === 'edit'" @click="onSubmit">提交</el-button>
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

    import insertRuleDocument from '../../api/document/insertRuleDocument'
    import queryRuleDocumentDetail from '../../api/document/queryRuleDocumentDetail'
    import updateRuleDocument from '../../api/document/updateRuleDocument'
    import uploadFile from '../../api/upload/uploadFile'

    import headTop from '../../components/headTop'
    import bottomFooter from '../../components/bottomFooter'

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
        },
        data(){
            return {
                content:null,//富文本文本输入框
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

                id: this.$route.query.id,
                type: this.$route.query.type,
                postData: {
                    title: '',
                    rule_type: this.$route.query.rule_type,//规则类型 1用户规则 2商家规则 3平台规则 4用户帮助文档 5商家帮助文档 6平台帮助文档 7财务系统国家政策8财务系统业务规则
                    content: '',
                    accessory: '',
                },
                ruleTypeOptions: [
                    {label: '用户规则', value: 1},
                    {label: '商家规则', value: 2},
                    {label: '平台规则', value: 3},
                    {label: '用户帮助文档', value: 4},
                    {label: '商家帮助文档', value: 5},
                    {label: '平台帮助文档', value: 6},
                ]

            }
        },

        methods:{

            ruleUserAudit(){
                this.$router.push({'path': '/ruleUserAudit'})
            },

            /**
             * 富文本编辑
             */
            onEditorBlur(){//失去焦点事件
            },
            onEditorFocus(){//获得焦点事件
            },
            onEditorChange(){//内容改变事件
            },

            getRuleTypeDesc(type){
                let _desc = '';
                this.ruleTypeOptions.map(item =>{
                    if (item.value == type) {
                        _desc = item.label;
                    }
                });
                return _desc;
            },
            onSubmit() {
                if (this.id){
                    //编辑
                    updateRuleDocument.call(this, this.postData).then(res => {
                        if (res.Code === 1){
                            this.$message.success('更新成功！');
                            this.back();
                        } else {
                            this.$message.error('系统异常')
                        }
                    });
                } else {
                    //新增
                    insertRuleDocument.call(this, this.postData).then(res => {
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
                queryRuleDocumentDetail.call(this, {id: this.id}).then(res => {
                    if (res.Code === 1){
                        if (res.Data.length > 0){
                            this.postData = res.Data[0] ;
                        } else {
                            this.$message.warning("当前文档已被删除！请重新添加");
                            this.id = undefined;
                        }
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
