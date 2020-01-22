<template>
    <div class="fillcontain">
        <el-card class="none-border">
            <div slot="header">
                <b class="mr10">商品调价详情</b>
            </div>
            <div class="text item mb30">
                <el-table
                    :data="corePriceList"
                    stripe
                    size="mini"
                    style="width: 100%"
                >
                    <el-table-column
                        prop="Title"
                        label="商品名称"
                        align="center"
                        minWidth="260"
                        show-overflow-tooltip
                    >
                    </el-table-column>
                    <el-table-column
                        prop="goods_text"
                        label="规格"
                        align="center"
                        minWidth="260"
                        show-overflow-tooltip
                    >
                    </el-table-column>
                    <el-table-column
                        prop="old_price"
                        label="原价"
                        align="center"
                        width="90"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="new_price"
                        label="修改后价格"
                        width="90"
                        align="center"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="balance"
                        label="调整额度"
                        width="90"
                        align="center"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="proportion"
                        label="调整比例"
                        align="center"
                        width="90"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="add_time"
                        label="调整时间"
                        width="160"
                        align="center"
                    >
                    </el-table-column>
                </el-table>
            </div>
        </el-card>
        <div class="audit-footer">
            <el-button @click="back">返回列表</el-button>
        </div>
    </div>
</template>
<script>

import GoodsCorePriceRecords from '../../../api/customerAffair/queryGoodsCorePriceRecord';

export default {
    data() {
        return {
            id: this.$route.params.id,
            corePriceList: []
        }
    },
    mounted() {
        this.init();
    },
    methods: {
        init() {
            GoodsCorePriceRecords.call(this, { articleIds: this.id }).then(res => {
                if (res.Code == 1) {
                    this.corePriceList = res.Data;
                } else {
                    this.$message.error(res.Desc)
                }
            })
        },
        back() {
            this.$router.go(-1);
        },
    }
}
</script>
<style lang="less" scoped>
</style>