<template>
    <div class="fillcontain">

        <div class="main">
            <el-card class="box-card">
                <div
                    slot="header"
                    class="clearfix"
                >
                    <span>工单列表：</span>
                    <!--<el-radio v-model="abnormalRadio" label="1">今日</el-radio>
                    <el-radio v-model="abnormalRadio" label="2">本月</el-radio>
                    <el-radio v-model="abnormalRadio" label="3">上月</el-radio>
                    <el-radio v-model="abnormalRadio" label="4">年度</el-radio>-->
                </div>
                <div class="text item">
                    <!--<div>
                        <el-radio-group v-model="addrRadio" size="medium">
                            <el-radio-button label="全部" ></el-radio-button>
                        </el-radio-group>
                    </div>-->
                    <div class="mt20">
                        <el-form
                            :inline="true"
                            :model="postData"
                            class="demo-form-inline"
                        >
                            <el-form-item label="工单来源:">
                                <el-select
                                    v-model="postData.source"
                                    placeholder="工单来源"
                                >
                                    <el-option
                                        :label="item.text"
                                        :value="item.value"
                                        :key="item.value"
                                        v-for="item in sourceOption"
                                    ></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="工单编号:">
                                <el-input
                                    v-model="postData.orNumber"
                                    placeholder="工单编号"
                                ></el-input>
                            </el-form-item>
                            <el-form-item label="紧急等级:">
                                <el-select
                                    v-model="postData.emergencyLevel"
                                    placeholder="紧急等级"
                                >
                                    <el-option
                                        label="全部"
                                        value=""
                                    ></el-option>
                                    <el-option
                                        :label="item.text"
                                        :value="item.value"
                                        :key="item.value"
                                        v-for="item in sheetData.EmergencyLevelData"
                                    ></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="处理状态:">
                                <el-select
                                    v-model="postData.orPlate"
                                    placeholder="处理状态"
                                >
                                    <el-option
                                        :label="item.text"
                                        :value="item.value"
                                        :key="item.value"
                                        v-for="item in orPlateOption"
                                    ></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="类型:">
                                <el-select
                                    v-model="postData.orType"
                                    placeholder="类型"
                                >
                                    <el-option
                                        :label="item.value"
                                        :value="item.number"
                                        v-for="item in orTypeOption"
                                        :key="item.number"
                                    ></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="创建时间:">
                                <el-date-picker
                                    v-model="postData.startTime"
                                    type="datetime"
                                    value-format="yyyy-MM-dd HH:mm:ss"
                                    :picker-options="pickerOptionsStart"
                                    @change="changeStartTime"
                                    placeholder="开始时间"
                                >
                                </el-date-picker> -
                                <el-date-picker
                                    v-model="postData.endTime"
                                    type="datetime"
                                    value-format="yyyy-MM-dd HH:mm:ss"
                                    :picker-options="pickerOptionsEnd"
                                    @change="changeEndTime"
                                    placeholder="结束时间"
                                >
                                </el-date-picker>
                            </el-form-item>
                            <el-form-item>
                                <el-button
                                    type="primary"
                                    @click="onSubmit"
                                >查询</el-button>
                            </el-form-item>
                        </el-form>
                    </div>
                </div>
            </el-card>

            <el-card class="box-card">
                <el-table
                    :data="tableData"
                    border
                    style="width: 100%; margin-top: 20px;"
                >
                    <el-table-column
                        prop="type"
                        label="工单来源"
                        align="center"
                        width=""
                    >
                        <template slot-scope="scope">
                            {{getTypeValueText('Source',scope.row.source)}}
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="sheetNo"
                        label="工单编号"
                        align="center"
                        width=""
                    >
                    </el-table-column>
                    <el-table-column
                        prop="startTime"
                        label="创建时间"
                        align="center"
                        width=""
                    >
                    </el-table-column>
                    <el-table-column
                        prop="emergencyLevel"
                        label="紧急程度"
                        align="center"
                        width=""
                    >
                        <template slot-scope="scope">
                            {{getTypeValueText('EmergencyLevelData',scope.row.emergencyLevel)}}
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="sheetType"
                        label="工单类型"
                        align="center"
                        width=""
                    >
                        <!--<template slot-scope="scope">
                            {{getTypeValueText('SheetType',scope.row.sheetType)}}
                        </template>-->
                    </el-table-column>
                    <el-table-column
                        prop="isEstimate"
                        label="是否评价"
                        align="center"
                        width=""
                    >
                        <template slot-scope="scope">
                            {{scope.row.isEstimate ? '是' : '否'}}
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="isBackVisit"
                        label="回访"
                        align="center"
                        width=""
                    >
                        <template slot-scope="scope">
                            {{scope.row.isBackVisit ? '是' : '否'}}
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="solvedMans"
                        label="处理人员"
                        align="center"
                        width=""
                    >
                    </el-table-column>
                    <el-table-column
                        prop="satisfactionDegree"
                        label="满意度评价"
                        align="center"
                        width=""
                    >
                        <!--<template slot-scope="scope">
                            {{getTypeValueText('VistHistory',scope.row.satisfactionDegree)}}
                        </template>-->
                    </el-table-column>
                    <el-table-column
                        prop="sheetStatus"
                        label="处理状态"
                        align="center"
                        width=""
                    >
                        <!--<template slot-scope="scope">
                            {{getTypeValueText('StatusData',scope.row.sheetStatus)}}
                        </template>-->
                    </el-table-column>
                    <el-table-column
                        label="操作"
                        align="center"
                        width=""
                    >
                        <template slot-scope="scope">
                            <!--<el-link type="primary" @click="workListLook">查看</el-link>
                            <el-link type="primary" @click="workListDetails">详情</el-link>
                            <el-link type="primary" @click="workListSource">来源</el-link>-->
                            <el-link
                                type="primary"
                                @click="toDetail(scope.row.sheetType, scope.row.id, 'view')"
                            >查看</el-link>
                            <!--<el-link type="primary" @click="toDetail(scope.row.sheetType, scope.row.id, 'deal')">处理</el-link>-->
                        </template>
                    </el-table-column>
                </el-table>
                <div class="page">
                    <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page=postData.pageNum
                        :page-sizes="[5, 10, 15, 20]"
                        :page-size=postData.pageSize
                        layout="total, sizes, prev, pager, next, jumper"
                        :total=total
                    >
                    </el-pagination>
                </div>
            </el-card>

        </div>

    </div>
</template>

<script>
import headTop from '../../components/headTop'
import selectCServiceSheetList from '../../api/sheet/selectCServiceSheetList'
import selectCServiceSheetMyList from '../../api/sheet/selectCServiceSheetMyList'

export default {
    components: {
        headTop,
    },
    data() {
        return {
            formInline: {
                user: '',
                region: '',
                start: '',
                end: '',
            },
            abnormalRadio: 1,
            addrRadio: 1,
            currentPage: 1,
            tableData: [],//审核任务
            total: 0,
            postData: {
                orPlate: "",   // 查询所有工单 工单类型
                pageNum: 1,
                pageSize: 10,
                orTitle: '', // 主题
                emergencyLevel: '', // 紧急等级
                orNumber: '', // 工单编号
                orType: '', // 工单类型 [咨询--T1、举报--T2、建议--T3、交易纠纷--T4、纠错--T5、投诉--T6、回访--T7]
                startTime: '', // 开始时间
                endTime: '', // 结束时间
                source: ''
            },
            orTypeOption: [
                { value: "全部", number: '' },
                { value: "咨询", number: "T1" },
                { value: "举报", number: "T2" },
                { value: "建议", number: "T3" },
                { value: "交易纠纷", number: "T4" },
                { value: "纠错", number: "T5" },
                { value: "投诉", number: "T6" },
                { value: "回访", number: "T7" }
            ],
            sourceOption: [
                { text: "全部", value: '' },
                { text: "商家PC", value: "P1E1" },
                { text: "平台PC", value: "P2E1" },
                { text: "房地产PC", value: "P3E1" },
                { text: "用户PC", value: "P4E1" },
                { text: "用户IOS", value: "P4E2" },
                { text: "用户Android", value: "P4E3" },
                { text: "用户wap", value: "P4E4" },
                { text: "用户wehchat", value: "P4E5" },
                { text: "用户QQ", value: "P4E6" },
                { text: "用户app", value: "P4E7" },
                { text: "商家app", value: "P1E7" },
                { text: "客户（非平台工单）", value: "P5" },
            ],
            orPlateOption: [
                { text: "全部", value: '' },
                { text: "待受理工单", value: 1 },
                { text: "待处理工单", value: 2 },
                { text: "待提交工单", value: 3 },
                { text: "待回访工单", value: 4 },
                { text: "已完成工单", value: 6 },
                { text: "已撤销工单", value: 7 },
            ],
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
    computed: {
        sheetData() {
            return this.$store.state.sheetData
        }
    },

    methods: {
        changeStartTime() {
            let _start = Date.parse(this.postData.startTime);
            let _end = Date.parse(this.postData.endTime);
            if (_start > _end) {
                this.postData.endTime = '';
            }
            console.log(_start, _end, 'changeStartTime');
            this.pickerOptionsEnd = {
                disabledDate: (time) => {
                    if (this.postData.startTime && this.postData.startTime !== '') {
                        return time.getTime() - 86400000 < _start;
                    }
                }
            }
        },
        changeEndTime() {
            let _start = Date.parse(this.postData.startTime);
            let _end = Date.parse(this.postData.endTime);
            if (_start > _end) {
                this.postData.startTime = '';
            }
            console.log(_start, _end, 'changeEndTime');
            this.pickerOptionsStart = {
                disabledDate: (time) => {
                    if (this.postData.endTime && this.postData.endTime !== '') {
                        return time.getTime() + 86400000 > _end;
                    }
                }
            }
        },
        /**
         *  根据value 获取 text
         */
        getTypeValueText(type, value) {
            // console.log(this.sheetData[type].find(n => n.value === value), type, value , 'this.sheetData[type].find(n => n.value === value)');
            let _typeData = this.sheetData[type].find(n => n.value === value);
            return _typeData ? _typeData.text : '';
        },
        /**
         * 搜索按钮
         */
        onSubmit() {
            console.log('submit!');
            this.searchList();
        },

        /**
         * 跳转到工单处理结果
         */
        workListDetails(id, showType) {
            this.$router.push({                path: `/workListDetails/${id}`, query: {
                    type: showType
                }            })
        },

        /**
         * 跳转到来源工单
         */
        workListSource(id, showType) {
            this.$router.push({                path: `/workListSource/${id}`, query: {
                    type: showType
                }            })
        },

        /**
         * 跳转到交易纠纷
         */
        workListLook(id, showType) {
            this.$router.push({                path: `/workListLook/${id}`, query: {
                    type: showType,
                }            })
        },
        toDetail(sheetType, sheetId, showType) {
            if (sheetType === '交易纠纷') {
                // 交易纠纷
                this.$router.push({                    path: `/workListLookReportDispute/${sheetId}`, query: {
                        type: showType,
                    }                })
            } else {
                //来源页面
                this.$router.push({                    path: `/workListSource/${sheetId}`, query: {
                        type: showType
                    }                })
            }
        },
        /**
         * 页码
         * @param val
         */
        handleSizeChange(val) {
            this.postData.pageSize = val;
            this.searchList();
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            this.postData.pageNum = val;
            this.searchList();
            console.log(`当前页: ${val}`);
        },
        searchList() {
            // selectCServiceSheetList.call(this,this.postData).then(res => {
            let _postData = {
                pageNum: 1,
                pageSize: 10,
            };
            for (let key in this.postData) {
                if (this.postData[key]) {
                    _postData[key] = this.postData[key];
                }
            }
            selectCServiceSheetList.call(this, _postData).then(res => {
                if (res.Code === 1) {
                    this.total = res.Data.total;
                    this.tableData = res.Data.list;
                    // console.log(this.tableData, 'tableData');
                } else {
                    this.$message.error('系统异常')
                }
            });
        }

    },

    // keep-alive 组件激活时调用，如果不走缓存请使用其他生命周期钩子，例如 mounted
    activated() {
        this.searchList();
        //,this.$store.getters.getTypeValueText('VistHistory','VERYGOOD')
        // console.log(this.sheetData, '*************',this.getTypeValueText('VistHistory','VERYGOOD'))
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
</style>
