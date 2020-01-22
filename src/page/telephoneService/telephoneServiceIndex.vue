<template>
    <div class="fillcontain">

        <div class="main">

            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span>电话客服</span>
                    <el-button type="text">今日</el-button>
                    <el-button type="text">本月</el-button>
                    <el-button type="text">上月</el-button>
                    <el-button type="text">年度1111111</el-button>
                </div>
                <div v-for="o in 4" :key="o" class="text item">
                    {{'列表内容 ' + o }}
                </div>
            </el-card>

        </div>

    </div>
</template>

<script>
    import headTop from '../../components/headTop'
    export default {
        components: {
            headTop,
        },
        data(){
            return {


            }
        },

        methods:{

        },

        created(){

        }
    }
</script>

<style lang="less" scoped>


</style>
