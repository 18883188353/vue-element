/**
 * Created by baiqiang on 2018-8-21.
 */
export default {
    //工单紧急情况
        EmergencyLevelData: [
            {value: 3,text:"一般"},
            {value: 2,text:"紧急"},
            {value: 1,text:"非常急"}
        ],
    //工单处理状态
        StateOrPlate: [
            {value:"allsheet",text:"所有工单"},
            {value:"dealsheet",text:"待处理"},
            {value:"revisitsheet",text:"待回访"},
            {value:"finishedsheet",text:"已完成"},
        ],
    //工单状态
        StatusData: [
            {value:"BACK",text:"已撤销"},
            {value:"W_ACCEPT",text:"待受理"},
            {value:"W_DISPOSE",text:"待处理"},
            //{value:"REJECTED",text:"已驳回"},
            {value:"W_VISIT",text:"待回访"},
            {value:"FINISHED",text:"已完成"},
            //{value:"DELETED",text:"已删除"},
            //{value:"NOT_DEAL",text:"暂不受理"},
            //{value:"W_ACCEPT",text:"待受理"},
            //{value:"NOT_ACCEPT",text:"不受理"},
        ],
    //工单级别样式
        EmergencyLevelColor: [
            {value:"GENERAL",text:"css.info"},
            {value:"URGENT",text:"css.warn"},
            {value:"EMERGENCY",text:"css.danger"}
        ],
    //工单来源
        Source: [
            {value:"P1E1",text:"商家PC"},
            {value:"P2E1",text:"平台PC"},
            {value:"P3E1",text:"房地产PC"},
            {value:"P4E1",text:"用户PC"},
            {value:"P4E2",text:"用户IOS"},
            {value:"P4E3",text:"用户Android"},
            {value:"P4E4",text:"用户wap"},
            {value:"P4E5",text:"用户wehchat"},
            {value:"P4E6",text:"用户QQ"},
            {value:"P4E7",text:"用户app"},
            {value:"P1E7",text:"商家app"},
        ],
    //工单类型
        SheetType: [
            {value:"T1",text:"咨询",children:[]},
            {value:"T2",text:"举报",children:[
                    {value: 'T2_S1', text: '反复退款'},
                    {value: 'T2_S2', text: '滥发信息'},
                    {value: 'T2_S3', text: '人身攻击'},
                    {value: 'T2_S4', text: '恶意抄袭'},
                    {value: 'T2_S5', text: '评论违规'},
                    {value: 'T2_S6', text: '其他举报'},
                    {value: 'T2_U1', text: '服务态度恶劣'},
                    {value: 'T2_U2', text: '商业诈骗'},
                    {value: 'T2_U3', text: '贪污受贿'},
                    {value: 'T2_U4', text: '侵犯知识产权'},
                    {value: 'T2_U5', text: '商业机密'},
                    {value: 'T2_U6', text: '其他'}
                ]},
            {value:"T2AS",text:"问答举报",children:[
                    {value: 'T2AS_1', text: '色情淫秽'},
                    {value: 'T2AS_2', text: '垃圾广告'},
                    {value: 'T2AS_3', text: '抄袭原创'},
                    {value: 'T2AS_4', text: '不实信息'},
                    {value: 'T2AS_5', text: '问答人身攻击'},
                    {value: 'T2AS_6', text: '与话题不符'},
                    {value: 'T2AS_7', text: '涉及国家安全'},
                    {value: 'T2AS_8', text: '其他问答举报'}
                ]
            },
            {value:"T3",text:"建议",children:[
                    {value: 'T3_S1', text: '使用功能'},
                    {value: 'T3_S2', text: '操作体验'},
                    {value: 'T3_S3', text: '满集服务'},
                    {value: 'T3_S4', text: '其他建议'}
                ]},
            {value:"T4",text:"交易纠纷",children:[
                    {value: 'T4_S1', text: '换货',children:[
                            {value: 'T4_S1_A', text: '商家换货'},
                            {value: 'T4_S1_B', text: '驳回纠纷'}
                        ]},
                    {value: 'T4_S2', text: '补发货',children:[
                            {value: 'T4_S2_C', text: '商家退款'},
                            {value: 'T4_S2_B', text: '商家补发货'},
                            {value: 'T4_S2_A', text: '驳回纠纷'}
                        ]},
                    {value: 'T4_S3', text: '仅退款',children:[
                            {value: 'T4_S3_A', text: '商家退款'},
                            {value: 'T4_S3_B', text: '驳回纠纷'}
                        ]},
                    {value: 'T4_S4', text: '退货退款',children:[
                            {value: 'T4_S4_A', text: '商家同意退货退款'},
                            {value: 'T4_S4_B', text: '驳回纠纷'}
                        ]},
                    {value: 'T4_S5', text: '维修',children:[
                            {value: 'T4_S5_A', text: '商家同意维修'},
                            {value: 'T4_S5_B', text: '驳回纠纷'}
                        ]},
                    {value: 'T4_WAIT_DEALWITH', text: '待商家处理'},
                    {value: 'T4_MERCHANT_CONFIRM', text: '商家确认并提供资料'},
                    {value: 'T4_MERCHANT_ACCEPT', text: '商家受理解决'},
                    {value: 'T4_PLATFORM_IN', text: '平台介入解决'},
                    {value: 'T4_PLATFORM_ARBITRATION', text: '平台已仲裁'},
                    {value: 'T4_FINISHED', text: '问题已解决'}
                ]},
            {value:"T5",text:"纠错"},
            {value:"T6",text:"投诉"},
            {value:"T7",text:"回访"}
        ],
    //工单满意度评价
        VistHistory: [
            {value:"VERYGOOD",text:"非常满意"},
            {value:"SATISFACT",text:"满意"},
            {value:"GENERAL",text:"一般"},
            {value:"BAD",text:"不满意"}
        ],
}
