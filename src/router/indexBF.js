// import Vue from 'vue'
// import Router from 'vue-router'

// Vue.use(Router)

// const login = r => require.ensure([], () => r(require('@/page/login')), 'login');
// const home = r => require.ensure([], () => r(require('@/page/home')), 'home');
// const manage = r => require.ensure([], () => r(require('@/page/manage')), 'manage');
// const customerIndex = r => require.ensure([], () => r(require('@/page/customerIndex/customerIndex')), 'customerIndex');
// const workOrderDetails = r => require.ensure([], () => r(require('@/page/customerIndex/workOrderDetails')), 'workOrderDetails');
// const checkIn = r => require.ensure([], () => r(require('@/page/customerIndex/checkIn')), 'checkIn');
// const checkInAudit = r => require.ensure([], () => r(require('@/page/customerIndex/checkInAudit')), 'checkInAudit');

// // 电话客服
// const telephoneServiceIndex = r => require.ensure([], () => r(require('@/page/telephoneService/telephoneServiceIndex')), 'telephoneServiceIndex');
// const userInbound = r => require.ensure([], () => r(require('@/page/telephoneService/userInbound')), 'userInbound');
// const businessInlet = r => require.ensure([], () => r(require('@/page/telephoneService/businessInlet')), 'businessInlet');
// const callUser = r => require.ensure([], () => r(require('@/page/telephoneService/callUser')), 'callUser');
// const callBusiness = r => require.ensure([], () => r(require('@/page/telephoneService/callBusiness')), 'callBusiness');
// const turnoverEvents = r => require.ensure([], () => r(require('@/page/telephoneService/turnoverEvents')), 'turnoverEvents');
// const returnRecord = r => require.ensure([], () => r(require('@/page/telephoneService/returnRecord')), 'returnRecord');

// // 平台客服
// const email = r => require.ensure([], () => r(require('@/page/platformCustomer/email')), 'email');
// const emailDetails = r => require.ensure([], () => r(require('@/page/platformCustomer/emailDetails')), 'emailDetails');
// const emailReply = r => require.ensure([], () => r(require('@/page/platformCustomer/emailReply')), 'emailReply');
// const offLine = r => require.ensure([], () => r(require('@/page/platformCustomer/offLine')), 'offLine');
// const offLineDetails = r => require.ensure([], () => r(require('@/page/platformCustomer/offLineDetails')), 'offLineDetails');
// const offLineReply = r => require.ensure([], () => r(require('@/page/platformCustomer/offLineReply')), 'offLineReply');
// const workList = r => require.ensure([], () => r(require('@/page/platformCustomer/workList')), 'workList');
// const myWorkList = r => require.ensure([], () => r(require('@/page/platformCustomer/myWorkList')), 'myWorkList');
// const waitSheetList = r => require.ensure([], () => r(require('@/page/platformCustomer/waitSheetList')), 'waitSheetList');
// const workListDetails = r => require.ensure([], () => r(require('@/page/platformCustomer/workListDetails')), 'workListDetails');
// const workListSource = r => require.ensure([], () => r(require('@/page/platformCustomer/workListSource')), 'workListSource');
// const workListLook = r => require.ensure([], () => r(require('@/page/platformCustomer/workListLook')), 'workListLook');
// const workListLookReportDispute = r => require.ensure([], () => r(require('@/page/platformCustomer/workListLookReportDispute')), 'workListLookReportDispute');
// const onLineService = r => require.ensure([], () => r(require('@/page/platformCustomer/onLineService')), 'onLineService');

// //短信管理
// const messageTemplateList = r => require.ensure([], () => r(require('@/page/message/messageTemplateList')), 'messageTemplateList');
// const messageTemplateInsert = r => require.ensure([], () => r(require('@/page/message/messageTemplateInsert')), 'messageTemplateInsert');
// const messageDetails = r => require.ensure([], () => r(require('@/page/message/messageDetails')), 'messageDetails');
// const messageReply = r => require.ensure([], () => r(require('@/page/message/messageReply')), 'messageReply');
// const messageList = r => require.ensure([], () => r(require('@/page/message/messageList')), 'messageList');

// const messageSend = r => require.ensure([], () => r(require('@/page/message/messageSend')), 'messageSend');

// // 用户规则
// const ruleUser = r => require.ensure([], () => r(require('@/page/documentManagement/ruleUser')), 'ruleUser');
// const ruleUserAdd = r => require.ensure([], () => r(require('@/page/documentManagement/ruleUserAdd')), 'ruleUserAdd');
// const ruleUserAudit = r => require.ensure([], () => r(require('@/page/documentManagement/ruleUserAudit')), 'ruleUserAudit');
// const ruleBusiness = r => require.ensure([], () => r(require('@/page/documentManagement/ruleBusiness')), 'ruleBusiness');
// const ruleBusinessHouse = r => require.ensure([], () => r(require('@/page/documentManagement/ruleBusinessHouse')), 'ruleBusinessHouse');
// const ruleBusinessHouseAdd = r => require.ensure([], () => r(require('@/page/documentManagement/ruleBusinessHouseAdd')), 'ruleBusinessHouseAdd');
// const ruleUserHelp = r => require.ensure([], () => r(require('@/page/documentManagement/ruleUserHelp')), 'ruleUserHelp');
// const ruleBusinessHelp = r => require.ensure([], () => r(require('@/page/documentManagement/ruleBusinessHelp')), 'ruleBusinessHelp');
// const rulePlatform = r => require.ensure([], () => r(require('@/page/documentManagement/rulePlatform')), 'rulePlatform');
// const rulePlatformHelp = r => require.ensure([], () => r(require('@/page/documentManagement/rulePlatformHelp')), 'rulePlatformHelp');

// // 异常处理
// const testingUser = r => require.ensure([], () => r(require('@/page/abnormalHandle/testingUser')), 'testingUser');
// const testingBusiness = r => require.ensure([], () => r(require('@/page/abnormalHandle/testingBusiness')), 'testingBusiness');
// const testingUserDetails = r => require.ensure([], () => r(require('@/page/abnormalHandle/testingUserDetails')), 'testingUserDetails');
// const accountThawing = r => require.ensure([], () => r(require('@/page/abnormalHandle/accountThawing')), 'accountThawing');
// const goodsSoldOut = r => require.ensure([], () => r(require('@/page/abnormalHandle/goodsSoldOut')), 'goodsSoldOut');
// const licenceContractRemind = r => require.ensure([], () => r(require('@/page/abnormalHandle/licenceContractRemind')), 'licenceContractRemind');
// const licenceContractRemindDetails = r => require.ensure([], () => r(require('@/page/abnormalHandle/licenceContractRemindDetails')), 'licenceContractRemindDetails');
// const ruleReminder = r => require.ensure([], () => r(require('@/page/abnormalHandle/ruleReminder')), 'ruleReminder');
// const ruleReminderAdd = r => require.ensure([], () => r(require('@/page/abnormalHandle/ruleReminderAdd')), 'ruleReminderAdd');

// // 审核管理
// const auditCheckIn = r => require.ensure([], () => r(require('@/page/audit/auditCheckIn')), 'auditCheckIn');
// const auditCheckInDetails = r => require.ensure([], () => r(require('@/page/audit/auditCheckInDetails')), 'auditCheckInDetails');

// const auditDataUpdate = r => require.ensure([], () => r(require('@/page/audit/auditDataUpdate')), 'auditDataUpdate');
// const auditDataUpdateDetails = r => require.ensure([], () => r(require('@/page/audit/auditDataUpdateDetails')), 'auditDataUpdateDetails');

// const auditHouseNews = r => require.ensure([], () => r(require('@/page/audit/realty/auditHouseNews')), 'auditHouseNews');
// const auditHouseNewsDetails = r => require.ensure([], () => r(require('@/page/audit/realty/auditHouseNewsDetails')), 'auditHouseNewsDetails');
// const auditEvaluate = r => require.ensure([], () => r(require('@/page/audit/auditEvaluate')), 'auditEvaluate');
// const auditEvaluateDetails = r => require.ensure([], () => r(require('@/page/audit/auditEvaluateDetails')), 'auditEvaluateDetails');

// const auditUserReplyEvaluate = r => require.ensure([], () => r(require('@/page/audit/auditUserReplyEvaluate')), 'auditUserReplyEvaluate');
// const auditUserReplyEvaluateDetails = r => require.ensure([], () => r(require('@/page/audit/auditUserReplyEvaluateDetails')), 'auditUserReplyEvaluateDetails');

// const auditEvaluateReply = r => require.ensure([], () => r(require('@/page/audit/auditEvaluateReply')), 'auditEvaluateReply');
// const auditEvaluateReplyDetails = r => require.ensure([], () => r(require('@/page/audit/auditEvaluateReplyDetails')), 'auditEvaluateReplyDetails');
// const auditUserQuestions = r => require.ensure([], () => r(require('@/page/audit/questionAnswer/auditUserQuestions')), 'auditUserQuestions');
// const auditUserQuestionsDetail = r => require.ensure([], () => r(require('@/page/audit/questionAnswer/auditUserQuestionsDetail')), 'auditUserQuestionsDetail');
// const auditUserAnswer = r => require.ensure([], () => r(require('@/page/audit/questionAnswer/auditUserAnswer')), 'auditUserAnswer');
// const auditUserAnswerDetail = r => require.ensure([], () => r(require('@/page/audit/questionAnswer/auditUserAnswerDetail')), 'auditUserAnswerDetail');
// const auditShopAnswer = r => require.ensure([], () => r(require('@/page/audit/questionAnswer/auditShopAnswer')), 'auditShopAnswer');
// const auditShopAnswerDetail = r => require.ensure([], () => r(require('@/page/audit/questionAnswer/auditShopAnswerDetail')), 'auditShopAnswerDetail');
// const auditQaComment = r => require.ensure([], () => r(require('@/page/audit/questionAnswer/auditQaComment')), 'auditQaComment');
// const auditQaCommentDetail = r => require.ensure([], () => r(require('@/page/audit/questionAnswer/auditQaCommentDetail')), 'auditQaCommentDetail');
// const auditQaCommentReply = r => require.ensure([], () => r(require('@/page/audit/questionAnswer/auditQaCommentReply')), 'auditQaCommentReply');
// const auditQaCommentReplyDetail = r => require.ensure([], () => r(require('@/page/audit/questionAnswer/auditQaCommentReplyDetail')), 'auditQaCommentReplyDetail');
// const auditCommodity = r => require.ensure([], () => r(require('@/page/audit/goods/auditCommodity')), 'auditCommodity');
// const auditCommodityDetails = r => require.ensure([], () => r(require('@/page/audit/goods/auditCommodityDetails')), 'auditCommodityDetails');

// const auditGoodsCorePrice = r => require.ensure([], () => r(require('@/page/audit/goods/auditGoodsCorePrice')), 'auditGoodsCorePrice');
// const auditGoodsCorePriceDetails = r => require.ensure([], () => r(require('@/page/audit/goods/auditGoodsCorePriceDetails')), 'auditGoodsCorePriceDetails');
// const auditGoodsSoldOut = r => require.ensure([], () => r(require('@/page/audit/goods/auditGoodsSoldOut')), 'auditGoodsSoldOut');
// const auditGoodsSoldOutDetails = r => require.ensure([], () => r(require('@/page/audit/goods/auditGoodsSoldOutDetails')), 'auditGoodsSoldOutDetails');

// const auditActive = r => require.ensure([], () => r(require('@/page/audit/auditActive')), 'auditActive');
// const auditActiveDetails = r => require.ensure([], () => r(require('@/page/audit/auditActiveDetails')), 'auditActiveDetails');
// const auditShopClose = r => require.ensure([], () => r(require('@/page/audit/auditShopClose')), 'auditShopClose');
// const auditShopCloseDetails = r => require.ensure([], () => r(require('@/page/audit/auditShopCloseDetails')), 'auditShopCloseDetails');

// const auditArticle = r => require.ensure([], () => r(require('@/page/audit/auditArticle')), 'auditArticle');
// const auditArticleDetails = r => require.ensure([], () => r(require('@/page/audit/auditArticleDetails')), 'auditArticleDetails');
// const auditPlatformActivities = r => require.ensure([], () => r(require('@/page/audit/activities/auditPlatformActivities')), 'auditPlatformActivities');
// const auditPlatformActivitiesDetails = r => require.ensure([], () => r(require('@/page/audit/activities/auditPlatformActivitiesDetails')), 'auditPlatformActivitiesDetails');
// const collageToexamine = r => require.ensure([], () => r(require('@/page/audit/activities/collageToexamine')), 'collageToexamine');
// const collageToexamineAudit = r => require.ensure([], () => r(require('@/page/audit/activities/collageToexamineAudit')), 'collageToexamineAudit');
// const auditAdvertData = r => require.ensure([], () => r(require('@/page/audit/auditAdvertData')), 'auditAdvertData');
// const auditAdvertDataDetails = r => require.ensure([], () => r(require('@/page/audit/auditAdvertDataDetails')), 'auditAdvertDataDetails');
// const auditBrand = r => require.ensure([], () => r(require('@/page/audit/auditBrand')), 'auditBrand');
// const auditBrandDetails = r => require.ensure([], () => r(require('@/page/audit/auditBrandDetails')), 'auditBrandDetails');
// const auditBankChange = r => require.ensure([], () => r(require('@/page/audit/BankChange/auditBankChange')), 'auditBankChange');
// const auditBankChangeDetails = r => require.ensure([], () => r(require('@/page/audit/BankChange/auditBankChangeDetails')), 'auditBankChangeDetails');
// const auditInEnter = r => require.ensure([], () => r(require('@/page/audit/realty/auditInEnter')), 'auditInEnter');
// const auditInEnterDetails = r => require.ensure([], () => r(require('@/page/audit/realty/auditInEnterDetails')), 'auditInEnterDetails');
// const auditRealtyEvaluate = r => require.ensure([], () => r(require('@/page/audit/realty/auditRealtyEvaluate')), 'auditRealtyEvaluate');
// const auditRealtyEvaluateDetails = r => require.ensure([], () => r(require('@/page/audit/realty/auditRealtyEvaluateDetails')), 'auditRealtyEvaluateDetails');
// const auditRealtyEvaluateReply = r => require.ensure([], () => r(require('@/page/audit/realty/auditRealtyEvaluateReply')), 'auditRealtyEvaluateReply');
// const auditRealtyEvaluateReplyDetails = r => require.ensure([], () => r(require('@/page/audit/realty/auditRealtyEvaluateReplyDetails')), 'auditRealtyEvaluateReplyDetails');
// const realtyCompanyAuditChange = r => require.ensure([], () => r(require('@/page/audit/realty/realtyCompanyAuditChange')), 'realtyCompanyAuditChange');
// const realtyCompanyAuditChangeDetails = r => require.ensure([], () => r(require('@/page/audit/realty/realtyCompanyAuditChangeDetails')), 'realtyCompanyAuditChangeDetails');
// const realtyLicenseAuditChange = r => require.ensure([], () => r(require('@/page/audit/realty/realtyLicenseAuditChange')), 'realtyLicenseAuditChange');
// const realtyLicenseAuditChangeDetails = r => require.ensure([], () => r(require('@/page/audit/realty/realtyLicenseAuditChangeDetails')), 'realtyLicenseAuditChangeDetails');
// const auditChangeCompany = r => require.ensure([], () => r(require('@/page/audit/shopChange/auditChangeCompany')), 'auditChangeCompany');
// const auditChangeCompanyDetails = r => require.ensure([], () => r(require('@/page/audit/shopChange/auditChangeCompanyDetails')), 'auditChangeCompanyDetails');
// const auditChangeCategory = r => require.ensure([], () => r(require('@/page/audit/shopChange/auditChangeCategory')), 'auditChangeCategory');
// const auditChangeCategoryDetails = r => require.ensure([], () => r(require('@/page/audit/shopChange/auditChangeCategoryDetails')), 'auditChangeCategoryDetails');
// const auditChangeLicense = r => require.ensure([], () => r(require('@/page/audit/shopChange/auditChangeLicense')), 'auditChangeLicense');
// const auditChangeLicenseDetails = r => require.ensure([], () => r(require('@/page/audit/shopChange/auditChangeLicenseDetails')), 'auditChangeLicenseDetails');
// const auditChangeLicenseYear = r => require.ensure([], () => r(require('@/page/audit/shopChange/auditChangeLicenseYear')), 'auditChangeLicenseYear');
// const auditChangeLicenseYearDetails = r => require.ensure([], () => r(require('@/page/audit/shopChange/auditChangeLicenseYearDetails')), 'auditChangeLicenseYearDetails');
// const auditChangeShop = r => require.ensure([], () => r(require('@/page/audit/shopChange/auditChangeShop')), 'auditChangeShop');
// const auditChangeShopDetails = r => require.ensure([], () => r(require('@/page/audit/shopChange/auditChangeShopDetails')), 'auditChangeShopDetails');
// const auditShopCertificates = r => require.ensure([], () => r(require('@/page/audit/auditShopCertificates')), 'auditShopCertificates');
// const auditShopCertificatesDetails = r => require.ensure([], () => r(require('@/page/audit/auditShopCertificatesDetails')), 'auditShopCertificatesDetails');

// // 商家监控
// const orderMonitoring = r => require.ensure([], () => r(require('@/page/shopMonitoring/orderMonitoring')), 'orderMonitoring');
// const orderMonitoringDetails = r => require.ensure([], () => r(require('@/page/shopMonitoring/orderMonitoringDetails')), 'orderMonitoringDetails');
// const putawayMonitoring = r => require.ensure([], () => r(require('@/page/shopMonitoring/putawayMonitoring')), 'putawayMonitoring');
// const putawayMonitoringDetails = r => require.ensure([], () => r(require('@/page/shopMonitoring/putawayMonitoringDetails')), 'putawayMonitoringDetails');
// const disposeResultMonitoring = r => require.ensure([], () => r(require('@/page/shopMonitoring/disposeResultMonitoring')), 'disposeResultMonitoring');
// const disposeResultMonitoringDetails = r => require.ensure([], () => r(require('@/page/shopMonitoring/disposeResultMonitoringDetails')), 'disposeResultMonitoringDetails');
// const loginRemind = r => require.ensure([], () => r(require('@/page/shopMonitoring/loginRemind')), 'loginRemind');
// const loginRemindDetails = r => require.ensure([], () => r(require('@/page/shopMonitoring/loginRemindDetails')), 'loginRemindDetails');


// //业务培训
// const textbooksList = r => require.ensure([], () => r(require('@/page/businessTraining/textbooksList')), 'textbooksList');
// const textbooksAdd = r => require.ensure([], () => r(require('@/page/businessTraining/textbooksAdd')), 'textbooksAdd');
// const textbooksRelease = r => require.ensure([], () => r(require('@/page/businessTraining/textbooksRelease')), 'textbooksRelease');
// const examinationList = r => require.ensure([], () => r(require('@/page/businessTraining/examinationList')), 'examinationList');
// const titleEditorial = r => require.ensure([], () => r(require('@/page/businessTraining/titleEditorial')), 'titleEditorial');
// const examination = r => require.ensure([], () => r(require('@/page/businessTraining/examination')), 'examination');
// const examinationInquiry = r => require.ensure([], () => r(require('@/page/businessTraining/examinationInquiry')), 'examinationInquiry');
// const examinationInquiryDetail = r => require.ensure([], () => r(require('@/page/businessTraining/examinationInquiryDetail')), 'examinationInquiryDetail');


// // 话术管理
// const talkingSkillList = r => require.ensure([], () => r(require('@/page/talkingSkill/talkingSkillList')), 'talkingSkillList');
// const talkingSkillEdit = r => require.ensure([], () => r(require('@/page/talkingSkill/talkingSkillEdit')), 'talkingSkillEdit');
// const talkingSkillAudit = r => require.ensure([], () => r(require('@/page/talkingSkill/talkingSkillAudit')), 'talkingSkillAudit');
// const talkingSkillTrainList = r => require.ensure([], () => r(require('@/page/talkingSkill/talkingSkillTrainList')), 'talkingSkillTrainList');
// const trainingFeedback = r => require.ensure([], () => r(require('@/page/talkingSkill/trainingFeedback')), 'trainingFeedback');


// // 学习管理
// const learningManagementList = r => require.ensure([], () => r(require('@/page/learningManagement/learningManagementList')), 'learningManagementList');
// const knowledgeAdd = r => require.ensure([], () => r(require('@/page/learningManagement/knowledgeAdd')), 'knowledgeAdd');
// const knowledgeAudit = r => require.ensure([], () => r(require('@/page/learningManagement/knowledgeAudit')), 'knowledgeAudit');
// const learningFeedbackList = r => require.ensure([], () => r(require('@/page/learningManagement/learningFeedbackList')), 'learningFeedbackList');
// const learningFeedbackLook = r => require.ensure([], () => r(require('@/page/learningManagement/learningFeedbackLook')), 'learningFeedbackLook');

// // 电话客服


// // 客服事物
// const affairShoperInfoManagement = r => require.ensure([], () => r(require('@/page/customerAffair/shopGoods/affairShoperInfoManagement')), 'affairShoperInfoManagement');
// const affairShoperInfoManagementDetail = r => require.ensure([], () => r(require('@/page/customerAffair/shopGoods/affairShoperInfoManagementDetail')), 'affairShoperInfoManagementDetail');
// const affairGoodsInfoManagement = r => require.ensure([], () => r(require('@/page/customerAffair/shopGoods/affairGoodsInfoManagement')), 'affairGoodsInfoManagement');
// const affairGoodsInfoManagementDetail = r => require.ensure([], () => r(require('@/page/customerAffair/shopGoods/affairGoodsInfoManagementDetail')), 'affairGoodsInfoManagementDetail');
// const affairGoodsInfoCorePriceRecord = r => require.ensure([], () => r(require('@/page/customerAffair/shopGoods/affairGoodsInfoCorePriceRecord')), 'affairGoodsInfoCorePriceRecord');
// const plateBrandManagement = r => require.ensure([], () => r(require('@/page/customerAffair/shopGoods/plateBrandManagement')), 'plateBrandManagement');
// const plateBrandManagementDetail = r => require.ensure([], () => r(require('@/page/customerAffair/shopGoods/plateBrandManagementDetail')), 'plateBrandManagementDetail');
// const affairOrderWatchManagement = r => require.ensure([], () => r(require('@/page/customerAffair/order/affairOrderWatchManagement')), 'affairOrderWatchManagement');
// const affairOrderWatchManagementDetail = r => require.ensure([], () => r(require('@/page/customerAffair/order/affairOrderWatchManagementDetail')), 'affairOrderWatchManagementDetail');
// const orderManagementList = r => require.ensure([], () => r(require('@/page/customerAffair/orderManagement/orderManagementList')), 'orderManagementList');
// const notDisposeOrderManagementList = r => require.ensure([], () => r(require('@/page/customerAffair/orderManagement/notDisposeOrderManagementList')), 'notDisposeOrderManagementList');
// const orderManagementListDetails = r => require.ensure([], () => r(require('@/page/customerAffair/orderManagement/orderManagementListDetails')), 'orderManagementListDetails');
// const businessCreditReputationList = r => require.ensure([], () => r(require('@/page/customerAffair/businessCreditReputation/businessCreditReputationList')), 'businessCreditReputationList');
// const businessCreditReputationListDetails = r => require.ensure([], () => r(require('@/page/customerAffair/businessCreditReputation/businessCreditReputationListDetails')), 'businessCreditReputationListDetails');
// const businessCreditReputationRuleList = r => require.ensure([], () => r(require('@/page/customerAffair/businessCreditReputationRule/businessCreditReputationRuleList')), 'businessCreditReputationRuleList');
// const scoringRules = r => require.ensure([], () => r(require('@/page/customerAffair/businessCreditReputationRule/scoringRules')), 'scoringRules');
// const addNodeRule = r => require.ensure([], () => r(require('@/page/customerAffair/businessCreditReputationRule/addNodeRule')), 'addNodeRule');
// const addZeroRule = r => require.ensure([], () => r(require('@/page/customerAffair/businessCreditReputationRule/addZeroRule')), 'addZeroRule');
// const reputationScoringRule = r => require.ensure([], () => r(require('@/page/customerAffair/businessCreditReputationRule/reputationScoringRule')), 'reputationScoringRule');
// const addGradeRule = r => require.ensure([], () => r(require('@/page/customerAffair/businessCreditReputationRule/addGradeRule')), 'addGradeRule');
// const addEquityRule = r => require.ensure([], () => r(require('@/page/customerAffair/businessCreditReputationRule/addEquityRule')), 'addEquityRule');
// const addScoreRule = r => require.ensure([], () => r(require('@/page/customerAffair/businessCreditReputationRule/addScoreRule')), 'addScoreRule');

// const hignMoneyAlreadyPay = r => require.ensure([], () => r(require('@/page/orderMonitor/hignMoneyAlreadyPay')), 'hignMoneyAlreadyPay');
// const waitSendOut = r => require.ensure([], () => r(require('@/page/orderMonitor/waitSendOut')), 'waitSendOut');
// const yesterdayReturn = r => require.ensure([], () => r(require('@/page/orderMonitor/yesterdayReturn')), 'yesterdayReturn');

// const logs = r => require.ensure([], () => r(require('@/page/log/log')), 'logs');

// // 路由
// const routes = [
//     { path: '/login', name: 'login', component: login },
//     {
//         path: '/', component: home, name: 'home',
//         children: [

//             { path: 'customerIndex', name: 'customerIndex', component: customerIndex, meta: ['主页'] },
//             { path: 'workOrderDetails', name: 'workOrderDetails', component: workOrderDetails, meta: ['工单详情'] },
//             { path: 'checkIn', name: 'checkIn', component: checkIn, meta: ['签到打卡客服人员'] },
//             { path: 'checkInAudit', name: 'checkInAudit', component: checkInAudit, meta: ['签到打卡审核人员'] },

//             // 电话客服
//             { path: 'telephoneServiceIndex', component: telephoneServiceIndex, meta: ['电话客服'] },
//             { path: 'userInbound', component: userInbound, meta: ['用户呼入'] },
//             { path: 'businessInlet', component: businessInlet, meta: ['商家呼入'] },
//             { path: 'callUser', component: callUser, meta: ['呼叫用户'] },
//             { path: 'callBusiness', component: callBusiness, meta: ['呼叫商家'] },
//             { path: 'turnoverEvents', component: turnoverEvents, meta: ['流转事件'] },
//             { path: 'returnRecord', component: returnRecord, meta: ['回访记录'] },

//             //平台客服
//             { path: '/email', component: email, meta: ['邮箱客服'] },
//             { path: '/emailDetails', component: emailDetails, meta: ['邮箱客服详情'] },
//             { path: '/emailReply', component: emailReply, meta: ['邮箱回复'] },
//             { path: '/offLine', component: offLine, meta: ['离线客服'] },
//             { path: '/offLineDetails', component: offLineDetails, meta: ['离线客服'] },
//             { path: '/offLineReply', component: offLineReply, meta: ['留言回复'] },
//             { path: '/workList', component: workList, meta: ['工单列表'] },
//             { path: '/myWorkList', component: myWorkList, meta: ['我的工单列表'] },
//             { path: '/waitSheetList', component: waitSheetList, meta: ['待处理工单列表'] },
//             { path: '/workListDetails/:id', component: workListDetails, meta: ['工单详情'] },
//             { path: '/workListSource/:id', component: workListSource, meta: ['来源工单'] },
//             { path: '/workListLook/:id', component: workListLook, meta: ['查看工单'] },
//             { path: '/workListLookReportDispute/:id', component: workListLookReportDispute, meta: ['交易纠纷'] },
//             { path: '/onLineService', component: onLineService, meta: ['在线客服'] },


//             // 短信管理
//             { path: 'messageTemplateList', name: 'messageTemplateList', component: messageTemplateList, meta: ['短信模板管理'] },
//             { path: 'messageTemplateInsert/:id', name: 'messageTemplateInsert', component: messageTemplateInsert, meta: ['新增短信模板'] },
//             { path: 'messageDetails', name: 'messageDetails', component: messageDetails, meta: ['处理结果'] },
//             { path: 'messageReply', name: 'messageReply', component: messageReply, meta: ['立即回复'] },
//             { path: 'messageList', name: 'messageList', component: messageList, meta: ['短信列表'] },
//             { path: 'messageSend/:id', name: 'messageSend', component: messageSend, meta: ['发送短信'] },

//             // 文档管理
//             { path: 'ruleUser', name: 'ruleUser', component: ruleUser, meta: ['用户规则'] },
//             { path: 'ruleUserAdd', name: 'ruleUserAdd', component: ruleUserAdd, meta: ['规则文档'] },
//             { path: 'ruleUserAudit', name: 'ruleUserAudit', component: ruleUserAudit, meta: ['审核用户规则'] },
//             { path: 'ruleBusiness', name: 'ruleBusiness', component: ruleBusiness, meta: ['商家用户规则'] },
//             { path: 'ruleBusinessHouse', name: 'ruleBusinessHouse', component: ruleBusinessHouse, meta: ['商家众议院规则'] },
//             { path: 'ruleBusinessHouseAdd', name: 'ruleBusinessHouseAdd', component: ruleBusinessHouseAdd, meta: ['新增众议院规则'] },
//             { path: 'ruleUserHelp', name: 'ruleUserHelp', component: ruleUserHelp, meta: ['用户帮助'] },
//             { path: 'ruleBusinessHelp', name: 'ruleBusinessHelp', component: ruleBusinessHelp, meta: ['商家帮助'] },
//             { path: 'rulePlatform', name: 'rulePlatform', component: rulePlatform, meta: ['平台规则'] },
//             { path: 'rulePlatformHelp', name: 'rulePlatformHelp', component: rulePlatformHelp, meta: ['平台帮助'] },


//             // 异常处理
//             { path: 'testingUser', name: 'testingUser', component: testingUser, meta: ['用户检测'] },
//             { path: 'testingBusiness', name: 'testingBusiness', component: testingBusiness, meta: ['商家检测'] },
//             { path: 'testingUserDetails', name: 'testingUserDetails', component: testingUserDetails, meta: ['异常处理详情'] },
//             { path: 'accountThawing', name: 'accountThawing', component: accountThawing, meta: ['账号解冻'] },
//             { path: 'goodsSoldOut', name: 'goodsSoldOut', component: goodsSoldOut, meta: ['商品下架'] },
//             { path: 'licenceContractRemind', name: 'licenceContractRemind', component: licenceContractRemind, meta: ['证照合约提醒'] },
//             { path: 'licenceContractRemindDetails', name: 'licenceContractRemindDetails', component: licenceContractRemindDetails, meta: ['营业执照到期'] },
//             { path: 'ruleReminder', name: 'ruleReminder', component: ruleReminder, meta: ['提醒规则列表'] },
//             { path: 'ruleReminderAdd', name: 'ruleReminderAdd', component: ruleReminderAdd, meta: ['新增提醒规则'] },


//             // 审核管理
//             { path: '/auditCheckIn', name: 'auditCheckIn', component: auditCheckIn, meta: { title: ['入住审核'], keepAlive: true } },
//             { path: '/auditCheckInDetails/:id/', name: 'auditCheckInDetails', component: auditCheckInDetails, meta: { title: ['入住审核详情'], keepAlive: true } },
//             { path: '/auditDataUpdate', name: 'auditDataUpdate', component: auditDataUpdate, meta: ['资料更新审核'] },
//             { path: '/auditDataUpdateDetails/:id/', name: 'auditDataUpdateDetails', component: auditDataUpdateDetails, meta: ['资料更新审核详情'] },
//             { path: '/auditHouseNews', name: 'auditHouseNews', component: auditHouseNews, meta: ['房地产消息模块'] },
//             { path: '/auditHouseNewsDetails/:id/', name: 'auditHouseNewsDetails', component: auditHouseNewsDetails, meta: ['房地产消息模块详情'] },
//             { path: '/auditEvaluate', name: 'auditEvaluate', component: auditEvaluate, meta: ['评价审核'] },
//             { path: '/auditEvaluateDetails/:id/', name: 'auditEvaluateDetails', component: auditEvaluateDetails, meta: ['用户评价审核详情'] },
//             { path: '/auditUserReplyEvaluate', name: 'auditUserReplyEvaluate', component: auditUserReplyEvaluate, meta: ['用户回复评价审核'] },
//             { path: '/auditUserReplyEvaluateDetails/:id/', name: 'auditUserReplyEvaluateDetails', component: auditUserReplyEvaluateDetails, meta: ['用户回复评价审核详情'] },
//             { path: '/auditEvaluateReply', name: 'auditEvaluateReply', component: auditEvaluateReply, meta: ['评价审核'] },
//             { path: '/auditEvaluateReplyDetails/:id/', name: 'auditEvaluateReplyDetails', component: auditEvaluateReplyDetails, meta: ['用户评价审核详情'] },
//             { path: '/auditUserQuestions', name: 'auditUserQuestions', component: auditUserQuestions, meta: ['用户提问审核'] },
//             { path: '/auditUserQuestionsDetail/:id/', name: 'auditUserQuestionsDetail', component: auditUserQuestionsDetail, meta: ['用户提问审核详情'] },
//             { path: '/auditUserAnswer', name: 'auditUserAnswer', component: auditUserAnswer, meta: ['用户回答审核'] },
//             { path: '/auditUserAnswerDetail/:id/', name: 'auditUserAnswerDetail', component: auditUserAnswerDetail, meta: ['用户回答审核详情'] },
//             { path: '/auditShopAnswer', name: 'auditShopAnswer', component: auditShopAnswer, meta: ['商家回答审核'] },
//             { path: '/auditShopAnswerDetail/:id/', name: 'auditShopAnswerDetail', component: auditShopAnswerDetail, meta: ['商家回答审核详情'] },
//             { path: '/auditQaComment', name: 'auditQaComment', component: auditQaComment, meta: ['问答评论审核'] },
//             { path: '/auditQaCommentDetail/:id/', name: 'auditQaCommentDetail', component: auditQaCommentDetail, meta: ['问答评论审核详情'] },
//             { path: '/auditQaCommentReply', name: 'auditQaCommentReply', component: auditQaCommentReply, meta: ['回复问答评论审核'] },
//             { path: '/auditQaCommentReplyDetail/:id/', name: 'auditQaCommentReplyDetail', component: auditQaCommentReplyDetail, meta: ['回复问答评论审核详情'] },
//             { path: '/auditCommodity', name: 'auditCommodity', component: auditCommodity, meta: ['商品审核'] },
//             { path: '/auditCommodityDetails/:id/', name: 'auditCommodityDetails', component: auditCommodityDetails, meta: ['商品审核详情'] },
//             { path: '/auditGoodsCorePrice', name: 'auditGoodsCorePrice', component: auditGoodsCorePrice, meta: ['商品调价审核'] },
//             { path: '/auditGoodsCorePriceDetails/:id/', name: 'auditGoodsCorePriceDetails', component: auditGoodsCorePriceDetails, meta: ['商品调价审核详情'] },
//             { path: '/auditGoodsSoldOut', name: 'auditGoodsSoldOut', component: auditGoodsSoldOut, meta: ['商品下架审核'] },
//             { path: '/auditGoodsSoldOutDetails/:id/', name: 'auditGoodsSoldOutDetails', component: auditGoodsSoldOutDetails, meta: ['商品下架审核详情'] },

//             { path: '/auditActive', name: 'auditActive', component: auditActive, meta: ['激活店铺审核'] },
//             { path: '/auditActiveDetails/:id/', name: 'auditActiveDetails', component: auditActiveDetails, meta: ['激活店铺审核详情'] },
//             { path: '/auditShopClose', name: 'auditShopClose', component: auditShopClose, meta: ['关闭店铺审核'] },
//             { path: '/auditShopCloseDetails/:id/', name: 'auditShopCloseDetails', component: auditShopCloseDetails, meta: ['关闭店铺审核详情'] },

//             { path: '/auditArticle', name: 'auditArticle', component: auditArticle, meta: ['文章审核'] },
//             { path: '/auditArticleDetails/:id/', name: 'auditArticleDetails', component: auditArticleDetails, meta: ['文章审核详情'] },
//             { path: '/auditPlatformActivities', name: 'auditPlatformActivities', component: auditPlatformActivities, meta: ['平台活动审核'] },
//             { path: '/auditPlatformActivitiesDetails/:id/', name: 'auditPlatformActivitiesDetails', component: auditPlatformActivitiesDetails, meta: ['平台活动审核详情'] },
//             { path: '/collageToexamine', name: 'collageToexamine', component: collageToexamine, meta: ['拼购活动审核'] },
//             { path: '/collageToexamineAudit/:id/', name: 'collageToexamineAudit', component: collageToexamineAudit, meta: ['拼购活动审核详情'] },
//             { path: '/auditAdvertData', name: 'auditAdvertData', component: auditAdvertData, meta: ['广告审核'] },
//             { path: '/auditAdvertDataDetails/:id/', name: 'auditAdvertDataDetails', component: auditAdvertDataDetails, meta: ['广告审核详情'] },
//             { path: '/auditBrand', name: 'auditBrand', component: auditBrand, meta: ['品牌审核'] },
//             { path: '/auditBrandDetails/:id/', name: 'auditBrandDetails', component: auditBrandDetails, meta: ['品牌审核详情'] },
//             { path: '/auditBankChange', name: 'auditBankChange', component: auditBankChange, meta: ['银行卡变更审核'] },
//             { path: '/auditBankChangeDetails/:id/', name: 'auditBankChangeDetails', component: auditBankChangeDetails, meta: ['银行卡变更审核详情'] },
//             { path: '/auditInEnter', name: 'auditInEnter', component: auditInEnter, meta: ['房地产入驻审核'] },
//             { path: '/auditInEnterDetails/:id/', name: 'auditInEnterDetails', component: auditInEnterDetails, meta: ['房地产入驻审核详情'] },
//             { path: '/auditRealtyEvaluate', name: 'auditRealtyEvaluate', component: auditRealtyEvaluate, meta: ['房地产评价审核'] },
//             { path: '/auditRealtyEvaluateDetails/:id/', name: 'auditRealtyEvaluateDetails', component: auditRealtyEvaluateDetails, meta: ['房地产评价审核详情'] },
//             { path: '/auditRealtyEvaluateReply', name: 'auditRealtyEvaluateReply', component: auditRealtyEvaluateReply, meta: ['房地产评价回复审核'] },
//             { path: '/auditRealtyEvaluateReplyDetails/:id/', name: 'auditRealtyEvaluateReplyDetails', component: auditRealtyEvaluateReplyDetails, meta: ['房地产评价回复审核详情'] },
//             { path: '/realtyCompanyAuditChange', name: 'realtyCompanyAuditChange', component: realtyCompanyAuditChange, meta: ['房地产公司变更审核'] },
//             { path: '/realtyCompanyAuditChangeDetails/:id/', name: 'realtyCompanyAuditChangeDetails', component: realtyCompanyAuditChangeDetails, meta: ['房地产公司变更审核详情'] },
//             { path: '/realtyLicenseAuditChange', name: 'realtyLicenseAuditChange', component: realtyLicenseAuditChange, meta: ['房地产营业执照变更审核'] },
//             { path: '/realtyLicenseAuditChangeDetails/:id/', name: 'realtyLicenseAuditChangeDetails', component: realtyLicenseAuditChangeDetails, meta: ['房地产营业执照变更审核详情'] },
//             { path: '/auditChangeCompany', name: 'auditChangeCompany', component: auditChangeCompany, meta: ['公司信息变更审核'] },
//             { path: '/auditChangeCompanyDetails/:id/', name: 'auditChangeCompanyDetails', component: auditChangeCompanyDetails, meta: ['公司信息变更审核详情'] },
//             { path: '/auditChangeCategory', name: 'auditChangeCategory', component: auditChangeCategory, meta: ['经营范围变更审核'] },
//             { path: '/auditChangeCategoryDetails/:id/', name: 'auditChangeCategoryDetails', component: auditChangeCategoryDetails, meta: ['经营范围变更审核详情'] },
//             { path: '/auditChangeLicense', name: 'auditChangeLicense', component: auditChangeLicense, meta: ['营业执照变更审核'] },
//             { path: '/auditChangeLicenseDetails/:id/', name: 'auditChangeLicenseDetails', component: auditChangeLicenseDetails, meta: ['营业执照变更审核详情'] },
//             { path: '/auditChangeLicenseYear', name: 'auditChangeLicenseYear', component: auditChangeLicenseYear, meta: ['年报变更审核'] },
//             { path: '/auditChangeLicenseYearDetails/:id/', name: 'auditChangeLicenseYearDetails', component: auditChangeLicenseYearDetails, meta: ['年报变更审核详情'] },
//             { path: '/auditChangeShop', name: 'auditChangeShop', component: auditChangeShop, meta: ['店铺信息变更审核'] },
//             { path: '/auditChangeShopDetails/:id/', name: 'auditChangeShopDetails', component: auditChangeShopDetails, meta: ['店铺信息变更审核详情'] },
//             { path: '/auditShopCertificates', name: 'auditShopCertificates', component: auditShopCertificates, meta: ['商家证件变更审核'] },
//             { path: '/auditShopCertificatesDetails/:id/', name: 'auditShopCertificatesDetails', component: auditShopCertificatesDetails, meta: ['商家证件变更审核详情'] },


//             // 客服事物
//             { path: 'affairShoperInfoManagement', name: 'affairShoperInfoManagement', component: affairShoperInfoManagement, meta: ['商家信息管理列表'] },
//             { path: 'affairShoperInfoManagementDetail/:id/', name: 'affairShoperInfoManagementDetail', component: affairShoperInfoManagementDetail, meta: ['商家信息管理详情'] },
//             { path: 'affairGoodsInfoManagement', name: 'affairGoodsInfoManagement', component: affairGoodsInfoManagement, meta: ['商品信息管理列表'] },
//             { path: 'affairGoodsInfoManagementDetail/:id/', name: 'affairGoodsInfoManagementDetail', component: affairGoodsInfoManagementDetail, meta: ['商品信息管理详情'] },
//             { path: 'affairGoodsInfoCorePriceRecord/:id/', name: 'affairGoodsInfoCorePriceRecord', component: affairGoodsInfoCorePriceRecord, meta: ['商品调价记录'] },
//             { path: 'affairOrderWatchManagement', name: 'affairOrderWatchManagement', component: affairOrderWatchManagement, meta: ['商品信息管理列表'] },
//             { path: 'affairOrderWatchManagementDetail/:id/', name: 'affairOrderWatchManagementDetail', component: affairOrderWatchManagementDetail, meta: ['商品信息管理详情'] },
//             { path: 'plateBrandManagement', name: 'plateBrandManagement', component: plateBrandManagement, meta: ['商品信息管理列表'] },
//             { path: 'plateBrandManagementDetail/:id/', name: 'plateBrandManagementDetail', component: plateBrandManagementDetail, meta: ['商品信息管理详情'] },
//             { path: 'orderManagementList', name: 'orderManagementList', component: orderManagementList, meta: ['订单管理'] },
//             { path: 'notDisposeOrderManagementList', name: 'notDisposeOrderManagementList', component: notDisposeOrderManagementList, meta: ['未处理订单管理'] },
//             { path: 'orderManagementListDetails/:id/', name: 'orderManagementListDetails', component: orderManagementListDetails, meta: ['订单管理列表详情'] },
//             { path: 'businessCreditReputationList', name: 'businessCreditReputationList', component: businessCreditReputationList, meta: ['商家信用信誉管理'] },
//             { path: 'businessCreditReputationListDetails/:id/', name: 'businessCreditReputationListDetails', component: businessCreditReputationListDetails, meta: ['商家信用信誉管理详情'] },
//             { path: 'businessCreditReputationRuleList', name: 'businessCreditReputationRuleList', component: businessCreditReputationRuleList, meta: ['商家信用信誉规则管理'] },
//             { path: 'scoringRules/:id/', name: 'scoringRules', component: scoringRules, meta: ['商家信用信誉规则管理'] },
//             { path: 'addNodeRule/:id/', name: 'addNodeRule', component: addNodeRule, meta: ['商家信用信誉规则管理'] },
//             { path: 'addZeroRule/:id/', name: 'addZeroRule', component: addZeroRule, meta: ['商家信用信誉规则管理'] },
//             { path: 'reputationScoringRule/:id/', name: 'reputationScoringRule', component: reputationScoringRule, meta: ['商家信用信誉规则管理'] },
//             { path: 'addGradeRule/:id/', name: 'addGradeRule', component: addGradeRule, meta: ['商家信用信誉规则管理'] },
//             { path: 'addEquityRule/:id/', name: 'addEquityRule', component: addEquityRule, meta: ['商家信用信誉规则管理'] },
//             { path: 'addScoreRule/:id/', name: 'addScoreRule', component: addScoreRule, meta: ['商家信用信誉规则管理'] },


//             // 商家监控
//             { path: 'orderMonitoring', name: 'orderMonitoring', component: orderMonitoring, meta: ['商家订单监控'] },
//             { path: 'orderMonitoringDetails', name: 'orderMonitoringDetails', component: orderMonitoringDetails, meta: ['商家订单监控详情'] },
//             { path: 'putawayMonitoring', name: 'putawayMonitoring', component: putawayMonitoring, meta: ['商家上架监控'] },
//             { path: 'putawayMonitoringDetails', name: 'putawayMonitoringDetails', component: putawayMonitoringDetails, meta: ['商家上架监控详情'] },
//             { path: 'disposeResultMonitoring', name: 'disposeResultMonitoring', component: disposeResultMonitoring, meta: ['商家处理结果'] },
//             { path: 'disposeResultMonitoringDetails/', name: 'disposeResultMonitoringDetails', component: disposeResultMonitoringDetails, meta: ['商家处理结果详情'] },
//             { path: 'loginRemind', name: 'loginRemind', component: loginRemind, meta: ['商家登录提醒'] },
//             { path: 'loginRemindDetails/:id/', name: 'loginRemindDetails', component: loginRemindDetails, meta: ['商家登录提醒详情'] },

//             // 业务培训
//             { path: 'textbooksList', name: 'textbooksList', component: textbooksList, meta: ['教材列表'] },
//             { path: 'textbooksAdd', name: 'textbooksAdd', component: textbooksAdd, meta: ['编制教材'] },
//             { path: 'textbooksRelease', name: 'textbooksRelease', component: textbooksRelease, meta: ['教材发布'] },
//             { path: 'examinationList', name: 'examinationList', component: examinationList, meta: ['考试考核'] },
//             { path: 'titleEditorial', name: 'titleEditorial', component: titleEditorial, meta: ['编辑题目'] },
//             { path: 'examination', name: 'examination', component: examination, meta: ['参加考试'] },
//             { path: 'examinationInquiry', name: 'examinationInquiry', component: examinationInquiry, meta: ['考试查询'] },
//             { path: 'examinationInquiryDetail', name: 'examinationInquiryDetail', component: examinationInquiryDetail, meta: ['考试详情查询'] },


//             // 话术管理
//             { path: 'talkingSkillList', name: 'talkingSkillList', component: talkingSkillList, meta: ['话术管理'] },
//             { path: 'talkingSkillEdit', name: 'talkingSkillEdit', component: talkingSkillEdit, meta: ['话术编写'] },
//             { path: 'talkingSkillAudit', name: 'talkingSkillAudit', component: talkingSkillAudit, meta: ['审核话术'] },
//             { path: 'talkingSkillTrainList', name: 'talkingSkillTrainList', component: talkingSkillTrainList, meta: ['话术反馈'] },
//             { path: 'trainingFeedback', name: 'trainingFeedback', component: trainingFeedback, meta: ['学习反馈'] },

//             // 学习管理
//             { path: 'learningManagementList', name: 'learningManagementList', component: learningManagementList, meta: ['学习管理'] },
//             { path: 'knowledgeAdd', name: 'knowledgeAdd', component: knowledgeAdd, meta: ['新增知识'] },
//             { path: 'knowledgeAudit', name: 'knowledgeAudit', component: knowledgeAudit, meta: ['审核知识'] },
//             { path: 'learningFeedbackList', name: 'learningFeedbackList', component: learningFeedbackList, meta: ['学习反馈列表'] },
//             { path: 'learningFeedbackLook', name: 'learningFeedbackLook', component: learningFeedbackLook, meta: ['学习反馈详情'] },

//             // 订单监控
//             { path: 'hignMoneyAlreadyPay', name: 'hignMoneyAlreadyPay', component: hignMoneyAlreadyPay, meta: ['高额已支付订单'] },
//             { path: 'waitSendOut', name: 'waitSendOut', component: waitSendOut, meta: ['待发货订单'] },
//             { path: 'yesterdayReturn', name: 'yesterdayReturn', component: yesterdayReturn, meta: ['昨日被退订单'] },

//             // 系统设置
//             { path: 'logs', name: 'logs', component: logs, meta: ['审核系统日志'] },
//         ]
//     }
// ]

// const ROUTER = new Router({
//     routes,
//     strict: process.env.NODE_ENV !== 'production',
// });

// // 登录验证 （Vue Router全局前置守卫）
// ROUTER.beforeEach((to, from, next) => {

//     if (to.path === '/login') {
//         next();
//     } else {
//         let authorization = window.sessionStorage.getItem('AUTHORIZATION');
//         if (!authorization) {
//             next({ path: '/login' });
//         } else {
//             next();
//         }
//     }

// });

// export default ROUTER;
