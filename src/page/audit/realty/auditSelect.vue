<template>
    <el-row>
        <!-- 普通文本 -->
        <el-col
            :span="12"
            v-if="type === 'text'"
        >{{ value }}</el-col>
        <!-- 大文本，带边框 -->
        <el-col
            :span="12"
            v-if="type === 'textarea'"
        >
            <div class="intro">
                <vue-scroll>
                    {{ value }}
                </vue-scroll>
            </div>
        </el-col>
        <!-- 图片 -->
        <el-col
            :span="12"
            v-if="type === 'image'"
        >
            <div
                class="img-hw100"
                v-if="value"
            >
                <viewer :images="value.split(',')">
                    <img
                        v-for="url in value.split(',')"
                        :key="url"
                        :src="url"
                    />
                </viewer>
            </div>
            <span v-else> - </span>
        </el-col>
        <!-- 周边 -->
        <el-col
            :span="12"
            v-if="type === 'peripheral'"
        >
            <ul class="peripheral-list">
                <li
                    v-for="(n, idx) in value"
                    :key="idx"
                >{{ n.peripheral_name }}<span class="fr">{{ n.target_distance }}km</span></li>
            </ul>
        </el-col>
        <el-col
            :span="12"
            v-if="isAudit"
        >
            <el-radio-group v-model="oneAudit.audit_status">
                <el-radio :label="1">通过</el-radio>
                <el-radio :label="0">不通过</el-radio>
            </el-radio-group>
        </el-col>
        <el-col
            :span="22"
            v-if="oneAudit.audit_status === 0"
        >
            <el-row class="audit-result mt5">
                <el-col
                    :span="12"
                    class="print-result"
                >
                    <vue-scroll>
                        <el-input
                            type="textarea"
                            :autosize="true"
                            placeholder="请输入不通过理由"
                            v-model="oneAudit.audit_remark"
                        ></el-input>
                    </vue-scroll>
                </el-col>
                <el-col :span="12">
                    <ul>
                        <vue-scroll>
                            <li
                                v-for="(result, idx) in resultSelect"
                                :key="idx"
                                @click="oneAudit.audit_remark += result"
                            >
                                {{ result }}
                            </li>
                        </vue-scroll>
                    </ul>
                </el-col>
            </el-row>
        </el-col>
    </el-row>
</template>
<script>
export default {
    props: {
        type: {
            type: String,
            default: 'text' // text / textarea / image
        },
        isAudit: {
            type: Boolean,
            default: false
        },
        value: [String, Number, Boolean, Date, Array],
        oneAudit: Object,
        resultSelect: Array
    },
    data() {
        return {

        }
    }
}
</script>
<style lang="less" scoped>
.intro {
    height: 150px;
    border: 1px solid #ddd;
    border-radius: 5px;
    padding: 5px;
    margin-right: 15px;
}
.peripheral-list {
    li {
        padding-right: 50px;
    }
}
</style>