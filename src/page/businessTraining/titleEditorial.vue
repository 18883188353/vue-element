<template>
    <div>
        <div class="main">


            <!--流转事件开始-->
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <b class="mr10">新增/修改题目/修改题目</b>
                </div>
                <div class="text item">

                    <el-row style="padding: 0 ">
                        <el-col :span="12">
                            <el-col :span="23">
                                <el-card shadow="hover">
                                    <h3 class="tc">{{eidtIndex === -1 ? '新增' : '修改'}}题目</h3>
                                    <el-form ref="questionForm" :rules="questionRules" :model="question" label-width="150px" class="mt20">
                                        <el-form-item label="选择类型：" prop="type">
                                            <el-select v-model="question.type" placeholder="请选择选择类型">
                                                <el-option v-for="(item, index) in typeOptions" :key="index" :label="item.label" :value="item.value"></el-option>
                                            </el-select>
                                        </el-form-item>
                                        <el-form-item label="题目名称：" prop="title">
                                            <el-input placeholder="请输入题目名称" v-model="question.title"></el-input>
                                        </el-form-item>
                                        <el-form-item label="答案排序：" prop="answerSort">
                                            <el-select v-model="question.answerSort" placeholder="请选择答案排序">
                                                <el-option v-for="(item, index) in answerSortOptions" :key="index" :label="item.label" :value="item.value"></el-option>
                                            </el-select>
                                        </el-form-item>
                                        <el-form-item label="添加答案：">
                                            <el-input type="textarea" placeholder="请输入答案" v-model="answer.content"></el-input>
                                            <el-radio v-model="answer.isTrue" :label="true">正确答案</el-radio>
                                            <el-radio v-model="answer.isTrue" :label="false">错误答案</el-radio>
                                            <el-button type="primary" @click="addAnswaer">添加选项</el-button>
                                        </el-form-item>
                                        <el-form-item label="答案：">
                                            <ul v-for="(item, index) in question.examAnswers">
                                                <li>
                                                    <span :style="item.isTrue ? 'color: green' : 'color: red'">
                                                        <!--选项{{index + 1}}：{{item.content}}-->
                                                        选项{{index + 1}}：<el-input placeholder="请输入答案" v-model="item.content"></el-input>
                                                        <el-radio-group v-model="item.isTrue">
                                                            <el-radio :label="true">正确</el-radio>
                                                            <el-radio :label="false">错误</el-radio>
                                                        </el-radio-group>
                                                        <el-button @click="delAnswaer(index)">删除选项</el-button>
                                                    </span>
                                                </li>
                                            </ul>
                                        </el-form-item>
                                    </el-form>
                                    <div class="mt10 tr">
                                        <el-button type="primary" @click="addQuestion">{{eidtIndex === -1 ? '新增' : '修改'}}题目</el-button>
                                        <el-button @click="resetQuestion">重置</el-button>
                                    </div>
                                </el-card>
                            </el-col>
                        </el-col>
                        <el-col :span="12">
                            <el-col :span="23">
                                <el-card shadow="hover">
                                    <h3 class="tc">{{paper.title}}</h3>
                                    <ul class="training_list">
                                        <li v-for="(item, index) in paper.examQuestions">第{{index + 1}}题：{{item.title}} ({{getTypeStatus(item.type)}})
                                            <el-button @click="delQuestion(index)">删除</el-button> &nbsp;&nbsp;
                                            <el-button @click="editQuestion(index)">编辑</el-button>
                                        </li>
                                        <!--<li>第1题：满集网的网址是哪一个？(单选)<el-link type="primary">删除</el-link></li>
                                        <li>第1题：满集网的网址是哪一个？(单选)<el-link type="primary">删除</el-link></li>
                                        <li>第1题：满集网的网址是哪一个？(单选)<el-link type="primary">删除</el-link></li>-->
                                    </ul>
                                </el-card>
                            </el-col>
                            <el-col :span="23" class="mt20">
                                <el-card shadow="hover">
                                    <h3 class="tc mb20">设置及格标准</h3>
                                    答对<el-input v-model.number="paper.passNumber" type="number" placeholder="请输入内容"></el-input>道题目即为及格！
                                    <div class="mt10 tr">
                                        <el-button type="primary">预览</el-button>
                                    </div>
                                </el-card>
                            </el-col>
                            <el-col :span="23" class="mt20">
                                <el-card shadow="hover">
                                    <h3 class="tc mb20">设置考试时间</h3>
                                    <el-form ref="paperForm" :model="paper" :rules="paperRules" label-width="150px" class="mt20">
                                        <el-form-item label="考试标题：" prop="title">
                                            <el-input v-model="paper.title" placeholder="请输入考试标题"></el-input>
                                        </el-form-item>
                                        <el-form-item label="考试时间：" prop="time">
                                            <el-date-picker
                                                v-model="paper.time"
                                                type="daterange"
                                                :picker-options="pickerOptions"
                                                value-format="yyyy-MM-dd"
                                                range-separator="至"
                                                start-placeholder="开始日期"
                                                end-placeholder="结束日期"
                                            >
                                            </el-date-picker>
                                        </el-form-item>
                                        <!--<el-form-item label="考试截止时间：">2019-6-15</el-form-item>-->
                                        <el-form-item label="考试时长：" prop="examDuration">
                                            <el-input v-model.number="paper.examDuration" placeholder="请输入内容"></el-input>秒
                                        </el-form-item>
                                        <el-form-item label="选择考试对象：" prop="examScope">
                                            <el-select v-model="paper.examScope" placeholder="请选择选择考试对象">
                                                <el-option label="全部客服人员" value="all"></el-option>
                                            </el-select>
                                        </el-form-item>
                                    </el-form>
                                    <div class="mt10 tr">
                                        <el-button @click="back">返回</el-button>
                                        <el-button type="primary" @click="submit">保存</el-button>
                                    </div>
                                </el-card>
                            </el-col>
                        </el-col>
                    </el-row>
                </div>
            </el-card>
            <!--流转事件结束-->

            <bottom-footer></bottom-footer>

        </div>

    </div>
</template>

<script>
    import saveExamPaper from '../../api/other/saveExamPaper'
    import queryExamPaperDetail from '../../api/other/queryExamPaperDetail'

    import headTop from '../../components/headTop'
    import bottomFooter from '../../components/bottomFooter'
    export default {
        components: {
            headTop,
            bottomFooter,
        },
        data(){
            return {
                id: this.$route.query.id,
                question: {
                    type: '1',
                    title: '',
                    answerSort: '1',
                    examAnswers: []
                },
                answer: {
                    content: '',
                    isTrue: false
                },
                eidtIndex: -1,
                paper: {
                    title: '',
                    passNumber: '',
                    examDuration: '',
                    examScope: 'all',
                    startTime: '',
                    endTime: '',
                    examQuestions: [],
                    time: [],
                },
                typeOptions: [
                    {value: '1', label: '单选题'},
                    {value: '2', label: '多选题'},
                ],
                answerSortOptions: [
                    {value: '1', label: '正序'},
                    {value: '2', label: '乱序'},
                ],

                pickerOptions:{
                    disabledDate: (time) => {
                        return time.getTime() <= (new Date().getTime());//时间范围必须是时间戳
                    }
                },


                questionRules: {
                    title: [
                        { required: true, message: '请输入题目名称', trigger: 'blur' },
                    ],
                    type: [
                        { required: true, message: '请选择题目类型', trigger: 'change' },
                    ],
                    /*sum: [
                        { required: true, message: '请输入累计', trigger: 'blur' },
                        { type: 'number', message: '累计必须为数字值'}
                    ],*/
                    answerSort: [
                        { required: true, message: '请选择答案排序', trigger: 'change' },
                    ],
                },
                paperRules: {
                    examDuration: [
                        { required: true, message: '请输入考试时长', trigger: 'blur' },
                        { type: 'number', message: '累计必须为数字值'}
                    ],
                    title: [
                        { required: true, message: '请输入考试标题', trigger: 'blur' },
                    ],
                    time: [
                        { required: true, message: '请选择考试时间段', trigger: 'change' },
                    ],
                    examScope: [
                        { required: true, message: '请选择考试对象', trigger: 'change' },
                    ],
                }
            }
        },

        methods:{
            getTypeStatus(status){
                let _desc = '';
                this.typeOptions.map(item =>{
                    if (item.value === status) {
                        _desc = item.label;
                    }
                });
                return _desc;
            },
            //添加选项
            addAnswaer(){
                if (this.answer.content){
                    this.question.examAnswers.push(this.answer);
                    this.answer = {
                        content: '',
                        isTrue: false
                    };
                } else {
                    this.$message.warning('请输入答案内容！')
                }
            },
            delAnswaer(index){
                this.question.examAnswers.splice(index,1);
            },
            //添加题目
            addQuestion(){
                this.$refs['questionForm'].validate((valid) => {
                    if (valid) {
                        let trueCount = 0;
                        this.question.examAnswers.map(item => {
                            if (item.isTrue) {
                                trueCount ++;
                            }
                        });
                        if (this.question.type === '1') {
                            //单选题
                            if (trueCount !== 1){
                                this.$message.warning('当前题目为单选题，需要选项数大于0，并且正确选项只能有一个！')
                                return;
                            }
                        }else if (this.question.type === '2'){
                            //多选题
                            if (trueCount < 2){
                                this.$message.warning('当前题目为多选题，需要选项数大于1，并且正确选项数必须大于1！')
                                return;
                            }
                        }
                        let _question = {
                            type: this.question.type,
                            title: this.question.title,
                            answerSort: this.question.answerSort,
                            /*answerJson: JSON.stringify(this.question.examAnswers),*/
                            examAnswers: this.question.examAnswers,
                        };
                        //判断是修改题目 还是新增题目
                        if (this.eidtIndex === -1){
                            //新增
                            this.paper.examQuestions.push(_question);
                        } else {
                            this.paper.examQuestions[this.eidtIndex] = _question;
                        }
                        this.question = {
                                type: '1',
                                title: '',
                                answerSort: '1',
                                examAnswers: []
                            };
                        this.answer = {
                                content: '',
                                isTrue: false
                            };
                    }else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            //删除题目
            delQuestion(index){
                this.resetQuestion();
                this.paper.examQuestions.splice(index,1);
            },
            //编辑题目
            editQuestion(index){
                this.eidtIndex = index;
                this.question = JSON.parse(JSON.stringify(this.paper.examQuestions[index]));
            },
            //重置题目
            resetQuestion() {
                this.eidtIndex = -1;
                this.question = {
                    type: '1',
                    title: '',
                    answerSort: '1',
                    examAnswers: []
                };
            },
            //提交数据
            submit() {
                this.$refs['paperForm'].validate((valid) => {
                    if (valid) {
                        if (!(this.paper.passNumber || this.paper.passNumber === 0)){
                            this.$message.warning('请输入及格题数！');
                            return;
                        }
                        if (this.paper.passNumber > this.paper.examQuestions.length || this.paper.passNumber < 0){
                            this.$message.warning('及格题数不能超过题目数，并且大于0！');
                            return;
                        }
                        let _paper = {
                            id: this.paper.id,
                            title: this.paper.title,
                            passNumber: this.paper.passNumber,
                            examDuration: this.paper.examDuration,
                            examScope: this.paper.examScope,
                            startTime: this.paper.time[0],
                            endTime: this.paper.time[1],
                            examQuestions: this.paper.examQuestions,
                            };
                        saveExamPaper.call(this, _paper).then(res => {
                            if (res.Code === 1){
                                this.$message.success('保存成功！');
                                this.back();
                            } else {
                                this.$message.error('系统异常')
                            }
                        });
                    }else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            //查详情
            queryDetail(){
                queryExamPaperDetail.call(this, {id: this.id}).then(res => {
                    if (res.Code === 1){
                        console.log(res.Data, 'res.Data');
                        res.Data.examQuestions && res.Data.examQuestions.map(item =>{
                            if (item.answerJson) {
                                item.examAnswers = JSON.parse(item.answerJson);
                            }
                        });
                        //时间
                        let _time = [];
                        _time.push(res.Data.startTime);
                        _time.push(res.Data.endTime);
                        res.Data.time = _time;
                        this.paper = res.Data;
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
            if (this.id) {
                this.queryDetail();
            }
        }
    }
</script>

<style lang="less" scoped>

    .box-card{
        margin-bottom: 20px;
    }

    .training_list{
        margin-top: 20px;
        li{
            margin-top: 10px;
            a{
                float: right;
            }
            &:after{
                clear: both;
                display: block;
                content: '';
            }
        }
    }
    .el-input{
        width: 220px;
    }

</style>
