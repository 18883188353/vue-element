<template>
    <div class="fillcontain">
        <el-card class="box-card">
            <div
                slot="header"
                class="clearfix"
            >
                <b class="mr10">处理操作</b>
            </div>
            <div class="text item">
                <el-row>
                    <div class="info-title">商品发布核实问题</div>
                    <el-form
                        size="mini"
                        label-width="260px"
                        class="mt15"
                        :disabled="disabled"
                    >
                        <el-form-item
                            v-for="(n, idx) in issueList"
                            :key="idx"
                            :label="`${n.name}：`"
                        >
                            <!-- value_type = 1 复选 -->
                            <el-checkbox-group
                                v-if="n.value_type === 1"
                                v-model="n.selectValue"
                            >
                                <el-checkbox
                                    v-for="(v, idx2) in n.valueArray"
                                    :key="idx2"
                                    :label="v"
                                ></el-checkbox>
                            </el-checkbox-group>
                            <!-- value_type = 2 单选 -->
                            <el-radio-group
                                v-else-if="n.value_type === 2"
                                v-model="n.selectValue"
                            >
                                <el-radio
                                    v-for="(v, idx2) in n.valueArray"
                                    :key="idx2"
                                    :label="v"
                                ></el-radio>
                            </el-radio-group>
                            <!-- value_type = 3 文本 -->
                            <el-input
                                v-else-if="n.value_type === 3"
                                v-model="n.selectValue"
                                type="textarea"
                                placeholder="请输入内容"
                                :autosize="{ minRows: 2, maxRows: 6}"
                                style="margin-top: 0px;"
                            ></el-input>
                        </el-form-item>
                    </el-form>
                    <el-divider></el-divider>
                    <div class="info-title">调查结果</div>
                    <el-form
                        label-width="150px"
                        :disabled="disabled"
                    >
                        <el-form-item
                            label="商家定性："
                            class="mt20"
                        >
                            <el-radio-group v-model="result.resultCode">
                                <el-radio :label="1">真实商家</el-radio>
                                <el-radio :label="2">可疑商家</el-radio>
                                <el-radio :label="3">虚假商家</el-radio>
                                <el-radio :label="4">其他</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="备注：">
                            <el-input
                                v-model="result.resultRemark"
                                type="textarea"
                                placeholder="请输入内容"
                            ></el-input>
                        </el-form-item>
                    </el-form>
                </el-row>
            </div>
        </el-card>
        <div class="audit-footer">
            <el-button @click="back">返回列表</el-button>
            <el-button
                type="primary"
                @click="submit" 
                v-if="!disabled"
            >提交</el-button>
        </div>
    </div>
</template>

<script>

import InsertShopDealRecord from '../../api/shopMonitoring/insertShopDealRecord'
import QueryIssueList from '../../api/shopMonitoring/queryIssueList'

export default {
    components: {},
    data() {
        return {
            userInfo: JSON.parse(window.sessionStorage.getItem('USER_INFO')),
            row: {},
            issueList: [],
            result: {
                resultCode: '',
                resultRemark: ''
            },
            disabled: false,
            type: 1
        }
    },

    methods: {
        initIssue() {
            QueryIssueList.call(this, {
                pageIndex: 1,
                pageSize: 999,
                type: this.type
            }).then(res => {
                if (res.Code === 1) {
                    if (res.Data.list) {
                        this.issueList = res.Data.list.map(n => {
                            n.selectValue = '';
                            n.valueArray = n.value ? n.value.split(',') : [];
                            return n;
                        });
                    } else {
                        this.$message.warning('暂未查询到提问信息列表');
                    }
                } else {
                    this.$message.error(res.Desc);
                }
            })
        },
        submit() {
            for (let i = 0; i < this.issueList.length; i++) {
                let e = this.issueList[i];
                if (e.selectValue === '') {
                    this.$message.warning(`请选择/填写${e.name}`);
                    return;
                }
            }
            if (this.result.resultCode === '') {
                this.$message.warning('请选择商家定性');
                return;
            }
            if (this.result.resultRemark === '') {
                this.$message.warning('请填写备注');
                return;
            }

            this.row.type = this.type;
            this.row.problemJson = JSON.stringify(this.issueList);
            this.row.resultCode = this.result.resultCode;
            this.row.resultRemark = this.result.resultRemark;
            this.row.dealUserId = this.userInfo.id;
            this.row.dealUserName = this.userInfo.rel_name;

            InsertShopDealRecord.call(this, this.row).then(res => {
                if (res.Code === 1) {
                    this.$message.success('操作成功');
                    this.back();
                } else {
                    this.$message.error(res.Desc || '操作失败');
                }
            });
        },
        back() {
            this.$router.go(-1);
        }
    },
    mounted() {
        let row = window.sessionStorage.getItem('GOODS_MONITORING_ROW');
        this.row = JSON.parse(row);
        console.log(this.row, 'row')
        if (this.row.shopMonitorDealRecord) {
            this.issueList = JSON.parse(this.row.shopMonitorDealRecord.problemJson);
            this.issueList.forEach(n => n.valueArray = n.value ? n.value.split(',') : []);
            this.result.resultCode = this.row.shopMonitorDealRecord.resultCode;
            this.result.resultRemark = this.row.shopMonitorDealRecord.resultRemark;
            this.disabled = true;
            console.log(this.issueList, 'this.issueList');
        } else {
            this.initIssue();
        }
    }
}
</script>

<style lang="less" scoped>
.box-card {
    margin-bottom: 20px;
}

.tel_top {
    padding: 20px 10%;
    font-size: 20px;
    i {
        vertical-align: middle;
        font-size: 30px;
        margin-right: 10px;
    }
    button {
        margin-left: 30px;
    }
    b {
        color: #13ce66;
        margin-left: 30px;
        vertical-align: middle;
    }
}

.tel_list {
    width: 100%;
    height: auto;
    margin-top: 10px;
    li {
        width: 100%;
        height: auto;
        border-bottom: 1px #eaeaea solid;
        padding: 10px 0;
        span {
            float: right;
        }
        &:after {
            clear: both;
            display: block;
            content: "";
        }
    }
}

.callList {
    width: 100%;
    height: auto;
    margin-top: 10px;
    ul {
        width: 100%;
        height: auto;
        display: table;
        li {
            width: auto;
            display: table-cell;
            vertical-align: middle;
            text-align: center;
        }
    }
}
</style>
