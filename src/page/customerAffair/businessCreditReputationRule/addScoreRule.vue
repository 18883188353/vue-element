<template>
    <div>
        <div class="main">

            <!--营业执照到期开始-->
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <b class="mr10">店铺评分规则设置</b>
                </div>
                <div class="text item">
                    <el-row style="padding: 0 10%">
                        <el-form label-width="150px" :model="postData" size="" :rules="rules" ref="ruleForm">
                            <el-form-item label="评分项目：" prop="ssScoringItems">
                                <el-select v-model="postData.ssScoringItems" placeholder="请选择评分项目">
                                    <el-option v-for="(item,index) in ssScoringItemsOption" :label="item.ruleName" :value="item.type" :key="index"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="评价等级：" prop="ssEvaluate">
                                <el-select v-model="postData.ssEvaluate" @change="ssEvaluateChange" placeholder="请选择评价等级">
                                    <el-option v-for="(item,index) in ssEvaluateOption" :label="item.ruleName" :value="item.type" :key="index"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="分值：" prop="ssScore">
                                <el-select v-model="postData.ssScore" placeholder="请选择分值">
                                    <el-option v-for="(item, index) in dictionaryList" :label="item.ruleName" :value="item.type" :key="index"></el-option>
                                </el-select>
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

    import QueryOverallStoreScoringDetails from '../../../api/customerAffair/queryOverallStoreScoringDetails'
    import UpdateOverallStoreScoringRules from '../../../api/customerAffair/updateOverallStoreScoringRules'
    import QueryMerchantDictionary from '../../../api/customerAffair/queryMerchantDictionary'

    export default {

        data(){
            return {
                postData: {
                    ssScoringItems: '',
                    ssEvaluate: '',
                    ssScore: '',
                },
                id: this.$route.params.id,
                ssScoringItemsOption: [
                    /*{
                        value: 1,
                        label: '商品'
                    },{
                        value: 2,
                        label: '包装'
                    },{
                        value: 3,
                        label: '服务'
                    },{
                        value: 4,
                        label: '物流'
                    },*/
                ],
                ssEvaluateOption: [
                    /*{
                        value: 1,
                        label: '较差'
                    },{
                        value: 2,
                        label: '一般'
                    },{
                        value: 3,
                        label: '满意'
                    },{
                        value: 4,
                        label: '超赞'
                    },*/
                ],
                dictionaryList:[],
                ssScoringItemsCode:4000,
                ssEvaluateCode:5000,
                rules: {
                    ssScoringItems: [
                        { required: true, message: '请选择评分项目', trigger: 'change' },
                    ],
                    ssEvaluate: [
                        { required: true, message: '请选择评价等级', trigger: 'change' },
                    ],
                    ssScore: [
                        { required: true, message: '请选择分值', trigger: 'change' },
                    ],
                },
            }
        },

        methods:{
            //详情
            queryDetail(){
                QueryOverallStoreScoringDetails.call(this, {
                    ssId: this.id
                }).then(res => {
                    if (res.code === 1) {
                        this.postData = res.data.overallStoreScoringRules;
                        if (this.postData && this.postData.ssEvaluate) {
                            this.queryScore(this.postData.ssEvaluate);
                        }
                    }
                });
            },
            submit(){
                this.$refs['ruleForm'].validate((valid) => {
                    if (valid) {
                        UpdateOverallStoreScoringRules.call(this, this.postData).then(res => {
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
            },
            ssEvaluateChange() {
                this.postData.ssScore = '';
                this.queryScore(this.postData.ssEvaluate);
            },
            queryScore(e) {
                let _postData = {
                    handIs: 1
                };
                if (e === 1) {
                    _postData.code =600001;
                } else if (e === 2) {
                    _postData.code=600002;
                } else if (e === 3 ) {
                    _postData.code=600003;
                } else if (e === 4) {
                    _postData.code=600004;
                }else if (e === 4000) {
                    _postData.parentId=4000;
                }else if (e === 5000) {
                    _postData.parentId=5000;
                }
                QueryMerchantDictionary.call(this, _postData).then(res => {
                    console.log(res, 'QueryMerchantDictionary');
                    if (res.code === 1) {
                        if (e === 4000) {
                            this.ssScoringItemsOption = res.data.merchantBasiccreditDictionaryList;
                        }else if (e === 5000) {
                            this.ssEvaluateOption = res.data.merchantBasiccreditDictionaryList;
                        }else {
                            this.dictionaryList = res.data.merchantBasiccreditDictionaryList;
                        }
                    }
                });
            }
        },

        created(){
            this.queryScore(this.ssScoringItemsCode);
            this.queryScore(this.ssEvaluateCode);
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
</style>
