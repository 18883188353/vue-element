<template>
    <div class="fillcontain">

        <div class="main">

            <!--纠错工单-->
            <work-list-look-error v-if=" workListShow === 1 "></work-list-look-error>

            <!--用户举报工单-->
            <work-list-look-report-user v-if="workListShow === 2 "></work-list-look-report-user>

            <!--商家建议工单-->
            <work-list-look-proposal v-if=" workListShow === 3 "></work-list-look-proposal>

            <!--商家举报工单-->
            <work-list-look-report-business v-if="workListShow === 4 "></work-list-look-report-business>

            <!--交易纠纷工单-->
            <work-list-look-report-dispute v-if="workListShow === 5"></work-list-look-report-dispute>

        </div>

    </div>
</template>

<script>
    import headTop from '../../components/headTop'
    import WorkListLookError from "./workListLookError";
    import WorkListLookProposal from "./workListLookProposal";
    import WorkListLookReportUser from "./workListLookReportUser";
    import WorkListLookReportBusiness from "./workListLookReportBusiness";
    import WorkListLookReportDispute from "./workListLookReportDispute";
    export default {
        components: {
            WorkListLookReportDispute,
            WorkListLookReportBusiness,
            WorkListLookReportUser,
            WorkListLookProposal,
            WorkListLookError,
            headTop,
        },
        data(){
            return {
                workListShow: 1,
                sheetId : this.$route.params.id,
                sheetType: this.$route.query.sheetType,
                type: this.$route.query.type,
            }
        },

        methods:{

        },

        created(){
            console.log(this.sheetId, this.sheetType, this.type , '11111111111');
            switch (this.sheetType) {
                case 'T1':
                    //咨询
                    this.workListShow = 1;
                    break;
                case 'T2':
                    //咨询
                    this.workListShow = 1;
                    break;
                case 'T3':
                    //咨询
                    this.workListShow = 1;
                    break;
                case 'T4':
                    //咨询
                    this.workListShow = 1;
                    break;
                case 'T5':
                    //咨询
                    this.workListShow = 1;
                    break;
                case 'T6':
                    //咨询
                    this.workListShow = 1;
                    break;
                case 'T7':
                    //咨询
                    this.workListShow = 1;
                    break;
            }
        }
    }
</script>

<style lang="less" scoped>

</style>
