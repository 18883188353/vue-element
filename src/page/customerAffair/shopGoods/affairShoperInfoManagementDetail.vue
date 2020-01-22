<template>
    <div class="fillcontain">
        <el-card class="box-card">
            <div slot="header">
                <b class="mr10">商家信息管理详情</b>
            </div>
            <div class="text item">
                <el-tabs
                    v-model="activeName"
                    type="card"
                >
                    <!--店铺信息-->
                    <el-tab-pane
                        label="店铺信息"
                        name="shop"
                    >
                        <el-form
                            label-width="150px"
                            size="mini"
                            class="mt20"
                        >
                            <el-form-item label="店铺名称：">{{shopInfo.name}}</el-form-item>
                            <el-form-item label="联系电话：">{{shopInfo.mobile}}</el-form-item>
                            <el-form-item label="联系地址：">{{shopInfo.address}}</el-form-item>
                            <el-form-item label="所在区域：">{{shopInfo.area}}</el-form-item>
                            <el-form-item label="pc标志：">
                                <viewer :images=[shopInfo.pcLog]>
                                    <img
                                        :src="shopInfo.pcLog"
                                        style="width: 150px; height: 200px;"
                                    />
                                </viewer>
                            </el-form-item>
                            <el-form-item label="wap标志：">
                                <viewer :images=[shopInfo.wapLog]>
                                    <img
                                        :src="shopInfo.wapLog"
                                        style="width: 150px; height: 200px;"
                                    />
                                </viewer>
                            </el-form-item>
                        </el-form>
                        <!--<el-divider></el-divider>-->
                    </el-tab-pane>

                    <!--公司信息-->
                    <el-tab-pane
                        label="公司信息"
                        name="company"
                    >
                        <el-form
                            label-width="150px"
                            size="mini"
                            class="mt20"
                        >
                            <el-form-item label="公司名称：">{{company.name}}</el-form-item>
                            <el-form-item label="联系电话：">{{company.telephone}}</el-form-item>
                            <el-form-item label="联系地址：">{{company.address}}</el-form-item>
                            <el-form-item label="所在区域：">{{company.area}}</el-form-item>
                            <el-form-item label="营业执照号：">{{company.cardNumber}}</el-form-item>
                            <el-form-item label="营业执照图片：">
                                <viewer :images=[company.cardPics]>
                                    <img
                                        :src="company.cardPics"
                                        style="width: 150px; height: 200px;"
                                    />
                                </viewer>
                            </el-form-item>
                            <el-form-item label="法人名称：">{{company.legalPerson}}</el-form-item>
                            <el-form-item label="法人电话：">{{company.legalPersonMobile}}</el-form-item>
                            <el-form-item label="法人身份证号：">{{company.legalPersonIdcard}}</el-form-item>
                            <el-form-item label="负责人：">{{company.manager}}</el-form-item>
                            <el-form-item label="负责人联系号码：">{{company.managerPhone}}</el-form-item>
                            <el-form-item label="经办人：">{{company.applier}}</el-form-item>
                            <el-form-item label="经办人手机号：">{{company.applierPhone}}</el-form-item>
                        </el-form>
                    </el-tab-pane>
                </el-tabs>
            </div>
        </el-card>
        <div class="audit-footer">
            <el-button
                type=""
                @click="back"
            >返回列表</el-button>
        </div>
    </div>
</template>

<script>

import ShopDetailsInfoByShopId from '../../../api/customerAffair/shopDetailsInfoByShopId'

export default {
    components: {},
    data() {
        return {
            userInfo: JSON.parse(window.sessionStorage.getItem('USER_INFO')),
            id: this.$route.params.id,
            resData: {},
            shopInfo: {}, //店铺信息
            company: {}, //公司信息
            activeName: 'shop', //默认激活
        }
    },
    mounted() {
        this.init();
    },
    methods: {
        init() {
            ShopDetailsInfoByShopId.call(this, { ShopId: this.id }).then(res => {
                if (res.Code === 1) {
                    this.resData = res.Data;
                    if (res.Data.shopInfo) {
                        this.shopInfo = res.Data.shopInfo;
                    }
                    if (res.Data.company) {
                        this.company = res.Data.company;
                    }
                }
            });
        },
        back() {
            // this.$router.push({ path: '/auditChangeCompany' });
            this.$router.back(-1);
        },
    }
}
</script>

<style lang="less">
.img_size {
    img {
        width: 150px;
        height: 100px;
        margin: 3px;
        display: block;
    }
}
.hint {
    border-left: 3px solid #25ada3;
    padding-left: 10px;
}
</style>
