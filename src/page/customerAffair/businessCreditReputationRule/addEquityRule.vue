<template>
    <div>
        <div class="main">

            <!--营业执照到期开始-->
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <b class="mr10">信誉权益规则</b>
                </div>
                <div class="text item">
                    <el-row style="padding: 0 10%">
                        <el-form label-width="170px" :model="postData" size="" :rules="rules" ref="ruleForm" >
                            <el-form-item label="信誉分数：" class="label_inline" prop="reMinScore">
                                <el-input v-model.number="postData.reMinScore"></el-input> —
                            </el-form-item>
                            <el-form-item label-width="0" class="label_inline" prop="reMaxScore">
                                <el-input v-model.number="postData.reMaxScore"></el-input>
                            </el-form-item>
                            <el-form-item label="次年广告位费用优惠：" prop="reNextAdvertisingFeeProportion">
                                <el-input placeholder="请输入内容" v-model.number="postData.reNextAdvertisingFeeProportion" class="input-with-select">
                                    <el-button slot="append">%</el-button>
                                </el-input>
                            </el-form-item>
                            <el-form-item label="次年热搜词费用优惠：" prop="reNextHotsearchProportion">
                                <el-input placeholder="请输入内容" v-model.number="postData.reNextHotsearchProportion" class="input-with-select">
                                    <el-button slot="append">%</el-button>
                                </el-input>
                            </el-form-item>
                            <el-form-item label="次年商品保证金：" prop="reNextBondProportion">
                                <el-input placeholder="请输入内容"  v-model.number="postData.reNextBondProportion" class="input-with-select">
                                    <el-button slot="append">%</el-button>
                                </el-input>
                            </el-form-item>
                            <el-form-item label="次年返平台使用费：" prop="reReturnUsagefeeProportion">
                                <el-input placeholder="请输入内容"  v-model.number="postData.reReturnUsagefeeProportion" class="input-with-select">
                                    <el-button slot="append">%</el-button>
                                </el-input>
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

    import QueryMerchantReputationEquityDetails from '../../../api/customerAffair/queryMerchantReputationEquityDetails'
    import UpdateMerchantReputationEquity from '../../../api/customerAffair/updateMerchantReputationEquity'

    export default {

        data(){
            return {
                postData: {
                    reMinScore: '',
                    reMaxScore: '',
                    reNextAdvertisingFeeProportion: '',
                    reNextHotsearchProportion: '',
                    reNextBondProportion: '',
                    reReturnUsagefeeProportion: '',
                },
                rgReputationGradeOption: [
                    {
                        value: '问题商家'
                    },{
                        value: '新手商家'
                    },{
                        value: '普通商家'
                    },{
                        value: '优质商家'
                    },{
                        value: '品质商家'
                    },
                ],
                id: this.$route.params.id,
                rules: {
                    reMinScore: [
                        { required: true, message: '请输入最小信誉分', trigger: 'blur' },
                        { type: 'number', message: '必须为数字值'}
                    ],
                    reMaxScore: [
                        { required: true, message: '请输入最大信誉分', trigger: 'blur' },
                        { type: 'number', message: '必须为数字值'}
                    ],
                    reNextAdvertisingFeeProportion: [
                        { required: true, message: '请输入次年广告位费用优惠', trigger: 'blur' },
                        { type: 'number', message: '必须为数字值'}
                    ],
                    reNextHotsearchProportion: [
                        { required: true, message: '请输入次年热搜词费用优惠', trigger: 'blur' },
                        { type: 'number', message: '必须为数字值'}
                    ],
                    reNextBondProportion: [
                        { required: true, message: '请输入次年商品保证金', trigger: 'blur' },
                        { type: 'number', message: '必须为数字值'}
                    ],
                    reReturnUsagefeeProportion: [
                        { required: true, message: '请输入次年返平台使用费', trigger: 'blur' },
                        { type: 'number', message: '必须为数字值'}
                    ],
                },

            }
        },

        methods:{
            //详情
            queryDetail(){
                QueryMerchantReputationEquityDetails.call(this, {
                    reId: this.id
                }).then(res => {
                    if (res.code === 1) {
                        let _data = res.data.merchantReputationEquity;
                        _data.reNextAdvertisingFeeProportion = _data.reNextAdvertisingFeeProportion ? parseInt(_data.reNextAdvertisingFeeProportion) : 0;
                        _data.reNextHotsearchProportion = _data.reNextHotsearchProportion ? parseInt(_data.reNextHotsearchProportion) : 0;
                        _data.reNextBondProportion = _data.reNextBondProportion ? parseInt(_data.reNextBondProportion) : 0;
                        _data.reReturnUsagefeeProportion = _data.reReturnUsagefeeProportion ? parseInt(_data.reReturnUsagefeeProportion) : 0;
                        this.postData = _data;
                    }
                });
            },
            submit(){
                this.$refs['ruleForm'].validate((valid) => {
                    if (valid) {
                        UpdateMerchantReputationEquity.call(this, this.postData).then(res => {
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
