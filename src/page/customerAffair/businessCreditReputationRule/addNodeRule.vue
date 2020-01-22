<template>
    <div>
        <div class="main">

            <!--营业执照到期开始-->
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <b class="mr10">信用分节点处理规则</b>
                </div>
                <div class="text item">
                    <el-row style="padding: 0 10%">
                        <el-form label-width="160px" :model="postData" size="" :rules="rules" ref="ruleForm">
                            <el-form-item label="信誉分数：" class="label_inline" prop="nminScore">
                                <el-input v-model.number="postData.nminScore"></el-input> —
                            </el-form-item>
                            <el-form-item label-width="0" class="label_inline" prop="nmaxScore">
                                <el-input v-model.number="postData.nmaxScore"></el-input>
                            </el-form-item>
                            <el-form-item label="次年商品保证金：" prop="nreduceBondProportion">
                                <el-input placeholder="请输入内容" v-model.number="postData.nreduceBondProportion" class="input-with-select">
                                    <el-select v-model.number="postData.nmarginChanges" slot="prepend" placeholder="请选择">
                                        <el-option label="增加" :value="1"></el-option>
                                        <el-option label="减少" :value="2"></el-option>
                                        <el-option label="不变" :value="3"></el-option>
                                    </el-select>
                                    <el-button slot="append">%</el-button>
                                </el-input>
                            </el-form-item>
                            <el-form-item label="次年返平台使用年费：" prop="nreturnUsagefeeProportion">
                                <el-input placeholder="请输入内容" v-model.number="postData.nreturnUsagefeeProportion" class="input-with-select">
                                    <el-button slot="append">%</el-button>
                                </el-input>
                            </el-form-item>
                            <el-form-item label="支付违约金：" prop="npayPenalty">
                                <el-input v-model.number="postData.npayPenalty"></el-input>
                            </el-form-item>
                            <el-form-item label="关闭店铺：" prop="ncloseShop">
                                <el-radio-group v-model="postData.ncloseShop">
                                    <el-radio :label="1">是</el-radio>
                                    <el-radio :label="2">否</el-radio>
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
    import QueryCreditNodeDetails from '../../../api/customerAffair/queryCreditNodeDetails'
    import UpdateCreditNode from '../../../api/customerAffair/updateCreditNode'

    export default {

        data(){
            return {
                postData: {
                    nminScore: '',
                    nmaxScore: '',
                    nmarginChanges: '',
                    nreduceBondProportion: '',
                    nreturnUsagefeeProportion: '',
                    npayPenalty: '',
                    ncloseShop: '',
                    nstate: 1,
                },
                id: this.$route.params.id,
                rules: {
                    nminScore: [
                        { required: true, message: '请输入最小信誉分', trigger: 'blur' },
                        { type: 'number', message: '必须为数字值'}
                    ],
                    nmaxScore: [
                        { required: true, message: '请输入最大信誉分', trigger: 'blur' },
                        { type: 'number', message: '必须为数字值'}
                    ],
                    nreduceBondProportion: [
                        { required: true, message: '请输入次年保证金', trigger: 'blur' },
                        { type: 'number', message: '必须为数字值'}
                    ],
                    nreturnUsagefeeProportion: [
                        { required: true, message: '请输入次年返平台使用年费', trigger: 'blur' },
                        { type: 'number', message: '必须为数字值'}
                    ],
                    npayPenalty: [
                        { required: true, message: '请输入次年违约金', trigger: 'blur' },
                        { type: 'number', message: '必须为数字值'}
                    ],
                    ncloseShop: [
                        { required: true, message: '请输入次年返平台使用费', trigger: 'change' }
                    ],
                },
            }
        },

        methods:{
            //详情
            queryDetail(){
                QueryCreditNodeDetails.call(this, {
                    nId: this.id
                }).then(res => {
                    if (res.code === 1) {
                        let _data = res.data.merchantCreditNode;
                        _data.nreduceBondProportion = _data.nreduceBondProportion ? parseInt(_data.nreduceBondProportion) : 0;
                        _data.nreturnUsagefeeProportion = _data.nreturnUsagefeeProportion ? parseInt(_data.nreturnUsagefeeProportion) : 0;
                        this.postData = res.data.merchantCreditNode;
                    }
                });
            },
            submit(){
                this.$refs['ruleForm'].validate((valid) => {
                    if (valid) {
                        UpdateCreditNode.call(this, this.postData).then(res => {
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
