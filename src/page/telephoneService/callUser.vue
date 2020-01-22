<template>
    <div class="fillcontain">

        <div class="main">

            <div class="call_tel">
                <i class="el-icon-phone-outline"></i>
                <span>呼叫用户</span>
                <el-select v-model="value" placeholder="请选择" size="small">
                    <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
                <el-button type="success" size="small">呼叫</el-button>
            </div>
            <el-card class="box-card mt10">
                <div slot="header" class="clearfix">
                    <span>商家呼入：</span>
                    <el-radio v-model="abnormalRadio" label="1">今日</el-radio>
                    <el-radio v-model="abnormalRadio" label="2">本月</el-radio>
                    <el-radio v-model="abnormalRadio" label="3">上月</el-radio>
                    <el-radio v-model="abnormalRadio" label="4">年度</el-radio>
                </div>
                <div class="text item">
                    <div>
                        <el-radio-group v-model="addrRadio" size="medium">
                            <el-radio-button label="全部" ></el-radio-button>
                            <el-radio-button label="处理完成"></el-radio-button>
                            <el-radio-button label="未受理"></el-radio-button>
                            <el-radio-button label="待回访"></el-radio-button>
                            <el-radio-button label="待评价"></el-radio-button>
                            <el-radio-button label="处理中"></el-radio-button>
                        </el-radio-group>
                    </div>
                    <el-table
                        :data="tableData"
                        border
                        style="width: 100%; margin-top: 20px;">
                        <el-table-column
                            prop="type"
                            label="客户类型"
                            align="center"
                            width="">
                        </el-table-column>
                        <el-table-column
                            prop="come"
                            label="来电号码"
                            align="center"
                            width="">
                        </el-table-column>
                        <el-table-column
                            prop="answerPhone"
                            label="呼入时间"
                            align="center"
                            width="">
                        </el-table-column>
                        <el-table-column
                            prop="notAnswerPhone"
                            label="接听状态"
                            align="center"
                            width="">
                        </el-table-column>
                        <el-table-column
                            prop="completedComplete"
                            label="通话时长"
                            align="center"
                            width="">
                        </el-table-column>
                        <el-table-column
                            prop="Processing"
                            label="咨询分类"
                            align="center"
                            width="">
                        </el-table-column>
                        <el-table-column
                            prop="Processing"
                            label="是否评价"
                            align="center"
                            width="">
                        </el-table-column>
                        <el-table-column
                            prop="Processing"
                            label="回访"
                            align="center"
                            width="">
                        </el-table-column>
                        <el-table-column
                            prop="Processing"
                            label="处理人员"
                            align="center"
                            width="">
                        </el-table-column>
                        <el-table-column
                            prop="Processing"
                            label="满意度评价"
                            align="center"
                            width="">
                        </el-table-column>
                        <el-table-column
                            prop="Processing"
                            label="处理状态"
                            align="center"
                            width="">
                        </el-table-column>
                        <el-table-column
                            label="操作"
                            align="center"
                            width="">
                            <template>
                                <el-link type="primary">立即外呼</el-link>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
                <div class="page">
                    <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="currentPage"
                        :page-sizes="[100, 200, 300, 400]"
                        :page-size="100"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="400">
                    </el-pagination>
                </div>
            </el-card>

        </div>

    </div>
</template>

<script>
    import headTop from '../../components/headTop'
    export default {
        components: {
            headTop,
        },
        data(){
            return {
                abnormalRadio: 1,
                addrRadio: 1,
                currentPage: 1,
                options: [{
                    value: '选项1',
                    label: '黄金糕'
                }, {
                    value: '选项2',
                    label: '双皮奶'
                }, {
                    value: '选项3',
                    label: '蚵仔煎'
                }, {
                    value: '选项4',
                    label: '龙须面'
                }, {
                    value: '选项5',
                    label: '北京烤鸭'
                }],
                value: '',
                tableData: [{
                    type: '2019-5-2',
                    come: '15',
                    answerPhone: '12',
                    notAnswerPhone: '30',
                    completedComplete: '5',
                    Processing: '10',
                    returnVisit: '90%',
                },],//审核任务
            }
        },

        methods:{

            /**
             * 页码
             * @param val
             */
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
            }

        },

        created(){

        }
    }
</script>

<style lang="less" scoped>

    .call_tel{
        width: 100%;
        height: auto;
        box-sizing: border-box;
        padding: 20px;
        background: #25ada3;
        color: #fff;
        border-radius: 5px;
        i{
            vertical-align: sub;
            font-size: 30px;
        }
        span{
            font-size: 20px;
            margin: 0 5px;
        }
    }
    .box-card{
        margin-bottom: 20px;
    }
    .page{
        text-align: right;
        padding: 20px;
    }

</style>
