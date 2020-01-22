<template>
    <div class="fillcontain">

        <div class="main">

            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span>学习反馈：</span>
                </div>
                <div class="text item">
                    <el-form ref="form"  label-width="150px">
                        <el-form-item label="学习标题：">{{postData.learnTitle}}</el-form-item>
                        <el-form-item label="反馈人：">{{type === 'view' ? postData.personnel : userInfo.rel_name}}</el-form-item>
                        <el-form-item label="学习反馈：">
                            <el-input class="mt10"
                                      type="textarea"
                                      :disabled="type === 'view'"
                                      :autosize="{ minRows: 10, maxRows: 40}"
                                      v-model="postData.content">
                            </el-input>
                        </el-form-item>
                    </el-form>
                    <div class="提交" style="padding-left: 150px;">
                        <el-button @click="back">返回</el-button>
                        <el-button @click="submit" v-if="type === 'edit'" type="primary">提交反馈</el-button>
                    </div>
                </div>
            </el-card>

        </div>

    </div>
</template>

<script>
    import updateBusinessLearningFeedback from '../../api/other/updateBusinessLearningFeedback'
    import queryBusinessLearningFeedbackDetail from '../../api/other/queryBusinessLearningFeedbackDetail'

    import headTop from '../../components/headTop'
    export default {
        components: {
            headTop,
        },
        data(){
            return {
                userInfo: JSON.parse(sessionStorage.getItem('USER_INFO')),
                id: this.$route.query.id,
                type: this.$route.query.type,
                postData: {
                    content: '',
                },
            }
        },

        methods:{
            submit() {
                //编辑
                if (!this.id) {
                    this.$message.warning('当前页面不能反馈！')
                    return;
                }
                updateBusinessLearningFeedback.call(this, this.postData).then(res => {
                    if (res.Code === 1){
                        this.$message.success('反馈成功！');
                        this.back();
                    } else {
                        this.$message.error('系统异常')
                    }
                });
            },
            queryDetail(){
                queryBusinessLearningFeedbackDetail.call(this, {id: this.id}).then(res => {
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
        },

        created(){
            if (this.id){
                this.queryDetail();
            }
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
