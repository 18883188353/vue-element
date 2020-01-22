export default {
    state: {
        result: [], // 非管理员账户的菜单列表
        menuResultList: [],
        waitAuditResult: { // 属性名规则： 路由 path 属性去掉前面的 / 

            auditCheckIn: {
                count: 0,
                queryTypes: 'DomesticEntering,GlobalEntering,LuxuryEntering,RuralEntering',
                systemType: 'auditSystem'
            },
            auditDataUpdate: {
                count: 0,
                queryTypes: 'DomesticSupplementAudit,GlobalSupplementAudit',
                systemType: 'auditSystem'
            },
            auditHouseNews: {
                count: 0,
                queryTypes: 'HouseMessageTempleAudit',
                systemType: 'auditSystem'
            },
            auditEvaluate: {
                count: 0,
                queryTypes: 'EvaluateAudit,GlobalEvaluateAudit,LuxuryEvaluateAudit',
                ide: 'GROUP_13',
                systemType: 'auditSystem'
            },
            auditUserReplyEvaluate: {
                count: 0,
                queryTypes: 'UserReplyToComment,GlobalUserReplyToComment,LuxuryUserReplyToComment',
                ide: 'GROUP_13',
                systemType: 'auditSystem'
            },
            auditEvaluateReply: {
                count: 0,
                queryTypes: 'EvaluationResponseAudit',
                ide: 'GROUP_13',
                systemType: 'auditSystem'
            },
            auditUserQuestions: {
                count: 0,
                queryTypes: 'UserQuestionsAudit,GlobalUserQuestionsAudit,LuxuryUserQuestionsAudit',
                ide: 'GROUP_14',
                systemType: 'auditSystem'
            },
            auditUserAnswer: {
                count: 0,
                queryTypes: 'UserAnswerAudit,GlobalUserAnswerAudit,LuxuryUserAnswerAudit',
                ide: 'GROUP_14',
                systemType: 'auditSystem'
            },
            auditShopAnswer: {
                count: 0,
                queryTypes: 'ShopAnswerAudit,GlobalShopAnswerAudit,LuxuryShopAnswerAudit',
                ide: 'GROUP_14',
                systemType: 'auditSystem'
            },
            auditQaComment: {
                count: 0,
                queryTypes: 'QuestionsCommentAudit,GlobalQuestionsCommentAudit,LuxuryQuestionsCommentAudit',
                ide: 'GROUP_14',
                systemType: 'auditSystem'
            },
            auditQaCommentReply: {
                count: 0,
                queryTypes: 'ReplyCommentAudit,GlobalReplyCommentAudit,LuxuryReplyCommentAudit',
                ide: 'GROUP_14',
                systemType: 'auditSystem'
            },
            auditCommodity: {
                count: 0,
                queryTypes: 'DomesticGoodsAudit,GlobalGoodsAudit,LuxuryGoodsAudit',
                ide: 'GROUP_11',
                systemType: 'auditSystem'
            },
            auditGoodsCorePrice: {
                count: 0,
                queryTypes: 'DomesticPriceAudit,GlobalPriceAudit,LuxuryPriceAudit',
                ide: 'GROUP_11',
                systemType: 'auditSystem'
            },
            auditGoodsSoldOut: {
                count: 0,
                queryTypes: 'DomesticObtainedAudit,GlobalObtainedAudit,LuxuryObtainedAudit',
                ide: 'GROUP_11',
                systemType: 'auditSystem'
            },
            auditArticle: {
                count: 0,
                queryTypes: 'ShopBookAudit,GlobalShopBookAudit,LuxuryShopBookAudit',
                systemType: 'auditSystem'
            },
            auditPlatformActivities: {
                count: 0,
                queryTypes: 'PlatformActivitiesAudit',
                ide: 'GROUP_12',
                systemType: 'auditSystem'
            },
            collageToexamine: {
                count: 0,
                queryTypes: 'CroworderingAudit',
                ide: 'GROUP_12',
                systemType: 'auditSystem'
            },
            auditAdvertData: {
                count: 0,
                queryTypes: 'AdvertMaterialAudit',
                systemType: 'auditSystem'
            },
            auditBrand: {
                count: 0,
                queryTypes: 'DomesticBrandAudit,GlobalBrandAudit,LuxuryBrandAudit',
                systemType: 'auditSystem'
            },
            auditBankChange: {
                count: 0,
                queryTypes: 'DomesticDataChangeAudit',
                systemType: 'auditSystem'
            },
            auditInEnter: {
                count: 0,
                queryTypes: 'HouseEntering',
                systemType: 'auditSystem'
            },
            auditRealtyEvaluate: {
                count: 0,
                queryTypes: 'HouseEvaluate',
                ide: 'GROUP_16',
                systemType: 'auditSystem'
            },
            auditRealtyEvaluateReply: {
                count: 0,
                queryTypes: 'HouseEvaluationReply',
                ide: 'GROUP_16',
                systemType: 'auditSystem'
            },
            realtyCompanyAuditChange: {
                count: 0,
                queryTypes: 'HouseEditCompany',
                ide: 'GROUP_15',
                systemType: 'auditSystem'
            },
            realtyLicenseAuditChange: {
                count: 0,
                queryTypes: 'HouseLicenseAudit',
                ide: 'GROUP_15',
                systemType: 'auditSystem'
            },
            auditChangeCompany: {
                count: 0,
                queryTypes: 'DomesticEditCompany,GlobalEditCompany,LuxuryEditCompany',
                ide: 'GROUP_10',
                systemType: 'auditSystem'
            },
            auditChangeCategory: {
                count: 0,
                queryTypes: 'DomesticCategoryAudit,GlobalCategoryAudit,LuxuryCategoryAudit',
                ide: 'GROUP_10',
                systemType: 'auditSystem'
            },
            auditChangeLicense: {
                count: 0,
                queryTypes: 'DomesticLicenseAudit,GlobalLicenseAudit,LuxuryLicenseAudit',
                ide: 'GROUP_10',
                systemType: 'auditSystem'
            },
            auditChangeLicenseYear: {
                count: 0,
                queryTypes: 'DomesticYearReportAudit,GlobalYearReportAudit,LuxuryYearReportAudit',
                ide: 'GROUP_10',
                systemType: 'auditSystem'
            },
            auditChangeShop: {
                count: 0,
                queryTypes: 'DomesticEditShopInfo,GlobalEditShopInfo,LuxuryEditShopInfo',
                ide: 'GROUP_10',
                systemType: 'auditSystem'
            },
            auditShopCertificates: {
                count: 0,
                queryTypes: 'DomesticCredentailsAudit,GlobalCredentailsAudit,LuxuryCredentailsAudit',
                systemType: 'auditSystem'
            },
            auditActive: {
                count: 0,
                queryTypes: 'DomesticActivation,GlobalActivation,LuxuryActivation',
                systemType: 'auditSystem'
            },
            auditShopClose: {
                count: 0,
                queryTypes: 'CloseEntering,GlobalCloseEntering,LuxuryCloseEntering',
                systemType: 'auditSystem'
            },
            orderUntreated: {
                count: 0,
                systemType: 'orderUntreated',
                queryTypes: 'orderUntreated',
            }
        }
    },
    getters: {

    },
    mutations: {
        setResult(state, result) {
            state.result = result || new Array();
        },
        setWaitAuditResult(state, result) {
            //result.add = 0;
            //result.type = '';
            //result.count = 0;

            for (let key in state.waitAuditResult) {
                if (state.waitAuditResult[key].queryTypes.indexOf(result.type) !== -1) {
                    //result.add === 0 ? state.waitAuditResult[key].count = result.count : state.waitAuditResult[key].count += result.count;
                    result.add === 0 ? state.waitAuditResult[key].count-- : state.waitAuditResult[key].count++;
                }
            }

        },
        setWaitAuditResultInit(state, result) {
            console.log(result, ' ==>>> 初始化待审核数量');
            for (let key in result) {
                state.waitAuditResult[key].count = result[key];
            }
        }
    },
    actions: {
        async setResult({ state, commit, rootState }, result) {
            commit('setResult', result);
        },
        async setWaitAuditResult({ state, commit, rootState }, result) {
            commit('setWaitAuditResult', result);
        },
        async setWaitAuditResultInit({ state, commit, rootState }, result) {
            commit('setWaitAuditResultInit', result);
        }
    }
}