<template>
    <el-menu
        class="custom-menu"        
        text-color="#fff"
        active-text-color="#ffd04b"
        theme="dark" 
        default-active="index"
        router 
        v-if="admin"
    >
        <div class="main_logo"><i class="iconfont icon-kefuxitong1"></i></div>
        <el-menu-item index="index"><i class="iconfont icon-zhuye mr3"></i>主页</el-menu-item>
        <!-- <el-submenu index="customerIndex">
            <template slot="title"><i class="iconfont icon-homePage"></i>主页</template>
            <el-menu-item index="indexCustomer">客服人员</el-menu-item>
            <el-menu-item index="indexAudit">审核人员</el-menu-item>
            <el-menu-item index="indexOther">其他人员</el-menu-item>
        </el-submenu> -->
        <!-- <el-menu-item index="/index">
            <i class="iconfont icon-homePage"></i>
            <span slot="title">主页</span>
        </el-menu-item> -->
        <!--<el-submenu index="2">
            <template slot="title"><i class="iconfont icon-tel"></i>电话客服</template>
            <el-menu-item index="/userInbound">用户呼入</el-menu-item>
            <el-menu-item index="/businessInlet">商家呼入</el-menu-item>
            <el-menu-item index="/callUser">呼叫用户</el-menu-item>
            <el-menu-item index="/callBusiness">呼叫商家</el-menu-item>
            <el-menu-item index="/turnoverEvents">流转事件</el-menu-item>
            <el-menu-item index="/returnRecord">回访记录</el-menu-item>
        </el-submenu>-->
        <el-submenu index="3">
            <template slot="title"><i class="iconfont icon-platform"></i>平台客服</template>
            <!--<el-menu-item index="/email">邮箱客服</el-menu-item>
            <el-menu-item index=""><a
                    target="_blank"
                    href="http://wpa.qq.com/msgrd?v=3&uin=123456789&site=qq&menu=yes"
                    class="QQcustomer"
                >QQ客服</a></el-menu-item>-->
            <!--<el-menu-item index="/offLine">离线客服</el-menu-item>-->
            <el-menu-item index="onLineService">在线客服</el-menu-item>
            <!--<el-menu-item index="">微信客服</el-menu-item>-->
            <!--<el-menu-item index="/workList">工单列表</el-menu-item>-->
            <el-submenu index="7-8">
                <span slot="title">工单</span>
                <el-menu-item index="/workList">工单列表</el-menu-item>
                <el-menu-item index="/myWorkList">我的工单</el-menu-item>
                <el-menu-item index="/waitSheetList">待处理工单</el-menu-item>
            </el-submenu>
        </el-submenu>
        <el-submenu index="4">
            <template slot="title"><i class="iconfont icon-message"></i>短信管理</template>
            <!--<el-menu-item index="/messageSend">发送短信</el-menu-item>-->
            <el-menu-item index="/messageList">短信管理</el-menu-item>
            <el-menu-item index="/messageTemplateList">短信模板管理</el-menu-item>
            <!--<el-menu-item index="/messageModule">编辑模板</el-menu-item>-->
        </el-submenu>
        <!--<el-submenu index="6">
            <template slot="title"><i class="iconfont icon-abnormal"></i>异常处理</template>
            <el-menu-item index="/testingUser">用户检测</el-menu-item>
            <el-menu-item index="/testingBusiness">商家检测</el-menu-item>
            <el-menu-item index="/accountThawing">账号解冻</el-menu-item>
            <el-menu-item index="/goodsSoldOut">强制下架</el-menu-item>
            <el-menu-item index="/licenceContractRemind">证照到期提醒</el-menu-item>
        </el-submenu>-->

        <el-submenu index="7">
            <template slot="title"><i class="iconfont icon-audit"></i>审核管理 <i
                    class="menuBadge"
                    v-if="allCountAudit"
                >{{ allCountAudit }}</i> </template>
            <el-menu-item index="/auditCheckIn">入驻审核 <i
                    class="menuBadge"
                    v-if="menuState.auditCheckIn.count"
                >{{ menuState.auditCheckIn.count }}</i> </el-menu-item>
            <el-menu-item index="/auditDataUpdate">资料更新审核 <i
                    class="menuBadge"
                    v-if="menuState.auditDataUpdate.count"
                >{{ menuState.auditDataUpdate.count }}</i> </el-menu-item>
            <el-submenu index="7-9">
                <span slot="title">变更审核 <i
                        class="menuBadge"
                        v-if="groupCount('GROUP_10')"
                    >{{ groupCount('GROUP_10') }}</i> </span>
                <el-menu-item index="/auditChangeCompany">公司信息变更 <i
                        class="menuBadge"
                        v-if="menuState.auditChangeCompany.count"
                    >{{ menuState.auditChangeCompany.count }}</i> </el-menu-item>
                <el-menu-item index="/auditChangeShop">店铺信息变更 <i
                        class="menuBadge"
                        v-if="menuState.auditChangeShop.count"
                    >{{ menuState.auditChangeShop.count }}</i> </el-menu-item>
                <el-menu-item index="/auditChangeLicense">营业执照变更 <i
                        class="menuBadge"
                        v-if="menuState.auditChangeLicense.count"
                    >{{ menuState.auditChangeLicense.count }}</i> </el-menu-item>
                <el-menu-item index="/auditChangeCategory">经营范围变更 <i
                        class="menuBadge"
                        v-if="menuState.auditChangeCategory.count"
                    >{{ menuState.auditChangeCategory.count }}</i> </el-menu-item>
                <el-menu-item index="/auditChangeLicenseYear">年报 <i
                        class="menuBadge"
                        v-if="menuState.auditChangeLicenseYear.count"
                    >{{ menuState.auditChangeLicenseYear.count }}</i> </el-menu-item>
            </el-submenu>
            <el-menu-item index="/auditShopCertificates">商家证件审核 <i
                    class="menuBadge"
                    v-if="menuState.auditShopCertificates.count"
                >{{ menuState.auditShopCertificates.count }}</i> </el-menu-item>
            <el-menu-item index="/auditShopClose">关闭店铺审核 <i
                    class="menuBadge"
                    v-if="menuState.auditShopClose.count"
                >{{ menuState.auditShopClose.count }}</i> </el-menu-item>
            <el-menu-item index="/auditActive">激活店铺审核 <i
                    class="menuBadge"
                    v-if="menuState.auditActive.count"
                >{{ menuState.auditActive.count }}</i> </el-menu-item>
            <el-submenu index="7-3">
                <span slot="title">商品审核 <i
                        class="menuBadge"
                        v-if="groupCount('GROUP_11')"
                    >{{ groupCount('GROUP_11') }}</i></span>
                <el-menu-item index="/auditCommodity">商品审核 <i
                        class="menuBadge"
                        v-if="menuState.auditCommodity.count"
                    >{{ menuState.auditCommodity.count }}</i> </el-menu-item>
                <el-menu-item index="/auditGoodsCorePrice">商品调价审核 <i
                        class="menuBadge"
                        v-if="menuState.auditGoodsCorePrice.count"
                    >{{ menuState.auditGoodsCorePrice.count }}</i> </el-menu-item>
                <el-menu-item index="/auditGoodsSoldOut">下架审核 <i
                        class="menuBadge"
                        v-if="menuState.auditGoodsSoldOut.count"
                    >{{ menuState.auditGoodsSoldOut.count }}</i> </el-menu-item>
            </el-submenu>
            <el-submenu index="activity">
                <span slot="title">活动审核 <i
                        class="menuBadge"
                        v-if="groupCount('GROUP_12')"
                    >{{ groupCount('GROUP_12') }}</i></span>
                <el-menu-item index="/auditPlatformActivities">平台活动审核 <i
                        class="menuBadge"
                        v-if="menuState.auditPlatformActivities.count"
                    >{{ menuState.auditPlatformActivities.count }}</i> </el-menu-item>
                <el-menu-item index="/collageToexamine">拼购活动审核 <i
                        class="menuBadge"
                        v-if="menuState.collageToexamine.count"
                    >{{ menuState.collageToexamine.count }}</i> </el-menu-item>
            </el-submenu>
            <el-submenu index="7-1">
                <span slot="title">评价审核 <i
                        class="menuBadge"
                        v-if="groupCount('GROUP_13')"
                    >{{ groupCount('GROUP_13') }}</i></span>
                <el-menu-item index="/auditEvaluate">用户评价审核 <i
                        class="menuBadge"
                        v-if="menuState.auditEvaluate.count"
                    >{{ menuState.auditEvaluate.count }}</i> </el-menu-item>
                <el-menu-item index="/auditUserReplyEvaluate">用户回复评价审核 <i
                        class="menuBadge"
                        v-if="menuState.auditUserReplyEvaluate.count"
                    >{{ menuState.auditUserReplyEvaluate.count }}</i> </el-menu-item>
                <el-menu-item index="/auditEvaluateReply">商家回复审核 <i
                        class="menuBadge"
                        v-if="menuState.auditEvaluateReply.count"
                    >{{ menuState.auditEvaluateReply.count }}</i> </el-menu-item>
            </el-submenu>
            <el-submenu index="7-2">
                <span slot="title">问答审核 <i
                        class="menuBadge"
                        v-if="groupCount('GROUP_14')"
                    >{{ groupCount('GROUP_14') }}</i></span>
                <el-menu-item index="/auditUserQuestions">用户提问审核 <i
                        class="menuBadge"
                        v-if="menuState.auditUserQuestions.count"
                    >{{ menuState.auditUserQuestions.count }}</i> </el-menu-item>
                <el-menu-item index="/auditUserAnswer">用户回答审核 <i
                        class="menuBadge"
                        v-if="menuState.auditUserAnswer.count"
                    >{{ menuState.auditUserAnswer.count }}</i> </el-menu-item>
                <el-menu-item index="/auditShopAnswer">商家回答审核 <i
                        class="menuBadge"
                        v-if="menuState.auditShopAnswer.count"
                    >{{ menuState.auditShopAnswer.count }}</i> </el-menu-item>
                <el-menu-item index="/auditQaComment">问答评论审核 <i
                        class="menuBadge"
                        v-if="menuState.auditQaComment.count"
                    >{{ menuState.auditQaComment.count }}</i> </el-menu-item>
                <el-menu-item index="/auditQaCommentReply">回复问答评论审核 <i
                        class="menuBadge"
                        v-if="menuState.auditQaCommentReply.count"
                    >{{ menuState.auditQaCommentReply.count }}</i> </el-menu-item>
            </el-submenu>
            <el-menu-item index="/auditBankChange">银行卡变更 <i
                    class="menuBadge"
                    v-if="menuState.auditBankChange.count"
                >{{ menuState.auditBankChange.count }}</i> </el-menu-item>
            <el-menu-item index="/auditBrand">品牌审核 <i
                    class="menuBadge"
                    v-if="menuState.auditBrand.count"
                >{{ menuState.auditBrand.count }}</i> </el-menu-item>
            <el-menu-item index="/auditArticle">文章审核 <i
                    class="menuBadge"
                    v-if="menuState.auditArticle.count"
                >{{ menuState.auditArticle.count }}</i> </el-menu-item>
            <el-menu-item index="/auditAdvertData">广告审核 <i
                    class="menuBadge"
                    v-if="menuState.auditAdvertData.count"
                >{{ menuState.auditAdvertData.count }}</i> </el-menu-item>
            <el-menu-item index="/auditInEnter">房地产入驻 <i
                    class="menuBadge"
                    v-if="menuState.auditInEnter.count"
                >{{ menuState.auditInEnter.count }}</i> </el-menu-item>
            <el-submenu index="7-4">
                <span slot="title">房地产资料变更 <i
                        class="menuBadge"
                        v-if="groupCount('GROUP_15')"
                    >{{ groupCount('GROUP_15') }}</i> </span>
                <el-menu-item index="/realtyCompanyAuditChange">公司信息变更 <i
                        class="menuBadge"
                        v-if="menuState.realtyCompanyAuditChange.count"
                    >{{ menuState.realtyCompanyAuditChange.count }}</i> </el-menu-item>
                <el-menu-item index="/realtyLicenseAuditChange">营业执照信息变更 <i
                        class="menuBadge"
                        v-if="menuState.realtyLicenseAuditChange.count"
                    >{{ menuState.realtyLicenseAuditChange.count }}</i> </el-menu-item>
            </el-submenu>
            <el-submenu index="7-8">
                <span slot="title">房地产评价审核 <i
                        class="menuBadge"
                        v-if="groupCount('GROUP_16')"
                    >{{ groupCount('GROUP_16') }}</i> </span>
                <el-menu-item index="/auditRealtyEvaluate">评价审核 <i
                        class="menuBadge"
                        v-if="menuState.auditRealtyEvaluate.count"
                    >{{ menuState.auditRealtyEvaluate.count }}</i> </el-menu-item>
                <el-menu-item index="/auditRealtyEvaluateReply">回复审核 <i
                        class="menuBadge"
                        v-if="menuState.auditRealtyEvaluateReply.count"
                    >{{ menuState.auditRealtyEvaluateReply.count }}</i> </el-menu-item>
            </el-submenu>
            <el-menu-item index="/auditHouseNews">房地产消息模块 <i
                    class="menuBadge"
                    v-if="menuState.auditHouseNews.count"
                >{{ menuState.auditHouseNews.count }}</i> </el-menu-item>
        </el-submenu>
        <!--<el-submenu index="8">-->
        <!--<template slot="title"><i class="iconfont icon-process"></i>流程待办</template>-->
        <!--<el-menu-item index="">发起流程</el-menu-item>-->
        <!--<el-menu-item index="">在办流程</el-menu-item>-->
        <!--<el-menu-item index="">待办流程</el-menu-item>-->
        <!--<el-menu-item index="">办结流程</el-menu-item>-->
        <!--</el-submenu>-->
        <el-submenu index="8">
            <template slot="title"><i class="iconfont icon-shiwu"></i>客服事务</template>
            <el-menu-item index="/orderManagementList">订单管理</el-menu-item>
            <!--<el-menu-item index="/notDisposeOrderManagementList">未处理订单管理 <i class="menuBadge" v-if="menuState.orderUntreated.count">{{ menuState.orderUntreated.count }}</i></el-menu-item>-->
            <el-menu-item index="/affairOrderWatchManagement">订单监控</el-menu-item>
            <el-menu-item index="/affairGoodsCompelOut">商品强制下架</el-menu-item>
            <el-menu-item index="/affairGoodsInfoManagement">商品信息管理</el-menu-item>
            <el-menu-item index="/affairShoperInfoManagement">商家信息管理</el-menu-item>
            <el-menu-item index="/plateBrandManagement">平台品牌管理</el-menu-item>
            <el-menu-item index="/businessCreditReputationList">商家信用信誉管理</el-menu-item>
            <el-menu-item index="/businessCreditReputationRuleList">商家信用信誉规则管理</el-menu-item>
        </el-submenu>
        <el-submenu index="orderMonitor">
            <template slot="title"><i class="iconfont icon-ddjk"></i>订单监控 <i
                    class="menuBadge"
                    v-if="allCountOrderUntreated"
                >{{ allCountOrderUntreated }}</i></template>
            <el-menu-item index="/notDisposeOrderManagementList">商家未处理订单 <i
                    class="menuBadge"
                    v-if="menuState.orderUntreated.count"
                >{{ menuState.orderUntreated.count }}</i></el-menu-item>
            <el-menu-item index="/hignMoneyAlreadyPay">高额已支付订单</el-menu-item>
            <el-menu-item index="/waitSendOut">待发货订单</el-menu-item>
            <el-menu-item index="/yesterdayReturn">昨日被退订单</el-menu-item>
        </el-submenu>
        <el-submenu index="monitoring">
            <template slot="title"><i class="iconfont icon-sjjk"></i>商家监控</template>
            <el-menu-item index="/orderMonitoring">订单监控</el-menu-item>
            <el-menu-item index="/putawayMonitoring">上架监控</el-menu-item>
            <el-menu-item index="/disposeResultMonitoring">监控处理结果</el-menu-item>
            <el-menu-item index="/loginRemind">登录提醒</el-menu-item>
        </el-submenu>
        <el-submenu index="5">
            <template slot="title"><i class="iconfont icon-file"></i>文档管理</template>
            <el-menu-item index="/ruleUser">用户规则</el-menu-item>
            <el-menu-item index="/ruleUserHelp">用户帮助</el-menu-item>
            <el-menu-item index="/ruleBusiness">商家规则</el-menu-item>
            <el-menu-item index="/ruleBusinessHelp">商家帮助</el-menu-item>
            <el-menu-item index="/rulePlatform">平台规则</el-menu-item>
            <el-menu-item index="/rulePlatformHelp">平台帮助</el-menu-item>
        </el-submenu>
        <el-submenu index="9">
            <template slot="title"><i class="iconfont icon-business"></i>业务培训</template>
            <el-menu-item index="/textbooksList">教材列表</el-menu-item>
            <!--<el-menu-item index="/textbooksRelease">教材发布</el-menu-item>-->
            <el-menu-item index="/examinationList">考试考核</el-menu-item>
            <el-menu-item index="/examinationInquiry">考试查询</el-menu-item>
        </el-submenu>
        <el-submenu index="10">
            <template slot="title"><i class="iconfont icon-talkingSkill"></i>话术管理</template>
            <el-menu-item index="/talkingSkillList">话术管理</el-menu-item>
            <el-menu-item index="/talkingSkillEdit">话术编写</el-menu-item>
            <el-menu-item index="/talkingSkillTrainList">话术反馈</el-menu-item>
        </el-submenu>
        <el-submenu index="11">
            <template slot="title"><i class="iconfont icon-study"></i>学习管理</template>
            <el-menu-item index="/learningManagementList">学习管理</el-menu-item>
            <el-menu-item index="/knowledgeAdd">知识发布</el-menu-item>
            <el-menu-item index="/learningFeedbackList">学习反馈</el-menu-item>
        </el-submenu>
        <!--<el-submenu index="12">
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
        </el-submenu>-->
        <el-submenu index="16">
            <template slot="title"><i class="iconfont icon-SetUp"></i>系统设置</template>
            <!--<el-menu-item index="">权限设置</el-menu-item>
            <el-menu-item index="">档案管理</el-menu-item>
            <el-menu-item index="">AI设置</el-menu-item>
            <el-menu-item index="">设备管理</el-menu-item>
            <el-menu-item index="">操作日志</el-menu-item>-->
            <el-menu-item index="/logs">系统日志</el-menu-item>
        </el-submenu>
        <!--<el-submenu index="17">
            <template slot="title"><i class="iconfont icon-help"></i>帮助文档</template>
        </el-submenu>-->
    </el-menu>
    <!--<el-menu
        class="custom-menu"
        default-active="1"
        text-color="#fff"
        active-text-color="#ffd04b"
        theme="dark"
        router
        v-else
    >
        <el-submenu index="16">
            <template slot="title"><i class="iconfont icon-SetUp"></i>系统设置</template>
            <el-menu-item index="">权限设置</el-menu-item>
            <el-menu-item index="">档案管理</el-menu-item>
            <el-menu-item index="">AI设置</el-menu-item>
            <el-menu-item index="">操作日志</el-menu-item>
            <el-menu-item index="">设备管理</el-menu-item>
        </el-submenu>
    </el-menu>-->
</template>

<script>

import AuditCount from '../api/audit/auditCount'
import { mapState } from 'vuex'
import { initWebSocket } from '../websocket/websocket';

export default {
    data() {
        return {
            admin: true
        }
    },
    computed: {
        groupCount() {
            return function (groupIde) {
                let query = this.$store.state.menu.waitAuditResult;
                let count = 0;
                for (let key in query) {
                    if (query[key].ide === groupIde) {
                        count += query[key].count;
                    }
                }
                return count;
            }
        },
        allCountAudit() {
            let query = this.$store.state.menu.waitAuditResult;
            let count = 0;
            for (let key in query) {
                if (query[key].systemType === 'auditSystem') {
                    count += query[key].count;
                }
            }
            return count;
        },
        allCountOrderUntreated() {
            let query = this.$store.state.menu.waitAuditResult;
            let count = 0;
            for (let key in query) {
                if (query[key].systemType === 'orderUntreated')
                    count += query[key].count;
            }
            return count;
        },
        ...mapState({
            menuState: state => state.menu.waitAuditResult
        })
    },
    mounted() {
        this.initWaitAuditCount();
    },
    methods: {
        initWaitAuditCount() {
            let query = this.$store.state.menu.waitAuditResult;
            let queryResult = new Array();
            for (let key in query) {
                queryResult.push({
                    name: key,
                    systemType: query[key].systemType,
                    queryTypes: query[key].queryTypes
                })
            }
            AuditCount.call(this, queryResult).then(res => {
                if (res.Code === 1) {
                    this.$store.dispatch('setWaitAuditResultInit', res.Data);
                    initWebSocket();
                } else {
                    this.$message.error('获取待审核数量失败');
                }
            })
        },
        calcle(arr) {
            let count = 0;
            arr.forEach(n => {
                count += n;
            });
            return count;
        }
    }
}
</script>

<style lang="less" scoped>
.logo {
    width: 200px;
}
.QQcustomer {
    width: 100%;
    height: 100%;
    display: block;
    color: #fff;
}
.custom-menu {
    background: #001529 !important;
    border: none;
    .el-submenu__title i {
        color: #fff !important;
        font-weight: 600;
        margin: 0 3px;
    }
    .el-menu-item {
        background-color: #000;
    }
}
.custom-menu .el-submenu__title:hover {
    background-color: #000 !important;
}
.custom-menu .el-menu-item:focus,
.custom-menu .el-menu-item:hover {
    background-color: #25ada3 !important;
}

.main_logo {
    width: 230px;
    height: 75px;
    padding: 0 10px;
    background-color: #001529;
    i {
        font-size: 35px;
        color: #25ada3;
        display: block;
        padding-top: 20px;
    }
}

.menuBadge {
    background-color: #f00;
    border-radius: 10px;
    color: #fff;
    display: inline-block;
    font-size: 12px;
    height: 18px;
    font-style: normal;
    margin-top: 0;
    line-height: 17px;
    padding: 0 6px;
    text-align: center;
    white-space: nowrap;
    border: 1px solid #f00;
}
</style>

<style>
.custom-menu .el-submenu__title:hover {
    background-color: #000 !important;
}
.el-menu {
    background-color: #001529!important;
}

.custom-menu .el-menu-item{
    background-color: #001529!important;
}

</style>

