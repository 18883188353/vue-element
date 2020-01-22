<template>
    <div class="fillcontain">

        <div class="main">

            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span>{{paper.title}}：</span>
                    <span class="fr" v-if="paper.examQuestionTests">共{{paper.examQuestionTests.length}}题 开始：{{paper.startTime}} 结束：{{paper.submitTime}}</span>
                </div>
                <div class="text item">
                    <div class="mt20">
                        <div class="examinationlist" v-for="(item,index) in paper.examQuestionTests">
                            <h3>第{{index + 1}}题：{{item.title}}（{{getTypeStatus(item.type)}}）</h3>
                            我的答案：{{item.testOption}}  正确答案：{{item.correctOption}}
                            <ul>
                                <li v-for="(it,ind) in item.examAnswerTests">{{it.option}}：{{it.content}}</li>
                            </ul>
                            <!--<el-radio-group v-if="item.type === '1'">
                                <el-radio v-for="(it,ind) in item.examAnswerTests" :label="it.keyWord">{{it.option}}：{{it.content}}</el-radio>
                            </el-radio-group>
                            <el-checkbox-group v-if="item.type === '2'">
                                <el-checkbox  v-for="(it,ind) in item.examAnswerTests" :label="it.keyWord">{{it.option}}：{{it.content}}</el-checkbox>
                            </el-checkbox-group>-->
                        </div>

                        <div class="mt20 ml20">
                            <el-button @click="back">返回</el-button>
                        </div>
                    </div>
                </div>
            </el-card>


        </div>

    </div>
</template>

<script>
    import queryExamPaperTestDetail from '../../api/other/queryExamPaperTestDetail'

    import headTop from '../../components/headTop'
    export default {
        components: {
            headTop,
        },
        data(){
            return {
                radio: '1',
                paper: {},
                id: this.$route.query.id,
                typeOptions: [
                    {value: '1', label: '单选题'},
                    {value: '2', label: '多选题'},
                ],
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
            //查详情
            getExamPaperData(){
                queryExamPaperTestDetail.call(this, {id: this.id}).then(res => {
                    if (res.Code === 1){
                        let _data = res.Data;
                        _data.examQuestionTests && _data.examQuestionTests.map(item =>{
                            if (item.answerJson) {
                                item.examAnswerTests = JSON.parse(item.answerJson);
                            }
                        });
                        this.paper = _data;
                    } else {
                        this.$message.error('系统异常')
                    }
                });
            },
            changeChecks(index){
                let _quesyion = this.paper.examQuestions[index];
                if (_quesyion.checks) {
                    _quesyion.testOption = _quesyion.checks.join(',');
                }
            },
            back() {
                this.$router.go(-1);
            },
        },

        created(){
            this.getExamPaperData();
        }
    }
</script>

<style lang="less" scoped>

    .box-card{
        margin-bottom: 20px;
    }
    .page{
        text-align: right;
        padding: 20px;
    }

    .examinationlist{
        margin-top: 20px;
    }

    .el-radio{
        display: block;
        margin-top: 20px;
        margin-left: 40px;
    }

</style>
