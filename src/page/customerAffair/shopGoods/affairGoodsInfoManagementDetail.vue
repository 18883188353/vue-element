<template>
    <div class="fillcontain">
        <el-card class="box-card">
            <div slot="header">
                <b class="mr10">商品信息管理详情</b>
            </div>
            <div class="text item">
                <div class="hint">基本信息</div>
                <el-form
                    label-width="150px"
                    size="mini"
                    class="mt20"
                >
                    <el-form-item label="商品类目：">{{resData.sysCategoryNodeList}}</el-form-item>
                    <el-form-item label="商品名称：">{{resData.title}}</el-form-item>
                    <el-form-item label="自行分类：">{{resData.userCategory}}</el-form-item>
                    <el-form-item label="商品品牌：">{{resData.brand}}</el-form-item>
                    <el-form-item label="自动上架时间：">
                        -
                    </el-form-item>
                    <el-form-item label="自动下架时间：">
                        -
                    </el-form-item>
                </el-form>
                <el-divider></el-divider>
                <div class="hint">商品规格</div>
                <el-form
                    label-width="150px"
                    size="mini"
                    class="mt20"
                >
                    <el-form-item label="商品规格：">
                        <a>查看商品明细</a>
                        <el-table
                            :data="resData.specList"
                            border
                            style="width: 400px; margin-top: 20px;"
                        >
                            <el-table-column
                                prop="goodsNo"
                                label="商品编码"
                                align="center"
                                width="80"
                            >
                            </el-table-column>
                            <el-table-column
                                prop="sellPrice"
                                label="销售售价"
                                align="center"
                                width="80"
                            >
                            </el-table-column>
                            <el-table-column
                                prop="store"
                                label="总库存"
                                align="center"
                                width="80"
                            >
                            </el-table-column>
                            <el-table-column
                                prop="specDescList"
                                label="规格"
                                align="center">
                                <template slot-scope="scope">
                                    <ul>
                                        <li v-for="(item, index) in scope.row.specDescList" :key="index">{{item.title}} : {{item.value}}</li>
                                    </ul>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-form-item>
                    <el-form-item class="label_inline" label="商品运费属性：">
                        {{resData.sendAreaCode }}
                    </el-form-item>
                    <el-form-item class="label_inline" label="重量(KG)：">
                        {{resData.weight }}
                    </el-form-item>
                    <el-form-item class="label_inline" label="体积(CM)：">
                        {{resData.volume }}
                    </el-form-item>
                </el-form>
                <el-divider></el-divider>
                <div class="hint">商品相册</div>
                <el-form
                    label-width="150px"
                    size="mini"
                    class="mt20"
                >
                    <el-form-item label="商品相册：">
                        <div class="img_size">
                            <viewer :images="resData.photos">
                                <img
                                    v-for="(img, index) in resData.photos"
                                    :key="index"
                                    :src="img"
                                />
                            </viewer>
                        </div>
                    </el-form-item>
                </el-form>
                <el-divider></el-divider>
                <div class="hint">商品详情</div>
                <el-form
                    label-width="150px"
                    size="mini"
                    class="mt20"
                >
                    <el-form-item label="商品详情：">
                        <div>
                            <viewer :images="resData.goodsContentUrls">
                                <img
                                    v-for="(img, index) in resData.goodsContentUrls"
                                    :key="index"
                                    :src="img"
                                />
                            </viewer>
                        </div>
                    </el-form-item>
                </el-form>
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

import GetArticleGoodsDetails from '../../../api/customerAffair/getArticleGoodsDetails'

export default {
    components: {},
    data() {
        return {
            userInfo: JSON.parse(window.sessionStorage.getItem('USER_INFO')),
            id: this.$route.params.id,
            resData: {},
        }
    },
    mounted() {
        this.init();
    },
    methods: {
        init() {
            GetArticleGoodsDetails.call(this, { articleId: this.id }).then(res => {
                if (res.Code === 1) {
                    if (res.Data) {
                        let _goodsContentUrls = [];
                        res.Data.goodsContent.map(item =>{
                            _goodsContentUrls.push(item.value);
                        });
                        res.Data.goodsContentUrls = _goodsContentUrls;
                    }
                    this.resData = res.Data;
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
        width: 200px;
        margin: 3px;
        display: inline-block;
    }
}
.hint {
    border-left: 3px solid #25ada3;
    padding-left: 10px;
}
.label_inline {
    display: inline-block;
}
</style>
