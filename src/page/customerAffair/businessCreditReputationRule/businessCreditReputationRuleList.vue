<template>
    <div class="fillcontain">

        <div class="main">

            <div class="mt20 ml20">
                <el-button :type=" isShow == '1' ? 'primary' : '' " round @click="clickBut('1')">信用规则管理</el-button>
                <el-button :type=" isShow == '2' ? 'primary' : '' " round @click="clickBut('2') ">信誉规则管理</el-button>
                <!-- <el-button :type=" isShow == '3' ? 'primary' : '' " round @click="clickBut('3') ">店铺评分规则管理</el-button> -->
            </div>
            <div style="padding: 20px;" v-if="isShow ==='1' ">
                <first :listData="this.listData"></first>
            </div>

            <div style="padding: 20px;" v-if="isShow ==='2' ">
                <second :listData="this.listData"></second>
            </div>

            <div style="padding: 20px;" v-if="isShow ==='3' ">
                <third :listData="this.listData"></third>
            </div>


        </div>

    </div>
</template>

<script>
    import headTop from '../../../components/headTop'
    import first from './first'
    import second from './second'
    import third from './third'
    import { getCookie } from '../../../assets/js/store'

    let show = '1';
    let isEdit = false;

    export default {
        components: {
            headTop,
            first,
            second,
            third,
        },
        data(){
            return {
                isShow: show,
                type: 'primary',
                listData: ''
            }
        },

        methods:{
            clickBut(val) {
                this.listData = '';
                this.isShow = val;
            }

        },

        created(){
            if (isEdit) {
                this.listData = getCookie('listData');
            }
        },

        beforeRouteEnter(to,from,next) {
            switch (from.name) {
                case 'scoringRules':
                    show = '1';
                    isEdit = true;
                    break;
                case 'addNodeRule':
                    show = '1';
                    isEdit = true;
                    break;
                case 'addZeroRule':
                    show = '1';
                    isEdit = true;
                    break;
                case 'reputationScoringRule':
                    show = '2';
                    isEdit = true;
                    break;
                case 'addGradeRule':
                    show = '2';
                    isEdit = true;
                    break;
                case 'addEquityRule':
                    show = '2';
                    isEdit = true;
                    break;
                case 'addScoreRule':
                    show = '3';
                    isEdit = true;
                    break;
            }
            next();
        },
    }
</script>

<style lang="less" scoped>

    .box-card{
        margin-bottom: 20px;
    }
    .page{
        text-align: right;
        padding: 20px;
    }

</style>
