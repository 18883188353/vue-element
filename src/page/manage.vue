<template>
	<div class="manage_page fillcontain" style="display: flex">
        <div class="main_left">
            <el-menu class="custom-menu" :default-active="defaultActive" text-color="#fff" active-text-color="#fff" theme="dark" router>
                <div class="main_logo"><i class="iconfont icon-kefuxitong1"></i></div>
                <el-submenu index="1">
                    <template slot="title"><i class="iconfont icon-homePage"></i>主页</template>
                    <el-menu-item index="customerIndex">主页</el-menu-item>
                    <el-menu-item index="checkIn">签到打卡客服人员</el-menu-item>
                    <el-menu-item index="checkInAudit">签到打卡审核人员</el-menu-item>
                </el-submenu>
                <el-submenu index="2">
                    <template slot="title"><i class="iconfont icon-tel"></i>电话客服</template>
                    <el-menu-item index="userInbound">用户呼入</el-menu-item>
                        <el-menu-item index="businessInlet">商家呼入</el-menu-item>
                    <el-menu-item index="callUser">呼叫用户</el-menu-item>
                    <el-menu-item index="callBusiness">呼叫商家</el-menu-item>
                    <el-menu-item index="turnoverEvents">流转事件</el-menu-item>
                    <el-menu-item index="returnRecord">回访记录</el-menu-item>
                </el-submenu>
                <el-submenu index="3">
                    <template slot="title"><i class="iconfont icon-platform"></i>平台客服</template>
                    <el-menu-item index="email">邮箱客服</el-menu-item>
                    <el-menu-item index=""><a target="_blank" href="http://wpa.qq.com/msgrd?v=3&uin=123456789&site=qq&menu=yes" class="QQcustomer">QQ客服</a></el-menu-item>
                    <el-menu-item index="offLine">离线客服</el-menu-item>
                    <el-menu-item index="">在线客服</el-menu-item>
                    <!--<el-menu-item index="">微信客服</el-menu-item>-->
                    <el-menu-item index="workList">工单列表</el-menu-item>
                </el-submenu>
                <el-submenu index="4">
                    <template slot="title"><i class="iconfont icon-message"></i>短信管理</template>
                    <el-menu-item index="messageManagement">短信管理</el-menu-item>
                    <el-menu-item index="messageSend">发送短信</el-menu-item>
                    <el-menu-item index="messageModule">短信模板</el-menu-item>
                </el-submenu>
                <el-submenu index="5">
                    <template slot="title"><i class="iconfont icon-file"></i>文档管理</template>
                    <el-menu-item index="ruleUser">用户规则</el-menu-item>
                    <el-menu-item index="ruleUserHelp">用户帮助</el-menu-item>
                    <el-menu-item index="ruleBusiness">商家规则</el-menu-item>
                    <el-menu-item index="ruleBusinessHelp">商家帮助</el-menu-item>
                    <el-menu-item index="rulePlatform">平台规则</el-menu-item>
                    <el-menu-item index="rulePlatformHelp">平台帮助</el-menu-item>
                </el-submenu>
                <el-submenu index="6">
                    <template slot="title"><i class="iconfont icon-abnormal"></i>异常处理</template>
                    <el-menu-item index="testingUser">用户检测</el-menu-item>
                    <el-menu-item index="testingBusiness">商家检测</el-menu-item>
                    <el-menu-item index="accountThawing">账号解冻</el-menu-item>
                    <el-menu-item index="goodsSoldOut">强制下架</el-menu-item>
                    <el-menu-item index="licenceContractRemind">证照到期提醒</el-menu-item>
                </el-submenu>
                <el-submenu index="7">
                    <template slot="title"><i class="iconfont icon-audit"></i>审核管理</template>
                    <el-menu-item index="auditCheckIn">入住审核</el-menu-item>
                    <el-menu-item index="auditEvaluate">评价审核</el-menu-item>
                    <el-menu-item index="">商品审核</el-menu-item>
                    <el-menu-item index="">文章审核</el-menu-item>
                    <el-menu-item index="">广告审核</el-menu-item>
                    <el-menu-item index="">活动审核</el-menu-item>
                    <el-menu-item index="">银行卡变更</el-menu-item>
                    <el-menu-item index="">资料更新</el-menu-item>
                    <el-menu-item index="">房地产入驻</el-menu-item>
                    <el-menu-item index="">房地产资料变更</el-menu-item>
                    <el-menu-item index="">房地产评价审核</el-menu-item>
                    <el-menu-item index="auditHouseNews">房地产消息模块</el-menu-item>
                </el-submenu>
                <!--<el-submenu index="8">-->
                    <!--<template slot="title"><i class="iconfont icon-process"></i>流程待办</template>-->
                    <!--<el-menu-item index="">发起流程</el-menu-item>-->
                    <!--<el-menu-item index="">在办流程</el-menu-item>-->
                    <!--<el-menu-item index="">待办流程</el-menu-item>-->
                    <!--<el-menu-item index="">办结流程</el-menu-item>-->
                <!--</el-submenu>-->
                <el-submenu index="9">
                    <template slot="title"><i class="iconfont icon-business"></i>业务培训</template>
                    <el-menu-item index="textbooksList">教材列表</el-menu-item>
                    <el-menu-item index="textbooksRelease">教材发布</el-menu-item>
                    <el-menu-item index="examinationList">考试考核</el-menu-item>
                </el-submenu>
                <el-submenu index="10">
                    <template slot="title"><i class="iconfont icon-talkingSkill"></i>话术管理</template>
                    <el-menu-item index="talkingSkillList">话术管理</el-menu-item>
                    <el-menu-item index="talkingSkillEdit">话术编写</el-menu-item>
                    <el-menu-item index="talkingSkillTrainList">话术反馈</el-menu-item>
                </el-submenu>
                <el-submenu index="11">
                    <template slot="title"><i class="iconfont icon-study"></i>学习管理</template>
                    <el-menu-item index="learningManagementList">学习管理</el-menu-item>
                    <el-menu-item index="knowledgeAdd">知识发布</el-menu-item>
                    <el-menu-item index="learningFeedbackList">学习反馈</el-menu-item>
                </el-submenu>
                <el-submenu index="12">
                    <template slot="title"><i class="iconfont icon-news"></i>消息通知</template>
                    <el-menu-item index="">公司通知</el-menu-item>
                    <el-menu-item index="">部门通知</el-menu-item>
                    <el-menu-item index="">系统通知</el-menu-item>
                </el-submenu>
                <el-submenu index="13">
                    <template slot="title"><i class="iconfont icon-HR"></i>人事管理</template>
                    <el-menu-item index="">排版管理</el-menu-item>
                    <el-menu-item index="">签到打卡</el-menu-item>
                    <el-menu-item index="">坐席分配</el-menu-item>
                    <el-menu-item index="">任务设置</el-menu-item>
                    <el-menu-item index="">服务质量</el-menu-item>
                    <el-menu-item index="">绩效考核</el-menu-item>
                </el-submenu>
                <el-submenu index="14">
                    <template slot="title"><i class="iconfont icon-research"></i>市场调查</template>
                    <el-menu-item index="">电话调查</el-menu-item>
                    <el-menu-item index="">在线调查</el-menu-item>
                    <el-menu-item index="">问卷调查</el-menu-item>
                    <el-menu-item index="">满意度调查</el-menu-item>
                </el-submenu>
                <el-submenu index="15">
                    <template slot="title"><i class="iconfont icon-Statistics"></i>数据统计</template>
                    <el-menu-item index="">统计报表</el-menu-item>
                    <el-menu-item index="">数据分析</el-menu-item>
                </el-submenu>
                <el-submenu index="16">
                    <template slot="title"><i class="iconfont icon-SetUp"></i>系统设置</template>
                    <el-menu-item index="">权限设置</el-menu-item>
                    <el-menu-item index="">档案管理</el-menu-item>
                    <el-menu-item index="">AI设置</el-menu-item>
                    <el-menu-item index="">操作日志</el-menu-item>
                    <el-menu-item index="">设备管理</el-menu-item>
                </el-submenu>
                <el-submenu index="17">
                    <template slot="title"><i class="iconfont icon-help"></i>帮助文档</template>
                </el-submenu>
            </el-menu>
        </div>
        <!--<div class="main_right">
            <keep-alive>
                <router-view></router-view>
            </keep-alive>
        </div>-->

  	</div>
</template>

<script>
    export default {
		computed: {
			defaultActive: function(){
			    console.log('manage页面',this.$route.path.replace('/', ''))
				return this.$route.path.replace('/', '');
			}
		},
        data(){
		    return{

            }
        },

        methods:{
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
        },

        created(){

        },

    }
</script>


<style lang="less" scoped>

    .logo{
        width: 200px;
    }
    .main_left{
        width: 250px;
        min-height: 100%;
        /*border-right: solid 1px #e6e6e6;*/
        background: #001529;
        /deep/ .el-menu{
            border-right: none ;
            background-color: #001529;
            /deep/ .el-submenu__title:hover{
                background-color: #001529!important;
            }
        }
    }
    .main_right{
        width: calc(100% - 250px);
        flex: 1;
    }
    .QQcustomer{
        width: 100%;
        height: 100%;
        display: block;
        color: #fff;
    }

</style>

<style lang="less" >
    .main_logo{
        width: 230px;
        height: 75px;
        padding: 0 10px;
        background-color: #001529;
        i{
            font-size: 35px;
            color: #25ada3;
            display: block;
            padding-top: 20px;
        }
    }
    .custom-menu{
        height: calc(100vh - 0px);
        overflow-y: auto;
        background: #001529;
        position: fixed;
        left: 0;
        top: 0;
        .el-submenu__title i{
            color: #fff;
            font-weight: 600;
            margin: 0 3px;
        }
    }

    .custom-menu::-webkit-scrollbar{
        width: 10px;     /*高宽分别对应横竖滚动条的尺寸*/
        height: 1px;
    }
    .custom-menu::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
        border-radius: 10px;
        -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
        background: #eaeaea;
    }
    .custom-menu::-webkit-scrollbar-track {/*滚动条里面轨道*/
        -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
        border-radius: 10px;
        background: #ddd;
    }

    .custom-menu .el-submenu__title:hover {
        background-color: #000;
    }
    .custom-menu .el-menu-item:focus,.custom-menu .el-menu-item:hover {
        background-color: #25ada3 !important;
    }
    .custom-menu .el-menu {
        background-color: #000;
    }
</style>
