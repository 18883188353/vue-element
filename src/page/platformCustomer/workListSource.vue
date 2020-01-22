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
                    <span>工单详情：</span>
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
                            <!--<el-step title="受理" description=""></el-step>
                            <el-step title="流转到产品部XXX" description=""></el-step>
                            <el-step title="流转回客服部" description=""></el-step>
                            <el-step title="回访" description=""></el-step>
                            <el-step title="处理完成" description=""></el-step>-->
                        </el-steps>
                    </div>
                    <div
                        class="mt20"
                        style="padding: 0 10%"
                    >
                        <el-form
                            label-width="160px"
                            :model="form"
                        >
                            <el-form-item label="工单来源：">{{sheetDetail.source}}</el-form-item>
                            <el-form-item label="工单编号：">{{sheetDetail.sheetNo ? sheetDetail.sheetNo : '-'}}</el-form-item>
                            <el-form-item label="创建时间：">{{sheetDetail.createTime  ? sheetDetail.createTime  : '-'}}</el-form-item>
                            <el-form-item label="工单类型：">{{sheetDetail.sheetType}}</el-form-item>
                            <el-form-item :label="sheetDetail.sheetType + `说明：`">{{sheetDetail.sheetTypeSon}}</el-form-item>
                            <el-form-item label="紧急程度：">{{getTypeValueText('EmergencyLevelData', sheetDetail.emergencyLevel)}}</el-form-item>
                            <!--<el-form-item label="发起人姓名：">{{sheetDetail.cusName}}</el-form-item>
                            <el-form-item label="发起人电话：">{{sheetDetail.cusPhone}}</el-form-item>-->
                            <!--<el-form-item v-if="isYHJY_JC" label="QQ：">{{overrEmptyString(sheetDetail.cusQQ)}}</el-form-item>-->
                            <!--<el-form-item v-if="isYHJY_JC" label="邮箱：">{{overrEmptyString(sheetDetail.cusEmail)}}</el-form-item>-->
                            <el-form-item label="工单状态：">{{sheetDetail.status}}</el-form-item>
                            <el-form-item
                                v-if="sheetDetail.reportObj"
                                :label="sheetDetail.sheetType + '发起：'"
                            >{{sheetDetail.reportObj  }}</el-form-item>
                            <el-form-item
                                v-if="sheetDetail.reportObjType"
                                :label="sheetDetail.sheetType + '类型：'"
                            >{{sheetDetail.reportObjType  }}</el-form-item>
                            <el-form-item
                                v-if="sheetDetail.contactNum"
                                :label="sheetDetail.sheetType + '发起电话：'"
                            >{{sheetDetail.contactNum }}</el-form-item>
                            <el-form-item
                                v-if="sheetDetail.beReportArticle"
                                label="相关商品："
                            >{{sheetDetail.beReportArticle }}</el-form-item>
                            <el-form-item
                                v-if="sheetDetail.beReportUser"
                                :label="`被`+sheetDetail.sheetType+`人：`"
                            >{{sheetDetail.beReportUser }}</el-form-item>
                            <el-form-item
                                v-if="sheetDetail.beReportShop"
                                :label="`被`+sheetDetail.sheetType+`商家：`"
                            >{{overrEmptyString(sheetDetail.beReportShop) }}</el-form-item>
                            <el-form-item
                                v-if="sheetDetail.beContactNum"
                                :label="`被`+sheetDetail.sheetType+`电话：`"
                            >{{sheetDetail.beContactNum }}</el-form-item>
                            <el-form-item
                                label="详细描述："
                                v-if="sheetInfoList"
                            >
                                <ul>
                                    <li v-for="item in sheetInfoList">
                                        <label>类型：</label> {{getProofRoleDesc(item.isProofdata)}}
                                        <el-input
                                            type="textarea"
                                            disabled
                                            :autosize="{ minRows: 4, maxRows: 8}"
                                            :value="item.desc"
                                        ></el-input>
                                        <div
                                            class="viewer_img"
                                            v-if="item.pics"
                                        >
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
                                    </li>
                                </ul>
                            </el-form-item>
                            <!--<el-form-item label="附件详情：" v-if="sheetDetail.pics">
                                <div class="viewer_img">
                                    <viewer>
                                        <img :src="item" :key="i" v-for="(item,i) in sheetDetail.picArr" alt="">
                                        &lt;!&ndash;<img src="https://picsum.photos/200" alt="">
                                        <img src="https://picsum.photos/200" alt="">&ndash;&gt;
                                    </viewer>
                                </div>
                            </el-form-item>-->

                            <el-form-item
                                label="历史意见："
                                v-if="sheetMsgList && sheetMsgList.length > 0"
                            >
                                <ul>
                                    <li v-for="item in sheetMsgList">
                                        <label>工单处理人《 {{(item.oprDept ? item.oprDept : '') + ' - ' + item.oprUser}} 》处理意见：</label>
                                        <el-input
                                            type="textarea"
                                            disabled
                                            :autosize="{ minRows: 4, maxRows: 8}"
                                            :value="item.descr"
                                        ></el-input>
                                        <div
                                            class="viewer_img"
                                            v-if="item.pics"
                                        >
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
                                    </li>
                                </ul>
                            </el-form-item>

                            <div v-if="sheetDetail.status !== '待回访' && showType === 'deal' ">
                                <!--<el-form-item label="工单内容：">
                                    <el-input type="textarea" v-model="form.desc" :autosize="{ minRows: 4, maxRows: 8}"></el-input>
                                </el-form-item>-->
                                <el-form-item label="平台处理方案：">
                                    <el-select
                                        v-model="postData.reportSolveWay"
                                        placeholder="平台处理方案"
                                        :disabled="showTurnSelect"
                                    >
                                        <el-option
                                            v-for="(item,i) in disposeIdeaResultList"
                                            :label="item.label"
                                            :value="item.value"
                                            :disabled="item.disabled"
                                            :key="i"
                                        ></el-option>
                                    </el-select>
                                </el-form-item>

                                <el-form-item label="处理人意见：">
                                    <el-input
                                        type="textarea"
                                        v-model="postData.disposeContent"
                                        :autosize="{ minRows: 4, maxRows: 8}"
                                    ></el-input>
                                    <p class="mt10 tr">
                                        <!-- <el-button type="primary">处理完成</el-button>-->
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

                                <div v-if="sheetDetail.status !== '已完成' && !showTurnSelect && postData.reportSolveWay === 'PlatformJudge'">
                                    <el-form-item
                                        label="纠错用户奖励："
                                        v-if="sheetDetail.sheetType === '纠错'"
                                    >
                                        <!--<el-radio v-model="form.radio" label="1">增加</el-radio>-->
                                        <el-input
                                            v-model="addOrSubNumber.reward"
                                            type="text"
                                            placeholder="增加满意豆(用户)数量"
                                            clearable
                                            width="100"
                                            @input="notZero('reward')"
                                        ></el-input>
                                    </el-form-item>
                                    <el-form-item
                                        :label="`${sheetDetail.sheetType}用户奖励：`"
                                        v-if="(sheetDetail.sheetType === '举报' || sheetDetail.sheetType === '投诉') && sheetDetail.objType === 'Buyer'"
                                    >
                                        <el-input
                                            v-model="addOrSubNumber.reward"
                                            type="text"
                                            placeholder="增加满意豆(用户)数量"
                                            clearable
                                            width="100"
                                            @input="notZero('reward')"
                                        ></el-input>
                                    </el-form-item>
                                    <!--<el-form-item
                                        :label="`${sheetDetail.sheetType}商家奖励：`"
                                        v-if="(sheetDetail.sheetType === '举报' || sheetDetail.sheetType === '投诉') && sheetDetail.objType === 'Shop'"
                                    >
                                        <el-input
                                            v-model="addOrSubNumber.reward"
                                            type="text"
                                            placeholder="增加信誉分"
                                            clearable
                                            width="100"
                                            @input="notZero('reward')"
                                        ></el-input>
                                    </el-form-item>-->
                                    <el-form-item
                                        :label="`被${sheetDetail.sheetType}商家惩罚：`"
                                        v-if="(sheetDetail.sheetType === '举报' || sheetDetail.sheetType === '投诉') && (sheetDetail.beReportShop || sheetDetail.beReportArticle )"
                                    >
                                        <el-input
                                            v-model="addOrSubNumber.punish1"
                                            type="text"
                                            placeholder="减少信誉分(商家)"
                                            clearable
                                            width="100"
                                            class="mt10"
                                            @input="notZero('punish1')"
                                            @focus="reputationWinOpen = true;"
                                            @clear="selectClearPlotDesc"
                                        >
                                            <i
                                                slot="prefix"
                                                class="el-input__icon el-icon-s-opportunity select-icon"
                                            ></i>
                                        </el-input>
                                        <el-input
                                            v-model="addOrSubNumber.punish2"
                                            type="text"
                                            placeholder="扣除保证金(商家)"
                                            clearable
                                            width="100"
                                            class="mt10"
                                            @input="notZero('punish2')"
                                        ></el-input>
                                    </el-form-item>
                                    <el-form-item
                                        :label="`被${sheetDetail.sheetType}用户惩罚：`"
                                        v-if="(sheetDetail.sheetType === '举报' || sheetDetail.sheetType === '投诉') && sheetDetail.beReportUser"
                                    >
                                        <el-input
                                            v-model="addOrSubNumber.punish1"
                                            type="text"
                                            placeholder="减少满意豆数量"
                                            clearable
                                            width="100"
                                            @input="notZero('punish1')"
                                        ></el-input>
                                        <!--<el-input v-model="addOrSubNumber.punish2" type="number" placeholder="降级会员等级(请输入降级数，如”1“为降一级)" clearable width="100" class="mt10"></el-input>-->
                                    </el-form-item>
                                    <el-form-item
                                        :label="'建议奖励：'"
                                        v-if="sheetDetail.sheetType === '建议'"
                                    >
                                        <el-input
                                            v-model="addOrSubNumber.reward"
                                            type="text"
                                            :placeholder="sheetDetail.objType == 'Buyer' ? '增加满意豆(用户)数量' : '信誉分增加'"
                                            @blur="checkAddUserBeans"
                                            clearable
                                            width="100"
                                            @input="notZero('reward')"
                                        ></el-input>
                                    </el-form-item>

                                </div>

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
                                            v-if="!showTurnSelect"
                                            @click="submitDispose()"
                                        >提交裁决</el-button>
                                        <el-button
                                            type="primary"
                                            v-if="showTurnSelect"
                                            @click="submitTurnSelect()"
                                        >提交流转</el-button>
                                    </p>
                                </el-form-item>
                            </div>
                            <!--<el-button
                                type="primary"
                                size="mini"
                                v-if="sheetDetail.status === '待回访' && showType === 'deal'"
                                @click="changePayVisit()"
                            >回访</el-button>-->
                            <!--回访开始-->
                            <el-card
                                class="box-card"
                                v-if="sheetDetail.status === '待回访' && showType === 'deal'"
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
                            <div v-if="showType === 'view'">
                                <el-button
                                    type=""
                                    size=""
                                    @click="back"
                                >返回列表</el-button>
                            </div>
                        </el-form>
                    </div>
                </div>
            </el-card>

        </div>

    </div>
</template>

<script>
import headTop from '../../components/headTop'

//获取部门成员
import getDptUserTree from '../../api/user/getDptUserTree'
import finishedVisit from '../../api/sheet/finishedVisit'

import csServiceSelectSheetFlowLog from '../../api/sheet/csServiceSelectSheetFlowLog'
import csServiceSelectSheetInfo from '../../api/sheet/csServiceSelectSheetInfo'
import plantformSelectSheetVisit from '../../api/sheet/plantformSelectSheetVisit'
import csServiceFinishedProcess from '../../api/sheet/csServiceFinishedProcess'
import sheetDetail from '../../api/sheet/sheetDetail'
import SelectPlotDescList from '../../api/businessCredit/reputation/selectPlotDescList';
import GetAllRuleTypeList from '../../api/businessCredit/reputation/getAllRuleTypeList';
import GetAllBehaviorList from '../../api/businessCredit/reputation/getAllBehaviorList';
import ReputationScore from './deductReputationScore'

export default {
    components: {
        headTop,
        ReputationScore
    },
    computed: {
        sheetData() {
            return this.$store.state.sheetData
        },
        /*result() {
            return this.disposeIdea.result
        }*/
    },
    data() {
        return {
            form: {
                desc: '',
                value: '',
            },
            isPayVisit: true,
            visitOption: [
                { text: "非常满意", value: 1 },
                { text: "满意", value: 2 },
                { text: "一般", value: 3 },
                { text: "不满意", value: 4 },
            ],
            //填写资料0,补充资料1,举证2,电话3,邮箱4,微信5,qq6,短信7,面谈8,其他9
            proofRoleOption: [
                {
                    value: 0,
                    label: '填写资料'
                }, {
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
                    label: 'app'
                }, {
                    value: 7,
                    label: '短信'
                }, {
                    value: 8,
                    label: '面谈'
                }, {
                    value: 9,
                    label: '其它'
                },
            ],
            postData: { // 要提交的数据
                disposeContent: '', // 我的处理意见
                selectNextPersonId: '', // 下一个处理人ID
                selectNextPerson: '', // 下一个处理人
                selectNextPersonDept: '', // 下一个处理人部门
                selectNextPersonDeptId: '', // 下一个处理人部门Id
                payVisitContent: '', // 回访内容
                payVisitFeedback: '', //反馈内容
                satisfaction: 'GENERAL', // 满意度
                reportSolveWay: 'PlatformJudge', // NotDeal流转 WaitComplate待补充资料 PlatformJudge平台裁决
            },
            visitData: {
                backInfo: '', //反馈信息
                backPersonInt: 1,//回访人 发起人1,纠纷用户2 ,
                backVisit: '',//回访内容 ,
                satisfactionDegreeInt: 1//满意度评价 '非常满意1','满意2','一般3','不满意4' ,
            },
            showTurnSelect: false, //是否流转
            dptUserCascaderData: [], // 部门人员列表
            sysCode: {
                sysCode: "Customer"
            },
            sheetId: this.$route.params.id ? this.$route.params.id : '',
            showType: this.$route.query.type,
            sheetDetail: {},//工单详情
            sheetMsgList: [], //工单流转信息列表
            sheetInfoList: {}, //工单信息列表
            vistHistory: {}, //访问记录
            activeOpt: 0, //激活
            optOptions: ['受理', '流转回客服部', '回访', '处理完成'], //流转
            isJB: false, //是否举报
            isYHJY_JC: false, //是否是用户建议  或者 用户纠错
            addOrSubNumber: {
                punish1: '',
                punish2: '',
                reward: ''
            },
            disposeIdeaResultList: [
                {
                    value: 'PlatformJudge',
                    label: '平台裁决',
                    disabled: false,
                }, {
                    value: 'WaitComplate',
                    label: '待补充资料',
                    disabled: false,
                }
            ], // 处理方式
            reputationWinOpen: false,
            reputationSelectResult: {
                selectId: '',
                selectScore: ''
            }
        }
    },

    methods: {
        checkAddUserBeans() {
            if (this.sheetDetail.objType == 'Buyer' && this.addOrSubNumber.reward && parseInt(this.addOrSubNumber.reward) < 10) {
                this.addOrSubNumber.reward = '';
                this.$message.warning("建议用户奖励满意豆不能低于10！");
            }
        },
        overrEmptyString(value) {
            return (!value || value === '' || 'null' === value) ? ' - ' : value;
        },
        getTypeValueText(type, value) {
            // console.log(this.sheetData[type].find(n => n.value === value), type, value , 'this.sheetData[type].find(n => n.value === value)');
            let _typeData = this.sheetData[type].find(n => n.value === value);
            return _typeData ? _typeData.text : '';
        },
        getProofRoleDesc(val) {
            let _desc = '';
            this.proofRoleOption.map(item => {
                if (item.value === val) {
                    _desc = item.label;
                }
            });
            return _desc;
        },
        changePayVisit() {
            this.isPayVisit = !this.isPayVisit;
        },
        /**
         * 获取详情
         *
         */
        queryDetail() {
            sheetDetail.call(this, { sheetId: this.sheetId }).then(res => {
                if (res.Code === 1) {
                    //详情
                    let _sheetDetail = res.Data.sheetDetail;
                    this.sheetDetail = _sheetDetail;
                    if (_sheetDetail.sheetType !== '举报' || _sheetDetail.source.indexOf('商家') > -1) {
                        //举报才有 待补充资料  选项
                        this.disposeIdeaResultList[1].disabled = true;
                    }

                    //流程历史
                    this.conProgress(res.Data.sheetFlow);
                    this.sheetMsgList = res.Data.sheetFlow;
                    this.sheetMsgList.forEach(n => {
                        n.picArr = n.pics ? n.pics.split(',') : [];
                    });
                    //信息
                    // this.sheetInfoList = res.Data.sheetInfo;
                    // this.sheetInfoList.forEach(n => {
                    //     n.picArr = n.pics ? n.pics.split(',') : [];
                    // });
                    this.sheetInfoList = res.Data.sheetDetail.infos;
                    this.sheetInfoList.forEach(n => {
                        n.picArr = n.pics ? n.pics.split(',') : [];
                    });
                    console.log(this.sheetDetail, this.sheetMsgList, this.vistHistory, 'sheetDetail');
                } else {
                    this.$message.error('系统异常');
                }
            });
        },
        //查询工单处理流程
        csServiceSelectSheetFlowLog() {
            csServiceSelectSheetFlowLog.call(this, { id: this.sheetId }).then(res => {
                if (res.Code === 1) {
                    console.log(res.Data, '查询工单处理流程');
                    this.conProgress(res.Data);
                    this.sheetMsgList = res.Data;
                    this.sheetMsgList.forEach(n => {
                        n.picArr = n.pics ? n.pics.split(',') : [];
                    });
                } else {
                    this.$message.error('历史获取失败')
                }
            });
        },
        //查询该工单相关的资料信息(包括填写资料、补充资料、举证资料、沟通记录
        csServiceSelectSheetInfo() {
            csServiceSelectSheetInfo.call(this, { id: this.sheetId }).then(res => {
                if (res.Code === 1) {
                    console.log(res.Data, 'csServiceSelectSheetInfo');
                    this.sheetInfoList = res.Data;
                    this.sheetInfoList.forEach(n => {
                        n.picArr = n.pics ? n.pics.split(',') : [];
                    });
                } else {
                    this.$message.error('资料信息获取失败')
                }
            });
        },
        //工单回访记录
        plantformSelectSheetVisit() {
            plantformSelectSheetVisit.call(this, { sheetId: this.sheetId }).then(res => {
                if (res.Code === 1) {
                    console.log(res.Data, 'plantformSelectSheetVisit');
                } else {
                    this.$message.error('回访记录获取失败')
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
                this.activeOpt = 0;
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
        /**
         * 组装数据
         * @param dptUserTree
         * @returns {*}
         */
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
        //改变人员
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
            // this.$router.push({path: '/workList'});
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
                    content: this.postData.disposeContent,
                    reportSolveWay: 'NotDeal',
                    orHandleId: this.postData.selectNextPersonId, // 下一个处理人ID
                    orHandle: this.postData.selectNextPerson, // 下一个处理人
                    orHandleDept: this.postData.selectNextPersonDept, // 下一个处理人部门
                    orHandleDeptId: this.postData.selectNextPersonDeptId, // 下一个处理人部门Id
                };
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
                if (this.postData.disposeContent == undefined || this.postData.disposeContent == '') {
                    this.$message.warning("请填写处理意见！");
                    return;
                }
                let _assignVo = {
                    orId: this.sheetId,
                    content: this.postData.disposeContent,
                    reportSolveWay: this.postData.reportSolveWay,  //裁决
                    plotId: this.reputationSelectResult.selectId
                };
                if (this.postData.reportSolveWay === 'PlatformJudge') {
                    if ((this.sheetDetail.sheetType === '纠错' || this.sheetDetail.sheetType === '建议') && (this.addOrSubNumber.reward == undefined || this.addOrSubNumber.reward == '')) {
                        this.$message.warning(`请填写${this.sheetDetail.sheetType}奖励！`);
                        return;
                    }
                    if ((this.sheetDetail.sheetType === '举报' || this.sheetDetail.sheetType === '投诉')) {
                        if ((this.addOrSubNumber.reward == undefined || this.addOrSubNumber.reward == '') && this.sheetDetail.objType !== 'Shop') {
                            this.$message.warning(`请填写${this.sheetDetail.sheetType}奖励！`);
                            return;
                        }
                        if (this.addOrSubNumber.punish1 == undefined || this.addOrSubNumber.punish1 == '') {
                            this.$message.warning(`请填写${this.sheetDetail.sheetType}处罚！`);
                            console.log('addOrSubNumber.punish1 验证不过');
                            return;
                        }
                        if (!this.sheetDetail.beReportUser && (this.addOrSubNumber.punish2 == undefined || this.addOrSubNumber.punish2 == '')) {
                            this.$message.warning(`请填写${this.sheetDetail.sheetType}处罚！`);
                            console.log('addOrSubNumber.punish2 验证不过');
                            return;
                        }
                    }
                }
                //addOrSubNumber
                for (let key in this.addOrSubNumber) {
                    if (this.addOrSubNumber[key]) {
                        _assignVo[key] = this.addOrSubNumber[key];
                    }
                }
                csServiceFinishedProcess.call(this, _assignVo).then(res => {
                    if (res.Code === 1) {
                        this.$message.success("提交成功");
                        this.back();
                    } else {
                        this.$message.error("提交失败");
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
        inputNumber(key) {
            this.addOrSubNumber[key] = this.$Tool.inputNumber(this.addOrSubNumber[key]);
        },
        notZero(key) {
            this.addOrSubNumber[key] = this.$Tool.inputInteger(this.addOrSubNumber[key]);
        },
        selectClearPlotDesc() {
            this.addOrSubNumber.punish1 = '';
            this.reputationSelectResult.selectId = '';
            this.reputationSelectResult.selectScore = '';
        },
        selectCallback(selectResult) {
            console.log('selectResult ===>>>', selectResult);
            this.reputationSelectResult = selectResult;
            this.addOrSubNumber.punish1 = selectResult.selectScore;
        }

    },
    created() {
        this.queryDetail();
        /*this.csServiceSelectSheetFlowLog();
        this.csServiceSelectSheetInfo();*/
        this.plantformSelectSheetVisit();
    }
}
</script>
<style lang="less" scoped>
.plot-desc-content {
    overflow: auto;
    max-height: 500px;
}
.box-card {
    margin-bottom: 20px;
}
.viewer_img {
    img {
        width: 150px;
        height: 150px;
    }
}
.select-icon {
    cursor: pointer;
    color: blue;
}
</style>
