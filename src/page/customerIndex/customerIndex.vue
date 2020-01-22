<template>
    <div class="fillcontain">
        <el-row>
            <el-col
                :span="12"
                class="pr10"
            >
                <el-card
                    class="box-card n-index-sign"
                    :body-style="listBodyHeight"
                >
                    <div slot="header">
                        <h3>消息发布站</h3>
                    </div>
                    <div>
                        <!-- <ul>
                            <li>
                                <p>2019商品发布规则详解</p>
                                <span>2019-11-27</span>
                                <router-link to="">查看</router-link>
                            </li>
                        </ul> -->
                        <el-table
                            :data="messageList"
                            v-loading="messageLoading"
                            stripe
                            class="list-table"
                            :max-height="445"
                        >
                            <el-table-column
                                prop="title"
                                min-width="200"
                                show-overflow-tooltip
                            ></el-table-column>
                            <el-table-column
                                prop="create_time"
                                width="160"
                            ></el-table-column>
                            <el-table-column
                                prop="id"
                                width="80"
                                align="center"
                            >
                                <template slot-scope="scope">
                                    <el-link
                                        type="primary"
                                        @click="goRule(scope.row)"
                                    >查看</el-link>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </el-card>
            </el-col>
            <el-col
                :span="12"
                class="pl10"
            >
                <el-card
                    class="box-card n-index-sign"
                    :body-style="listBodyHeight"
                >
                    <div slot="header">
                        <h3>待我处理的工单</h3>
                    </div>
                    <div>
                        <!-- <ul>
                            <li v-for="(n, idx) in sheetList" :key="idx">
                                <p>{{ n.sheetType }}</p>
                                <span>{{ n.startTime }}</span>
                                <router-link to="">查看</router-link>
                            </li>
                        </ul> -->
                        <el-table
                            :data="sheetList"
                            v-loading="sheetLoading"
                            stripe
                            class="list-table"
                            :max-height="445"
                        >
                            <el-table-column
                                prop="content"
                                min-width="160"
                                show-overflow-tooltip
                            >
                                <template slot-scope="scope">
                                    来自{{ getTypeValueText('Source', scope.row.source)}}的{{ scope.row.sheetType }}
                                </template>
                            </el-table-column>
                            <el-table-column
                                prop="startTime"
                                width="200"
                            ></el-table-column>
                            <el-table-column
                                prop="id"
                                width="80"
                                align="center"
                            >
                                <template slot-scope="scope">
                                    <el-link
                                        type="primary"
                                        @click="goSheet(scope.row)"
                                    >处理</el-link>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </el-card>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24">
                <el-card
                    class="mt20 none-border-buttom"
                    :body-style="bodyHeight"
                >
                    <div slot="header">
                        <h3 style="width: 50%; display: inline-block;">数据中心站</h3>
                    </div>
                    <div
                        class="data_warp loading-sign"
                        v-loading="auditLoading"
                    >
                        <div class="data_box">
                            <div
                                class="data_center_list"
                                v-for="(n,idx) in auditData"
                                :key="idx"
                            >
                                <h4>{{ n.name }}</h4>
                                <div class="percent">
                                    <!-- :percentage="(n.pass + n.notPass) === 0 ? 0 : (n.allCount / (n.pass + n.notPass)).toFixed(2) * 100" -->
                                    <el-progress
                                        type="circle"
                                        :width="70"
                                        :percentage="n.allCount === 0 ? 0 : ((n.pass + n.notPass) / n.allCount).toFixed(2) * 100"
                                    ></el-progress>
                                </div>
                                <el-button
                                    type="primary"
                                    size="mini"
                                    @click="goAudit(n.path)"
                                >立即审核</el-button>
                                <div class="clear"></div>
                                <ul>
                                    <li>
                                        <p>审核通过</p>
                                        <span style="color: #1cc1b4">{{ n.pass }}</span>
                                    </li>
                                    <li>
                                        <p>未通过</p>
                                        <span style="color: #e60012">{{ n.notPass }}</span>
                                    </li>
                                    <li>
                                        <p>待审核</p>
                                        <span style="color: #ff6600">{{ n.waitCount }}</span>
                                    </li>
                                </ul>
                            </div>
                            <div
                                v-for="n in 4"
                                :key="`item_${n}`"
                                style="width: 250px; margin:10px;"
                            >
                                <!-- 作为填充，请勿删除 -->
                            </div>
                        </div>
                    </div>
                </el-card>
            </el-col>
            <el-col style="display: flex; justify-content: center;">
                <div>
                    <div
                        :class="isShow ? 'open' : ''"
                        style="width: 20px;"
                    >
                        <i
                            @click="openOrClose"
                            class="el-icon-arrow-down open-close"
                        ></i>
                    </div>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>

import AuditCount from '../../api/audit/auditCountInfo'
import selectCServiceSheetMyList from '../../api/sheet/selectCServiceSheetMyList'
import CsServiceSelectWaitSheetList from '../../api/sheet/CsServiceSelectWaitSheetList'

import getRuleListByRuleType from '../../api/document/getRuleListByRuleType'

export default {
    data() {
        return {
            level: 4,//等级状态不同，显示不同的主页内容(1总监级、2客服经理、3审核经理、4其他人员。)

            percentage: 69,
            isShow: false,
            bodyHeight: {
                height: '225px',
                overflow: 'hidden',
                paddingTop: '0px'
            },
            listBodyHeight: {
                height: '435px',
                paddingTop: '0px'
            },
            auditLoading: true,
            auditData: [],
            sheetLoading: true,
            sheetList: [],
            messageLoading: true,
            messageList: []
        }
    },
    computed: {
        sheetData() {
            return this.$store.state.sheetData
        }
    },
    methods: {
        init() {
            let routers = (this.$router.options.routes)[1].children;
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
                console.log(res, 'res ===>>> ')
                if (res.Code === 1) {
                    let apiResult = res.Data;

                    let result = new Array();
                    let keys = Object.keys(apiResult);
                    for (let i = 0; i < keys.length; i++) {
                        let key = keys[i];
                        let rt = routers.find(n2 => n2.path === key || n2.path === `/${key}`);
                        result.push({
                            ...apiResult[key],
                            name: (rt['meta'].title)[0],
                            path: rt.path
                        })
                    }
                    this.auditData = result;
                    console.log('auditData ===>>> ', this.auditData);
                }
                this.auditLoading = false;
            })
        },
        getTypeValueText(type, value) {
            // console.log(this.sheetData[type].find(n => n.value === value), type, value , 'this.sheetData[type].find(n => n.value === value)');
            let _typeData = this.sheetData[type].find(n => n.value === value);
            return _typeData ? _typeData.text : '';
        },
        searchSheetList() {
            let queryParams = {
                pageNum: 1,
                pageSize: 10
            }
            CsServiceSelectWaitSheetList.call(this, queryParams).then(res => {
                if (res.Code === 1) {
                    this.sheetList = res.Data.list;
                } else {
                    this.$message.error('查询工单列表失败')
                }
                this.sheetLoading = false;
            });
        },
        initRule() {
            getRuleListByRuleType.call(this, {
                types: '1,2,3,4,5,6'
            }).then(res => {
                if (res.Code === 1) {
                    this.messageList = res.Data;
                } else {
                    this.$message.error('查询规则列表失败')
                }
                this.messageLoading = false;
            });
        },
        moreBtn() {
            this.isShow = 1;
        },
        openOrClose() {
            this.isShow = !this.isShow;
            if (this.isShow) {
                this.bodyHeight.height = 'auto'
            } else {
                this.bodyHeight.height = '225px'
            }
        },
        goAudit(_path) {
            //alert(path);
            console.log('go audit path ===>>> ', _path)
            this.$router.push({ path: _path });
        },
        goSheet(row) {
            if (row.sheetType === '交易纠纷') {
                // 交易纠纷
                this.$router.push({ path: `/workListLookReportDispute/${row.id}`, query: { type: 'deal' } })
            } else {
                //其他
                this.$router.push({ path: `/workListSource/${row.id}`, query: { type: 'deal' } })
            }
        },
        goRule(row) {
            let _path = '';
            switch (row.rule_type) {
                case 1: _path = '/ruleUserAdd'; break;
                case 2: _path = '/ruleUserAdd'; break;
                case 3: _path = '/ruleUserAdd'; break;
                case 4: _path = '/ruleUserAdd'; break;
                case 5: _path = '/ruleUserAdd'; break;
                case 6: _path = '/ruleUserAdd'; break;
                default: break;
            }
            if (_path === '') {
                this.$message.warning('规则类型错误，无法跳转');
                return;
            }
            this.$router.push({ path: _path, query: { id: row.id, type: 'view' } });
        }
    },

    created() {
        this.initRule();
        this.searchSheetList();
        this.init();
    }
}
</script>

<style>
.loading-sign .el-loading-spinner {
    top: 110px !important;
}
.n-index-sign .el-table__header {
    display: none;
}
</style>
<style lang="less" scoped>
.message_send {
    width: 100%;
    height: auto;
    ul {
        width: 100%;
        max-height: 310px;
        overflow: auto;
        li {
            width: 100%;
            display: table;
            margin-top: 10px;
            p {
                display: table-cell;
                vertical-align: middle;
            }
            span {
                width: 200px;
                text-align: center;
                display: table-cell;
                vertical-align: middle;
            }
            a {
                width: 50px;
                height: auto;
                color: #25ada3;
                text-align: center;
                display: table-cell;
                vertical-align: middle;
                &:hover {
                    text-decoration: underline;
                }
            }
        }
        &::-webkit-scrollbar {
            width: 5px; /*高宽分别对应横竖滚动条的尺寸*/
            height: 1px;
        }
        &::-webkit-scrollbar-thumb {
            /*滚动条里面小方块*/
            border-radius: 5px;
            box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
            -webkit-box-shadow: inset 0 0 1px rgba(0, 0, 0, 0.2);
            background: #eaeaea;
        }
        &::-webkit-scrollbar-track {
            /*滚动条里面轨道*/
            box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
            -webkit-box-shadow: inset 0 0 1px rgba(0, 0, 0, 0.2);
            border-radius: 5px;
            background: #ddd;
        }
    }
}

.data_warp {
    .data_box {
        width: 100%;
        min-height: 225px;
        display: flex; // 弹性布局
        flex-direction: row; // 横向排列
        flex-wrap: wrap; // 一行排不下时的换行方式
        justify-content: space-between; // 元素间隔相等
        // &:after {
        //     content: "";
        //     width: calc(100% / 5)
        // }
        .data_center_list {
            flex: 0 0 auto; // 解决flex布局下子元素width失效的问题
            width: 250px;
            height: 220px;
            border-radius: 10px;
            margin: 10px 0px;
            -moz-box-shadow: 0 3px 13px #eaeaea;
            -webkit-box-shadow: 0 3px 13px #eaeaea;
            box-shadow: 0 3px 13px #eaeaea;
            h4 {
                height: 40px;
                line-height: 40px;
                text-indent: 20px;
                background: #eeeeee;
                color: #333;
            }
            .percent {
                float: left;
                margin: 15px;
            }
            .el-button--mini,
            .el-button--small {
                float: right;
                margin: 35px 15px 15px 15px;
            }
            ul {
                width: 100%;
                height: auto;
                li {
                    width: 33.333%;
                    text-align: center;
                    float: left;
                }
            }
        }
    }
}

.activeov {
    min-height: 225px;
    overflow: hidden;
}

.look_more {
    font-size: 22px;
    text-align: center;
    cursor: pointer;
    color: #25ada3;
    position: fixed;
    bottom: 20px;
    margin: auto;
}

.open-close {
    font-weight: 600;
    font-size: 20px;
    cursor: pointer;
}

.open {
    display: inline-block;
    -webkit-transform: rotateX(180deg);
    -moz-transform: rotateX(180deg);
    -ms-transform: rotateX(180deg);
    -o-transform: rotateX(180deg);
    transform: rotateX(180deg);
}
</style>
