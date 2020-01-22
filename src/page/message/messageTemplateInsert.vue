<template>
    <div class="fillcontain">
        <el-card class="none-border">
            <div slot="header">
                <b class="mr10">短信模板</b>
            </div>
            <div class="text item">
                <el-row style="padding: 0 5%">
                    <el-col :span="24">
                        <el-col :span="24">
                            <el-card shadow="hover">
                                <h3 class="mb20">添加模板</h3>
                                <el-form
                                    ref="form"
                                    :model="detailEntity"
                                    :rules="rules"
                                    label-width="150px"
                                >
                                    <el-form-item
                                        label="模板类型："
                                        prop="messageType"
                                    >
                                        <el-select
                                            v-model="detailEntity.messageType"
                                            placeholder="请选择模板类型"
                                        >
                                            <el-option
                                                label="节日祝福"
                                                :value="1"
                                            ></el-option>
                                            <el-option
                                                label="售后反馈"
                                                :value="2"
                                            ></el-option>
                                            <el-option
                                                label="任务派送"
                                                :value="3"
                                            ></el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item
                                        label="模板名称："
                                        prop="templateName"
                                    >
                                        <el-input
                                            v-model="detailEntity.templateName"
                                            placeholder="请输入模板名称"
                                            :maxlength="255"
                                        ></el-input>
                                    </el-form-item>
                                    <el-form-item
                                        label="模板内容："
                                        prop="templateContent"
                                    >
                                        <el-input
                                            type="textarea"
                                            v-model="detailEntity.templateContent"
                                            placeholder="请输入模板内容"
                                            :autosize="{ minRows: 4, maxRows: 8}"
                                        ></el-input>
                                    </el-form-item>
                                </el-form>
                            </el-card>
                        </el-col>
                    </el-col>
                </el-row>
            </div>
        </el-card>
        <div class="audit-footer">
            <el-button @click="back">返回列表</el-button>
            <el-button
                type="primary"
                @click="submitInsert" 
                v-if="isInsert"
            >提交</el-button>
            <el-button
                type="primary"
                @click="update" 
                v-else
            >提交</el-button>
        </div>
    </div>
</template>

<script>

import headTop from '../../components/headTop'
import bottomFooter from '../../components/bottomFooter'
import Query from '../../api/sms/smsTemplateDetail';
import Insert from '../../api/sms/smsTemplateInsert';
import Update from '../../api/sms/smsTemplateUpdate';

export default {
    components: {
        headTop,
        bottomFooter,
    },
    data() {
        return {
            isInsert: true,
            detailEntity: {
                id: this.$route.params.id,
                messageType: '',
                templateName: '',
                templateContent: ''
            },
            rules: {
                messageType: [{ required: true, message: '请选择模板类型', trigger: 'blur' }],
                templateName: [{ required: true, message: '请输入模板名称', trigger: 'blur' }, { max: 255, message: '最多255个字符', trigger: 'blur' }],
                templateContent: [{ required: true, message: '请输入模板内容', trigger: 'blur' }]
            }
        }
    },
    mounted() {
        if (this.$route.params.id && this.$route.params.id != 0) {
            this.isInsert = false;
            this.init(this.$route.params.id);
        }
    },
    methods: {
        init(id) {
            Query.call(this, { id: id }).then(res => {
                if (res.Code === 1) {
                    this.detailEntity = res.Data;
                } else {
                    this.$message.error('查询模板信息失败，请稍后再试');
                }
            })
        },
        submitInsert() {
            this.$refs['form'].validate(result => {
                if (result) {
                    Insert.call(this, this.detailEntity).then(res => {
                        if (res.Code === 1) {
                            this.$message.success('添加成功');
                            this.back();
                        } else {
                            this.$message.error(res.Desc);
                        }
                    })
                }
            });
        },
        update(){
            Update.call(this, this.detailEntity).then(res => {
                if(res.Code === 1){
                    this.$message.success('修改成功');
                    this.back();
                }else{
                    this.$message.error(res.Desc);
                }
            })
        },
        back() {
            this.$router.go(-1);
        }
    },

    created() {

    }
}
</script>

<style lang="less" scoped>

</style>
