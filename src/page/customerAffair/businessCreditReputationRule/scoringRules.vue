<template>
    <div>
        <div class="main">


            <!--营业执照到期开始-->
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <b class="mr10">信用计分规则</b>
                </div>
                <div class="text item">
                    <el-row style="padding: 0 10%">
                        <el-form label-width="150px" :model="postData" size="" :rules="rules" ref="ruleForm">
                            <el-form-item label="来源分类：" prop="crType">
                                <el-select v-model="postData.crType" @change="crTypeChange" placeholder="请选择来源分类">
                                    <el-option v-for="(item, index) in crTypeList" :label="item.dicName" :value="item.code" :key="index"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="事件：" prop="crBehavior">
                                <el-select v-model="postData.crBehavior" placeholder="请选择事件">
                                    <el-option v-for="(item, index) in crBehaviorList" :label="item.dicName" :value="item.code" :key="index"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="事件标准：" prop="crPlot">
                                <el-input v-model="postData.crPlot"></el-input>
                            </el-form-item>
                            <el-form-item label="严重程度：" prop="crSeverity">
                                <el-select v-model="postData.crSeverity" placeholder="请选择严重程度">
                                    <el-option v-for="(item, index) in severityOption" :label="item.label" :value="item.value" :key="index"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="其他处罚：" prop="crOtherPunish">
                                <el-input v-model="postData.crOtherPunish"></el-input>
                            </el-form-item>
                            <el-form-item label="渠道来源：" prop="crChannel">
                                <el-select v-model="postData.crChannel" @change="crChannelChange" placeholder="请选择渠道来源">
                                    <el-option v-for="(item, index) in dictionaryList" :label="item.ruleName" :value="item.code" :key="index"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="结果判定：" prop="crResultJudgement">
                                <el-select v-model="postData.crResultJudgement" @change="crResultJudgementChange" placeholder="请选择结果判定">
                                    <el-option v-for="(item, index) in crResultJudgement" :label="item.ruleName" :value="item.code" :key="index"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="执行方式：" prop="crModeExecution">
                                <el-select v-model="postData.crModeExecution" placeholder="请选择执行方式">
                                    <el-option v-for="(item, index) in crModeExecution" :label="item.ruleName" :value="item.code" :key="index"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="分值：" prop="crScore">
                                <el-select v-model="postData.isScore" placeholder="请选择执分值">
                                    <el-option label="增加" :value="0"></el-option>
                                    <el-option label="减少" :value="1"></el-option>
                                </el-select>
                                <el-input v-model="postData.crScore"></el-input>
                            </el-form-item>
                            <el-form-item label="参数条件：">
                                <el-checkbox-group v-model="checkList" @change="checkListChange">
                                    <el-checkbox label="1" >时间段</el-checkbox>
                                    <el-checkbox label="2">数量</el-checkbox>
                                </el-checkbox-group>
                            </el-form-item>
                            <el-form-item label="时间段：" v-if="timeFlag">
                                <el-input placeholder="请输入内容" v-model="formInline.time1" class="input-with-select">
                                    <el-select v-model="formInline.select" slot="prepend" disabled="disabled" placeholder="请选择">
                                        <el-option label="年" value="1"></el-option>
                                        <el-option label="月" value="2"></el-option>
                                        <el-option label="天" value="3"></el-option>
                                        <el-option label="时" value="4"></el-option>
                                        <el-option label="分" value="5"></el-option>
                                        <el-option label="秒" value="6"></el-option>
                                    </el-select>
                                </el-input>
                                <el-input placeholder="请输入内容" v-model="formInline.time2" class="input-with-select">
                                    <el-select v-model="formInline.select" slot="prepend" disabled="disabled" placeholder="请选择">
                                        <el-option label="年" value="1"></el-option>
                                        <el-option label="月" value="2"></el-option>
                                        <el-option label="天" value="3"></el-option>
                                        <el-option label="时" value="4"></el-option>
                                        <el-option label="分" value="5"></el-option>
                                        <el-option label="秒" value="6"></el-option>
                                    </el-select>
                                </el-input>
                            </el-form-item>
                            <el-form-item label="总计数量：" v-if="numFlag">
                                <el-input v-model="formInline.totalSum"></el-input>
                            </el-form-item>
                            <el-form-item label="累计数量：" v-if="numFlag">
                                <el-input v-model="formInline.sum"></el-input>
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

    import QueryDictionary from '../../../api/customerAffair/queryDictionary'
    import UpdateCreditRule from '../../../api/customerAffair/updateCreditRule'

    import QueryMerchantDictionary from '../../../api/customerAffair/queryMerchantDictionary'
    import QueryCreditRuleDetails from '../../../api/customerAffair/queryCreditRuleDetails'
    export default {

        data(){
            return {
                formInline: {
                    select: '3',
                    time1: '',
                    time2: '',
                    totalSum: '',
                    sum: '',
                },
                checkList: [],
                numFlag: false,
                timeFlag: false,

                id: this.$route.params.id,
                crBehaviorList: [], //信用事件列表
                crTypeList: [],  //信用来源列表
                dictionaryList: [], //渠道
                crResultJudgement: [],//结果判定
                crModeExecution: [], //执行方式
                postData: {
                    crId: '',
                    crType: '',
                    crBehavior: '',
                    crPlot: '',
                    crSeverity: '',
                    isScore: 1,
                    crScore: '',
                    crConditionalData: '',
                    crOtherPunish: '',
                    crChannel: '',
                    crResultJudgement: '',
                    crModeExecution: '',
                    crState: 1,
                },
                rules: {
                    crType: [
                        { required: true, message: '请选择来源分类', trigger: 'change' },
                    ],
                    crBehavior: [
                        { required: true, message: '请选择事件', trigger: 'change' },
                    ],
                    crPlot: [
                        { required: true, message: '请输入事件标准', trigger: 'blur' },
                    ],
                    crSeverity: [
                        { required: true, message: '请选择严重程度', trigger: 'change' },
                    ],
                    crOtherPunish: [
                        { required: true, message: '请输入其它处罚', trigger: 'blur' },
                    ],

                    crChannel: [
                        { required: true, message: '请选择渠道来源', trigger: 'change' },
                    ],
                    crResultJudgement: [
                        { required: true, message: '请选择结果判定', trigger: 'change' },
                    ],
                    crModeExecution: [
                        { required: true, message: '请选择执行方式', trigger: 'change' },
                    ],
                    crScore: [
                        { required: true, message: '请输入分值', trigger: 'blur' },
                    ],
                    /*time2: [
                        { required: true, message: '请输入时间二', trigger: 'blur' },
                        { type: 'number', message: '必须为数字值'}
                    ],*/
                },
                severityOption: [
                    {
                        label: '情节轻微',
                        value: 1,
                    }, {
                        label: '情节严重',
                        value: 2,
                    }, {
                        label: '情节特别严重',
                        value: 3,
                    }
                ],

            }
        },

        methods:{
            queryDetail(){
                QueryCreditRuleDetails.call(this, {
                    crId: this.id
                }).then(res => {
                    if (res.code === 1) {
                        let _data = res.data.merchantCreditRulesVo
                        this.postData = _data;
                        if (_data) {
                            if (_data.crType) {
                                this.queryDictionary(this.postData.crType);
                            }

                            if (_data.crChannel) {
                                this.queryMerchantDictionary(this.postData.crChannel, 'crResultJudgement');
                            }

                            if (_data.crResultJudgement) {
                                this.queryMerchantDictionary(this.postData.crResultJudgement, 'crModeExecution');
                            }

                            if (_data.crConditionalData) {
                                let _dataJson = JSON.parse(_data.crConditionalData);
                                let _checkList = [];
                                if (_dataJson.time1 || _dataJson.time2) {
                                    this.timeFlag = true;
                                    this.formInline.time1 = _dataJson.time1;
                                    this.formInline.time2 = _dataJson.time2;
                                    _checkList.push('1');
                                }
                                if (_dataJson.totalSum || _dataJson.sum) {
                                    this.numFlag = true;
                                    this.formInline.totalSum = _dataJson.totalSum;
                                    this.formInline.sum = _dataJson.sum;
                                    _checkList.push('2');
                                }
                                this.checkList = _checkList;
                            }
                        }

                    }
                });
            },
            /**
             * 来源字典  code 如果有参数，则就是查事件
             */
            queryDictionary(code){
                let _postData = {
                    handIs: -1,
                    parentId: code ? code : 1000
                };
                QueryDictionary.call(this, _postData).then(res => {
                    console.log(res, 'queryDictionary');
                    if (res.code === 1) {
                        if (code){
                            //crBehaviorList  事件
                            this.crBehaviorList = res.data.commodityScoreDictionaryList;
                        }else {
                            //crTypeList  分类
                            this.crTypeList = res.data.commodityScoreDictionaryList;
                        }
                    }
                });
            },
            //来源类型改变
            crTypeChange(){
                this.postData.crBehavior = '';
                this.crBehaviorList = [];
                if (this.postData.crType) {
                    this.queryDictionary(this.postData.crType);
                }
            },
            //查询来源渠道分类
            queryMerchantDictionary(code, type){
                let _postData = {
                    parentId: code ? code : 1000
                };
                QueryMerchantDictionary.call(this, _postData).then(res => {
                    console.log(res, 'QueryMerchantDictionary');
                    if (res.code === 1) {
                        if (code){
                            if (type === 'crResultJudgement') {
                                this.crResultJudgement = res.data.merchantBasiccreditDictionaryList;
                            }else if (type === 'crModeExecution') {
                                this.crModeExecution = res.data.merchantBasiccreditDictionaryList;
                            }
                        } else {
                            this.dictionaryList = res.data.merchantBasiccreditDictionaryList;
                        }
                    }
                });
            },
            crChannelChange() {
                this.crResultJudgement = [];
                this.crModeExecution = [];
                this.postData.crResultJudgement = '';
                this.postData.crModeExecution = '';
               this.queryMerchantDictionary(this.postData.crChannel, 'crResultJudgement');
            },
            crResultJudgementChange(){
                this.crModeExecution = [];
                this.postData.crModeExecution = '';
                this.queryMerchantDictionary(this.postData.crResultJudgement, 'crModeExecution');
            },
            // 参数条件改变
            checkListChange() {
                let _timeFlag = false;
                let _numFlag = false;
                this.checkList.map(item =>{
                    if (item === '1') {
                        _timeFlag = true;
                    }else if(item === '2') {
                        _numFlag = true;
                    }
                });
                this.timeFlag = _timeFlag;
                this.numFlag = _numFlag;
            },
            updateCreditRule(){
                let dataJson = {};
                if (this.numFlag) {
                    dataJson.totalSum = this.formInline.totalSum;
                    dataJson.sum = this.formInline.sum;
                }
                if (this.timeFlag) {
                    dataJson.time1 = this.formInline.time1;
                    dataJson.time2 = this.formInline.time2;
                }

                let _postData = {
                    crId: this.postData.crId,
                    crType: this.postData.crType,
                    crBehavior: this.postData.crBehavior,
                    crPlot: this.postData.crPlot,
                    crSeverity: this.postData.crSeverity,
                    isScore: this.postData.isScore,
                    crScore: this.postData.crScore,
                    crConditionalData: this.numFlag || this.timeFlag ? JSON.stringify(dataJson) : '',
                    crOtherPunish: this.postData.crOtherPunish,
                    crChannel: this.postData.crChannel,
                    crResultJudgement: this.postData.crResultJudgement,
                    crModeExecution: this.postData.crModeExecution,
                    crState:1,
                };
                // console.log(_postData, '_postData+++++++++++');
                // return;
                UpdateCreditRule.call(this, _postData).then(res => {
                    console.log(res, 'queryShopCreditList');
                    if (res.code === 1) {
                        this.$message.success('操作成功');
                        this.back();
                    }else {
                        this.$message.error('操作失败')
                    }
                });
            },
            submit() {
                this.$refs['ruleForm'].validate((valid) => {
                    if (valid) {
                        this.updateCreditRule();
                    }else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            back() {
                this.$router.go(-1);
            }
        },

        created(){
            this.queryDictionary();
            this.queryMerchantDictionary();
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
