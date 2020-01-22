<template>
    <div class="fillcontain">

        <div class="main">

            <el-card class="box-card">
                <div
                    slot="header"
                    class="clearfix"
                >
                    <span>{{paper.title}}：</span>
                    <span
                        class="fr"
                        v-if="paper.examQuestions"
                    >共{{paper.examQuestions.length}}题 倒计时：{{getTimeStr(paper.examDuration)}}</span>
                </div>
                <div class="text item">
                    <div class="mt20">
                        <div
                            class="examinationlist"
                            v-for="(item,index) in paper.examQuestions"
                            :key="index"
                        >
                            <h3>第{{index + 1}}题：{{item.title}}（{{getTypeStatus(item.type)}}）</h3>
                            <el-radio-group
                                v-if="item.type === '1'"
                                v-model="item.testOption"
                            >
                                <el-radio
                                    v-for="(it,ind) in item.examAnswers"
                                    :label="it.keyWord"
                                    :key="ind"
                                >{{it.option}}：{{it.content}}</el-radio>
                            </el-radio-group>
                            <el-checkbox-group
                                v-if="item.type === '2'"
                                v-model="item.checks"
                                @change="changeChecks(index)"
                            >
                                <el-checkbox
                                    v-for="(it,ind) in item.examAnswers"
                                    :label="it.keyWord"
                                    :key="ind"
                                >{{it.option}}：{{it.content}}</el-checkbox>
                            </el-checkbox-group>
                        </div>

                        <div class="mt20 ml20">
                            <el-button
                                type="primary"
                                @click="submit"
                            >提交</el-button>
                            <el-button @click="back">退出</el-button>
                        </div>
                    </div>
                </div>
            </el-card>

        </div>

    </div>
</template>

<script>
import getExamPaperData from '../../api/other/getExamPaperData'
import submitTest from '../../api/other/submitTest'

import headTop from '../../components/headTop'
export default {
    components: {
        headTop,
    },
    data() {
        return {
            radio: '1',
            paper: {},
            id: this.$route.query.id,
            typeOptions: [
                { value: '1', label: '单选题' },
                { value: '2', label: '多选题' },
            ],
            timeId: '',  //定时器
        }
    },

    methods: {
        getTypeStatus(status) {
            let _desc = '';
            this.typeOptions.map(item => {
                if (item.value === status) {
                    _desc = item.label;
                }
            });
            return _desc;
        },
        //查详情
        getExamPaperData() {
            getExamPaperData.call(this, { id: this.id }).then(res => {
                if (res.Code === 1) {
                    // console.log(res.Data, 'res.Data');
                    let _data = res.Data;
                    _data.examQuestions && _data.examQuestions.map(item => {
                        item.testOption = '';
                        item.checks = [];
                    });
                    this.paper = _data;
                    this.timeInterval();
                } else {
                    this.$message.error('系统异常')
                }
            });
        },
        changeChecks(index) {
            let _quesyion = this.paper.examQuestions[index];
            if (_quesyion.checks) {
                _quesyion.testOption = _quesyion.checks.join(',');
            }
        },
        submit() {
            this.$confirm('确认提交试卷吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let _examQuestionTests = [];
                // 问题
                this.paper.examQuestions.map(item => {
                    // 选项
                    let _checks = item.checks;
                    let _testOption = item.testOption;
                    item.examAnswers && item.examAnswers.map(it => {
                        if (item.type === '1' && it.keyWord === _testOption) {
                            //单选
                            it.isSelect = true;
                        } else if (item.type === '2' && _checks.indexOf(it.keyWord) !== -1) {
                            //多选
                            it.isSelect = true;
                        } else {
                            it.isSelect = false;
                        }
                    });
                    let _examQuestionTest = {
                        title: item.title,
                        type: item.type,
                        testOption: item.testOption,
                        examQuestionId: item.id,
                        examAnswerTests: item.examAnswers,
                    };
                    _examQuestionTests.push(_examQuestionTest);
                });
                let _test = {
                    examPaperId: this.paper.id,
                    startTime: this.paper.startTestTime,
                    examQuestionTests: _examQuestionTests
                };
                submitTest.call(this, _test).then(res => {
                    if (res.Code === 1) {
                        this.$message.success('试卷提交成功');
                        this.back();
                    } else {
                        this.$message.error('系统异常')
                    }
                });

            }).catch(() => {
                /*this.$message({
                    type: 'info',
                    message: '已取消删除'
                });*/
            });
        },
        back() {
            this.$router.go(-1);
        },
        timeInterval() {
            let _this = this;
            this.timeId = setInterval(function () {
                console.log('剩余时间：', _this.paper.examDuration);
                if (_this.paper.examDuration > 0) {
                    _this.paper.examDuration--;
                } else {
                    //清除定时器    提交试卷
                    window.clearInterval(_this.timeId);
                }
            }, 1000);
        },
        getTimeStr(totalSeconds) {
            /*//天数
            var days = Math.floor(totalSeconds / (60 * 60 * 24));
            //取模（余数）*/
            let modulo = totalSeconds;
            //小时数
            let hours = Math.floor(modulo / (60 * 60));
            modulo = modulo % (60 * 60);
            //分钟
            let minutes = Math.floor(modulo / 60);
            //秒
            let seconds = modulo % 60;
            //输出到页面
            return hours + "小时" + minutes + "分钟" + seconds + "秒";
        }
    },

    created() {
        this.getExamPaperData();
    },
    destroyed() {
        if (this.timeId) {
            //清除定时器
            console.log('离开页面清除定时器');
            window.clearInterval(this.timeId);
        }
    }
}
</script>

<style lang="less" scoped>
.box-card {
    margin-bottom: 20px;
}
.page {
    text-align: right;
    padding: 20px;
}

.examinationlist {
    margin-top: 20px;
}

.el-radio {
    display: block;
    margin-top: 20px;
    margin-left: 40px;
}
</style>
