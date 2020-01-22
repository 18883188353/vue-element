<template>
    <div>
        <div class="main">


            <!--营业执照到期开始-->
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <b class="mr10">信誉计分规则</b>
                </div>
                <div class="text item">
                    <el-row style="padding: 0 10%">
                        <el-form label-width="150px" :model="postData" size="" :rules="rules" ref="ruleForm">
                            <el-form-item label="来源分类：" prop="reType">
                                <el-select v-model="postData.reType" @change="reTypeChange" placeholder="请选择来源分类">
                                    <el-option v-for="(item, index) in reTypeList" :label="item.dicName" :value="item.code" :key="index"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="事件：" prop="reType">
                                <el-select v-model="postData.reEvent" placeholder="请选择事件">
                                    <el-option v-for="(item, index) in reEventList" :label="item.dicName" :value="item.code" :key="index"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="事件标准：" prop="reEventStandard">
                                <el-input v-model="postData.reEventStandard"></el-input>
                            </el-form-item>
                            <el-form-item label="渠道来源：" prop="reChannel">
                                <el-select v-model="postData.reChannel" @change="reChannelChange" placeholder="请选择渠道来源">
                                    <el-option v-for="(item, index) in dictionaryList" :label="item.ruleName" :value="item.code" :key="index"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="结果判定：" prop="reResultJudgement">
                                <el-select v-model="postData.reResultJudgement" @change="reResultJudgementChange" placeholder="请选择结果判定">
                                    <el-option v-for="(item, index) in reResultJudgement" :label="item.ruleName" :value="item.code" :key="index"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="执行方式：" prop="reModeExecution">
                                <el-select v-model="postData.reModeExecution" placeholder="请选择执行方式">
                                    <el-option v-for="(item, index) in reModeExecution" :label="item.ruleName" :value="item.code" :key="index"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="分值：" prop="reScore">
                                <el-select v-model="postData.isScore" placeholder="请选择类型">
                                    <el-option label="增加" :value="0"></el-option>
                                    <el-option label="减少" :value="1"></el-option>
                                </el-select>
                                <el-input placeholder="请输入执分值" v-model="postData.reScore"></el-input>
                            </el-form-item>
                            <el-form-item label="参数条件：">
                                <el-checkbox-group v-model="checkList">
                                    <el-checkbox label="1">活动类型</el-checkbox>
                                    <el-checkbox label="2">数量</el-checkbox>
                                    <el-checkbox label="3">时间段</el-checkbox>
                                    <el-checkbox label="4">评论类型</el-checkbox>
                                    <el-checkbox label="5">评论等级</el-checkbox>
                                    <el-checkbox label="6">运费</el-checkbox>
                                </el-checkbox-group>
                            </el-form-item>
                            <el-form-item label="活动类型：" v-if="checkList.indexOf('1') > -1">
                                <el-select v-model="formInline.activityType" placeholder="请选择活动类型">
                                    <el-option v-for="(item, index) in activityTypeOption" :label="item.value" :value="item.value" :key="index"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="总计数量：" v-if="checkList.indexOf('2') > -1">
                                <el-input v-model="formInline.totalSum"></el-input>
                            </el-form-item>
                            <el-form-item label="累计数量：" v-if="checkList.indexOf('2') > -1">
                                <el-input v-model="formInline.sum"></el-input>
                            </el-form-item>
                            <el-form-item label="时间段：" v-if="checkList.indexOf('3') > -1">
                                <el-input placeholder="请输入内容" v-model="formInline.time1" class="input-with-select">
                                    <el-select v-model="formInline.timeType" disabled slot="prepend" placeholder="请选择">
                                        <el-option label="年" value="1"></el-option>
                                        <el-option label="月" value="2"></el-option>
                                        <el-option label="天" value="3"></el-option>
                                        <el-option label="时" value="4"></el-option>
                                        <el-option label="分" value="5"></el-option>
                                        <el-option label="秒" value="6"></el-option>
                                    </el-select>
                                </el-input>
                                <el-input placeholder="请输入内容" v-model="formInline.time2" class="input-with-select">
                                    <el-select v-model="formInline.timeType" disabled slot="prepend" placeholder="请选择">
                                        <el-option label="年" value="1"></el-option>
                                        <el-option label="月" value="2"></el-option>
                                        <el-option label="天" value="3"></el-option>
                                        <el-option label="时" value="4"></el-option>
                                        <el-option label="分" value="5"></el-option>
                                        <el-option label="秒" value="6"></el-option>
                                    </el-select>
                                </el-input>
                            </el-form-item>
                            <el-form-item label="评论类型：" v-if="checkList.indexOf('4') > -1">
                                <el-select v-model="formInline.title" placeholder="请选择评论类型">
                                    <el-option v-for="(item, index) in titleOption" :label="item.value" :value="item.value" :key="index"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="评论等级：" v-if="checkList.indexOf('5') > -1">
                                <el-select v-model="formInline.evaluateType" placeholder="请选择评论等级">
                                    <el-option v-for="(item, index) in evaluateTypeOption" :label="item.label" :value="item.value" :key="index"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="运费：" v-if="checkList.indexOf('6') > -1">
                                <el-input v-model="formInline.freight"></el-input>
                            </el-form-item>

                            <el-form-item label="">
                                <el-button type="primary" size="" @click="updateCreditRule">完成</el-button>
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
    import UpdateReputationRule from '../../../api/customerAffair/updateReputationRule'
    import QueryMerchantDictionary from '../../../api/customerAffair/queryMerchantDictionary'
    import QueryReputationRuleDetails from '../../../api/customerAffair/queryReputationRuleDetails'

    export default {

        data(){
            return {
                formInline: {
                    activityType: '',  //活动类型
                    timeType: '3',  //时间类型
                    time1: '',  //开始时间
                    time2: '',  //结束时间
                    totalSum: '',  //总计数量
                    sum: '',  //累计数量
                    title: '',  //评论类型
                    evaluateType: '',  //评论等级
                    freight: '',  //运费
                },
                checkList: [],
                activityTypeOption: [
                    {
                        value: '拼单'
                    },{
                        value: '折扣'
                    },{
                        value: '赠品'
                    },{
                        value: '优惠券'
                    },{
                        value: '包邮'
                    },{
                        value: '返券'
                    },
                ],
                titleOption: [
                    {
                        value: '商品'
                    },{
                        value: '包装'
                    },{
                        value: '服务'
                    },{
                        value: '物流'
                    }
                ],
                evaluateTypeOption: [
                    {
                        value: '较差*1',
                        label: '较差'
                    },{
                        value: '一般*2',
                        label: '一般'
                    },{
                        value: '满意*3',
                        label: '满意'
                    },{
                        value: '超赞*4',
                        label: '超赞'
                    }
                ],
                id: this.$route.params.id,
                reEventList: [], //信用事件列表
                reTypeList: [],  //信用来源列表
                dictionaryList: [], //渠道
                reResultJudgement: [],//结果判定
                reModeExecution: [], //执行方式
                postData: {
                    reId: '',
                    reType: '',
                    reEvent: '',
                    reEventStandard: '',
                    isScore: 1,
                    reScore: '',
                    reConditionalData: '',
                    reOtherPunishre: '',
                    reChannel: '',
                    reResultJudgement: '',
                    reModeExecution: '',
                    reState:1,
                },
                rules: {
                    reType: [
                        { required: true, message: '请选择来源分类', trigger: 'change' },
                    ],
                    reEvent: [
                        { required: true, message: '请选择事件', trigger: 'change' },
                    ],
                    reEventStandard: [
                        { required: true, message: '请输入事件标准', trigger: 'blur' },
                    ],
                    reChannel: [
                        { required: true, message: '请选择渠道来源', trigger: 'change' },
                    ],
                    reResultJudgement: [
                        { required: true, message: '请选择结果判定', trigger: 'change' },
                    ],
                    reModeExecution: [
                        { required: true, message: '请选择执行方式', trigger: 'change' },
                    ],
                    reScore: [
                        { required: true, message: '请输入分值', trigger: 'blur' },
                    ],
                    activityType: [
                        { required: true, message: '请选择活动类型', trigger: 'change' },
                    ],
                    time1: [
                        { required: true, message: '请输入时间', trigger: 'blur' },
                        { type: 'number', message: '必须为数字值'}
                    ],
                    /*time2: [
                        { required: true, message: '请输入时间二', trigger: 'blur' },
                        { type: 'number', message: '必须为数字值'}
                    ],*/
                    totalSum: [
                        { required: true, message: '请输入总计', trigger: 'blur' },
                        { type: 'number', message: '总计必须为数字值'}
                    ],
                    sum: [
                        { required: true, message: '请输入累计', trigger: 'blur' },
                        { type: 'number', message: '累计必须为数字值'}
                    ],
                    title: [
                        { required: true, message: '请选择评论类型', trigger: 'change' },
                    ],
                    evaluateType: [
                        { required: true, message: '请选择评论等级', trigger: 'change' },
                    ],
                    freight: [
                        { required: true, message: '请输入运费', trigger: 'blur' },
                        { type: 'number', message: '运费必须为数字值'}
                    ],
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
                QueryReputationRuleDetails.call(this, {
                    reId: this.id
                }).then(res => {
                    if (res.code === 1) {
                        let _data = res.data.merchantReputationRulesVo
                        this.postData = _data;
                        if (_data) {
                            if (_data.reType) {
                                this.queryDictionary(this.postData.reType);
                            }

                            if (_data.reChannel) {
                                this.queryMerchantDictionary(this.postData.reChannel, 'reResultJudgement');
                            }

                            if (_data.reResultJudgement) {
                                this.queryMerchantDictionary(this.postData.reResultJudgement, 'reModeExecution');
                            }

                            if (_data.reConditionalData) {
                                let _dataJson = JSON.parse(_data.reConditionalData);
                                let _checkList = [];
                                if (_dataJson.activityType) {
                                    this.formInline.activityType = _dataJson.activityType;
                                    _checkList.push('1');
                                }
                                if (_dataJson.time1 || _dataJson.time2) {
                                    this.formInline.time1 = _dataJson.time1;
                                    this.formInline.time2 = _dataJson.time2;
                                    _checkList.push('3');
                                }
                                if (_dataJson.totalSum || _dataJson.sum) {
                                    this.formInline.totalSum = _dataJson.totalSum;
                                    this.formInline.sum = _dataJson.sum;
                                    _checkList.push('2');
                                }
                                if (_dataJson.title) {
                                    this.formInline.title = _dataJson.title;
                                    _checkList.push('4');
                                }
                                if (_dataJson.evaluateType) {
                                    this.formInline.evaluateType = _dataJson.evaluateType;
                                    _checkList.push('5');
                                }
                                if (_dataJson.freight) {
                                    this.formInline.freight = _dataJson.freight;
                                    _checkList.push('6');
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
                    parentId: code ? code : 2000
                };
                QueryDictionary.call(this, _postData).then(res => {
                    console.log(res, 'queryDictionary');
                    if (res.code === 1) {
                        if (code){
                            //reEventList  事件
                            this.reEventList = res.data.commodityScoreDictionaryList;
                        }else {
                            //reTypeList  分类
                            this.reTypeList = res.data.commodityScoreDictionaryList;
                        }
                    }
                });
            },
            //来源类型改变
            reTypeChange(){
                this.postData.reEvent = '';
                this.reEventList = [];
                if (this.postData.reType) {
                    this.queryDictionary(this.postData.reType);
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
                            if (type === 'reResultJudgement') {
                                this.reResultJudgement = res.data.merchantBasiccreditDictionaryList;
                            }else if (type === 'reModeExecution') {
                                this.reModeExecution = res.data.merchantBasiccreditDictionaryList;
                            }
                        } else {
                            this.dictionaryList = res.data.merchantBasiccreditDictionaryList;
                        }
                    }
                });
            },
            reChannelChange() {
                this.reResultJudgement = [];
                this.reModeExecution = [];
                this.postData.reResultJudgement = '';
                this.postData.reModeExecution = '';
                this.queryMerchantDictionary(this.postData.reChannel, 'reResultJudgement');
            },
            reResultJudgementChange(){
                this.reModeExecution = [];
                this.postData.reModeExecution = '';
                this.queryMerchantDictionary(this.postData.reResultJudgement, 'reModeExecution');
            },
            updateCreditRule(){
                this.$refs['ruleForm'].validate((valid) => {
                    if (valid) {
                        let dataJson = {};
                        if (this.checkList.indexOf('1') > -1) {
                            dataJson.activityType = this.formInline.activityType;
                        }
                        if (this.checkList.indexOf('3') > -1) {
                            dataJson.time1 = this.formInline.time1;
                            dataJson.time2 = this.formInline.time2;
                        }
                        if (this.checkList.indexOf('2') > -1) {
                            dataJson.totalSum = this.formInline.totalSum;
                            dataJson.sum = this.formInline.sum;
                        }
                        if (this.checkList.indexOf('4') > -1) {
                            dataJson.title = this.formInline.title;
                        }
                        if (this.checkList.indexOf('5') > -1) {
                            dataJson.evaluateType = this.formInline.evaluateType;
                        }
                        if (this.checkList.indexOf('6') > -1) {
                            dataJson.freight = this.formInline.freight;
                        }

                        let _postData = {
                            reId: this.postData.reId,
                            reType: this.postData.reType,
                            reEvent: this.postData.reEvent,
                            reEventStandard: this.postData.reEventStandard,
                            isScore: this.postData.isScore,
                            reScore: this.postData.reScore,
                            reConditionalData: this.checkList.length > 0 ? JSON.stringify(dataJson) : '',
                            reOtherPunishre: this.postData.reOtherPunishre,
                            reChannel: this.postData.reChannel,
                            reResultJudgement: this.postData.reResultJudgement,
                            reModeExecution: this.postData.reModeExecution,
                            reState:1,
                        };
                        // console.log(_postData, '_postData+++++++++++');
                        // return;
                        UpdateReputationRule.call(this, _postData).then(res => {
                            console.log(res, 'UpdateReputationRule');
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
