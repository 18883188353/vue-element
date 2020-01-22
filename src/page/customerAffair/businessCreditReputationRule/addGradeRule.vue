<template>
    <div>
        <div class="main">

            <!--营业执照到期开始-->
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <b class="mr10">信誉等级规则</b>
                </div>
                <div class="text item">
                    <el-row style="padding: 0 10%">
                        <el-form label-width="150px" :model="postData" size="" :rules="rules" ref="ruleForm">
                            <el-form-item label="信誉等级：" prop="rgReputationGrade">
                                <el-select v-model="postData.rgReputationGrade" placeholder="请选择信誉等级">
                                    <el-option v-for="(item,index) in rgReputationGradeOption" :label="item.value" :value="item.value" :key="index"></el-option>
                                </el-select>
                            </el-form-item>

                            <el-form-item label="信誉分数：" class="label_inline" prop="rgMinScore">
                                <el-input v-model="postData.rgMinScore"></el-input> —
                            </el-form-item>
                            <el-form-item label-width="0" class="label_inline" prop="rgMaxScore">
                                <el-input v-model="postData.rgMaxScore"></el-input>
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

    import QueryReputationGradeDetails from '../../../api/customerAffair/queryReputationGradeDetails'
    import UpdateReputationGrade from '../../../api/customerAffair/updateReputationGrade'

    export default {

        data(){
            return {
                postData: {
                    rgReputationGrade: '',
                    rgMinScore: '',
                    rgMaxScore: '',
                    rgState: 1,
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
                    rgMinScore: [
                        { required: true, message: '请输入最小信誉分', trigger: 'blur' },
                    ],
                    rgMaxScore: [
                        { required: true, message: '请输入最大信誉分', trigger: 'blur' },
                    ],
                    rgReputationGrade: [
                        { required: true, message: '请选择信誉等级', trigger: 'change' }
                    ],
                },
            }
        },

        methods:{
            //详情
            queryDetail(){
                QueryReputationGradeDetails.call(this, {
                    rgId: this.id
                }).then(res => {
                    if (res.code === 1) {
                        this.postData = res.data.merchantReputationGrade;
                    }
                });
            },
            submit(){
                this.$refs['ruleForm'].validate((valid) => {
                        if (valid) {
                            UpdateReputationGrade.call(this, this.postData).then(res => {
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
