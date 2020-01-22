<template>
    <div class="fillcontain">
        <reputation-score
            v-bind:open.sync="reputationWinOpen"
            @selectCallback="selectCallback"
        ></reputation-score>
        <div class="main">

            <el-card class="box-card">
                <div
                    slot="header"
                    class="clearfix"
                >
                    <span>交易纠纷：</span>
                </div>
                <div class="text item">
                    <div>
                        <el-steps :active="activeOpt">
                            <el-step
                                :title="item"
                                :key="i"
                                description=""
                                v-for="(item,i) in optOptions"
                            ></el-step>
                        </el-steps>
                    </div>
                    <div
                        class="mt20"
                        style="padding: 0 10%"
                    >
                        <el-form label-width="150px">
                            <el-form-item label="工单来源：">{{sheetDetail.source}}</el-form-item>
                            <el-form-item label="工单编号：">{{sheetDetail.orderNo ? sheetDetail.orderNo : '-'}}</el-form-item>
                            <el-form-item label="创建时间：">{{sheetDetail.createTime ? sheetDetail.createTime : '-'}}</el-form-item>
                            <el-form-item label="工单类型：">交易纠纷</el-form-item>
                            <el-form-item label="紧急程度：">{{getTypeValueText('EmergencyLevelData', sheetDetail.emergencyLevel)}}</el-form-item>
                            <el-form-item label="纠纷类型：">{{subTypeCode ? subTypeCode : '退货退款'}}</el-form-item>
                            <el-form-item label="买家：">{{sheetDetail.beReportUser}}</el-form-item>
                            <el-form-item label="联系电话：">{{sheetDetail.contactNum }}</el-form-item>
                            <el-form-item label="卖家：">{{sheetDetail.reportObj}}</el-form-item>
                            <el-form-item label="联系电话：">{{sheetDetail.beContactNum}}</el-form-item>
                            <el-form-item label="工单状态：">{{sheetDetail.status}}</el-form-item>
                            <!--<el-form-item label="工单处理人：">客服部张三</el-form-item>-->
                            <el-form-item label="纠纷商品信息：">
                                <div
                                    v-for="(n, idx) in sheetDetail.articlesList"
                                    :key="idx"
                                    class="goods-info"
                                >
                                    <div class="goods-img">
                                        <img
                                            :src="n.img"
                                            title="商品主图"
                                        >
                                    </div>
                                    <div class="goods-content">
                                        <p>
                                            <el-link @click="goGoodsDetail(n.articleId)">{{ n.title }}</el-link>
                                        </p>
                                        <p>{{ n.spec }}</p>
                                        <p>￥{{ n.sellPrice }}</p>
                                    </div>
                                </div>
                            </el-form-item>
                            <el-card class="box-card">
                                <div
                                    slot="header"
                                    class="clearfix"
                                >
                                    <span>沟通记录</span>
                                    <el-button
                                        type="primary"
                                        size="mini"
                                        class="fr"
                                        v-if="showType !== 'view'"
                                        @click="drawer = true"
                                    >增加沟通记录<i class="el-icon-plus el-icon--right"></i></el-button>
                                </div>
                                <div class="text item">
                                    <div class="block">
                                        <el-timeline>
                                            <div v-if="DisputeProgressDetail.orderNo">
                                                <el-timeline-item
                                                    :timestamp="DisputeProgressDetail.payAt"
                                                    placement="top"
                                                >
                                                    <el-card>
                                                        <p>买家支付成功</p>
                                                        <p>支付金额：{{ DisputeProgressDetail.payNum }}(含运费{{ DisputeProgressDetail.extra }}元)</p>
                                                        <p>订单号：{{ DisputeProgressDetail.orderNo }}</p>
                                                    </el-card>
                                                </el-timeline-item>
                                                <el-timeline-item
                                                    :timestamp="DisputeProgressDetail.sendTime"
                                                    placement="top"
                                                >
                                                    <el-card>
                                                        <p>卖家发货</p>
                                                        <p>物流公司：{{ DisputeProgressDetail.transCompany }}</p>
                                                        <p>物流单号：{{ DisputeProgressDetail.transNo }}</p>
                                                    </el-card>
                                                </el-timeline-item>
                                                <el-timeline-item
                                                    :timestamp="DisputeProgressDetail.backOrderTime"
                                                    placement="top"
                                                >
                                                    <el-card>
                                                        <p>买家发起{{ DisputeProgressDetail.disputType }}</p>
                                                        <p>原因：{{ DisputeProgressDetail.backResason }}</p>
                                                        <p>说明：{{ DisputeProgressDetail.backContent }}</p>
                                                        <p>退单类型：{{ DisputeProgressDetail.backType }}</p>
                                                        <p>退单号：{{ DisputeProgressDetail.backOrderNo }}</p>
                                                    </el-card>
                                                </el-timeline-item>
                                                <el-timeline-item
                                                    :timestamp="DisputeProgressDetail.refuseTime"
                                                    placement="top"
                                                >
                                                    <el-card>
                                                        <p>商家拒绝用户申请：{{ DisputeProgressDetail.refuseType }}</p>
                                                        <p>拒绝原因：{{ DisputeProgressDetail.refuseReason }}</p>
                                                        <p>拒绝说明：{{ DisputeProgressDetail.refuseContent }}</p>
                                                        <div
                                                            class="viewer_img"
                                                            v-if="DisputeProgressDetail.refusePics"
                                                        >
                                                            <p>图片：</p>
                                                            <viewer>
                                                                <img
                                                                    :src="it"
                                                                    :key="i"
                                                                    v-for="(it,i) in DisputeProgressDetail.refusePics.split(',')"
                                                                    style="width: 50px;height: 50px"
                                                                    alt=""
                                                                >
                                                            </viewer>
                                                        </div>
                                                    </el-card>
                                                </el-timeline-item>
                                                <el-timeline-item
                                                    :timestamp="DisputeProgressDetail.involveTime"
                                                    placement="top"
                                                >
                                                    <el-card>
                                                        <h3 style="color: red">平台介入</h3>
                                                    </el-card>
                                                </el-timeline-item>
                                            </div>

                                            <el-timeline-item
                                                v-for="(item, index) in sheetInfo"
                                                :timestamp="item.addTime"
                                                :key="index"
                                                placement="top"
                                            >
                                                <el-card>
                                                    <h3>{{getProofRoleDesc(item.isProofdata)}}</h3>
                                                    <p>内容：{{item.desc}}</p>
                                                    <div
                                                        class="viewer_img"
                                                        v-if="item.pics.length > 0"
                                                    >
                                                        <p>图片：</p>
                                                        <viewer>
                                                            <img
                                                                :src="it"
                                                                :key="i"
                                                                v-for="(it,i) in item.picArr"
                                                                style="width: 50px;height: 50px"
                                                                alt=""
                                                            >
                                                        </viewer>
                                                    </div>
                                                </el-card>
                                            </el-timeline-item>

                                            <div v-if="DisputeProgressDetail.solveResult">
                                                <el-timeline-item
                                                    :timestamp="DisputeProgressDetail.solveResult.solveTime"
                                                    placement="top"
                                                >
                                                    <el-card>
                                                        <p>处理結果：{{ DisputeProgressDetail.solveResult.solveRresult }}</p>
                                                        <p>处理意见：{{ DisputeProgressDetail.solveResult.solveContent }}</p>
                                                    </el-card>
                                                </el-timeline-item>
                                            </div>
                                        </el-timeline>
                                    </div>
                                </div>
                            </el-card>
                            <el-button
                                type="primary"
                                size="mini"
                                v-if="showType !== 'view'"
                                @click="changeShowAdjudication()"
                            >做出裁决</el-button>
                            <el-divider></el-divider>
                            <el-card
                                class="box-card"
                                v-if="isShowAdjudication"
                            >
                                <div
                                    slot="header"
                                    class="clearfix"
                                >
                                    <span>做出裁决</span>
                                </div>
                                <div class="text item">
                                    <el-form
                                        ref="form"
                                        :model="disposeIdea"
                                        label-width="150px"
                                    >
                                        <el-form-item label="平台处理方案：">
                                            <el-select
                                                v-model="disposeIdea.reportSolveWay"
                                                placeholder="平台处理方案"
                                            >
                                                <el-option
                                                    v-for="(item,i) in disposeIdeaResultList"
                                                    :label="item.label"
                                                    :value="item.value"
                                                    :key="i"
                                                ></el-option>
                                            </el-select>
                                        </el-form-item>
                                    </el-form>
                                    <div
                                        class="refund_price"
                                        v-if="showReturnMoney"
                                    >
                                        <p>退款金额：{{sheetDetail.money}}</p>
                                    </div>
                                    <el-form
                                        ref="form"
                                        :model="disposeIdea"
                                        label-width="150px"
                                        class="form_width"
                                    >
                                        <el-form-item label="平台处理意见：">
                                            <el-input
                                                type="textarea"
                                                v-model="disposeIdea.platOpinion"
                                                placeholder="请输入处理意见、处理方案内容以及处理依据"
                                                :autosize="{ minRows: 4, maxRows: 8}"
                                            ></el-input>
                                        </el-form-item>
                                        <el-form-item label="涉及商家惩罚：">
                                            <label>信誉分（商家）：</label>
                                            <el-checkbox
                                                v-model="disposeIdea.isShopCaseDepositSub"
                                                class="mt10"
                                            >减少</el-checkbox>
                                            <el-input
                                                :disabled="!disposeIdea.isShopCaseDepositSub"
                                                v-model="disposeIdea.shopScore"
                                                placeholder="减少信誉分(商家)"
                                                @focus="reputationWinOpen = true;"
                                            >
                                            </el-input>
                                            <label>保证金（商家）：</label>
                                            <el-checkbox
                                                v-model="disposeIdea.isShopCreditScoreSub"
                                                class="mt10"
                                            >减少</el-checkbox>
                                            <el-input
                                                :disabled="!disposeIdea.isShopCreditScoreSub"
                                                v-model="disposeIdea.shopMoney"
                                                type="number"
                                                placeholder="扣除保证金(商家)"
                                                class="mt10"
                                            ></el-input>
                                            <!--<p class="mt10">
                                                <el-checkbox
                                                    v-model="disposeIdea.shopFreeze"
                                                    class="mt10"
                                                >是否冻结账号(选择冻结时间)：</el-checkbox>
                                                <el-date-picker
                                                    v-model="form.date1"
                                                    :disabled="!disposeIdea.shopFreeze"
                                                    type="datetimerange"
                                                    value-format="yyyy-MM-dd HH:mm:ss"
                                                    range-separator="至"
                                                    start-placeholder="开始日期"
                                                    end-placeholder="结束日期"
                                                >
                                                </el-date-picker>
                                            </p>-->
                                        </el-form-item>
                                        <el-form-item label="涉及用户惩罚：">
                                            <label>满意豆（用户）：</label>
                                            <el-checkbox
                                                v-model="disposeIdea.isUserBeansSub"
                                                class="mt10"
                                            >减少</el-checkbox>
                                            <el-input
                                                :disabled="!disposeIdea.isUserBeansSub"
                                                type="number"
                                                v-model="disposeIdea.userBeans"
                                                placeholder="减少满意豆(用户)"
                                            ></el-input>

                                            <!--<label>会员等级：</label>
                                            <el-checkbox
                                                v-model="disposeIdea.isUserGradeSub"
                                                class="mt10"
                                            >降级</el-checkbox>
                                            <el-input
                                                :disabled="!disposeIdea.isUserGradeSub"
                                                v-model="disposeIdea.userRank"
                                                placeholder="降级会员等级(用户)"
                                                class="mt10"
                                            ></el-input>-->
                                            <!--<p class="mt10">
                                                <el-checkbox
                                                    v-model="disposeIdea.userFreeze"
                                                    class="mt10"
                                                >是否冻结账号(选择冻结时间)：</el-checkbox>
                                                <el-date-picker
                                                    v-model="form.date2"
                                                    :disabled="!disposeIdea.userFreeze"
                                                    type="datetimerange"
                                                    value-format="yyyy-MM-dd HH:mm:ss"
                                                    range-separator="至"
                                                    start-placeholder="开始日期"
                                                    end-placeholder="结束日期"
                                                >
                                                </el-date-picker>
                                            </p>-->
                                        </el-form-item>
                                    </el-form>
                                </div>
                            </el-card>

                            <el-form-item
                                label="处理人意见："
                                class="mt20"
                                v-if="showType !== 'view'"
                            >
                                <el-input
                                    type="textarea"
                                    v-model="disposeIdea.solveOpinion"
                                    :autosize="{ minRows: 4, maxRows: 8}"
                                ></el-input>
                            </el-form-item>
                            <el-form-item
                                label=""
                                class="mt20"
                            >
                                <p
                                    class="mt10 tr"
                                    v-if="showType !== 'view'"
                                >
                                    <el-button
                                        type=""
                                        @click="chanegeShowTurnSelect()"
                                    >{{showTurnSelect ? '取消' : '流转'}}</el-button>
                                </p>
                            </el-form-item>
                            <el-form-item
                                label="选择流转人："
                                v-if="showTurnSelect"
                            >
                                <div class="block">
                                    <el-cascader
                                        :options="dptUserCascaderData"
                                        @change="handleChangeDptUser"
                                    ></el-cascader>
                                </div>
                            </el-form-item>
                            <el-form-item
                                label=""
                                class="mt20"
                            >
                                <p class="mt10 tr">
                                    <el-button
                                        type=""
                                        size=""
                                        @click="back"
                                    >返回</el-button>
                                    <el-button
                                        type="primary"
                                        v-if="isShowAdjudication"
                                        @click="submitDispose()"
                                    >提交裁决</el-button>
                                    <el-button
                                        type="primary"
                                        v-if="showTurnSelect"
                                        @click="submitTurnSelect()"
                                    >提交流转</el-button>
                                </p>
                            </el-form-item>

                            <el-button
                                type="primary"
                                size="mini"
                                v-if="sheetDetail.status === '待回访' && showType === 'deal'"
                                @click="changePayVisit()"
                            >回访</el-button>
                            <!--回访开始-->
                            <el-card
                                class="box-card"
                                v-if="isPayVisit"
                            >
                                <el-form-item label="回访人：">
                                    <el-radio-group v-model="visitData.backPersonInt">
                                        <el-radio :label="1">发起人</el-radio>
                                        <el-radio :label="2">纠纷用户</el-radio>
                                    </el-radio-group>
                                </el-form-item>
                                <el-form-item label="回访内容记录：">
                                    <el-input
                                        type="textarea"
                                        v-model="visitData.backVisit"
                                        :autosize="{ minRows: 4, maxRows: 8}"
                                    ></el-input>
                                </el-form-item>
                                <el-form-item label="反馈内容记录：">
                                    <el-input
                                        type="textarea"
                                        v-model="visitData.backInfo"
                                        :autosize="{ minRows: 4, maxRows: 8}"
                                    ></el-input>
                                </el-form-item>
                                <el-form-item label="满意度：">
                                    <el-select
                                        v-model="visitData.satisfactionDegreeInt"
                                        placeholder="请选择"
                                    >
                                        <el-option
                                            v-for="item in visitOption"
                                            :key="item.value"
                                            :label="item.text"
                                            :value="item.value"
                                        >
                                        </el-option>
                                    </el-select>
                                </el-form-item>

                                <div class="tr">
                                    <el-button
                                        type=""
                                        size=""
                                        @click="back"
                                    >返回</el-button>
                                    <el-button
                                        type="primary"
                                        @click="payVisit"
                                    >提交回访</el-button>
                                    <!--<el-button type="primary" @click="submit">完成</el-button>-->
                                </div>
                            </el-card>
                            <!-- 回访结束 -->

                        </el-form>
                    </div>
                </div>
            </el-card>

            <!--增加沟通记录内容-->
            <el-drawer
                title="增加沟通记录"
                :visible.sync="drawer"
                :direction="direction"
            >
                <div class="demo-drawer__content">
                    <el-form
                        ref="form"
                        :model="form"
                        label-width="100px"
                    >
                        <el-form-item label="沟通对象：">
                            <el-radio-group v-model="record.obj">
                                <el-radio :label="1">卖家</el-radio>
                                <el-radio :label="2">买家</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="沟通方式：">
                            <el-select
                                v-model="record.type"
                                placeholder="请选择沟通方式"
                            >
                                <el-option
                                    v-for="(item,i) in modeTypeOptions"
                                    :label="item.label"
                                    :value="item.value"
                                    :key="i"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                        <!--<el-form-item label="沟通时间：">
                            {{new Date}}
                        </el-form-item>-->
                        <el-form-item label="沟通内容：">
                            <el-input
                                type="textarea"
                                v-model="record.desc"
                                :autosize="{ minRows: 4, maxRows: 8}"
                            ></el-input>
                        </el-form-item>
                    </el-form>
                    <div class="tr pr10">
                        <el-button @click="drawer = false">取 消</el-button>
                        <el-button
                            type="primary"
                            @click="submitRecord()"
                        >确 定</el-button>
                    </div>
                </div>
            </el-drawer>

        </div>

    </div>
</template>

<script>

// 提交回访
import finishedVisit from '../../api/sheet/finishedVisit'
// 提交裁决
import sheetDetail from '../../api/sheet/sheetDetail'
// 增加沟通记录
import addInformations from '../../api/sheet/addInformations'
//获取部门成员
import getDptUserTree from '../../api/user/getDptUserTree'
import csServiceFinishedProcess from '../../api/sheet/csServiceFinishedProcess'
import csServiceSelectSheetInfo from '../../api/sheet/csServiceSelectSheetInfo'
import CsServiceFinishedDispute from '../../api/sheet/CsServiceFinishedDispute'
import GetDisputeProgress from '../../api/sheet/GetDisputeProgress'
import ReputationScore from './deductReputationScore'

import headTop from '../../components/headTop'
export default {
    components: {
        headTop,
        ReputationScore
    },
    data() {
        return {
            drawer: false,//抽屉是否显示
            direction: 'rtl',//抽屉显示位置
            isShowAdjudication: false,//是否做出裁决
            isPayVisit: false,
            visitOption: [
                { text: "非常满意", value: 1 },
                { text: "满意", value: 2 },
                { text: "一般", value: 3 },
                { text: "不满意", value: 4 },
            ],
            visitData: {
                backInfo: '', //反馈信息
                backPersonInt: 1,//回访人 发起人1,纠纷用户2 ,
                backVisit: '',//回访内容 ,
                satisfactionDegreeInt: 1//满意度评价 '非常满意1','满意2','一般3','不满意4' ,
            },
            form: {
                name: '',
                region: '',
                desc: '',
                input: '',
                radio: '',
                start: '',
                end: '',
                date1: [],
                date2: []
            },

            options: [
                {
                    value: 0,
                    label: '填写资料'
                }, {
                    value: 1,
                    label: '补充资料'
                },
                {
                    value: 2,
                    label: '举证'
                }, {
                    value: 3,
                    label: '电话'
                }, {
                    value: 4,
                    label: '邮箱'
                }, {
                    value: 5,
                    label: '微信'
                }, {
                    value: 6,
                    label: 'QQ'
                }, {
                    value: 7,
                    label: '短信'
                }, {
                    value: 8,
                    label: '面谈'
                }, {
                    value: 9,
                    label: '其它'
                }
            ],
            sheetId: this.$route.params.id ? this.$route.params.id : '',
            showType: this.$route.query.type,
            sheetDetail: {}, //工单详情
            sheetInfo: [], //资料记录
            DisputeProgressDetail: {}, // 订单详情
            disposeIdeaResultList: [
                {
                    value: 'RejectDispute',
                    label: '驳回纠纷'
                }, {
                    value: 'ShopRefund',
                    label: '商家退款'
                }, {
                    value: 'ContinueFlow',
                    label: '继续退单流程'
                },
            ], // 处理方式
            subTypeCode: '',//纠纷类型
            sheetRecoredDetail: {}, //沟通记录
            record: {
                sheetId: this.sheetId,
                obj: 1, // 商家1,用户2
                type: 1, // 补充资料1,举证2,电话3,邮箱4,微信5,qq6,其他7
                desc: '', // 沟通内容
            },
            modeTypeOptions: [{
                value: 1,
                label: '补充资料'
            }, {
                value: 2,
                label: '举证'
            }, {
                value: 3,
                label: '电话'
            }, {
                value: 4,
                label: '邮箱'
            }, {
                value: 5,
                label: '微信'
            }, {
                value: 6,
                label: 'QQ'
            }, {
                value: 7,
                label: '短信'
            }, {
                value: 8,
                label: '面谈'
            }, {
                value: 9,
                label: '其它'
            }], //沟通方式 列表
            disposeIdea: {
                isShopCreditScoreSub: false,
                isShopCaseDepositSub: false,
                isUserBeansSub: false,
                isUserGradeSub: false,

                platOpinion: '', // 平台处理意见
                reportSolveWay: '', // 平台处理方式
                platOpinion: '', // 处理方式
                shopFreeze: false, // 是否冻结商家账号
                shopFreezeEndTime: '', // 冻结商家账号结束时间
                shopFreezeStartTime: '', // 冻结商家账号开始时间
                shopMoney: '', // 商家保证金 整数
                shopScore: '', // 商家信誉分
                solveOpinion: '', // 处理人意见
                userBeans: '', // 用户满意豆
                userFreeze: false, // 是否冻结用户账号
                userFreezeEndTime: '', // 冻结用户账号结束时间
                userFreezeStartTime: '', // 冻结用户账号开始时间
                userRank: '', // 用户会员等级
            }, //裁决提交数据
            showReturnMoney: false, // 是否显示修改退款金额
            showTurnSelect: false, //是否流转
            postData: { // 要提交的数据
                selectNextPersonId: '', // 下一个处理人ID
                selectNextPerson: '', // 下一个处理人
                selectNextPersonDept: '', // 下一个处理人部门
                selectNextPersonDeptId: '', // 下一个处理人部门Id
                payVisitContent: '', // 回访内容
                payVisitFeedback: '', //反馈内容
                satisfaction: 'GENERAL', // 满意度
                reportSolveWay: 'NotDeal', // NotDeal流转 WaitComplate待补充资料 PlatformJudge平台裁决
            },
            dptUserCascaderData: [], // 部门人员列表
            sysCode: {
                sysCode: "Customer"
            },
            returnVisit: {
                orId: this.sheetId,
                shopVistitRecord: 'returnVisit.visitContent', //商家回访内容记录
                shopBackRecord: 'returnVisit.feedbackContent',//商家反馈内容记录
                shopSatisfactionDegree: 'returnVisit.satisfied',//商家满意度
                buyerVistitRecord: 'returnVisit.visitContent222',
                buyerBackRecord: 'returnVisit.feedbackContent222',
                buyerSatisfactionDegree: 'returnVisit.satisfied222'
            },
            activeOpt: 0, //激活
            optOptions: ['受理', '流转回客服部', '回访', '处理完成'], //流转

            reputationWinOpen: false,
            reputationSelectResult: {
                selectId: '',
                selectScore: ''
            }
        }
    },
    watch: {
        reportSolveWay(newVal, oldVal) {
            // 如果选择的是商家退款
            if ('ShopRefund' === newVal) {
                this.showReturnMoney = true;
            } else {
                this.showReturnMoney = false;
            }
        },
        showTurnSelect(newVal, oldVal) {
            //选择流转
            this.postData.selectNextPersonId = ''; // 下一个处理人ID
            this.postData.selectNextPerson = ''; // 下一个处理人
            this.postData.selectNextPersonDept = ''; // 下一个处理人部门
            this.postData.selectNextPersonDeptId = '';// 下一个处理人部门Id
        },
        reputationSelectResult(newValue, oldValue) {
            console.log('newValue ===>>> ', newValue)
            this.disposeIdea.shopScore = newValue.selectScore;
        }
    },
    computed: {
        sheetData() {
            return this.$store.state.sheetData
        },
        reportSolveWay() {
            return this.disposeIdea.reportSolveWay
        }
    },

    methods: {
        changePayVisit() {
            this.isPayVisit = !this.isPayVisit;
        },
        /**
         *  根据value 获取 text
         */
        getTypeValueText(type, value) {
            // console.log(this.sheetData[type].find(n => n.value === value), type, value , 'this.sheetData[type].find(n => n.value === value)');
            let _typeData = this.sheetData[type].find(n => n.value === value);
            return _typeData ? _typeData.text : '';
        },
        getProofRoleDesc(val) {
            let _desc = '';
            this.options.map(item => {
                if (item.value === val) {
                    _desc = item.label;
                }
            });
            return _desc;
        },
        changeShowAdjudication() {
            this.isShowAdjudication = !this.isShowAdjudication;
        },
        queryDetail() {
            sheetDetail.call(this, { sheetId: this.sheetId }).then(res => {
                if (res.Code === 1) {
                    this.sheetDetail = res.Data.sheetDetail;
                    this.conProgress(res.Data.sheetFlow);
                    let _sheetInfo = res.Data.sheetInfo;
                    _sheetInfo.forEach(n => {
                        n.picArr = n.pics ? n.pics.split(',') : [];
                    });
                    this.sheetInfo = _sheetInfo;
                    console.log(_sheetInfo, 'this.sheetInfo');
                } else {
                    this.$message.error('系统异常');
                }
            });
        },
        //查询交易纠纷进度
        GetDisputeProgress() {
            GetDisputeProgress.call(this, { sheetId: this.sheetId }).then(res => {
                if (res.Code === 1) {
                    this.DisputeProgressDetail = res.Data;
                } else {
                    this.$message.error('系统异常');
                }
            });
        },
        // 构造进度条
        conProgress(pg) {
            let opt = new Array();
            opt.push('受理');
            pg.forEach((n, idx) => {
                if (idx === 0) {
                    opt.push(`流转到${n.oprDept}(${n.oprUser})`);
                } else {
                    if (opt[opt.length - 1] !== `流转到${n.oprDept}(${n.oprUser})`) {
                        opt.push(`流转到${n.oprDept}(${n.oprUser})`);
                    }
                }
            });
            if (this.sheetDetail.status === '待受理') {
                this.activeOpt = 1;
                opt.push('回访');
                opt.push('处理完成');
            } else if (this.sheetDetail.status === '待回访') {
                this.activeOpt = opt.length + 1;
                opt.push('回访');
                opt.push('处理完成');
            } else if (this.sheetDetail.status === '已完成' || this.sheetDetail.status === '已撤销') {
                this.activeOpt = opt.length + 2;
                opt.push('回访');
                opt.push('处理完成');
            } else {
                this.activeOpt = opt.length + 1;
                opt.push('流转回客服部');
                opt.push('回访');
                opt.push('处理完成');
            }
            this.optOptions = opt;
        },
        /**
         * 提交沟通
         */
        submitRecord() {
            this.$confirm('确定要提交沟通记录吗？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.record.sheetId = this.sheetId;
                addInformations.call(this, this.record).then(res => {
                    if (res.Code === 1) {
                        this.drawer = false;
                        this.record.desc = '';
                        this.record.obj = 1;
                        this.record.type = 1;
                        this.csServiceSelectSheetInfo();
                    } else {
                        this.$message.error('沟通记录添加失败');
                    }
                });
            })
        },
        //查询该工单相关的资料信息(包括填写资料、补充资料、举证资料、沟通记录
        csServiceSelectSheetInfo() {
            csServiceSelectSheetInfo.call(this, { id: this.sheetId }).then(res => {
                if (res.Code === 1) {
                    console.log(res.Data, 'csServiceSelectSheetInfo');
                    /*this.sheetInfoList = res.Data;
                    this.sheetInfoList.forEach(n => {
                        n.picArr = n.pics ? n.pics.split(',') : [];
                    });*/
                    let _sheetInfo = res.Data;
                    _sheetInfo.forEach(n => {
                        n.picArr = n.pics ? n.pics.split(',') : [];
                    });
                    this.sheetInfo = _sheetInfo;
                } else {
                    this.$message.error('资料信息获取失败')
                }
            });
        },
        /**
         * 改变是否流转
         */
        chanegeShowTurnSelect() {
            this.showTurnSelect = !this.showTurnSelect;
            if (this.showTurnSelect && this.dptUserCascaderData.length === 0) {
                this.getDptUserTree();
            }
        },
        /**
         * 获取流转部门人员
         */
        getDptUserTree() {
            getDptUserTree.call(this, this.sysCode).then(res => {
                if (res.code === '0000') {
                    let dptUserTree = res.data.list;
                    this.dptUserCascaderData = this.getDptUserCascaderData(dptUserTree);
                    console.log(this.dptUserCascaderData, '++++this.dptUserCascaderData++++');
                }
            });
        },
        //组装人员
        getDptUserCascaderData(dptUserTree) {
            let dptUserCascaderData = dptUserTree.map(dept => {
                return {
                    value: dept.id,
                    label: `${dept.name}(${dept.cityName})`,
                    children: dept.userList.map(u => {
                        return {
                            value: u.id,
                            label: u.rel_name
                        }
                    }) || []
                }
            })
            return dptUserCascaderData;
        },
        //改变流转人
        handleChangeDptUser(val) {
            console.log(val, '选择人员');
            if (val.length === 2) {
                this.postData.selectNextPersonDeptId = val[0];
                this.postData.selectNextPersonId = val[1];
                let _dept = '';
                let _person = '';
                this.dptUserCascaderData.map(item => {
                    if (item.value === val[0]) {
                        _dept = item.label;
                    }
                    item.children.map(it => {
                        if (it.value === val[1]) {
                            _person = it.label;
                        }
                    });
                });
                this.postData.selectNextPersonDept = _dept;
                this.postData.selectNextPerson = _person;

                // console.log(this.postData, '人员');
            }
        },
        back() {
            // this.props.history.go(-1);//.push("/workList");
            // this.$router.push({ path: '/workList' });
            this.$router.go(-1);
        },
        /**
         * 提交流转
         */
        submitTurnSelect() {
            this.$confirm('确定要提交流转吗？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                if (!this.postData.selectNextPersonId || this.postData.selectNextPersonId === '') {
                    this.$message.warning('请选择下一个处理人');
                    return;
                }
                let _assignVo = {
                    orId: this.sheetId,
                    content: this.disposeIdea.solveOpinion,
                    reportSolveWay: 'NotDeal',
                    orHandleId: this.postData.selectNextPersonId, // 下一个处理人ID
                    orHandle: this.postData.selectNextPerson, // 下一个处理人
                    orHandleDept: this.postData.selectNextPersonDept, // 下一个处理人部门
                    orHandleDeptId: this.postData.selectNextPersonDeptId, // 下一个处理人部门Id
                };
                console.log(_assignVo, '_assignVo+++++++');
                // return;
                csServiceFinishedProcess.call(this, _assignVo).then(res => {
                    if (res.Code === 1) {
                        this.back();
                        this.$message.success("流转成功");
                    } else {
                        this.$message.error("流转失败");
                    }
                });
            });
        },
        /**
         * 提交裁决
         */
        submitDispose() {
            this.$confirm('确定要提交裁决吗？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.disposeIdea.sheetId = this.sheetId;
                /*if (this.disposeIdea.shopFreeze) {
                    //商家冻结
                    if (!this.form.date1 || this.form.date1.length <= 0) {
                        this.$message.warning('请选择商家冻结时间')
                    }
                    this.disposeIdea.shopFreezeStartTime = this.form.date1[0];
                    this.disposeIdea.shopFreezeEndTime = this.form.date1[1];
                }*/
                /*if (this.disposeIdea.userFreeze) {
                    //商家冻结
                    if (!this.form.date2 || this.form.date2.length <= 0) {
                        this.$message.warning('请选择用户冻结时间')
                    }
                    this.disposeIdea.userFreezeStartTime = this.form.date2[0];
                    this.disposeIdea.userFreezeEndTime = this.form.date2[1];
                }*/
                let _disposeIdea = JSON.parse(JSON.stringify(this.disposeIdea));
                if (_disposeIdea.isShopCaseDepositSub) {
                    //信誉分惩罚 勾选
                    if (!this.reputationSelectResult.selectId) {
                        this.$message.warning('请勾选信誉分惩罚！');
                        return;
                    }
                    _disposeIdea.plotId = this.reputationSelectResult.selectId;
                } else {
                    _disposeIdea.shopScore = '';
                }

                if (_disposeIdea.isShopCreditScoreSub) {
                    //商家保证金
                    if (!_disposeIdea.shopMoney) {
                        this.$message.warning('请输入要扣除商家保证金！');
                        return;
                    }
                } else {
                    _disposeIdea.shopMoney = '';
                }

                if (_disposeIdea.isUserBeansSub) {
                    //用户满意豆
                    if (!_disposeIdea.userBeans) {
                        this.$message.warning('请输入要扣除用户满意豆！');
                        return;
                    }
                } else {
                    _disposeIdea.userBeans = '';
                }

                /*if (_disposeIdea.isUserGradeSub) {
                    //用户等级
                }else {
                    _disposeIdea.userRank = '';
                }*/

                console.log(_disposeIdea, '_disposeIdea');
                CsServiceFinishedDispute.call(this, _disposeIdea).then(res => {
                    if (res.Code == 1) {
                        this.back();
                        this.$message.success("裁决成功");
                    } else {
                        this.$message.error(res.Desc);
                    }
                });
            })
        },
        /**
         * 提交回访
         */
        payVisit() {
            this.$confirm('确定要提交回访吗？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                console.log(this.visitData, 'visitData');
                if (!this.visitData.backVisit) {
                    this.$message.warning('请输入回访内容');
                    return;
                }
                if (!this.visitData.backInfo) {
                    this.$message.warning('请输入回访内容');
                    return;
                }
                this.visitData.sheetId = this.sheetId;
                finishedVisit.call(this, this.visitData).then(res => {
                    if (res.Code == 1) {
                        this.$message.success("回访成功");
                        this.back();
                    } else {
                        this.$message.error(res.desc);
                    }
                });
            });
        },
        selectCallback(selectResult) {
            console.log('selectResult ===>>>', selectResult);
            this.reputationSelectResult = selectResult;
            this.disposeIdea.shopScore = selectResult.selectScore;
        },
        goGoodsDetail(goodsId) {
            this.$router.push({ path: `/affairGoodsInfoManagementDetail/${goodsId}` });
        }
    },
    created() {
        // console.log(this.sheetId, this.record, "sheetId +++ record");
        this.queryDetail();
        this.GetDisputeProgress();
    }
}
</script>

<style lang="less" scoped>
.box-card {
    margin-bottom: 20px;
}
.viewer_img {
    margin: 5px 0;
    img {
        width: 50px;
        height: 50px;
    }
}

.refund_price {
    padding-left: 150px;
    margin-bottom: 20px;
    .el-input {
        width: 220px !important;
    }
    .el-radio {
        margin-right: 10px;
    }
}
.demo-drawer__content {
    padding-right: 20px;
}
.goods-info {
    width: 100%;
    div {
        display: inline-block;
    }
    .goods-img {
        width: 100px;
        img {
            width: 100px;
        }
    }
}
</style>
