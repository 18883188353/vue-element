<template>
    <div>
        <el-card class="box-card mb20">
            <div slot="header">
                <b>商家信息管理列表：</b>
            </div>
            <div class="text item">
                <div>
                    <el-form
                        :inline="true"
                        :model="queryCondition"
                        class="demo-form-inline"
                    >
                        <el-form-item label="公司名称：">
                            <el-input
                                v-model="queryCondition.companyName"
                                placeholder="请输入公司名称"
                            ></el-input>
                        </el-form-item>
                        <el-form-item label="店铺状态：">
                            <el-select v-model="queryCondition.shopStatus">
                                <el-option
                                    v-for="(item, index) in shopStatusOption"
                                    :label="item.label"
                                    :value="item.value"
                                    :key="index"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                        <!--<el-form-item label="实体店名称：">
                            <el-input
                                v-model="queryCondition.storeName"
                                placeholder="请输入实体店名称"
                            ></el-input>
                        </el-form-item>-->
                        <el-form-item label="商家名称：">
                            <el-input
                                v-model="queryCondition.shopName"
                                placeholder="请输入商家名称"
                            ></el-input>
                        </el-form-item>
                        <el-form-item label="电话搜索：">
                            <el-input
                                v-model="queryCondition.keyWord"
                                placeholder="输入负责人|经办人|法人|店铺联系电话进行搜索"
                            ></el-input>
                        </el-form-item>
                        <el-form-item label="入驻成功时间：">
                            <el-date-picker
                                v-model="queryCondition.startTime"
                                type="datetime"
                                value-format="yyyy-MM-dd HH:mm:ss"
                                :picker-options="pickerOptionsStart"
                                @change="changeStartTime"
                                placeholder="开始时间"
                            >
                            </el-date-picker> -
                            <el-date-picker
                                v-model="queryCondition.endTime"
                                type="datetime"
                                value-format="yyyy-MM-dd HH:mm:ss"
                                :picker-options="pickerOptionsEnd"
                                @change="changeEndTime"
                                placeholder="结束时间"
                            >
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item label="是否签约：">
                            <el-select
                                v-model="queryCondition.isSignUp"
                                placeholder="请选择是否签约"
                            >
                                <el-option
                                    v-for="(item, index) in signUpOption"
                                    :label="item.label"
                                    :value="item.value"
                                    :key="index"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item>
                            <el-button
                                type="primary"
                                @click="init"
                            >查询</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
        </el-card>

        <el-card class="box-card">
            <el-table
                :data="tableList"
                v-loading="initLoading"
                border
                style="width: 100%; margin-top: 20px;"
            >
                <el-table-column
                    label="序号"
                    type="index"
                    prop="num"
                    align="center"
                    minWidth="50"
                    :show-overflow-tooltip="true"
                >
                </el-table-column>
                <el-table-column
                    prop="rel_name"
                    label="业务员名称"
                    align="center"
                    minWidth="100"
                    :show-overflow-tooltip="true"
                >
                </el-table-column>
                <el-table-column
                    prop="tel"
                    label="业务员手机号"
                    align="center"
                    width="140"
                >
                </el-table-column>
                <el-table-column
                    prop="SigningDate"
                    label="入驻时间"
                    align="center"
                    width="160"
                >
                </el-table-column>
                <el-table-column
                    prop="CompanyName"
                    label="公司名称"
                    align="center"
                    width="260"
                >
                </el-table-column>
                <el-table-column
                    prop="ShopName"
                    label="商家名称"
                    align="center"
                    min-width="160"
                >
                </el-table-column>
                <el-table-column
                    prop="ShopAccount"
                    label="店铺账号"
                    align="center"
                    width="160"
                >
                </el-table-column>
                <el-table-column
                    label="联系电话"
                    align="center"
                    min-width="200"
                >
                    <template slot-scope="scope">
                        <ul>
                            <li><span>负责人：</span>{{scope.row.ManagerTel}}</li>
                            <li><span>经办人：</span>{{scope.row.ApplerTel}}</li>
                            <li><span>法人：</span>{{scope.row.LegalTel}}</li>
                            <li><span>店铺电话：</span>{{scope.row.Mobile}}</li>
                        </ul>
                    </template>
                </el-table-column>
                <el-table-column
                    label="是否签约"
                    align="center"
                    width="120"
                >
                    <template slot-scope="scope">
                        {{scope.row.IsSignUp ? '已签约' : '未签约'}}
                    </template>
                </el-table-column>
                <el-table-column
                    prop="ShopStatus"
                    label="状态"
                    align="center"
                    width="100"
                >
                    <template slot-scope="scope">
                        {{getShopStatusDesc(scope.row.ShopStatus)}}
                    </template>
                </el-table-column>
                <el-table-column
                    prop="taskId"
                    label="操作"
                    align="center"
                    fixed="right"
                    width="210"
                >
                    <template slot-scope="scope">
                        <el-button
                            type="primary"
                            @click="openMessageBox(scope.row)"
                        >发送密码</el-button>
                        <el-button
                            type="primary"
                            @click="auditCheckInDetails(scope.row)"
                        >查看</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="page">
                <el-pagination
                    :small="true"
                    @current-change="pagingCurrentHandler"
                    @size-change="pagingSizeHandler"
                    :current-page.sync="paging.pageIndex"
                    :page-size="paging.pageSize"
                    :page-sizes="[10, 30, 50, 100]"
                    :total="paging.total"
                    layout="total, sizes, prev, pager, next"
                >
                </el-pagination>
            </div>
        </el-card>
    </div>
</template>

<script>

import GetShopBriefCollection from '../../../api/customerAffair/getShopBriefCollection'
import GetSendPassWord from '../../../api/customerAffair/getSendPassWord'

export default {
    components: {},
    data() {
        return {

            queryCondition: { // 查询条件
                companyName: '',
                shopStatus: '', // 店铺状态1：正常 2：冻结 3：关闭
                shopName: '', // 商家名称
                //storeName: '', // 实体店名称
                startTime: '', // 筛选开始时间
                endTime: '', // 筛选结束时间
                keyWord: '', // 输入负责人|经办人|法人|店铺联系电话进行搜索
                isSignUp: 1, // 是否签约1是/0否
            },
            shopStatusOption: [
                { label: "全部", value: '' },
                { label: "正常", value: 1 },
                { label: "冻结", value: 2 },
                { label: "关闭", value: 3 },
            ],
            signUpOption: [
                { label: "全部", value: '' },
                { label: "未签约", value: 0 },
                { label: "已签约", value: 1 },
            ],
            paging: { // 分页条件
                pageIndex: 1, // 当前页
                pageSize: 10, // 每页多少条数据
                total: 0 // 数据总条数
            },
            tableList: [],
            initLoading: false, // 是否显示加载表格数据时的加载动画
            pickerOptionsStart: {
                disabledDate(time) {

                }
            },
            pickerOptionsEnd: {
                disabledDate(time) {

                }
            },
        }
    },
    // keep-alive 组件激活时调用，如果不走缓存请使用其他生命周期钩子，例如 mounted
    activated() {
        this.init();
    },
    methods: {
        //开始时间变化
        changeStartTime() {
            let _start = Date.parse(this.queryCondition.startTime);
            let _end = Date.parse(this.queryCondition.endTime);
            if (_start > _end) {
                this.queryCondition.endTime = '';
            }
            console.log(_start, _end, 'changeStartTime');
            this.pickerOptionsEnd = {
                disabledDate: (time) => {
                    if (this.queryCondition.startTime && this.queryCondition.startTime !== '') {
                        return time.getTime() - 86400000 < _start;
                    }
                }
            }
        },
        //结束时间变化
        changeEndTime() {
            let _start = Date.parse(this.queryCondition.startTime);
            let _end = Date.parse(this.queryCondition.endTime);
            if (_start > _end) {
                this.queryCondition.startTime = '';
            }
            console.log(_start, _end, 'changeEndTime');
            this.pickerOptionsStart = {
                disabledDate: (time) => {
                    if (this.queryCondition.endTime && this.queryCondition.endTime !== '') {
                        return time.getTime() + 86400000 > _end;
                    }
                }
            }
        },
        init() {
            this.tableList = new Array();
            this.initLoading = true;
            // this.paging.total = 0;
            GetShopBriefCollection.call(this, { ...this.queryCondition, ...this.paging }).then(res => {
                console.log(res);
                if (res.Code === 1) {
                    if (res.Data.RecordCount) {
                        this.paging.total = parseInt(res.Data.RecordCount);
                    }
                    this.tableList = res.Data.jsonArray;
                    console.log(this.tableList, 'this.tableList');
                }
                this.initLoading = false;
            });
        },
        pagingCurrentHandler(value) {
            console.log(' 选择页 ==>> ', value)
            this.paging.pageIndex = value;
            this.init();
        },
        pagingSizeHandler(value) {
            console.log(' 每页数量 ==>> ', value)
            this.paging.pageSize = value;
            this.init();
        },
        getShopStatusDesc(status) {
            let _desc = '';
            this.shopStatusOption.map(item => {
                if (item.value === status) {
                    _desc = item.label;
                }
            });
            return _desc;
        },

        /**
         * 搜索按钮
         */
        onSubmit() {
            console.log('submit!');
        },
        //打开消息发送框
        openMessageBox(row) {
            this.$prompt('<div>\n' +
                `              <p>确定给商家：${row.ShopName} 发送新密码？</p>` +
                '               <p>商家接收短信的手机号：</p>' +
                '          </div>', '提示', {
                inputPattern: /^1[3456789]\d{9}$/,
                inputErrorMessage: '手机号格式不正确',
                inputValue: row.ApplerTel,
                confirmButtonText: '发送',
                dangerouslyUseHTMLString: true
            }).then(({ value }) => {
                let _userInfo = JSON.parse(sessionStorage.getItem('USER_INFO'));
                let _postData = {
                    ShopId: row.ShopId,
                    ShopName: row.ShopName,
                    ShopUserId: row.ShopUserId,
                    Mobile: value,
                    Auditor: _userInfo.id,
                    AuditUserName: _userInfo.rel_name
                };
                GetSendPassWord.call(this, _postData).then(res => {
                    if (res.Code == 1) {
                        this.$message.success(res.Desc);
                    } else {
                        this.$message.error(res.Desc);
                    }
                });
            }).catch(() => {
                /*this.$message({
                    type: 'info',
                    message: '取消输入'
                });*/
            });
        },
        auditCheckInDetails(row) {
            this.$router.push({ 'path': `affairShoperInfoManagementDetail/${row.ShopId}` });
        }

    }
}
</script>

<style lang="less" scoped>
.page {
    text-align: right;
    padding: 20px;
}
</style>
