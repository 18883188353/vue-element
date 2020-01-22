<template>
    <div>
        <div class="main">


            <!--营业执照到期开始-->
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <b class="mr10">营业执照到期</b>
                </div>
                <div class="text item">
                    <el-row style="padding: 0 10%">
                        <el-form label-width="150px" size="mini">
                            <el-form-item label="商家店名：">满集旗舰店</el-form-item>
                            <el-form-item label="营业执照到期日期：">2019-5-6</el-form-item>
                            <el-form-item label="经办人姓名：">王五</el-form-item>
                            <el-form-item label="经办人电话：">15123654879</el-form-item>
                            <el-form-item label="负责人姓名：">张柳</el-form-item>
                            <el-form-item label="负责人电话：">13265489612</el-form-item>
                            <el-form-item label="系统提醒记录：">
                                <p>2019-5-5 12：45 短信提醒1次</p>
                                <p>2019-5-5 12：45 短信提醒1次</p>
                            </el-form-item>
                            <el-form-item label="第一次提醒记录：">
                                <p>记录时间 :2019-5-5 12：45</p>
                                <p>记录人:张望</p>
                                <p>记录内容：XXXXXXXXXXX</p>
                            </el-form-item>
                            <el-form-item label="">
                                <el-button type="primary" size="" @click="dialogFormVisible = true">新增记录</el-button>
                            </el-form-item>
                        </el-form>
                    </el-row>
                </div>
            </el-card>
            <!--营业执照到期结束-->

            <el-dialog title="新增提醒记录" :visible.sync="dialogFormVisible">
                <el-form ref="formInline" :model="formInline" label-width="80px" class="demo-form-inline">
                    <el-form-item label="提醒时间:">
                        <el-date-picker v-model="formInline.start" type="datetime" placeholder="拨号时间"></el-date-picker>
                    </el-form-item>
                    <el-form-item label="沟通内容:">
                        <el-input class="mt10" type="textarea" :autosize="{ minRows: 4, maxRows: 8}" placeholder="沟通内容" v-model="formInline.textarea"></el-input>
                    </el-form-item>
                    <el-form-item label="客服:">张三</el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="dialogFormVisible = false">提 交</el-button>
                </div>
            </el-dialog>

            <bottom-footer></bottom-footer>

        </div>

    </div>
</template>

<script>
    import headTop from '../../components/headTop'
    import bottomFooter from '../../components/bottomFooter'
    export default {
        components: {
            headTop,
            bottomFooter,
        },
        data(){
            return {
                formInline: {
                    start: '',
                    textarea: '',
                },
                dialogFormVisible: false,//新增记录弹窗是否显示


            }
        },

        methods:{

        },

        created(){

        }
    }
</script>

<style lang="less" scoped>

    .box-card{
        margin-bottom: 20px;
    }

    .tel_top{
        padding: 20px 10%;
        font-size: 20px;
        i{
            vertical-align: middle;
            font-size: 30px;
            margin-right: 10px;
        }
        button{
            margin-left: 30px;
        }
        b{
            color: #13ce66;
            margin-left: 30px;
            vertical-align: middle;
        }
    }

    .tel_list{
        width: 100%;
        height: auto;
        margin-top: 10px;
        li{
            width: 100%;
            height: auto;
            border-bottom: 1px #eaeaea solid;
            padding: 10px 0;
            span{
                float: right;
            }
            &:after{
                clear: both;
                display: block;
                content: '';
            }
        }
    }

    .callList{
        width: 100%;
        height: auto;
        margin-top: 10px;
        ul{
            width: 100%;
            height: auto;
            display: table;
            li{
                width: auto;
                display: table-cell;
                vertical-align: middle;
                text-align: center;
            }
        }
    }


</style>
