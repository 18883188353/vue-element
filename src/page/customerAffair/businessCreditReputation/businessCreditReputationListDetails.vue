<template>
    <div class="fillcontain">
        <!--营业执照到期开始-->
        <el-card class="box-card">
            <div slot="header">
                <b class="mr10">商家信用信誉详情</b>
            </div>
            <div class="text item">
                <el-tabs
                    v-model="activeName"
                    type="card"
                    @tab-click="handleClick"
                >

                    <!--商家信用-->
                    <el-tab-pane
                        label="商家信用"
                        name="first"
                    >
                        <ul class="integralChange">
                            <li>当前信用分 <i>{{ businessCreditTotalScore.ttotalScore }}</i>分</li>
                            <li>近30天分数变化 <i>{{ businessCreditTotalScore.differenceScore }}</i>分</li>
                            <li>近30天扣分 <i>{{ businessCreditTotalScore.reduceScore }}</i>分</li>
                            <li>近30天加分 <i>{{ businessCreditTotalScore.addScore }}</i>分</li>
                        </ul>
                        <el-card
                            class="box-card"
                            shadow="never"
                        >
                            <el-form
                                :inline="true"
                                :model="postData1"
                                class="demo-form-inline"
                            >
                                <el-form-item label="时间:">
                                    <el-date-picker
                                        v-model="postData1.time1"
                                        value-format="yyyy-MM-dd"
                                        type="daterange"
                                        range-separator="至"
                                        start-placeholder="开始日期"
                                        end-placeholder="结束日期"
                                    >
                                    </el-date-picker>
                                </el-form-item>
                                <!--来源分类-->
                                <el-form-item label="">
                                    <el-select
                                        v-model="postData1.crType"
                                        @change="crTypeChange"
                                        placeholder="来源分类"
                                    >
                                        <el-option
                                            label="全部"
                                            value=""
                                        ></el-option>
                                        <el-option
                                            v-for="(item, index) in crTypeList"
                                            :label="item.dicName"
                                            :value="item.code"
                                            :key="index"
                                        ></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="">
                                    <el-select
                                        v-model="postData1.crBehavior"
                                        placeholder="事件"
                                    >
                                        <el-option
                                            label="全部"
                                            value=""
                                        ></el-option>
                                        <el-option
                                            v-for="(item, index) in crBehaviorList"
                                            :label="item.dicName"
                                            :value="item.code"
                                            :key="index"
                                        ></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="">
                                    <el-select
                                        v-model="postData1.isScore"
                                        placeholder="计分"
                                    >
                                        <el-option
                                            v-for="(item, index) in scoreOption"
                                            :label="item.label"
                                            :value="item.value"
                                            :key="index"
                                        ></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="">
                                    <el-select
                                        v-model="postData1.crChannel"
                                        placeholder="渠道"
                                    >
                                        <el-option
                                            label="全部"
                                            value=""
                                        ></el-option>
                                        <el-option
                                            v-for="(item, index) in dictionaryList"
                                            :label="item.ruleName"
                                            :value="item.code"
                                            :key="index"
                                        ></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="">
                                    <el-button
                                        type="primary"
                                        @click="queryShopCreditList"
                                    >搜索</el-button>
                                </el-form-item>
                            </el-form>
                        </el-card>
                        <el-card
                            class="box-card"
                            shadow="never"
                        >
                            <el-table
                                :data="creditList"
                                border
                                style="width: 100%; margin-top: 20px;"
                            >
                                <el-table-column
                                    type="index"
                                    prop="num"
                                    label="序号"
                                    align="center"
                                    width=""
                                >
                                </el-table-column>
                                <el-table-column
                                    prop="crAddTime"
                                    label="时间"
                                    align="center"
                                    width=""
                                >
                                    <template slot-scope="scope">
                                        {{dateF(scope.row.crAddTime)}}
                                    </template>
                                </el-table-column>
                                <el-table-column
                                    prop="crTypeName"
                                    label="来源分类"
                                    align="center"
                                    width=""
                                >
                                </el-table-column>
                                <el-table-column
                                    prop="crBehaviorName"
                                    label="事件"
                                    align="center"
                                    width=""
                                >
                                </el-table-column>
                                <el-table-column
                                    prop="crPlot"
                                    label="事件标准"
                                    align="center"
                                    width=""
                                >
                                </el-table-column>
                                <el-table-column
                                    prop="crScore"
                                    label="分值"
                                    align="center"
                                    width=""
                                >
                                </el-table-column>
                                <el-table-column
                                    prop="crResultJudgementName"
                                    label="其它处罚 / 处理"
                                    align="center"
                                    width=""
                                >
                                </el-table-column>
                                <el-table-column
                                    prop="crChannerName"
                                    label="渠道"
                                    align="center"
                                    width=""
                                >
                                </el-table-column>
                                <el-table-column
                                    prop="crModeExecutionName"
                                    label="执行方式"
                                    align="center"
                                    width=""
                                >
                                </el-table-column>
                            </el-table>
                            <div class="page">
                                <el-pagination
                                    @current-change="pagingCurrentHandlerCredit"
                                    @size-change="pagingSizeHandlerCredit"
                                    :current-page.sync="pagingCredit.pageIndex"
                                    :page-size="pagingCredit.pageSize"
                                    :page-sizes="[10, 30, 50, 100]"
                                    :total="pagingCredit.total"
                                    layout="total, sizes, prev, pager, next, jumper"
                                >
                                </el-pagination>
                            </div>
                        </el-card>
                    </el-tab-pane>

                    <el-tab-pane
                        label="商家信誉"
                        name="second"
                    >
                        <ul class="integralChange">
                            <li>当前信用分 <i>{{ businessReputationtTotalScore.rtTotalScore }}</i>分</li>
                            <li>信誉等级 <i>{{ businessReputationtTotalScore.reputationGrade }}</i></li>
                            <li>近30天分数变化 <i>{{ businessReputationtTotalScore.differenceScore }}</i>分</li>
                            <li>近30天扣分 <i>{{ businessReputationtTotalScore.reduceScore }}</i>分</li>
                            <li>近30天加分 <i>{{ businessReputationtTotalScore.addScore }}</i>分</li>
                        </ul>
                        <el-card
                            class="box-card"
                            shadow="never"
                        >
                            <el-form
                                :inline="true"
                                :model="postData2"
                                class="demo-form-inline"
                            >
                                <el-form-item label="时间:">
                                    <el-date-picker
                                        v-model="postData2.time2"
                                        type="datetimerange"
                                        range-separator="至"
                                        start-placeholder="开始日期"
                                        end-placeholder="结束日期"
                                    >
                                    </el-date-picker>
                                </el-form-item>
                                <el-form-item label="">
                                    <el-select
                                        v-model="postData2.reType"
                                        @change="reTypeChang"
                                        placeholder="来源分类"
                                    >
                                        <el-option
                                            label="全部"
                                            value=""
                                        ></el-option>
                                        <el-option
                                            v-for="(item, index) in reTypeList"
                                            :label="item.dicName"
                                            :value="item.code"
                                            :key="index"
                                        ></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="">
                                    <el-select
                                        v-model="postData2.reEvent"
                                        placeholder="事件"
                                    >
                                        <el-option
                                            label="全部"
                                            value=""
                                        ></el-option>
                                        <el-option
                                            v-for="(item, index) in reEventList"
                                            :label="item.dicName"
                                            :value="item.code"
                                            :key="index"
                                        ></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="">
                                    <el-select
                                        v-model="postData2.isScore"
                                        placeholder="计分"
                                    >
                                        <el-option
                                            v-for="(item, index) in scoreOption"
                                            :label="item.label"
                                            :value="item.value"
                                            :key="index"
                                        ></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="">
                                    <el-select
                                        v-model="postData2.reChannel"
                                        placeholder="渠道"
                                    >
                                        <el-option
                                            label="全部"
                                            value=""
                                        ></el-option>
                                        <el-option
                                            v-for="(item, index) in dictionaryList"
                                            :label="item.ruleName"
                                            :value="item.code"
                                            :key="index"
                                        ></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="">
                                    <el-button
                                        type="primary"
                                        @click="queryShopReputationList"
                                    >搜索</el-button>
                                </el-form-item>
                            </el-form>
                        </el-card>
                        <el-card
                            class="box-card"
                            shadow="never"
                        >
                            <el-table
                                :data="reputationList"
                                border
                                style="width: 100%; margin-top: 20px;"
                            >
                                <el-table-column
                                    prop="num"
                                    type="index"
                                    label="序号"
                                    align="center"
                                    width=""
                                >
                                </el-table-column>
                                <el-table-column
                                    prop="come"
                                    label="时间"
                                    align="center"
                                    width=""
                                >
                                    <template slot-scope="scope">
                                        {{dateF(scope.row.rsAddTime)}}
                                    </template>
                                </el-table-column>
                                <el-table-column
                                    prop="reTypeName"
                                    label="来源分类"
                                    align="center"
                                    width=""
                                >
                                </el-table-column>
                                <el-table-column
                                    prop="reEventName"
                                    label="事件"
                                    align="center"
                                    width=""
                                >
                                </el-table-column>
                                <el-table-column
                                    prop="reEventStandard"
                                    label="事件标准"
                                    align="center"
                                    width=""
                                >
                                </el-table-column>
                                <el-table-column
                                    prop="rsScore"
                                    label="分值"
                                    align="center"
                                    width=""
                                >
                                </el-table-column>
                                <el-table-column
                                    prop="reChannelName"
                                    label="渠道"
                                    align="center"
                                    width=""
                                >
                                </el-table-column>
                                <el-table-column
                                    prop="reResultJudgementName"
                                    label="结果判定"
                                    align="center"
                                    width=""
                                >
                                </el-table-column>
                                <el-table-column
                                    prop="reModeExecutionName"
                                    label="执行方式"
                                    align="center"
                                    width=""
                                >
                                </el-table-column>
                                <el-table-column
                                    prop="reModeExecution"
                                    label="处理人"
                                    align="center"
                                    width=""
                                >
                                </el-table-column>
                            </el-table>
                            <div class="page">
                                <el-pagination
                                    @current-change="pagingCurrentHandlerReputation"
                                    @size-change="pagingSizeHandlerReputation"
                                    :current-page.sync="pagingReputation.pageIndex"
                                    :page-size="pagingReputation.pageSize"
                                    :page-sizes="[10, 30, 50, 100]"
                                    :total="pagingReputation.total"
                                    layout="total, sizes, prev, pager, next, jumper"
                                >
                                </el-pagination>
                            </div>
                        </el-card>
                    </el-tab-pane>
                    <el-tab-pane
                        label="店铺评分"
                        name="third"
                    >
                        <el-card
                            class="box-card"
                            shadow="never"
                        >
                            <el-table
                                :data="scoreData"
                                border
                                style="width: 100%; margin-top: 20px;"
                            >
                                <el-table-column
                                    prop="num"
                                    type="index"
                                    label="序号"
                                    align="center"
                                    width=""
                                >
                                </el-table-column>
                                <el-table-column
                                    prop="bosSsScoringItems"
                                    label="评分项目"
                                    align="center"
                                    width=""
                                >
                                    <template slot-scope="scope">
                                        {{ getBosSsOptionDesc(scope.row.bosSsScoringItems)}}
                                    </template>
                                </el-table-column>
                                <el-table-column
                                    prop="average"
                                    label="分值"
                                    align="center"
                                    width=""
                                >
                                </el-table-column>
                                <el-table-column
                                    prop="five"
                                    label="获得“超赞“个数"
                                    align="center"
                                    width=""
                                >
                                </el-table-column>
                                <el-table-column
                                    prop="four"
                                    label="获得“满意“个数"
                                    align="center"
                                    width=""
                                >
                                </el-table-column>
                                <el-table-column
                                    prop="two"
                                    label="获得“一般“个数"
                                    align="center"
                                    width=""
                                >
                                </el-table-column>
                                <el-table-column
                                    prop="one"
                                    label="获得“较差“个数"
                                    align="center"
                                    width=""
                                >
                                </el-table-column>
                            </el-table>
                        </el-card>
                    </el-tab-pane>
                    <el-tab-pane
                        label="处罚/权益"
                        name="fourth"
                    >
                        <el-card
                            class="box-card"
                            shadow="never"
                        >
                            商家信用节点处罚/奖励记录
                            <el-table
                                :data="punishData.businessCreditScore"
                                border
                                style="width: 100%; margin-top: 20px;"
                            >
                                <el-table-column
                                    prop="num"
                                    type="index"
                                    label="序号"
                                    align="center"
                                    width=""
                                >
                                </el-table-column>
                                <el-table-column
                                    prop="csTime"
                                    label="年份"
                                    align="center"
                                    width=""
                                >
                                    <template slot-scope="scope">
                                        {{scope.row.csTime ? scope.row.csTime.slice(0, 4) : ''}}
                                    </template>
                                </el-table-column>
                                <el-table-column
                                    prop="nreduceBondProportion"
                                    label="商品保证金"
                                    align="center"
                                    width=""
                                >
                                </el-table-column>
                                <el-table-column
                                    prop="nreturnUsagefeeProportion"
                                    label="返平台使用年费"
                                    align="center"
                                    width=""
                                >
                                </el-table-column>
                                <el-table-column
                                    prop="npayPenalty"
                                    label="支付违约金"
                                    align="center"
                                    width=""
                                >
                                </el-table-column>
                                <el-table-column
                                    prop="nCloseShop"
                                    label="关闭店铺"
                                    align="center"
                                    width=""
                                >
                                    <template slot-scope="scope">
                                        {{scope.row.nCloseShop ? '不关闭' : '关闭'}}
                                    </template>
                                </el-table-column>
                            </el-table>
                        </el-card>
                        <el-card
                            class="box-card"
                            shadow="never"
                        >
                            商家信誉权益记录
                            <el-table
                                :data="punishData.businessLastyearReputationtScore"
                                border
                                style="width: 100%; margin-top: 20px;"
                            >
                                <el-table-column
                                    prop="num"
                                    type="index"
                                    label="序号"
                                    align="center"
                                    width=""
                                >
                                </el-table-column>
                                <el-table-column
                                    prop="lyTime"
                                    label="年份"
                                    align="center"
                                    width=""
                                >
                                    <template slot-scope="scope">
                                        {{scope.row.lyTime ? scope.row.lyTime.slice(0, 4) : ''}}
                                    </template>
                                </el-table-column>
                                <el-table-column
                                    prop="reNextAdvertisingFeeProportion"
                                    label="广告位费用"
                                    align="center"
                                    width=""
                                >
                                </el-table-column>
                                <el-table-column
                                    prop="reNextHotsearchProportion"
                                    label="热搜词费用"
                                    align="center"
                                    width=""
                                >
                                </el-table-column>
                                <el-table-column
                                    prop="reNextBondProportion"
                                    label="商品保证金"
                                    align="center"
                                    width=""
                                >
                                </el-table-column>
                                <el-table-column
                                    prop="reReturnUsagefeeProportion"
                                    label="返平台使用年费"
                                    align="center"
                                    width=""
                                >
                                </el-table-column>
                            </el-table>
                        </el-card>
                    </el-tab-pane>
                </el-tabs>
            </div>
        </el-card>
        <!--营业执照到期结束-->
        <bottom-footer></bottom-footer>
    </div>
</template>

<script>
import headTop from '../../../components/headTop'
import bottomFooter from '../../../components/bottomFooter'
import { formatDate } from '../../../config/dateUtils'
import QueryShopCreditList from '../../../api/customerAffair/queryShopCreditList'
import QueryDictionary from '../../../api/customerAffair/queryDictionary'
import QueryMerchantDictionary from '../../../api/customerAffair/queryMerchantDictionary'
import QueryShopReputationList from '../../../api/customerAffair/queryShopReputationList'
import QueryShopScore from '../../../api/customerAffair/queryShopScore'
import QueryShopPunishEquity from '../../../api/customerAffair/queryShopPunishEquity'


export default {
    components: {
        headTop,
        bottomFooter,
    },
    data() {
        return {
            activeName: 'first',
            userInfo: JSON.parse(window.sessionStorage.getItem('USER_INFO')),
            id: this.$route.params.id,
            //商家信用-----------------
            pagingCredit: { // 分页条件  信用
                pageIndex: 1, // 当前页
                pageSize: 10, // 每页多少条数据
                total: 0 // 数据总条数
            },
            postData1: {
                crType: '', // 类型code码
                crBehavior: '', // 行为code码
                isScore: -1, // 是否加减分(0.加分,1.减分)
                crChannel: '', // 渠道
                time1: [], //时间
            },
            crBehaviorList: [], //信用事件列表
            crTypeList: [],  //信用来源列表
            dictionaryList: [], //来源渠道分类列表
            scoreOption: [
                {
                    label: '全部',
                    value: -1
                }, {
                    label: '加分',
                    value: 0
                }, {
                    label: '扣分',
                    value: 1
                },
            ],
            creditList: [], //信用列表
            businessCreditTotalScore: {},
            //商家信誉--------------------
            postData2: {
                reType: '', // 类型code码
                reEvent: '', // 事件code码
                isScore: -1, // 是否加减分(0.加分,1.减分)
                reChannel: '', // 渠道
                time2: [], //时间
            },
            pagingReputation: { // 分页条件  信誉
                pageIndex: 1, // 当前页
                pageSize: 10, // 每页多少条数据
                total: 0 // 数据总条数
            },
            reEventList: [], //信誉事件列表
            reTypeList: [], //信誉来源列表
            reputationList: [], //信誉列表,
            businessReputationtTotalScore: {},
            // 评分 --------------
            scoreData: [],
            bosSsOption: [
                {
                    label: '商品',
                    value: 1,
                }, {
                    label: '商品',
                    value: 2,
                }, {
                    label: '服务',
                    value: 3,
                }, {
                    label: '物流',
                    value: 4,
                },
            ],
            //处罚 --------------
            punishData: [],
        }
    },

    methods: {

        /**
         * 选项卡
         * @param tab
         * @param event
         */
        handleClick(tab, event) {
            switch (tab.name) {
                case 'first':
                    //信用
                    this.queryDictionary();
                    if (!this.dictionaryList || this.dictionaryList.length === 0) {
                        this.queryMerchantDictionary();
                    }
                    this.queryShopCreditList();
                    break;
                case 'second':
                    //信誉
                    this.queryDictionaryReputation();
                    if (!this.dictionaryList || this.dictionaryList.length === 0) {
                        this.queryMerchantDictionary();
                    }
                    this.queryShopReputationList();
                    break;
                case 'third':
                    //店铺评分
                    this.queryShopScore();
                    break;
                case 'fourth':
                    //处罚/权益
                    this.queryShopPunishEquity();
                    break;
            }
        },
        // --------------------------信用----------------------------
        pagingCurrentHandlerCredit(value) {
            console.log(' 选择页 ==>> ', value)
            this.pagingCredit.pageIndex = value;
            this.queryShopCreditList();
        },
        pagingSizeHandlerCredit(value) {
            console.log(' 每页数量 ==>> ', value)
            this.pagingCredit.pageSize = value;
            this.queryShopCreditList();
        },
        //信用列表
        queryShopCreditList() {
            let _postData = {
                pageNo: this.pagingCredit.pageIndex, // 页码
                pageSize: this.pagingCredit.pageSize, // 每页条数
                shopId: this.id, // 商家id
                isScore: this.postData1.isScore, // 是否加减分(0.加分,1.减分)
            };
            if (this.postData1.crType) {
                _postData.crType = this.postData1.crType;
            }
            if (this.postData1.crBehavior) {
                _postData.crBehavior = this.postData1.crBehavior;
            }
            if (this.postData1.crChannel) {
                _postData.crChannel = this.postData1.crChannel;
            }
            if (this.postData1.time1 && this.postData1.time1.length > 0) {
                // console.log(this.postData1.time1, 'this.postData1.time1');
                _postData.startTime = this.postData1.time1[0];
                _postData.endTime = this.postData1.time1[1];
            }
            QueryShopCreditList.call(this, _postData).then(res => {
                console.log(res, 'queryShopCreditList');
                if (res.code === 1) {
                    this.creditList = res.data.pageInfo.list;
                    this.pagingCredit.total = res.data.pageInfo.total;
                    this.businessCreditTotalScore = res.data.businessCreditTotalScore;
                }
            });
        },
        /**
         * 来源字典  code 如果有参数，则就是查事件
         */
        queryDictionary(code) {
            let _postData = {
                handIs: -1,
                parentId: code ? code : 1000
            };
            QueryDictionary.call(this, _postData).then(res => {
                console.log(res, 'queryDictionary');
                if (res.code === 1) {
                    if (code) {
                        //crBehaviorList  事件
                        this.crBehaviorList = res.data.commodityScoreDictionaryList;
                    } else {
                        //crTypeList  分类
                        this.crTypeList = res.data.commodityScoreDictionaryList;
                    }
                }
            });
        },
        //查询来源渠道分类
        queryMerchantDictionary() {
            let _postData = {
                parentId: 1000
            };
            QueryMerchantDictionary.call(this, _postData).then(res => {
                console.log(res, 'QueryMerchantDictionary');
                if (res.code === 1) {
                    this.dictionaryList = res.data.merchantBasiccreditDictionaryList;
                }
            });
        },
        //来源类型改变
        crTypeChange() {
            this.postData1.crBehavior = '';
            this.crBehaviorList = [];
            if (this.postData1.crType) {
                this.queryDictionary(this.postData1.crType);
            }
        },
        dateF(str) {
            return formatDate(str);
        },
        // ------------------------信誉------------------------------
        pagingCurrentHandlerReputation(value) {
            console.log(' 选择页 ==>> ', value)
            this.pagingReputation.pageIndex = value;
            this.queryShopReputationList();
        },
        pagingSizeHandlerReputation(value) {
            console.log(' 每页数量 ==>> ', value)
            this.pagingReputation.pageSize = value;
            this.queryShopReputationList();
        },
        //信誉列表
        queryShopReputationList() {
            let _postData = {
                pageNo: this.pagingReputation.pageIndex, // 页码
                pageSize: this.pagingReputation.pageSize, // 每页条数
                shopId: this.id, // 商家id
                isScore: this.postData1.isScore, // 是否加减分(0.加分,1.减分)
            };
            if (this.postData2.reType) {
                _postData.reType = this.postData2.reType;
            }
            if (this.postData2.reEvent) {
                _postData.reEvent = this.postData2.reEvent;
            }
            if (this.postData2.reChannel) {
                _postData.reChannel = this.postData2.reChannel;
            }
            if (this.postData2.time2 && this.postData2.time2.length > 0) {
                // console.log(this.postData2.time2, 'this.postData2.time2');
                _postData.startTime = this.postData2.time2[0];
                _postData.endTime = this.postData2.time2[1];
            }
            QueryShopReputationList.call(this, _postData).then(res => {
                console.log(res, 'queryShopCreditList');
                if (res.code === 1) {
                    this.reputationList = res.data.pageInfo.list;
                    this.pagingReputation.total = res.data.pageInfo.total;
                    this.businessReputationtTotalScore = res.data.businessReputationtTotalScore;
                }
            });
        },
        /**
         * 来源字典  code 如果有参数，则就是查事件
         */
        queryDictionaryReputation(code) {
            let _postData = {
                handIs: -1,
                parentId: code ? code : 2000
            };
            QueryDictionary.call(this, _postData).then(res => {
                console.log(res, 'queryDictionary');
                if (res.code === 1) {
                    if (code) {
                        //crBehaviorList  事件
                        this.reEventList = res.data.commodityScoreDictionaryList;
                    } else {
                        //crTypeList  分类
                        this.reTypeList = res.data.commodityScoreDictionaryList;
                    }
                }
            });
        },
        reTypeChang() {
            this.postData2.reEvent = '';
            this.reEventList = [];
            if (this.postData2.reType) {
                this.queryDictionaryReputation(this.postData2.reType);
            }
        },
        // ---------------------店铺评分----------------------
        queryShopScore() {
            let _postData = {
                shopId: this.id
            };
            QueryShopScore.call(this, _postData).then(res => {
                console.log(res, 'QueryShopScore');
                if (res.code === 1) {
                    this.scoreData = res.data.bositemsVoList ? res.data.bositemsVoList : [];
                }
            });
        },
        getBosSsOptionDesc(status) {
            let _desc = '';
            this.bosSsOption.map(item => {
                if (item.value === status) {
                    _desc = item.label;
                }
            });
            return _desc;
        },
        // ---------------------处罚/权益----------------------
        queryShopPunishEquity() {
            let _postData = {
                shopId: this.id
            };
            QueryShopPunishEquity.call(this, _postData).then(res => {
                console.log(res, 'queryShopPunishEquity');
                if (res.code === 1) {
                    this.punishData = res.data;
                }
            });
        },

    },
    created() {
        this.queryShopCreditList();
        this.queryDictionary();
        this.queryMerchantDictionary();
    }
}
</script>

<style lang="less" scoped>
.box-card {
    margin-bottom: 20px;
}
.page {
    text-align: right;
    padding: 20px;
}

.integralChange {
    width: 100%;
    height: auto;
    display: table;
    margin: 20px 0;
    li {
        display: table-cell;
        text-align: center;
        i {
            font-style: normal;
            font-weight: bold;
            font-size: 20px;
        }
    }
}
</style>
