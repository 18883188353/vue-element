<template>
    <div class="fillcontain mb30">
        <!--选择模板弹窗-->
        <el-dialog
            title="选择模板"
            :visible.sync="dialogTableVisible"
            :modal-append-to-body="false"
            :close-on-click-modal="false"
            :show-close="false"
        >
            <el-table
                ref="templateTable"
                :data="templateList"
                tooltip-effect="dark"
                border
                class="template-table"
                @selection-change="handleSelectionChange"
            >
                <el-table-column
                    type="selection"
                    align="center"
                    width="50"
                >
                </el-table-column>
                <el-table-column
                    prop="messageType"
                    label="模板类型"
                    align="center"
                    width="100"
                >
                    <template slot-scope="scope">
                        <span v-if="scope.row.messageType === 1">节日祝福</span>
                        <span v-else-if="scope.row.messageType === 2">售后反馈</span>
                        <span v-else-if="scope.row.messageType === 3">任务派送</span>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="templateName"
                    label="模板名称"
                    align="center"
                    minWidth="160"
                    show-overflow-tooltip
                >
                </el-table-column>
                <el-table-column
                    prop="templateContent"
                    label="模板内容"
                    align="center"
                    minWidth="300"
                    show-overflow-tooltip
                >
                </el-table-column>
            </el-table>
            <div
                slot="footer"
                class="dialog-footer"
            >
                <el-button @click="dialogTableVisible = false">取 消</el-button>
                <el-button
                    type="primary"
                    @click="selectTemplate"
                >确 定</el-button>
            </div>
        </el-dialog>
        <!--选择对象弹窗-->
        <el-dialog
            title="接收对象"
            :visible.sync="chooseObject"
            :modal-append-to-body="false"
            :close-on-click-modal="false"
            width="760px"
        >
            <el-form
                ref="userQueryForm"
                :model="userQueryCondition"
                :inline="true"
                label-width="100px"
            >
                <el-form-item
                    label="用户类型："
                    prop="userType"
                >
                    <el-select
                        v-model="userQueryCondition.userType"
                        placeholder="请选择用户类型"
                        class="query-w"
                    >
                        <el-option
                            label="商家"
                            :value="1"
                        >
                        </el-option>
                        <el-option
                            label="用户"
                            :value="2"
                        >
                        </el-option>
                        <el-option
                            label="平台"
                            :value="3"
                        >
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item
                    :label="userQueryCondition.userType === 1 ? '店铺名称：' : '姓名：'"
                    prop="userName"
                >
                    <el-input
                        type="text"
                        v-model="userQueryCondition.userName"
                        clearable
                        placeholder="请输入用户名称"
                        class="query-w"
                    ></el-input>
                </el-form-item>
                <el-form-item
                    label="电话："
                    prop="userPhone"
                >
                    <el-input
                        type="text"
                        v-model="userQueryCondition.userPhone"
                        clearable
                        placeholder="请输入电话"
                        class="query-w"
                    ></el-input>
                </el-form-item>
                <el-form-item
                    :label="userQueryCondition.userType === 1 ? '公司名称' : '账号：'"
                    prop="userAccount"
                >
                    <el-input
                        type="text"
                        v-model="userQueryCondition.userAccount"
                        clearable
                        placeholder="请输入用户账号"
                        class="query-w"
                    ></el-input>
                </el-form-item>
                <el-form-item label-width="0px">
                    <el-button
                        type="primary"
                        @click="userQuery"
                    >查询</el-button>
                </el-form-item>
            </el-form>
            <p class="hints">*请输入条件搜索(至少输入或选择一个查询条件)</p>
            <el-table
                ref="userTable"
                :data="userList"
                tooltip-effect="dark"
                style="width: 100%"
            >
                <el-table-column
                    type="selection"
                    align="center"
                    width="50"
                >
                </el-table-column>
                <el-table-column
                    prop="typeStr"
                    label="用户类型"
                    align="center"
                    width="200"
                >
                </el-table-column>
                <el-table-column
                    prop="name"
                    label="名称"
                    align="center"
                >
                </el-table-column>
                <el-table-column
                    prop="phone"
                    label="联系电话"
                    align="center"
                    width="200"
                >
                    <template slot-scope="scope">
                        <span>{{ hidePhone(scope.row.phone) }}</span>
                    </template>
                </el-table-column>
            </el-table>
            <div
                slot="footer"
                class="dialog-footer"
            >
                <el-button @click="chooseObject = false">取 消</el-button>
                <el-button
                    type="primary"
                    @click="getSelects"
                >确 定</el-button>
            </div>
        </el-dialog>
        <el-card class="none-border">
            <div slot="header">
                <b class="mr10">发送短信</b>
            </div>
            <div class="text item">
                <el-row style="padding: 0 5%">
                    <el-col :span="24">
                        <el-col :span="24">
                            <el-card shadow="hover">
                                <h3 class="mb20">新增消息</h3>
                                <el-form
                                    ref="form"
                                    label-width="150px"
                                >

                                    <el-form-item label="发送类型：">
                                        <el-select
                                            v-model="detailEntity.sendType"
                                            placeholder="请选择发送类型"
                                        >
                                            <el-option
                                                label="手动发送"
                                                :value="1"
                                            ></el-option>
                                            <el-option
                                                label="自动发送"
                                                :value="2"
                                            ></el-option>
                                        </el-select>
                                    </el-form-item>
                                    <!--<el-form-item label="发送端口：">
                                        <el-radio
                                            v-model="form.radio"
                                            label="1"
                                        >短信</el-radio>
                                        <el-radio
                                            v-model="form.radio"
                                            label="2"
                                        >PC端站内短信</el-radio>
                                    </el-form-item>-->
                                    <el-form-item label="消息类型：">
                                        <el-select
                                            v-model="detailEntity.messageType"
                                            placeholder="请选择消息类型"
                                        >
                                            <el-option
                                                label="节日祝福"
                                                :value="1"
                                            ></el-option>
                                            <el-option
                                                label="售后反馈"
                                                :value="2"
                                            ></el-option>
                                            <el-option
                                                label="任务派送"
                                                :value="3"
                                            ></el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item
                                        label="发送时间："
                                        v-if="detailEntity.sendType === 2"
                                    >
                                        <el-date-picker
                                            v-model="detailEntity.makeSendTime"
                                            type="datetime"
                                            value-format="yyyy-MM-dd HH:mm:ss"
                                            placeholder="选择日期时间"
                                        >
                                        </el-date-picker>
                                    </el-form-item>
                                    <el-form-item label="发送内容：">
                                        <el-input
                                            type="textarea"
                                            v-model="detailEntity.smsContent"
                                            placeholder="请输入发送内容"
                                            :autosize="{ minRows: 4, maxRows: 8}"
                                        ></el-input>
                                        <el-button
                                            type="primary"
                                            class="mt10"
                                            @click="queryTemplate"
                                        >选择模板</el-button>
                                    </el-form-item>
                                </el-form>
                                <el-divider></el-divider>

                                <h3
                                    class="mb20"
                                    style="display: inline-block"
                                >接收对象</h3>
                                <span class="fr">
                                    <el-button
                                        type="primary"
                                        size="mini"
                                        @click="chooseObject = true"
                                    >选择对象<i class="el-icon-circle-plus-outline el-icon--right"></i></el-button>
                                    <el-button
                                        type="primary"
                                        size="mini"
                                        @click="getSelectsByDelete"
                                    >批量移除<i class="el-icon-delete el-icon--right"></i></el-button>
                                </span>

                                <el-table
                                    ref="selectUserTable"
                                    :data="selectUserResults"
                                    border
                                    tooltip-effect="dark"
                                    style="width: 100%"
                                >
                                    <el-table-column
                                        type="selection"
                                        align="center"
                                        width="50"
                                    >
                                    </el-table-column>
                                    <el-table-column
                                        type="index"
                                        align="center"
                                        width="50"
                                    >
                                    </el-table-column>
                                    <el-table-column
                                        prop="typeStr"
                                        label="用户类型"
                                        align="center"
                                        width="200"
                                    >
                                    </el-table-column>
                                    <el-table-column
                                        prop="name"
                                        label="客户姓名"
                                        align="center"
                                    >
                                    </el-table-column>
                                    <el-table-column
                                        prop="phone"
                                        label="联系电话"
                                        align="center"
                                        width="200"
                                    >
                                        <template slot-scope="scope">
                                            <span>{{ hidePhone(scope.row.phone) }}</span>
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </el-card>
                        </el-col>
                    </el-col>
                </el-row>
            </div>
        </el-card>
        <div class="audit-footer">
            <el-button @click="back">返回列表</el-button>
            <span v-if="!readOnly">
                <el-button
                    type="primary"
                    @click="insert"
                    v-if="isInsert"
                >提交</el-button>
                <el-button
                    type="primary"
                    @click="update"
                    v-else
                >提交</el-button>
            </span>
        </div>
    </div>
</template>

<script>
import headTop from '../../components/headTop'
import bottomFooter from '../../components/bottomFooter'

import SMSESBTaskInsert from '../../api/sms/smsESBTaskInsert';
import SMSESBTaskUpdate from '../../api/sms/smsESBTaskUpdate'
import SMSESBTaskDetail from '../../api/sms/smsESBTaskDetail';
import QueryTemplate from '../../api/sms/smsTemplateList';
import QueryUsers from '../../api/user/queryUserByMj';

export default {
    components: {
        headTop,
        bottomFooter,
    },
    data() {
        return {
            isInsert: true, // 是否是添加
            readOnly: this.$route.query.s0 === 0, // 是否只读
            detailEntity: {
                messageType: '',
                sendType: 1,
                smsContent: '',
                makeSendTime: '', // 预约发送时间
                records: []
            },
            templateList: [], // 模板查询列表
            userQueryCondition: { // 用户列表查询条件
                userType: 1,
                userName: '',
                userPhone: '',
                userAccount: ''
            },
            userList: [], // 查询出来的用户列表
            selectUserResults: [], // 选择的用户结果
            dialogTableVisible: false,//是否显示消息模板
            chooseObject: false,//是否显示选择对象
        }
    },
    mounted() {
        let id = this.$route.params.id;
        if (id && id != 0) {
            this.isInsert = false;
            this.init(id);
        }
    },
    methods: {
        init(id) {
            SMSESBTaskDetail.call(this, { id: id }).then(res => {
                if (res.Code === 1) {
                    this.detailEntity = res.Data;
                    this.selectUserResults = res.Data.records.map(n => {
                        return {
                            id: n.id,
                            name: n.userName,
                            phone: n.userPhone,
                            type: n.userType,
                            typeStr: n.userTypeStr
                        }
                    });
                } else {
                    this.$message.error(res.Desc);
                }
            });
        },
        queryTemplate() {
            if (this.detailEntity.messageType) {
                this.dialogTableVisible = true;
                this.templateList = new Array();
                QueryTemplate.call(this, { messageType: this.detailEntity.messageType }).then(res => {
                    if (res.Code === 1) {
                        this.templateList = res.Data.list;
                    } else {
                        this.$message.error('查询模板失败');
                        this.dialogTableVisible = false;
                    }
                })
            } else {
                this.$message.warning('请先选择消息类型');
            }
        },
        /**
         * 选择模板
         * @param val
         */
        handleSelectionChange(val) {
            console.log(val, '选择模板');
            if (val.length > 1) {
                this.$refs.templateTable.clearSelection();
                this.$refs.templateTable.toggleRowSelection(val.pop());
            }
        },
        selectTemplate() {
            let selects = this.$refs.templateTable.selection;
            console.log('selectsTemplate ', selects)
            if (selects.length === 0) {
                this.$message.warning('还未选择模板');
                return;
            }
            this.detailEntity.smsContent = selects[0].templateContent;
            this.dialogTableVisible = false;
        },
        userQuery() {
            if (!this.userQueryCondition.userType) {
                this.$message.warning('请先选择用户类型进行查询');
                return;
            }
            if (!this.userQueryCondition.userName && !this.userQueryCondition.userPhone && !this.userQueryCondition.userAccount) {
                this.$message.warning('至少输入或选择一个查询条件');
                return;
            }
            QueryUsers.call(this, this.userQueryCondition).then(res => {
                if (res.Code === 1) {
                    this.userList = res.Data.map(n => {
                        let typeStr = '';
                        switch (this.userQueryCondition.userType) {
                            case 1: typeStr = "满集商家"; break;
                            case 2: typeStr = "满集用户"; break;
                            case 3: typeStr = "平台用户"; break;
                            default: break;
                        }
                        n.type = this.userQueryCondition.userType;
                        n.typeStr = typeStr;
                        return n;
                    });
                } else {
                    this.$message.error(res.Desc)
                }
            })
        },
        getSelects() {
            let selects = this.$refs.userTable.selection;
            console.log('当前选择 ===>>>', selects);
            let count = this.selectUserResults.length + selects.length;
            if (count > 10) {
                this.$message.warning(`最多选择10位接收人，当前选择${count}位`);
                return;
            }
            for (let i = 0; i < selects.length; i++) {
                if (!selects[i].phone) {
                    this.$message.warning(`第${i + 1}条数据无手机号码信息，无法选择`);
                    return;
                }
            }
            if (selects && selects.length > 0) {
                // 已存在电话
                let rep = new Array();
                // 合并两个数组并数组去重，去除重复电话号码
                let distinct = function (arr1, arr2, fn) {
                    let _arr = arr1.concat(arr2), _result = new Array(), _o = {};
                    for (let n of _arr) {
                        if (!_o[n.phone]) {
                            _result.push(n);
                            _o[n.phone] = 1;
                        } else {
                            rep.push(fn(n.phone));
                        }
                    }
                    return _result;
                }
                this.selectUserResults = distinct(this.selectUserResults, selects, this.hidePhone);
                this.chooseObject = false;
                this.$refs.userQueryForm.resetFields();
                this.$refs.userTable.clearSelection();
                this.userList = new Array(); // 查询出来的用户列表                
                if (rep.length > 0) {
                    this.$message.warning('电话[ ' + rep.join(' | ') + ' ]已存在接收对象中');
                }
            } else {
                this.$message.warning('至少选择一位用户');
            }
        },
        getSelectsByDelete() {
            let selects = this.$refs['selectUserTable'].selection;
            if (selects && selects.length > 0) {
                this.selectUserResults = this.selectUserResults.filter(n => selects.every(q => q.id !== n.id));
            } else {
                this.$message.warning('至少选择一条数据移除');
            }
        },
        insert() {
            if (!this.selectUserResults || this.selectUserResults.length === 0) {
                this.$message.warning('至少选择一位接收人');
                return;
            }
            if (this.selectUserResults.length > 10) {
                this.$message.warning('最多选择10位接收人');
                return;
            }
            this.$confirm('确定发送短信吗？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.detailEntity.records = this.selectUserResults.map(n => {
                    return {
                        userType: n.type,
                        userId: n.id,
                        userName: n.name,
                        userPhone: n.phone
                    }
                });
                SMSESBTaskInsert.call(this, this.detailEntity).then(res => {
                    if (res.Code === 1) {
                        this.$message.success('添加成功');
                        this.back();
                    } else {
                        this.$message.error(res.Desc);
                    }
                })
            }).catch(() => { });
        },
        update() {
            if (!this.selectUserResults || this.selectUserResults.length === 0) {
                this.$message.warning('至少选择一位接收人');
                return;
            }
            if (this.selectUserResults.length > 10) {
                this.$message.warning('最多选择10位接收人');
                return;
            }
            this.$confirm('确定修改发送信息吗？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.detailEntity.records = this.selectUserResults.map(n => {
                    return {
                        userType: n.type,
                        userId: n.id,
                        userName: n.name,
                        userPhone: n.phone
                    }
                });
                SMSESBTaskUpdate.call(this, this.detailEntity).then(res => {
                    if (res.Code === 1) {
                        this.$message.success('添加成功');
                        this.back();
                    } else {
                        this.$message.error(res.Desc);
                    }
                })
            }).catch(() => { });
        },


        indexMethod(index) {
            return ++index;
        },
        hidePhone(cellValue) {
            if (Number(cellValue) && String(cellValue).length === 11) {
                var mobile = String(cellValue);
                var reg = /^(\d{3})\d{4}(\d{4})$/;
                return mobile.replace(reg, '$1****$2')
            } else {
                return cellValue;
            }
        },
        back() {
            this.$router.go(-1);
        }

    }
}
</script>
<style>
.template-table {
    width: 100%;
}
.template-table thead .el-table-column--selection .cell {
    display: none;
}
</style>
<style lang="less" scoped>
.hints {
    color: red;
    font-size: 14px;
    text-align: center;
}
.query-w {
    width: 200px;
}
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
</style>
