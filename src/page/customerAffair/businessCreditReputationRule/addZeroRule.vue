<template>
    <div>
        <div class="main">

            <!--营业执照到期开始-->
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <b class="mr10">信用分清零规则</b>
                </div>
                <div class="text item">
                    <el-row style="padding: 0 10%">
                        <el-form label-width="150px" :model="postData" size="" :rules="rules" ref="ruleForm">
                            <el-form-item label="信用分数：" class="label_inline" prop="zminScore">
                                <el-input v-model.number="postData.zminScore"></el-input> —
                            </el-form-item>
                            <el-form-item label-width="0" class="label_inline" prop="zmaxScore">
                                <el-input v-model.number="postData.zmaxScore"></el-input>
                            </el-form-item>
                            <el-form-item label="清零规则：" prop="zzeroClearingRules">
                                <el-input v-model="postData.zzeroClearingRules"></el-input>
                            </el-form-item>
                            <el-form-item label="次年初始分数：" prop="zinitialScore">
                                <el-input v-model.number="postData.zinitialScore"></el-input>
                            </el-form-item>
                            <el-form-item label="关闭店铺：" prop="zisShop">
                                <el-radio-group v-model="postData.zisShop">
                                    <el-radio :label="0">是</el-radio>
                                    <el-radio :label="1">否</el-radio>
                                </el-radio-group>

                            </el-form-item>

                            <el-form-item label="">
                                <el-button type="primary" size="" @click="submit">完成</el-button>
                                <el-button type="" size="" @click="back">返回列表</el-button>
                            </el-form-item>
                        </el-form>
                    </el-row>
                </div>
            </el-card>
            <!--营业执照到期结束-->



        </div>

    </div>
</template>

<script>
    import QueryCreditClearanceDetails from '../../../api/customerAffair/queryCreditClearanceDetails'
    import UpdateMerchantCreditClearanceRule from '../../../api/customerAffair/updateMerchantCreditClearanceRule'


    export default {

        data(){
            return {
                id: this.$route.params.id,
                postData: {
                    zminScore: '', //起分数
                    zmaxScore: '', //始分数
                    zzeroClearingRules: '',  //清零规则
                    zinitialScore: '',//次年初始分数
                    zisShop: '', //关闭店铺
                    zstate: 1,
                },
                rules: {
                    zminScore: [
                        { required: true, message: '请输入最小信誉分', trigger: 'blur' },
                        { type: 'number', message: '必须为数字值'}
                    ],
                    zmaxScore: [
                        { required: true, message: '请输入最大信誉分', trigger: 'blur' },
                        { type: 'number', message: '必须为数字值'}
                    ],
                    zzeroClearingRules: [
                        { required: true, message: '请输入清零规则', trigger: 'blur' },
                    ],
                    zinitialScore: [
                        { required: true, message: '请输入次年初始分数', trigger: 'blur' },
                        { type: 'number', message: '必须为数字值'}
                    ],
                    zisShop: [
                        { required: true, message: '请选择是否关闭店铺', trigger: 'change' },
                    ],
                },
            }
        },

        methods:{
            //详情
            queryDetail(){
                QueryCreditClearanceDetails.call(this, {
                    zId: this.id
                }).then(res => {
                    if (res.code === 1) {
                        this.postData = res.data.merchantCreditClearanceRule;
                    }
                });
            },
            submit(){
                this.$refs['ruleForm'].validate((valid) => {
                    if (valid) {
                        UpdateMerchantCreditClearanceRule.call(this, this.postData).then(res => {
                            console.log(res, 'submit');
                            if (res.code === 1) {
                                this.$message.success('操作成功');
                                this.back();
                            }else {
                                this.$message.error('操作失败')
                            }
                        });
                    }else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            back(){
                this.$router.go(-1);
            }
        },

        created(){
            if (this.id != -1){
                this.queryDetail();
            }
        }
    }
</script>

<style lang="less" scoped>

    .box-card{
        margin-bottom: 20px;
    }

    .el-input{
        width: 210px;
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

    .tel_list{
        width: 100%;
        height: auto;
        margin-top: 10px;
        li{
            width: 100%;
            height: auto;
            border-bottom: 1px #eaeaea solid;
            padding: 10px 0;
            span{
                float: right;
            }
            &:after{
                clear: both;
                display: block;
                content: '';
            }
        }
    }

    .callList{
        width: 100%;
        height: auto;
        margin-top: 10px;
        ul{
            width: 100%;
            height: auto;
            display: table;
            li{
                width: auto;
                display: table-cell;
                vertical-align: middle;
                text-align: center;
            }
        }
    }


</style>

<style>
    .el-input-group__append .el-button, .el-input-group__append .el-input, .el-input-group__prepend .el-button, .el-input-group__prepend .el-input{
        width: 80px;
    }
    .label_inline {
        display: inline-block;
    }
</style>
