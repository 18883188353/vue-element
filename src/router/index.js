import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const login = r => require.ensure([], () => r(require('@/page/login')), 'login');
const home = r => require.ensure([], () => r(require('@/page/home')), 'home');

// 首页
const customerIndex = r => require.ensure([], () => r(require('@/page/customerIndex/customerIndex')), 'customerIndex');
const indexCustomer = r => require.ensure([], () => r(require('@/page/customerIndex/indexCustomer')), 'indexCustomer');
const indexAudit = r => require.ensure([], () => r(require('@/page/customerIndex/indexAudit')), 'indexAudit');
const indexOther = r => require.ensure([], () => r(require('@/page/customerIndex/indexOther')), 'indexOther');

// 电话客服
const telephoneServiceIndex = r => require.ensure([], () => r(require('@/page/telephoneService/telephoneServiceIndex')), 'telephoneServiceIndex');
const userInbound = r => require.ensure([], () => r(require('@/page/telephoneService/userInbound')), 'userInbound');
const businessInlet = r => require.ensure([], () => r(require('@/page/telephoneService/businessInlet')), 'businessInlet');
const callUser = r => require.ensure([], () => r(require('@/page/telephoneService/callUser')), 'callUser');
const callBusiness = r => require.ensure([], () => r(require('@/page/telephoneService/callBusiness')), 'callBusiness');
const turnoverEvents = r => require.ensure([], () => r(require('@/page/telephoneService/turnoverEvents')), 'turnoverEvents');
const returnRecord = r => require.ensure([], () => r(require('@/page/telephoneService/returnRecord')), 'returnRecord');

// 平台客服
const email = r => require.ensure([], () => r(require('@/page/platformCustomer/email')), 'email');
const emailDetails = r => require.ensure([], () => r(require('@/page/platformCustomer/emailDetails')), 'emailDetails');
const emailReply = r => require.ensure([], () => r(require('@/page/platformCustomer/emailReply')), 'emailReply');
const offLine = r => require.ensure([], () => r(require('@/page/platformCustomer/offLine')), 'offLine');
const offLineDetails = r => require.ensure([], () => r(require('@/page/platformCustomer/offLineDetails')), 'offLineDetails');
const offLineReply = r => require.ensure([], () => r(require('@/page/platformCustomer/offLineReply')), 'offLineReply');
const workList = r => require.ensure([], () => r(require('@/page/platformCustomer/workList')), 'workList');
const myWorkList = r => require.ensure([], () => r(require('@/page/platformCustomer/myWorkList')), 'myWorkList');
const waitSheetList = r => require.ensure([], () => r(require('@/page/platformCustomer/waitSheetList')), 'waitSheetList');
const workListDetails = r => require.ensure([], () => r(require('@/page/platformCustomer/workListDetails')), 'workListDetails');
const workListSource = r => require.ensure([], () => r(require('@/page/platformCustomer/workListSource')), 'workListSource');
const workListLook = r => require.ensure([], () => r(require('@/page/platformCustomer/workListLook')), 'workListLook');
const workListLookReportDispute = r => require.ensure([], () => r(require('@/page/platformCustomer/workListLookReportDispute')), 'workListLookReportDispute');
const onLineService = r => require.ensure([], () => r(require('@/page/platformCustomer/onLineService')), 'onLineService');

//短信管理
const messageTemplateList = r => require.ensure([], () => r(require('@/page/message/messageTemplateList')), 'messageTemplateList');
const messageTemplateInsert = r => require.ensure([], () => r(require('@/page/message/messageTemplateInsert')), 'messageTemplateInsert');
const messageDetails = r => require.ensure([], () => r(require('@/page/message/messageDetails')), 'messageDetails');
const messageReply = r => require.ensure([], () => r(require('@/page/message/messageReply')), 'messageReply');
const messageList = r => require.ensure([], () => r(require('@/page/message/messageList')), 'messageList');

const messageSend = r => require.ensure([], () => r(require('@/page/message/messageSend')), 'messageSend');

// 用户规则
const ruleUser = r => require.ensure([], () => r(require('@/page/documentManagement/ruleUser')), 'ruleUser');
const ruleUserAdd = r => require.ensure([], () => r(require('@/page/documentManagement/ruleUserAdd')), 'ruleUserAdd');
const ruleUserAudit = r => require.ensure([], () => r(require('@/page/documentManagement/ruleUserAudit')), 'ruleUserAudit');
const ruleBusiness = r => require.ensure([], () => r(require('@/page/documentManagement/ruleBusiness')), 'ruleBusiness');
const ruleBusinessHouse = r => require.ensure([], () => r(require('@/page/documentManagement/ruleBusinessHouse')), 'ruleBusinessHouse');
const ruleBusinessHouseAdd = r => require.ensure([], () => r(require('@/page/documentManagement/ruleBusinessHouseAdd')), 'ruleBusinessHouseAdd');
const ruleUserHelp = r => require.ensure([], () => r(require('@/page/documentManagement/ruleUserHelp')), 'ruleUserHelp');
const ruleBusinessHelp = r => require.ensure([], () => r(require('@/page/documentManagement/ruleBusinessHelp')), 'ruleBusinessHelp');
const rulePlatform = r => require.ensure([], () => r(require('@/page/documentManagement/rulePlatform')), 'rulePlatform');
const rulePlatformHelp = r => require.ensure([], () => r(require('@/page/documentManagement/rulePlatformHelp')), 'rulePlatformHelp');

// 异常处理
const testingUser = r => require.ensure([], () => r(require('@/page/abnormalHandle/testingUser')), 'testingUser');
const testingBusiness = r => require.ensure([], () => r(require('@/page/abnormalHandle/testingBusiness')), 'testingBusiness');
const testingUserDetails = r => require.ensure([], () => r(require('@/page/abnormalHandle/testingUserDetails')), 'testingUserDetails');
const accountThawing = r => require.ensure([], () => r(require('@/page/abnormalHandle/accountThawing')), 'accountThawing');
const goodsSoldOut = r => require.ensure([], () => r(require('@/page/abnormalHandle/goodsSoldOut')), 'goodsSoldOut');
const licenceContractRemind = r => require.ensure([], () => r(require('@/page/abnormalHandle/licenceContractRemind')), 'licenceContractRemind');
const licenceContractRemindDetails = r => require.ensure([], () => r(require('@/page/abnormalHandle/licenceContractRemindDetails')), 'licenceContractRemindDetails');
const ruleReminder = r => require.ensure([], () => r(require('@/page/abnormalHandle/ruleReminder')), 'ruleReminder');
const ruleReminderAdd = r => require.ensure([], () => r(require('@/page/abnormalHandle/ruleReminderAdd')), 'ruleReminderAdd');

// 审核管理
const auditCheckIn = r => require.ensure([], () => r(require('@/page/audit/auditCheckIn')), 'auditCheckIn');
const auditCheckInDetails = r => require.ensure([], () => r(require('@/page/audit/auditCheckInDetails')), 'auditCheckInDetails');

const auditDataUpdate = r => require.ensure([], () => r(require('@/page/audit/auditDataUpdate')), 'auditDataUpdate');
const auditDataUpdateDetails = r => require.ensure([], () => r(require('@/page/audit/auditDataUpdateDetails')), 'auditDataUpdateDetails');

const auditHouseNews = r => require.ensure([], () => r(require('@/page/audit/realty/auditHouseNews')), 'auditHouseNews');
const auditHouseNewsDetails = r => require.ensure([], () => r(require('@/page/audit/realty/auditHouseNewsDetails')), 'auditHouseNewsDetails');
const auditEvaluate = r => require.ensure([], () => r(require('@/page/audit/auditEvaluate')), 'auditEvaluate');
const auditEvaluateDetails = r => require.ensure([], () => r(require('@/page/audit/auditEvaluateDetails')), 'auditEvaluateDetails');

const auditUserReplyEvaluate = r => require.ensure([], () => r(require('@/page/audit/auditUserReplyEvaluate')), 'auditUserReplyEvaluate');
const auditUserReplyEvaluateDetails = r => require.ensure([], () => r(require('@/page/audit/auditUserReplyEvaluateDetails')), 'auditUserReplyEvaluateDetails');

const auditEvaluateReply = r => require.ensure([], () => r(require('@/page/audit/auditEvaluateReply')), 'auditEvaluateReply');
const auditEvaluateReplyDetails = r => require.ensure([], () => r(require('@/page/audit/auditEvaluateReplyDetails')), 'auditEvaluateReplyDetails');
const auditUserQuestions = r => require.ensure([], () => r(require('@/page/audit/questionAnswer/auditUserQuestions')), 'auditUserQuestions');
const auditUserQuestionsDetail = r => require.ensure([], () => r(require('@/page/audit/questionAnswer/auditUserQuestionsDetail')), 'auditUserQuestionsDetail');
const auditUserAnswer = r => require.ensure([], () => r(require('@/page/audit/questionAnswer/auditUserAnswer')), 'auditUserAnswer');
const auditUserAnswerDetail = r => require.ensure([], () => r(require('@/page/audit/questionAnswer/auditUserAnswerDetail')), 'auditUserAnswerDetail');
const auditShopAnswer = r => require.ensure([], () => r(require('@/page/audit/questionAnswer/auditShopAnswer')), 'auditShopAnswer');
const auditShopAnswerDetail = r => require.ensure([], () => r(require('@/page/audit/questionAnswer/auditShopAnswerDetail')), 'auditShopAnswerDetail');
const auditQaComment = r => require.ensure([], () => r(require('@/page/audit/questionAnswer/auditQaComment')), 'auditQaComment');
const auditQaCommentDetail = r => require.ensure([], () => r(require('@/page/audit/questionAnswer/auditQaCommentDetail')), 'auditQaCommentDetail');
const auditQaCommentReply = r => require.ensure([], () => r(require('@/page/audit/questionAnswer/auditQaCommentReply')), 'auditQaCommentReply');
const auditQaCommentReplyDetail = r => require.ensure([], () => r(require('@/page/audit/questionAnswer/auditQaCommentReplyDetail')), 'auditQaCommentReplyDetail');
const auditCommodity = r => require.ensure([], () => r(require('@/page/audit/goods/auditCommodity')), 'auditCommodity');
const auditCommodityDetails = r => require.ensure([], () => r(require('@/page/audit/goods/auditCommodityDetails')), 'auditCommodityDetails');

const auditGoodsCorePrice = r => require.ensure([], () => r(require('@/page/audit/goods/auditGoodsCorePrice')), 'auditGoodsCorePrice');
const auditGoodsCorePriceDetails = r => require.ensure([], () => r(require('@/page/audit/goods/auditGoodsCorePriceDetails')), 'auditGoodsCorePriceDetails');
const auditGoodsSoldOut = r => require.ensure([], () => r(require('@/page/audit/goods/auditGoodsSoldOut')), 'auditGoodsSoldOut');
const auditGoodsSoldOutDetails = r => require.ensure([], () => r(require('@/page/audit/goods/auditGoodsSoldOutDetails')), 'auditGoodsSoldOutDetails');

const auditActive = r => require.ensure([], () => r(require('@/page/audit/auditActive')), 'auditActive');
const auditActiveDetails = r => require.ensure([], () => r(require('@/page/audit/auditActiveDetails')), 'auditActiveDetails');
const auditShopClose = r => require.ensure([], () => r(require('@/page/audit/auditShopClose')), 'auditShopClose');
const auditShopCloseDetails = r => require.ensure([], () => r(require('@/page/audit/auditShopCloseDetails')), 'auditShopCloseDetails');

const auditArticle = r => require.ensure([], () => r(require('@/page/audit/auditArticle')), 'auditArticle');
const auditArticleDetails = r => require.ensure([], () => r(require('@/page/audit/auditArticleDetails')), 'auditArticleDetails');
const auditPlatformActivities = r => require.ensure([], () => r(require('@/page/audit/activities/auditPlatformActivities')), 'auditPlatformActivities');
const auditPlatformActivitiesDetails = r => require.ensure([], () => r(require('@/page/audit/activities/auditPlatformActivitiesDetails')), 'auditPlatformActivitiesDetails');
const collageToexamine = r => require.ensure([], () => r(require('@/page/audit/activities/collageToexamine')), 'collageToexamine');
const collageToexamineAudit = r => require.ensure([], () => r(require('@/page/audit/activities/collageToexamineAudit')), 'collageToexamineAudit');
const auditAdvertData = r => require.ensure([], () => r(require('@/page/audit/auditAdvertData')), 'auditAdvertData');
const auditAdvertDataDetails = r => require.ensure([], () => r(require('@/page/audit/auditAdvertDataDetails')), 'auditAdvertDataDetails');
const auditBrand = r => require.ensure([], () => r(require('@/page/audit/auditBrand')), 'auditBrand');
const auditBrandDetails = r => require.ensure([], () => r(require('@/page/audit/auditBrandDetails')), 'auditBrandDetails');
const auditBankChange = r => require.ensure([], () => r(require('@/page/audit/bankChange/auditBankChange')), 'auditBankChange');
const auditBankChangeDetails = r => require.ensure([], () => r(require('@/page/audit/bankChange/auditBankChangeDetails')), 'auditBankChangeDetails');
const auditInEnter = r => require.ensure([], () => r(require('@/page/audit/realty/auditInEnter')), 'auditInEnter');
const auditInEnterDetails = r => require.ensure([], () => r(require('@/page/audit/realty/auditInEnterDetails')), 'auditInEnterDetails');
const auditRealtyEvaluate = r => require.ensure([], () => r(require('@/page/audit/realty/auditRealtyEvaluate')), 'auditRealtyEvaluate');
const auditRealtyEvaluateDetails = r => require.ensure([], () => r(require('@/page/audit/realty/auditRealtyEvaluateDetails')), 'auditRealtyEvaluateDetails');
const auditRealtyEvaluateReply = r => require.ensure([], () => r(require('@/page/audit/realty/auditRealtyEvaluateReply')), 'auditRealtyEvaluateReply');
const auditRealtyEvaluateReplyDetails = r => require.ensure([], () => r(require('@/page/audit/realty/auditRealtyEvaluateReplyDetails')), 'auditRealtyEvaluateReplyDetails');
const realtyCompanyAuditChange = r => require.ensure([], () => r(require('@/page/audit/realty/realtyCompanyAuditChange')), 'realtyCompanyAuditChange');
const realtyCompanyAuditChangeDetails = r => require.ensure([], () => r(require('@/page/audit/realty/realtyCompanyAuditChangeDetails')), 'realtyCompanyAuditChangeDetails');
const realtyLicenseAuditChange = r => require.ensure([], () => r(require('@/page/audit/realty/realtyLicenseAuditChange')), 'realtyLicenseAuditChange');
const realtyLicenseAuditChangeDetails = r => require.ensure([], () => r(require('@/page/audit/realty/realtyLicenseAuditChangeDetails')), 'realtyLicenseAuditChangeDetails');
const auditChangeCompany = r => require.ensure([], () => r(require('@/page/audit/shopChange/auditChangeCompany')), 'auditChangeCompany');
const auditChangeCompanyDetails = r => require.ensure([], () => r(require('@/page/audit/shopChange/auditChangeCompanyDetails')), 'auditChangeCompanyDetails');
const auditChangeCategory = r => require.ensure([], () => r(require('@/page/audit/shopChange/auditChangeCategory')), 'auditChangeCategory');
const auditChangeCategoryDetails = r => require.ensure([], () => r(require('@/page/audit/shopChange/auditChangeCategoryDetails')), 'auditChangeCategoryDetails');
const auditChangeLicense = r => require.ensure([], () => r(require('@/page/audit/shopChange/auditChangeLicense')), 'auditChangeLicense');
const auditChangeLicenseDetails = r => require.ensure([], () => r(require('@/page/audit/shopChange/auditChangeLicenseDetails')), 'auditChangeLicenseDetails');
const auditChangeLicenseYear = r => require.ensure([], () => r(require('@/page/audit/shopChange/auditChangeLicenseYear')), 'auditChangeLicenseYear');
const auditChangeLicenseYearDetails = r => require.ensure([], () => r(require('@/page/audit/shopChange/auditChangeLicenseYearDetails')), 'auditChangeLicenseYearDetails');
const auditChangeShop = r => require.ensure([], () => r(require('@/page/audit/shopChange/auditChangeShop')), 'auditChangeShop');
const auditChangeShopDetails = r => require.ensure([], () => r(require('@/page/audit/shopChange/auditChangeShopDetails')), 'auditChangeShopDetails');
const auditShopCertificates = r => require.ensure([], () => r(require('@/page/audit/auditShopCertificates')), 'auditShopCertificates');
const auditShopCertificatesDetails = r => require.ensure([], () => r(require('@/page/audit/auditShopCertificatesDetails')), 'auditShopCertificatesDetails');

// 商家监控
const orderMonitoring = r => require.ensure([], () => r(require('@/page/shopMonitoring/orderMonitoring')), 'orderMonitoring');
const orderMonitoringDetails = r => require.ensure([], () => r(require('@/page/shopMonitoring/orderMonitoringDetails')), 'orderMonitoringDetails');
const putawayMonitoring = r => require.ensure([], () => r(require('@/page/shopMonitoring/putawayMonitoring')), 'putawayMonitoring');
const putawayMonitoringDetails = r => require.ensure([], () => r(require('@/page/shopMonitoring/putawayMonitoringDetails')), 'putawayMonitoringDetails');
const disposeResultMonitoring = r => require.ensure([], () => r(require('@/page/shopMonitoring/disposeResultMonitoring')), 'disposeResultMonitoring');
const disposeResultMonitoringDetails = r => require.ensure([], () => r(require('@/page/shopMonitoring/disposeResultMonitoringDetails')), 'disposeResultMonitoringDetails');
const loginRemind = r => require.ensure([], () => r(require('@/page/shopMonitoring/loginRemind')), 'loginRemind');
const loginRemindDetails = r => require.ensure([], () => r(require('@/page/shopMonitoring/loginRemindDetails')), 'loginRemindDetails');


//业务培训
const textbooksList = r => require.ensure([], () => r(require('@/page/businessTraining/textbooksList')), 'textbooksList');
const textbooksAdd = r => require.ensure([], () => r(require('@/page/businessTraining/textbooksAdd')), 'textbooksAdd');
const textbooksRelease = r => require.ensure([], () => r(require('@/page/businessTraining/textbooksRelease')), 'textbooksRelease');
const examinationList = r => require.ensure([], () => r(require('@/page/businessTraining/examinationList')), 'examinationList');
const titleEditorial = r => require.ensure([], () => r(require('@/page/businessTraining/titleEditorial')), 'titleEditorial');
const examination = r => require.ensure([], () => r(require('@/page/businessTraining/examination')), 'examination');
const examinationInquiry = r => require.ensure([], () => r(require('@/page/businessTraining/examinationInquiry')), 'examinationInquiry');
const examinationInquiryDetail = r => require.ensure([], () => r(require('@/page/businessTraining/examinationInquiryDetail')), 'examinationInquiryDetail');


// 话术管理
const talkingSkillList = r => require.ensure([], () => r(require('@/page/talkingSkill/talkingSkillList')), 'talkingSkillList');
const talkingSkillEdit = r => require.ensure([], () => r(require('@/page/talkingSkill/talkingSkillEdit')), 'talkingSkillEdit');
const talkingSkillAudit = r => require.ensure([], () => r(require('@/page/talkingSkill/talkingSkillAudit')), 'talkingSkillAudit');
const talkingSkillTrainList = r => require.ensure([], () => r(require('@/page/talkingSkill/talkingSkillTrainList')), 'talkingSkillTrainList');
const trainingFeedback = r => require.ensure([], () => r(require('@/page/talkingSkill/trainingFeedback')), 'trainingFeedback');


// 学习管理
const learningManagementList = r => require.ensure([], () => r(require('@/page/learningManagement/learningManagementList')), 'learningManagementList');
const knowledgeAdd = r => require.ensure([], () => r(require('@/page/learningManagement/knowledgeAdd')), 'knowledgeAdd');
const knowledgeAudit = r => require.ensure([], () => r(require('@/page/learningManagement/knowledgeAudit')), 'knowledgeAudit');
const learningFeedbackList = r => require.ensure([], () => r(require('@/page/learningManagement/learningFeedbackList')), 'learningFeedbackList');
const learningFeedbackLook = r => require.ensure([], () => r(require('@/page/learningManagement/learningFeedbackLook')), 'learningFeedbackLook');

// 电话客服


// 客服事物
const affairShoperInfoManagement = r => require.ensure([], () => r(require('@/page/customerAffair/shopGoods/affairShoperInfoManagement')), 'affairShoperInfoManagement');
const affairShoperInfoManagementDetail = r => require.ensure([], () => r(require('@/page/customerAffair/shopGoods/affairShoperInfoManagementDetail')), 'affairShoperInfoManagementDetail');
const affairGoodsInfoManagement = r => require.ensure([], () => r(require('@/page/customerAffair/shopGoods/affairGoodsInfoManagement')), 'affairGoodsInfoManagement');
const affairGoodsCompelOut = r => require.ensure([], () => r(require('@/page/customerAffair/shopGoods/affairGoodsCompelOut')), 'affairGoodsCompelOut');
const affairGoodsInfoManagementDetail = r => require.ensure([], () => r(require('@/page/customerAffair/shopGoods/affairGoodsInfoManagementDetail')), 'affairGoodsInfoManagementDetail');
const affairGoodsInfoCorePriceRecord = r => require.ensure([], () => r(require('@/page/customerAffair/shopGoods/affairGoodsInfoCorePriceRecord')), 'affairGoodsInfoCorePriceRecord');
const plateBrandManagement = r => require.ensure([], () => r(require('@/page/customerAffair/shopGoods/plateBrandManagement')), 'plateBrandManagement');
const plateBrandManagementDetail = r => require.ensure([], () => r(require('@/page/customerAffair/shopGoods/plateBrandManagementDetail')), 'plateBrandManagementDetail');
const affairOrderWatchManagement = r => require.ensure([], () => r(require('@/page/customerAffair/order/affairOrderWatchManagement')), 'affairOrderWatchManagement');
const affairOrderWatchManagementDetail = r => require.ensure([], () => r(require('@/page/customerAffair/order/affairOrderWatchManagementDetail')), 'affairOrderWatchManagementDetail');
const orderManagementList = r => require.ensure([], () => r(require('@/page/customerAffair/orderManagement/orderManagementList')), 'orderManagementList');
const notDisposeOrderManagementList = r => require.ensure([], () => r(require('@/page/customerAffair/orderManagement/notDisposeOrderManagementList')), 'notDisposeOrderManagementList');
const orderManagementListDetails = r => require.ensure([], () => r(require('@/page/customerAffair/orderManagement/orderManagementListDetails')), 'orderManagementListDetails');
const businessCreditReputationList = r => require.ensure([], () => r(require('@/page/customerAffair/businessCreditReputation/businessCreditReputationList')), 'businessCreditReputationList');
const businessCreditReputationListDetails = r => require.ensure([], () => r(require('@/page/customerAffair/businessCreditReputation/businessCreditReputationListDetails')), 'businessCreditReputationListDetails');
const businessCreditReputationRuleList = r => require.ensure([], () => r(require('@/page/customerAffair/businessCreditReputationRule/businessCreditReputationRuleList')), 'businessCreditReputationRuleList');
const scoringRules = r => require.ensure([], () => r(require('@/page/customerAffair/businessCreditReputationRule/scoringRules')), 'scoringRules');
const addNodeRule = r => require.ensure([], () => r(require('@/page/customerAffair/businessCreditReputationRule/addNodeRule')), 'addNodeRule');
const addZeroRule = r => require.ensure([], () => r(require('@/page/customerAffair/businessCreditReputationRule/addZeroRule')), 'addZeroRule');
const reputationScoringRule = r => require.ensure([], () => r(require('@/page/customerAffair/businessCreditReputationRule/reputationScoringRule')), 'reputationScoringRule');
const addGradeRule = r => require.ensure([], () => r(require('@/page/customerAffair/businessCreditReputationRule/addGradeRule')), 'addGradeRule');
const addEquityRule = r => require.ensure([], () => r(require('@/page/customerAffair/businessCreditReputationRule/addEquityRule')), 'addEquityRule');
const addScoreRule = r => require.ensure([], () => r(require('@/page/customerAffair/businessCreditReputationRule/addScoreRule')), 'addScoreRule');

const hignMoneyAlreadyPay = r => require.ensure([], () => r(require('@/page/orderMonitor/hignMoneyAlreadyPay')), 'hignMoneyAlreadyPay');
const waitSendOut = r => require.ensure([], () => r(require('@/page/orderMonitor/waitSendOut')), 'waitSendOut');
const yesterdayReturn = r => require.ensure([], () => r(require('@/page/orderMonitor/yesterdayReturn')), 'yesterdayReturn');

const logs = r => require.ensure([], () => r(require('@/page/log/log')), 'logs');

// 路由
const routes = [
    { path: '/login', name: 'login', component: login },
    {
        path: '/', component: home, name: 'home',
        children: [
            { path: 'index', name: 'customerIndex', component: customerIndex, meta: { title: [], keepAlive: false } },
            // 电话客服
            { path: 'telephoneServiceIndex', component: telephoneServiceIndex, meta: { title: ['电话客服'], keepAlive: false } },
            { path: 'userInbound', component: userInbound, meta: { title: ['用户呼入'], keepAlive: false } },
            { path: 'businessInlet', component: businessInlet, meta: { title: ['商家呼入'], keepAlive: false } },
            { path: 'callUser', component: callUser, meta: { title: ['呼叫用户'], keepAlive: false } },
            { path: 'callBusiness', component: callBusiness, meta: { title: ['呼叫商家'], keepAlive: false } },
            { path: 'turnoverEvents', component: turnoverEvents, meta: { title: ['流转事件'], keepAlive: false } },
            { path: 'returnRecord', component: returnRecord, meta: { title: ['回访记录'], keepAlive: false } },

            //平台客服
            { path: '/email', component: email, meta: { title: ['邮箱客服'], keepAlive: false } },
            { path: '/emailDetails', component: emailDetails, meta: { title: ['邮箱客服详情'], keepAlive: false } },
            { path: '/emailReply', component: emailReply, meta: { title: ['邮箱回复'], keepAlive: false } },
            { path: '/offLine', component: offLine, meta: { title: ['离线客服'], keepAlive: false } },
            { path: '/offLineDetails', component: offLineDetails, meta: { title: ['离线客服'], keepAlive: false } },
            { path: '/offLineReply', component: offLineReply, meta: { title: ['留言回复'], keepAlive: false } },
            { path: '/workList', component: workList, meta: { title: ['工单列表'], keepAlive: true } },
            { path: '/myWorkList', component: myWorkList, meta: { title: ['我的工单列表'], keepAlive: true } },
            { path: '/waitSheetList', component: waitSheetList, meta: { title: ['待处理工单列表'], keepAlive: true } },
            { path: '/workListDetails/:id', component: workListDetails, meta: { title: ['工单详情'], keepAlive: false } },
            { path: '/workListSource/:id', component: workListSource, meta: { title: ['来源工单'], keepAlive: false } },
            { path: '/workListLook/:id', component: workListLook, meta: { title: ['查看工单'], keepAlive: false } },
            { path: '/workListLookReportDispute/:id', component: workListLookReportDispute, meta: { title: ['交易纠纷'], keepAlive: false } },
            { path: '/onLineService', component: onLineService, meta: { title: ['在线客服'], keepAlive: false } },


            // 短信管理
            { path: 'messageTemplateList', name: 'messageTemplateList', component: messageTemplateList, meta: { title: ['短信模板管理'], keepAlive: true } },
            { path: 'messageTemplateInsert/:id', name: 'messageTemplateInsert', component: messageTemplateInsert, meta: { title: ['新增短信模板'], keepAlive: false } },
            { path: 'messageDetails', name: 'messageDetails', component: messageDetails, meta: { title: ['处理结果'], keepAlive: false } },
            { path: 'messageReply', name: 'messageReply', component: messageReply, meta: { title: ['立即回复'], keepAlive: false } },
            { path: 'messageList', name: 'messageList', component: messageList, meta: { title: ['短信列表'], keepAlive: true } },
            { path: 'messageSend/:id', name: 'messageSend', component: messageSend, meta: { title: ['发送短信'], keepAlive: false } },

            // 文档管理
            { path: 'ruleUser', name: 'ruleUser', component: ruleUser, meta: { title: ['用户规则'], keepAlive: false } },
            { path: 'ruleUserAdd', name: 'ruleUserAdd', component: ruleUserAdd, meta: { title: ['规则文档'], keepAlive: false } },
            { path: 'ruleUserAudit', name: 'ruleUserAudit', component: ruleUserAudit, meta: { title: ['审核用户规则'], keepAlive: false } },
            { path: 'ruleBusiness', name: 'ruleBusiness', component: ruleBusiness, meta: { title: ['商家用户规则'], keepAlive: false } },
            { path: 'ruleBusinessHouse', name: 'ruleBusinessHouse', component: ruleBusinessHouse, meta: { title: ['商家众议院规则'], keepAlive: false } },
            { path: 'ruleBusinessHouseAdd', name: 'ruleBusinessHouseAdd', component: ruleBusinessHouseAdd, meta: { title: ['新增众议院规则'], keepAlive: false } },
            { path: 'ruleUserHelp', name: 'ruleUserHelp', component: ruleUserHelp, meta: { title: ['用户帮助'], keepAlive: false } },
            { path: 'ruleBusinessHelp', name: 'ruleBusinessHelp', component: ruleBusinessHelp, meta: { title: ['商家帮助'], keepAlive: false } },
            { path: 'rulePlatform', name: 'rulePlatform', component: rulePlatform, meta: { title: ['平台规则'], keepAlive: false } },
            { path: 'rulePlatformHelp', name: 'rulePlatformHelp', component: rulePlatformHelp, meta: { title: ['平台帮助'], keepAlive: false } },


            // 异常处理
            { path: 'testingUser', name: 'testingUser', component: testingUser, meta: { title: ['用户检测'], keepAlive: false } },
            { path: 'testingBusiness', name: 'testingBusiness', component: testingBusiness, meta: { title: ['商家检测'], keepAlive: false } },
            { path: 'testingUserDetails', name: 'testingUserDetails', component: testingUserDetails, meta: { title: ['异常处理详情'], keepAlive: false } },
            { path: 'accountThawing', name: 'accountThawing', component: accountThawing, meta: { title: ['账号解冻'], keepAlive: false } },
            { path: 'goodsSoldOut', name: 'goodsSoldOut', component: goodsSoldOut, meta: { title: ['商品下架'], keepAlive: false } },
            { path: 'licenceContractRemind', name: 'licenceContractRemind', component: licenceContractRemind, meta: { title: ['证照合约提醒'], keepAlive: false } },
            { path: 'licenceContractRemindDetails', name: 'licenceContractRemindDetails', component: licenceContractRemindDetails, meta: { title: ['营业执照到期'], keepAlive: false } },
            { path: 'ruleReminder', name: 'ruleReminder', component: ruleReminder, meta: { title: ['提醒规则列表'], keepAlive: false } },
            { path: 'ruleReminderAdd', name: 'ruleReminderAdd', component: ruleReminderAdd, meta: { title: ['新增提醒规则'], keepAlive: false } },


            // 审核管理
            { path: '/auditCheckIn', name: 'auditCheckIn', component: auditCheckIn, meta: { title: ['入住审核'], keepAlive: true } },
            { path: '/auditCheckInDetails/:id/', name: 'auditCheckInDetails', component: auditCheckInDetails, meta: { title: ['入住审核详情'], keepAlive: false } },
            { path: '/auditDataUpdate', name: 'auditDataUpdate', component: auditDataUpdate, meta: { title: ['资料更新审核'], keepAlive: true } },
            { path: '/auditDataUpdateDetails/:id/', name: 'auditDataUpdateDetails', component: auditDataUpdateDetails, meta: { title: ['资料更新审核详情'], keepAlive: false } },
            { path: '/auditHouseNews', name: 'auditHouseNews', component: auditHouseNews, meta: { title: ['房地产消息模块'], keepAlive: true } },
            { path: '/auditHouseNewsDetails/:id/', name: 'auditHouseNewsDetails', component: auditHouseNewsDetails, meta: { title: ['房地产消息模块详情'], keepAlive: false } },
            { path: '/auditEvaluate', name: 'auditEvaluate', component: auditEvaluate, meta: { title: ['评价审核'], keepAlive: true } },
            { path: '/auditEvaluateDetails/:id/', name: 'auditEvaluateDetails', component: auditEvaluateDetails, meta: { title: ['用户评价审核详情'], keepAlive: false } },
            { path: '/auditUserReplyEvaluate', name: 'auditUserReplyEvaluate', component: auditUserReplyEvaluate, meta: { title: ['用户回复评价审核'], keepAlive: true } },
            { path: '/auditUserReplyEvaluateDetails/:id/', name: 'auditUserReplyEvaluateDetails', component: auditUserReplyEvaluateDetails, meta: { title: ['用户回复评价审核详情'], keepAlive: false } },
            { path: '/auditEvaluateReply', name: 'auditEvaluateReply', component: auditEvaluateReply, meta: { title: ['评价审核'], keepAlive: true } },
            { path: '/auditEvaluateReplyDetails/:id/', name: 'auditEvaluateReplyDetails', component: auditEvaluateReplyDetails, meta: { title: ['用户评价审核详情'], keepAlive: false } },
            { path: '/auditUserQuestions', name: 'auditUserQuestions', component: auditUserQuestions, meta: { title: ['用户提问审核'], keepAlive: true } },
            { path: '/auditUserQuestionsDetail/:id/', name: 'auditUserQuestionsDetail', component: auditUserQuestionsDetail, meta: { title: ['用户提问审核详情'], keepAlive: false } },
            { path: '/auditUserAnswer', name: 'auditUserAnswer', component: auditUserAnswer, meta: { title: ['用户回答审核'], keepAlive: true } },
            { path: '/auditUserAnswerDetail/:id/', name: 'auditUserAnswerDetail', component: auditUserAnswerDetail, meta: { title: ['用户回答审核详情'], keepAlive: false } },
            { path: '/auditShopAnswer', name: 'auditShopAnswer', component: auditShopAnswer, meta: { title: ['商家回答审核'], keepAlive: true } },
            { path: '/auditShopAnswerDetail/:id/', name: 'auditShopAnswerDetail', component: auditShopAnswerDetail, meta: { title: ['商家回答审核详情'], keepAlive: false } },
            { path: '/auditQaComment', name: 'auditQaComment', component: auditQaComment, meta: { title: ['问答评论审核'], keepAlive: true } },
            { path: '/auditQaCommentDetail/:id/', name: 'auditQaCommentDetail', component: auditQaCommentDetail, meta: { title: ['问答评论审核详情'], keepAlive: false } },
            { path: '/auditQaCommentReply', name: 'auditQaCommentReply', component: auditQaCommentReply, meta: { title: ['回复问答评论审核'], keepAlive: true } },
            { path: '/auditQaCommentReplyDetail/:id/', name: 'auditQaCommentReplyDetail', component: auditQaCommentReplyDetail, meta: { title: ['回复问答评论审核详情'], keepAlive: false } },
            { path: '/auditCommodity', name: 'auditCommodity', component: auditCommodity, meta: { title: ['商品审核'], keepAlive: true } },
            { path: '/auditCommodityDetails/:id/', name: 'auditCommodityDetails', component: auditCommodityDetails, meta: { title: ['商品审核详情'], keepAlive: false } },
            { path: '/auditGoodsCorePrice', name: 'auditGoodsCorePrice', component: auditGoodsCorePrice, meta: { title: ['商品调价审核'], keepAlive: true } },
            { path: '/auditGoodsCorePriceDetails/:id/', name: 'auditGoodsCorePriceDetails', component: auditGoodsCorePriceDetails, meta: { title: ['商品调价审核详情'], keepAlive: false } },
            { path: '/auditGoodsSoldOut', name: 'auditGoodsSoldOut', component: auditGoodsSoldOut, meta: { title: ['商品下架审核'], keepAlive: true } },
            { path: '/auditGoodsSoldOutDetails/:id/', name: 'auditGoodsSoldOutDetails', component: auditGoodsSoldOutDetails, meta: { title: ['商品下架审核详情'], keepAlive: false } },

            { path: '/auditActive', name: 'auditActive', component: auditActive, meta: { title: ['激活店铺审核'], keepAlive: true } },
            { path: '/auditActiveDetails/:id/', name: 'auditActiveDetails', component: auditActiveDetails, meta: { title: ['激活店铺审核详情'], keepAlive: false } },
            { path: '/auditShopClose', name: 'auditShopClose', component: auditShopClose, meta: { title: ['关闭店铺审核'], keepAlive: true } },
            { path: '/auditShopCloseDetails/:id/', name: 'auditShopCloseDetails', component: auditShopCloseDetails, meta: { title: ['关闭店铺审核详情'], keepAlive: false } },

            { path: '/auditArticle', name: 'auditArticle', component: auditArticle, meta: { title: ['文章审核'], keepAlive: true } },
            { path: '/auditArticleDetails/:id/', name: 'auditArticleDetails', component: auditArticleDetails, meta: { title: ['文章审核详情'], keepAlive: false } },
            { path: '/auditPlatformActivities', name: 'auditPlatformActivities', component: auditPlatformActivities, meta: { title: ['平台活动审核'], keepAlive: true } },
            { path: '/auditPlatformActivitiesDetails/:id/', name: 'auditPlatformActivitiesDetails', component: auditPlatformActivitiesDetails, meta: { title: ['平台活动审核详情'], keepAlive: false } },
            { path: '/collageToexamine', name: 'collageToexamine', component: collageToexamine, meta: { title: ['拼购活动审核'], keepAlive: true } },
            { path: '/collageToexamineAudit/:id/', name: 'collageToexamineAudit', component: collageToexamineAudit, meta: { title: ['拼购活动审核详情'], keepAlive: false } },
            { path: '/auditAdvertData', name: 'auditAdvertData', component: auditAdvertData, meta: { title: ['广告审核'], keepAlive: true } },
            { path: '/auditAdvertDataDetails/:id/', name: 'auditAdvertDataDetails', component: auditAdvertDataDetails, meta: { title: ['广告审核详情'], keepAlive: false } },
            { path: '/auditBrand', name: 'auditBrand', component: auditBrand, meta: { title: ['品牌审核'], keepAlive: true } },
            { path: '/auditBrandDetails/:id/', name: 'auditBrandDetails', component: auditBrandDetails, meta: { title: ['品牌审核详情'], keepAlive: false } },
            { path: '/auditBankChange', name: 'auditBankChange', component: auditBankChange, meta: { title: ['银行卡变更审核'], keepAlive: true } },
            { path: '/auditBankChangeDetails/:id/', name: 'auditBankChangeDetails', component: auditBankChangeDetails, meta: { title: ['银行卡变更审核详情'], keepAlive: false } },
            { path: '/auditInEnter', name: 'auditInEnter', component: auditInEnter, meta: { title: ['房地产入驻审核'], keepAlive: true } },
            { path: '/auditInEnterDetails/:id/', name: 'auditInEnterDetails', component: auditInEnterDetails, meta: { title: ['房地产入驻审核详情'], keepAlive: false } },
            { path: '/auditRealtyEvaluate', name: 'auditRealtyEvaluate', component: auditRealtyEvaluate, meta: { title: ['房地产评价审核'], keepAlive: true } },
            { path: '/auditRealtyEvaluateDetails/:id/', name: 'auditRealtyEvaluateDetails', component: auditRealtyEvaluateDetails, meta: { title: ['房地产评价审核详情'], keepAlive: false } },
            { path: '/auditRealtyEvaluateReply', name: 'auditRealtyEvaluateReply', component: auditRealtyEvaluateReply, meta: { title: ['房地产评价回复审核'], keepAlive: true } },
            { path: '/auditRealtyEvaluateReplyDetails/:id/', name: 'auditRealtyEvaluateReplyDetails', component: auditRealtyEvaluateReplyDetails, meta: { title: ['房地产评价回复审核详情'], keepAlive: false } },
            { path: '/realtyCompanyAuditChange', name: 'realtyCompanyAuditChange', component: realtyCompanyAuditChange, meta: { title: ['房地产公司变更审核'], keepAlive: true } },
            { path: '/realtyCompanyAuditChangeDetails/:id/', name: 'realtyCompanyAuditChangeDetails', component: realtyCompanyAuditChangeDetails, meta: { title: ['房地产公司变更审核详情'], keepAlive: false } },
            { path: '/realtyLicenseAuditChange', name: 'realtyLicenseAuditChange', component: realtyLicenseAuditChange, meta: { title: ['房地产营业执照变更审核'], keepAlive: true } },
            { path: '/realtyLicenseAuditChangeDetails/:id/', name: 'realtyLicenseAuditChangeDetails', component: realtyLicenseAuditChangeDetails, meta: { title: ['房地产营业执照变更审核详情'], keepAlive: false } },
            { path: '/auditChangeCompany', name: 'auditChangeCompany', component: auditChangeCompany, meta: { title: ['公司信息变更审核'], keepAlive: true } },
            { path: '/auditChangeCompanyDetails/:id/', name: 'auditChangeCompanyDetails', component: auditChangeCompanyDetails, meta: { title: ['公司信息变更审核详情'], keepAlive: false } },
            { path: '/auditChangeCategory', name: 'auditChangeCategory', component: auditChangeCategory, meta: { title: ['经营范围变更审核'], keepAlive: true } },
            { path: '/auditChangeCategoryDetails/:id/', name: 'auditChangeCategoryDetails', component: auditChangeCategoryDetails, meta: { title: ['经营范围变更审核详情'], keepAlive: false } },
            { path: '/auditChangeLicense', name: 'auditChangeLicense', component: auditChangeLicense, meta: { title: ['营业执照变更审核'], keepAlive: true } },
            { path: '/auditChangeLicenseDetails/:id/', name: 'auditChangeLicenseDetails', component: auditChangeLicenseDetails, meta: { title: ['营业执照变更审核详情'], keepAlive: false } },
            { path: '/auditChangeLicenseYear', name: 'auditChangeLicenseYear', component: auditChangeLicenseYear, meta: { title: ['年报变更审核'], keepAlive: true } },
            { path: '/auditChangeLicenseYearDetails/:id/', name: 'auditChangeLicenseYearDetails', component: auditChangeLicenseYearDetails, meta: { title: ['年报变更审核详情'], keepAlive: false } },
            { path: '/auditChangeShop', name: 'auditChangeShop', component: auditChangeShop, meta: { title: ['店铺信息变更审核'], keepAlive: true } },
            { path: '/auditChangeShopDetails/:id/', name: 'auditChangeShopDetails', component: auditChangeShopDetails, meta: { title: ['店铺信息变更审核详情'], keepAlive: false } },
            { path: '/auditShopCertificates', name: 'auditShopCertificates', component: auditShopCertificates, meta: { title: ['商家证件变更审核'], keepAlive: true } },
            { path: '/auditShopCertificatesDetails/:id/', name: 'auditShopCertificatesDetails', component: auditShopCertificatesDetails, meta: { title: ['商家证件变更审核详情'], keepAlive: false } },


            // 客服事物
            { path: 'affairShoperInfoManagement', name: 'affairShoperInfoManagement', component: affairShoperInfoManagement, meta: { title: ['商家信息管理列表'], keepAlive: true } },
            { path: 'affairShoperInfoManagementDetail/:id/', name: 'affairShoperInfoManagementDetail', component: affairShoperInfoManagementDetail, meta: { title: ['商家信息管理详情'], keepAlive: false } },
            { path: 'affairGoodsInfoManagement', name: 'affairGoodsInfoManagement', component: affairGoodsInfoManagement, meta: { title: ['商品信息管理列表'], keepAlive: true } },

            { path: 'affairGoodsCompelOut', name: 'affairGoodsCompelOut', component: affairGoodsCompelOut, meta: { title: ['商品强制下架'], keepAlive: true } },

            { path: 'affairGoodsInfoManagementDetail/:id/', name: 'affairGoodsInfoManagementDetail', component: affairGoodsInfoManagementDetail, meta: { title: ['商品信息管理详情'], keepAlive: false } },
            { path: 'affairGoodsInfoCorePriceRecord/:id/', name: 'affairGoodsInfoCorePriceRecord', component: affairGoodsInfoCorePriceRecord, meta: { title: ['商品调价记录'], keepAlive: false } },
            { path: 'affairOrderWatchManagement', name: 'affairOrderWatchManagement', component: affairOrderWatchManagement, meta: { title: ['商品信息管理列表'], keepAlive: true } },
            { path: 'affairOrderWatchManagementDetail/:id/', name: 'affairOrderWatchManagementDetail', component: affairOrderWatchManagementDetail, meta: { title: ['商品信息管理详情'], keepAlive: false } },
            { path: 'plateBrandManagement', name: 'plateBrandManagement', component: plateBrandManagement, meta: { title: ['品牌管理列表'], keepAlive: true } },
            { path: 'plateBrandManagementDetail/:id/', name: 'plateBrandManagementDetail', component: plateBrandManagementDetail, meta: { title: ['品牌管理详情'], keepAlive: false } },

            { path: 'notDisposeOrderManagementList', name: 'notDisposeOrderManagementList', component: notDisposeOrderManagementList, meta: { title: ['未处理订单管理'], keepAlive: true } },
            { path: 'orderManagementList', name: 'orderManagementList', component: orderManagementList, meta: { title: ['订单管理'], keepAlive: true } },
            { path: 'orderManagementListDetails/:id/', name: 'orderManagementListDetails', component: orderManagementListDetails, meta: { title: ['订单管理列表详情'], keepAlive: false } },

            { path: 'businessCreditReputationList', name: 'businessCreditReputationList', component: businessCreditReputationList, meta: { title: ['商家信用信誉管理'], keepAlive: true } },
            { path: 'businessCreditReputationListDetails/:id/', name: 'businessCreditReputationListDetails', component: businessCreditReputationListDetails, meta: { title: ['商家信用信誉管理详情'], keepAlive: false } },
            { path: 'businessCreditReputationRuleList', name: 'businessCreditReputationRuleList', component: businessCreditReputationRuleList, meta: { title: ['商家信用信誉规则管理'], keepAlive: false } },
            { path: 'scoringRules/:id/', name: 'scoringRules', component: scoringRules, meta: { title: ['商家信用信誉规则管理'], keepAlive: false } },
            { path: 'addNodeRule/:id/', name: 'addNodeRule', component: addNodeRule, meta: { title: ['商家信用信誉规则管理'], keepAlive: false } },
            { path: 'addZeroRule/:id/', name: 'addZeroRule', component: addZeroRule, meta: { title: ['商家信用信誉规则管理'], keepAlive: false } },
            { path: 'reputationScoringRule/:id/', name: 'reputationScoringRule', component: reputationScoringRule, meta: { title: ['商家信用信誉规则管理'], keepAlive: false } },
            { path: 'addGradeRule/:id/', name: 'addGradeRule', component: addGradeRule, meta: { title: ['商家信用信誉规则管理'], keepAlive: false } },
            { path: 'addEquityRule/:id/', name: 'addEquityRule', component: addEquityRule, meta: { title: ['商家信用信誉规则管理'], keepAlive: false } },
            { path: 'addScoreRule/:id/', name: 'addScoreRule', component: addScoreRule, meta: { title: ['商家信用信誉规则管理'], keepAlive: false } },


            // 商家监控
            { path: 'orderMonitoring', name: 'orderMonitoring', component: orderMonitoring, meta: { title: ['商家订单监控'], keepAlive: false } },
            { path: 'orderMonitoringDetails', name: 'orderMonitoringDetails', component: orderMonitoringDetails, meta: { title: ['商家订单监控详情'], keepAlive: false } },
            { path: 'putawayMonitoring', name: 'putawayMonitoring', component: putawayMonitoring, meta: { title: ['商家上架监控'], keepAlive: false } },
            { path: 'putawayMonitoringDetails', name: 'putawayMonitoringDetails', component: putawayMonitoringDetails, meta: { title: ['商家上架监控详情'], keepAlive: false } },
            { path: 'disposeResultMonitoring', name: 'disposeResultMonitoring', component: disposeResultMonitoring, meta: { title: ['商家处理结果'], keepAlive: false } },
            { path: 'disposeResultMonitoringDetails/', name: 'disposeResultMonitoringDetails', component: disposeResultMonitoringDetails, meta: { title: ['商家处理结果详情'], keepAlive: false } },
            { path: 'loginRemind', name: 'loginRemind', component: loginRemind, meta: { title: ['商家登录提醒'], keepAlive: false } },
            { path: 'loginRemindDetails/:id/', name: 'loginRemindDetails', component: loginRemindDetails, meta: { title: ['商家登录提醒详情'], keepAlive: false } },

            // 业务培训
            { path: 'textbooksList', name: 'textbooksList', component: textbooksList, meta: { title: ['教材列表'], keepAlive: false } },
            { path: 'textbooksAdd', name: 'textbooksAdd', component: textbooksAdd, meta: { title: ['编制教材'], keepAlive: false } },
            { path: 'textbooksRelease', name: 'textbooksRelease', component: textbooksRelease, meta: { title: ['教材发布'], keepAlive: false } },
            { path: 'examinationList', name: 'examinationList', component: examinationList, meta: { title: ['考试考核'], keepAlive: false } },
            { path: 'titleEditorial', name: 'titleEditorial', component: titleEditorial, meta: { title: ['编辑题目'], keepAlive: false } },
            { path: 'examination', name: 'examination', component: examination, meta: { title: ['参加考试'], keepAlive: false } },
            { path: 'examinationInquiry', name: 'examinationInquiry', component: examinationInquiry, meta: { title: ['考试查询'], keepAlive: false } },
            { path: 'examinationInquiryDetail', name: 'examinationInquiryDetail', component: examinationInquiryDetail, meta: { title: ['考试详情查询'], keepAlive: false } },


            // 话术管理
            { path: 'talkingSkillList', name: 'talkingSkillList', component: talkingSkillList, meta: { title: ['话术管理'], keepAlive: false } },
            { path: 'talkingSkillEdit', name: 'talkingSkillEdit', component: talkingSkillEdit, meta: { title: ['话术编写'], keepAlive: false } },
            { path: 'talkingSkillAudit', name: 'talkingSkillAudit', component: talkingSkillAudit, meta: { title: ['审核话术'], keepAlive: false } },
            { path: 'talkingSkillTrainList', name: 'talkingSkillTrainList', component: talkingSkillTrainList, meta: { title: ['话术反馈'], keepAlive: false } },
            { path: 'trainingFeedback', name: 'trainingFeedback', component: trainingFeedback, meta: { title: ['学习反馈'], keepAlive: false } },

            // 学习管理
            { path: 'learningManagementList', name: 'learningManagementList', component: learningManagementList, meta: { title: ['学习管理'], keepAlive: false } },
            { path: 'knowledgeAdd', name: 'knowledgeAdd', component: knowledgeAdd, meta: { title: ['新增知识'], keepAlive: false } },
            { path: 'knowledgeAudit', name: 'knowledgeAudit', component: knowledgeAudit, meta: { title: ['审核知识'], keepAlive: false } },
            { path: 'learningFeedbackList', name: 'learningFeedbackList', component: learningFeedbackList, meta: { title: ['学习反馈列表'], keepAlive: false } },
            { path: 'learningFeedbackLook', name: 'learningFeedbackLook', component: learningFeedbackLook, meta: { title: ['学习反馈详情'], keepAlive: false } },

            // 订单监控
            { path: 'hignMoneyAlreadyPay', name: 'hignMoneyAlreadyPay', component: hignMoneyAlreadyPay, meta: { title: ['高额已支付订单'], keepAlive: false } },
            { path: 'waitSendOut', name: 'waitSendOut', component: waitSendOut, meta: { title: ['待发货订单'], keepAlive: false } },
            { path: 'yesterdayReturn', name: 'yesterdayReturn', component: yesterdayReturn, meta: { title: ['昨日被退订单'], keepAlive: false } },

            // 系统设置
            { path: 'logs', name: 'logs', component: logs, meta: { title: ['审核系统日志'], keepAlive: false } },
        ]
    }
]

const ROUTER = new Router({
    routes,
    strict: process.env.NODE_ENV !== 'production',
});

// 登录验证 （Vue Router全局前置守卫）
ROUTER.beforeEach((to, from, next) => {

    if (to.path === '/login') {
        next();
    } else {
        let authorization = window.sessionStorage.getItem('AUTHORIZATION');
        if (!authorization) {
            next({ path: '/login' });
        } else {
            next();
        }
    }

});

export default ROUTER;
