<template>
    <div class="fillcontain">
        <el-card class="box-card">
            <div slot="header">
                <b class="mr10">平台品牌管理详情</b>
            </div>
            <div class="text item">
                <div class="hint">基本信息</div>
                <el-form
                    label-width="150px"
                    size="mini"
                    class="mt20"
                >
                    <el-form-item label="品牌名称：">{{ resData.name }}</el-form-item>
                    <el-form-item label="品牌RoleType：">{{ resData.addUserRoleType }}</el-form-item>
                    <el-form-item label="品牌类别：">{{ resData.introduction }}</el-form-item>
                    <el-form-item label="品牌Logo：">

                        <viewer :images=[resData.logo]>
                            <img
                                :src="resData.logo"
                                style="width: 200px; height: 100px; verticalAlign: 'middle'"
                            />
                        </viewer>
                    </el-form-item>
                    <el-form-item label=" ">
                        <el-upload
                            ref="upload"
                            action="/"
                            accept="image/*"
                            :limit="1"
                            :auto-upload="false"
                        >
                            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                            <el-button
                                size="small"
                                type="success"
                                @click="submitUpload"
                            >修改Logo</el-button>
                        </el-upload>

                    </el-form-item>
                    <el-form-item label="品牌状态："> {{ resData.state ===1 ? '正常' : '禁用' }} </el-form-item>
                    <el-form-item label="添加时间：">{{ resData.addTime }} </el-form-item>
                    <el-form-item label="修改时间：">{{ resData.updateTime }} </el-form-item>
                </el-form>
            </div>
        </el-card>
        <div class="audit-footer">
            <el-button
                type=""
                @click="back"
            >返回列表</el-button>
        </div>
    </div>
</template>

<script>

import GetBrandDetail from '../../../api/customerAffair/getBrandDetail'
import UpdateBrandLogo from '../../../api/customerAffair/updateBrandLogo'
import UploadFile from '../../../api/upload/uploadFile'

export default {
    components: {},
    data() {
        return {
            userInfo: JSON.parse(window.sessionStorage.getItem('USER_INFO')),
            id: this.$route.params.id,
            resData: {},
            newBrandLogoImage: ''
        }
    },
    mounted() {
        this.init();
    },
    methods: {
        init() {
            GetBrandDetail.call(this, { id: this.id }).then(res => {
                if (res.Code === 1) {
                    if (res.Data && res.Data.length > 0) {
                        this.resData = res.Data[0];
                    }
                }
            });
        },
        submitUpload(file) {

            let uploadFile = this.$refs.upload.uploadFiles;
            console.log(uploadFile);
            if(uploadFile.length <= 0){
                this.$message.error('请先选择文件');
                return;
            }
            let _file = uploadFile[0].raw;
            // 大于 2MB不能上传
            if(_file.size > 2097152){
                this.$message.error('请选择小于2MB的图片');
                return;
            }

            let postParams = new FormData();
            postParams.append('file', uploadFile[0].raw);

            UploadFile.call(this, postParams).then(res => {
                if (res.Code === 1) {
                    this.newBrandLogoImage = res.Data;
                    console.log('newBrandLogoImage ===>>> ', this.newBrandLogoImage);
                    this.submitUpdate();
                } else {
                    this.$refs.upload.uploadFiles = [];
                    this.$message.error(res.Desc);
                }
            });
        },
        submitUpdate() {
            let params = {
                brandId: this.id,
                brandLogoImage: this.newBrandLogoImage
            }
            UpdateBrandLogo.call(this, params).then(res => {
                if (res.Code === 1) {
                    this.$message.success('修改成功');
                    this.$refs.upload.clearFiles();
                    this.init();
                } else {
                    this.$message.error('修改失败');
                }
            })
        },
        back() {
            // this.$router.push({ path: '/auditChangeCompany' });
            this.$router.back(-1);
        },
    }
}
</script>

<style lang="less">
.img_size {
    img {
        width: 200px;
        margin: 3px;
        display: inline-block;
    }
}
.hint {
    border-left: 3px solid #25ada3;
    padding-left: 10px;
}
.label_inline {
    display: inline-block;
}
</style>
