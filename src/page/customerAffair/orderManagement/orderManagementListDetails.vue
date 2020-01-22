<template>
    <div>
        <!--营业执照到期开始-->
        <el-card class="box-card">
            <div
                slot="header"
                class="clearfix"
            >
                <b class="mr10">订单详情</b>
            </div>
            <div class="text item">
                <el-row style="padding: 0 10%">
                    <el-form
                        label-width="150px"
                        size="mini"
                    >
                        <el-form-item label="订单号：">{{ resData.orderNo }} <el-link
                                type="danger"
                                class="ml20"
                            >{{ resData.statusText }}</el-link>
                        </el-form-item>
                        <el-form-item label="下单时间：">{{ resData.createAt }}</el-form-item>
                        <el-form-item label="支付方式：">{{ resData.payType }}</el-form-item>
                        <el-form-item label="当前订单状态：">{{ resData.statusText }}</el-form-item>
                        <el-form-item
                            label="订单取消时间："
                            v-if="resData.cancelAt"
                        >{{ resData.cancelAt }}</el-form-item>
                        <el-form-item
                            label="订单取消原因："
                            v-if="resData.cancelReason"
                        >{{ resData.cancelReason }}</el-form-item>
                        <!--<el-form-item label="状态更新时间：">.....</el-form-item>-->
                        <el-form-item label="买家姓名：">{{ resData.buyer && resData.buyer.name }}</el-form-item>
                        <el-form-item label="买家联系方式：">{{ resData.buyer && resData.buyer.mobile }}</el-form-item>
                        <el-form-item
                            label="物流信息："
                            v-if="expressInfo && expressInfo.packages && expressInfo.packages.length > 0"
                        >
                            <el-link
                                type="primary"
                                @click="openExpress()"
                            >查看物流信息</el-link>
                        </el-form-item>
                        <el-form-item
                            label="物流信息："
                            v-else
                        > 暂无物流信息 </el-form-item>
                    </el-form>
                </el-row>
            </div>
            <el-divider></el-divider>
            <div
                class="detailstable"
                style="padding: 0 10%"
            >
                <el-form
                    label-width="150px"
                    size="mini"
                >
                    <el-form-item label="卖家姓名：">{{ resData.shop && resData.shop.name }}</el-form-item>
                    <el-form-item label="联系电话：">{{ resData.shop && resData.shop.tel }}</el-form-item>
                </el-form>
                <el-table
                    :data="resData.goods"
                    border
                    style="width: 100%; margin-top: 20px;"
                >
                    <el-table-column
                        prop="type"
                        label="商品"
                        align="center"
                        width="500"
                    >
                        <template slot-scope="scope">
                            <viewer :images=[scope.row.image]>
                                <img
                                    :src="scope.row.image"
                                    style="width: 50px; height: 25px; verticalAlign: 'middle'"
                                />
                            </viewer>
                            {{scope.row.title}}
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="spec"
                        label="规格"
                        align="center"
                        width=""
                    >
                    </el-table-column>
                    <el-table-column
                        prop="sellPrice"
                        label="单价"
                        align="center"
                        width=""
                    >
                    </el-table-column>
                    <el-table-column
                        prop="quantity"
                        label="数量"
                        align="center"
                        width=""
                    >
                    </el-table-column>
                    <el-table-column
                        prop="all_money"
                        label="小计"
                        align="center"
                        width=""
                    >
                        <template slot-scope="scope">
                            {{mathCompute('mul', [scope.row.sellPrice,scope.row.quantity])}}
                        </template>
                    </el-table-column>
                </el-table>
                <el-form
                    label-width="150px"
                    size="mini"
                    class="mt20"
                >
                    <el-form-item label="平台补贴：">买家已享受{{mathCompute('add', [resData.payment && resData.payment.platformDiscount || 0,resData.payment && resData.payment.platActivityMoney || 0])}}元额外优惠，由平台补贴</el-form-item>
                    <el-form-item label="买家留言：">{{ resData.message }}</el-form-item>
                    <el-form-item label="发票信息：">{{ resData.invoiceTitle }}</el-form-item>
                    <el-form-item label="纳税人识别号：">{{ resData.invoiceCode }}</el-form-item>
                    <el-form-item label="支付时间：">{{ resData.payAt || "--" }}</el-form-item>
                    <el-form-item label="接单时间：">{{ resData.acceptAt || "--" }}</el-form-item>
                    <el-form-item label="发货时间：">{{ resData.shipAt || "--" }}</el-form-item>
                </el-form>
                <el-divider></el-divider>
                <el-form
                    label-width="150px"
                    size="mini"
                    class="mt20"
                >
                    <el-form-item label="商品总价：">{{resData.payment && resData.payment.sellMoney || 0 }}</el-form-item>
                    <el-form-item label="运费：">{{ resData.payment && resData.payment.realFreight || 0 }}</el-form-item>
                    <el-form-item label="商品优惠：">{{ resData.payment && resData.payment.shopDiscount || 0 }}</el-form-item>
                    <el-form-item label="店铺优惠券：">{{ resData.payment && resData.payment.shopCouponMoney  || 0 }}</el-form-item>
                    <el-form-item label="满意券：">{{ resData.payment && resData.payment.voucherMoney || 0 }}</el-form-item>
                    <el-form-item label="满意豆：">{{ resData.payment && resData.payment.beanMoney || 0 }}</el-form-item>
                    <el-form-item label="订单总额：">{{ resData.payment && resData.payment.payMoney || 0 }}</el-form-item>
                    <el-form-item
                        style="color: red"
                        label="实收款："
                    >￥{{ resData.payment && resData.payment.payMoney  || 0 }}</el-form-item>
                </el-form>
                <el-button
                    type="primary"
                    @click="back"
                    style="margin-left: 150px;"
                >返回</el-button>
            </div>
        </el-card>
        <!--营业执照到期结束-->

        <el-dialog
            title="提示"
            :visible.sync="dialogVisible"
            width="40%"
        >
            <div class="wllist">
                <el-form size="mini">
                    <el-form-item label="收件人姓名：">{{ expressInfo.acceptName }} </el-form-item>
                    <el-form-item label="收件人电话：">{{ expressInfo.mobile }} </el-form-item>
                    <el-form-item label="收货地址：">{{ expressInfo.address }} </el-form-item>
                </el-form>
                <el-form
                    v-for="(item,index) in expressInfo.packages"
                    :key="index"
                    size="mini"
                >
                    <el-form-item label="物流公司：">{{ item.expressName ? item.expressName : '-' }} </el-form-item>
                    <el-form-item label="物流单号：">{{ item.expressNo ? item.expressNo : '-'}} </el-form-item>
                    <el-form-item label="物流状态：">{{ item.expressStatus ? item.expressStatus : '-'}} </el-form-item>
                    <!--<el-form-item label="">2019-09-21 20:14:06 <span class="ml20">正快递员送货</span></el-form-item>-->
                    <div v-if="item.expressContextList">
                        <ul>
                            <li
                                v-for="(it,inx) in item.expressContextList"
                                :key="inx"
                            >{{ it.content }} &emsp; {{ it.time }} </li>
                        </ul>
                    </div>
                    <div v-else>
                        <p> 暂无详细信息... </p>
                    </div>
                </el-form>
            </div>
            <span
                slot="footer"
                class="dialog-footer"
            >
                <el-button
                    type="primary"
                    @click="dialogVisible = false"
                >我知道了</el-button>
            </span>
        </el-dialog>
        <bottom-footer></bottom-footer>
    </div>
</template>

<script>
import headTop from '../../../components/headTop'
import bottomFooter from '../../../components/bottomFooter'
import GetOrderDetail from '../../../api/customerAffair/getOrderDetail'
import GetExpressInfo from '../../../api/customerAffair/getExpressInfo'
import { Add, Sub, Mul, Div } from '../../../config/numUtils'



export default {
    components: {
        headTop,
        bottomFooter,
    },
    data() {
        return {
            dialogVisible: false,
            tableData: [{
                type: '2019-5-2',
                come: '15',
                answerPhone: '12',
                notAnswerPhone: '30',
                completedComplete: '5',
                Processing: '10',
                returnVisit: '90%',
            },],//
            userInfo: JSON.parse(window.sessionStorage.getItem('USER_INFO')),
            id: this.$route.params.id,
            resData: {},
            expressInfo: {},
        }
    },

    methods: {
        mathCompute(type, arr, d) {
            switch (type) {
                case 'add':
                    return Add(arr, d);
                    break;
                case 'sub':
                    return Sub(arr, d);
                    break;
                case 'mul':
                    return Mul(arr, d);
                    break;
                case 'dev':
                    return Div(arr, d);
                    break;
            }
        },
        init() {
            GetOrderDetail.call(this, { orderNo: this.id }).then(res => {
                if (res.Code === 1) {
                    this.resData = res.Data;
                }
            });
        },
        getExpressInfo() {
            GetExpressInfo.call(this, { orderNo: this.id }).then(res => {
                if (res.Code === 1) {
                    this.expressInfo = res.Data;
                }
            });
        },
        openExpress() {
            this.dialogVisible = true;
        },
        back() {
            // this.$router.push({ path: '/auditChangeCompany' });
            this.$router.back(-1);
        },
    },

    created() {
        this.init();
        this.getExpressInfo();
    }
}
</script>

<style lang="less" scoped>
.box-card {
    margin-bottom: 20px;
}

.detailstable {
    margin-top: 20px;
}
</style>
