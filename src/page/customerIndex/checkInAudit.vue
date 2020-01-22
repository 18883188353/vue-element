<template>
    <div>
        <div class="main">


            <!--今日数据开始-->
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span>今日数据：</span>
                </div>
                <div class="text item">
                    <el-row :gutter="20">
                        <el-col :span="24">
                            <div class="grid-content bg-purple">

                                <el-row :gutter="24">
                                    <el-col :span="4">
                                        <el-card shadow="always">
                                            <div class="today_list">
                                                <div class="top">
                                                    <div class="content">
                                                        <p>入住审核</p>
                                                        <span>5</span>
                                                    </div>
                                                </div>
                                                <div class="bottom">
                                                    <ul>
                                                        <li>审核通过：0</li>
                                                        <li>未通过：0</li>
                                                        <li>待审核：0</li>
                                                        <li><el-link type="primary">立即审核</el-link></li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </el-card>
                                    </el-col>
                                    <el-col :span="4">
                                        <el-card shadow="always">
                                            <div class="today_list">
                                                <div class="top">
                                                    <div class="content">
                                                        <p>商品审核</p>
                                                        <span>5</span>
                                                    </div>
                                                </div>
                                                <div class="bottom">
                                                    <ul>
                                                        <li>审核通过：0</li>
                                                        <li>未通过：0</li>
                                                        <li>待审核：0</li>
                                                        <li><el-link type="primary">立即审核</el-link></li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </el-card>
                                    </el-col>
                                    <el-col :span="4">
                                        <el-card shadow="always">
                                            <div class="today_list">
                                                <div class="top">
                                                    <div class="content">
                                                        <p>活动审核</p>
                                                        <span>5</span>
                                                    </div>
                                                </div>
                                                <div class="bottom">
                                                    <ul>
                                                        <li>审核通过：0</li>
                                                        <li>未通过：0</li>
                                                        <li>待审核：0</li>
                                                        <li><el-link type="primary">立即审核</el-link></li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </el-card>
                                    </el-col>
                                    <el-col :span="4">
                                        <el-card shadow="always">
                                            <div class="today_list">
                                                <div class="top">
                                                    <div class="content">
                                                        <p>文章审核</p>
                                                        <span>5</span>
                                                    </div>
                                                </div>
                                                <div class="bottom">
                                                    <ul>
                                                        <li>审核通过：0</li>
                                                        <li>未通过：0</li>
                                                        <li>待审核：0</li>
                                                        <li><el-link type="primary">立即审核</el-link></li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </el-card>
                                    </el-col>
                                    <el-col :span="4">
                                        <el-card shadow="always">
                                            <div class="today_list">
                                                <div class="top">
                                                    <div class="content">
                                                        <p>评价审核</p>
                                                        <span>5</span>
                                                    </div>
                                                </div>
                                                <div class="bottom">
                                                    <ul>
                                                        <li>审核通过：0</li>
                                                        <li>未通过：0</li>
                                                        <li>待审核：0</li>
                                                        <li><el-link type="primary">立即审核</el-link></li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </el-card>
                                    </el-col>
                                    <el-col :span="4">
                                        <el-card shadow="always">
                                            <div class="today_list">
                                                <div class="top">
                                                    <div class="content">
                                                        <p>广告审核</p>
                                                        <span>5</span>
                                                    </div>
                                                </div>
                                                <div class="bottom">
                                                    <ul>
                                                        <li>审核通过：0</li>
                                                        <li>未通过：0</li>
                                                        <li>待审核：0</li>
                                                        <li><el-link type="primary">立即审核</el-link></li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </el-card>
                                    </el-col>

                                </el-row>
                            </div>
                        </el-col>
                    </el-row>
                </div>
            </el-card>
            <!--今日数据结束-->

            <!--审核任务（*由系统自动分配）开始-->
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span>审核任务（*由系统自动分配）</span>
                </div>
                <div class="text item">
                    <el-table
                        :data="tableData"
                        border
                        style="width: 100%; margin-top: 20px;">
                        <el-table-column
                            prop="type"
                            label="序号"
                            align="center"
                            width="">
                        </el-table-column>
                        <el-table-column
                            prop="come"
                            label="申请人"
                            align="center"
                            width="">
                        </el-table-column>
                        <el-table-column
                            prop="answerPhone"
                            label="业务员电话"
                            align="center"
                            width="">
                        </el-table-column>
                        <el-table-column
                            prop="notAnswerPhone"
                            label="商家名称"
                            align="center"
                            width="">
                        </el-table-column>
                        <el-table-column
                            prop="completedComplete"
                            label="实体店名"
                            align="center"
                            width="">
                        </el-table-column>
                        <el-table-column
                            prop="Processing"
                            label="联系电话"
                            align="center"
                            width="">
                        </el-table-column>
                        <el-table-column
                            prop="Processing"
                            label="商家类型"
                            align="center"
                            width="">
                        </el-table-column>
                        <el-table-column
                            prop="Processing"
                            label="申请时间"
                            align="center"
                            width="">
                        </el-table-column>
                        <el-table-column
                            prop="Processing"
                            label="录入人员"
                            align="center"
                            width="">
                        </el-table-column>
                        <el-table-column
                            prop="Processing"
                            label="审核人员"
                            align="center"
                            width="">
                        </el-table-column>
                        <el-table-column
                            prop="Processing"
                            label="审核状态"
                            align="center"
                            width="">
                        </el-table-column>
                        <el-table-column
                            label="操作"
                            align="center"
                            width="">
                            <template>
                                <el-link type="primary">审核</el-link>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </el-card>
            <!--审核任务（*由系统自动分配）结束-->

            <bottom-footer></bottom-footer>

        </div>

    </div>
</template>

<script>
    import headTop from '../../components/headTop'
    import bottomFooter from '../../components/bottomFooter'
    export default {
        components: {
            headTop,
            bottomFooter,
        },
        data(){
            return {

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

        },

        created(){

        }
    }
</script>

<style lang="less" scoped>

    .box-card{
        margin-bottom: 20px;
    }

    .today_list{
        .top{
            width: 100%;
            height: auto;
            display: table;
            .content{
                width: 100%;
                height: 100px;
                text-align: center;
                vertical-align: middle;
                border-bottom: 1px #eaeaea solid;
                display: table-cell;
                p{
                    font-size: 18px;
                    vertical-align: middle;
                }
                span{
                    font-size: 30px;
                    color: #25ada3;
                }
            }
        }
        .bottom{
            width: 100%;
            height: auto;
            ul{
                width: 100%;
                height: auto;
                li{
                    width: 50%;
                    float: left;
                    text-align: center;
                    margin-top: 20px;
                }
                &:after{
                    clear: both;
                    display: block;
                    content: '';
                }
            }
        }
        &:after{
            clear: both;
            display: block;
            content: '';
        }
    }

</style>
