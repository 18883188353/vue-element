<template>
    <div>
        <div class="main">

            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <b class="mr10">处理操作</b>
                </div>
                <div class="text item">
                    <el-row style="padding: 0 10%">
                        <el-form label-width="300px">
                            <h4>商品发布核实问题：</h4>
                            <el-form-item :label="item.name + '？：'" v-for="(item,index) in problemJson" :key="index">
                                <el-checkbox-group v-if="item.value_type === 1" disabled v-model="item.selectList">
                                    <el-checkbox :label="ra" v-for="(ra,ix) in item.valueOption" :key="ix"></el-checkbox>
                                </el-checkbox-group>

                                <el-radio-group v-if="item.value_type === 2" disabled v-model="item.selectValue">
                                    <el-radio :label="ra" v-for="(ra,ix) in item.valueOption" :key="ix"></el-radio>
                                </el-radio-group>

                                <el-input v-if="item.value_type === 3" disabled v-model="item.selectValue"></el-input>
                            </el-form-item>

                        </el-form>
                        <el-divider></el-divider>
                        <el-form label-width="150px">
                            <h4>调查结果：</h4>
                            <el-form-item label="商家定性：" class="mt20">
                                <el-radio-group disabled v-model="dealShop.resultCode">
                                    <el-radio :label="1">真实商家</el-radio>
                                    <el-radio :label="2">可疑商家</el-radio>
                                    <el-radio :label="3">虚假商家</el-radio>
                                    <el-radio :label="4">其他</el-radio>
                                </el-radio-group>
                            </el-form-item>
                            <el-form-item label="备注：">
                                <el-input disabled v-model="dealShop.resultRemark"></el-input>
                            </el-form-item>
                        </el-form>
                        <el-form label-width="150px">
                            <el-button @click="back">取消</el-button>
                            <el-button type="primary" @click="back">确定</el-button>
                        </el-form>
                    </el-row>
                </div>
            </el-card>

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
                radio: '1',
                input: '',

                problemJson: [],
                dealShop: sessionStorage.getItem('dealShop') ? JSON.parse(sessionStorage.getItem('dealShop')) : {}
            }
        },

        methods:{
            back() {
                this.$router.back(-1);
            },
        },

        created(){
            console.log(this.dealShop, 'dealShop+++++++++++=');
                //有数据  处理
            let _json = this.dealShop.problemJson;
            if (_json) {
                let json = JSON.parse(_json);
                json.map(item =>{
                    switch (item.value_type) {
                        case 1:
                            //多选
                            item.valueOption = item.value ? item.value.split(',') : [];
                            item.selectList = item.selectValue ? item.selectValue.split(',') : [];
                            break;
                        case 2:
                            //单选
                            item.valueOption = item.value ? item.value.split(',') : [];
                            break;
                        case 3:
                            //输入框
                            break;
                    }
                });
                this.problemJson = json;
            }
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
