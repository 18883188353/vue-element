<template>
    <div class="fillcontain">
        <div class="welcome-content">欢迎您： {{ userInfo.rel_name }}</div>
        <!--今日数据开始-->
        <el-card class="box-card">
            <div slot="header">
                <b>今日数据</b>
            </div>
            <div class="text item">
                <el-row :gutter="24">
                    <el-col
                        class="one-info"
                        v-for="(n, idx) in auditData"
                        :key="idx"
                        :xs="6"
                        :sm="6"
                        :md="6"
                        :lg="6"
                        :xl="4"
                    >
                        <el-card shadow="always">
                            <div class="today_list">
                                <div class="top">
                                    <div class="content">
                                        <p>{{ n.name }}</p>
                                        <span>{{ n.allCount }}</span>
                                    </div>
                                </div>
                                <div class="bottom">
                                    <ul>
                                        <li>审核通过：{{ n.pass }}</li>
                                        <li>未通过：{{ n.notPass }}</li>
                                        <li>待审核：{{ n.waitCount }}</li>
                                        <li>
                                            <el-link
                                                type="primary"
                                                @click="goAudit(n.path)"
                                            >立即审核</el-link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                </el-row>
            </div>
        </el-card>
        <!--今日数据结束-->
        <bottom-footer></bottom-footer>
    </div>
</template>

<script>
import bottomFooter from '../../components/bottomFooter'
import AuditCount from '../../api/audit/auditCountInfo'

export default {
    components: {
        bottomFooter,
    },
    data() {
        return {
            userInfo: JSON.parse(window.sessionStorage.getItem('USER_INFO')),
            auditData: []
        }
    },

    methods: {
        goAudit(path) {
            this.$router.push({ path: path })
        }
    },

    created() {
        let routers = (this.$router.options.routes)[1].children;
        let query = this.$store.state.menu.waitAuditResult;
        let queryResult = new Array();
        for (let key in query) {
            queryResult.push({
                name: key,
                systemType: query[key].systemType,
                queryTypes: query[key].queryTypes
            })
        }

        AuditCount.call(this, queryResult).then(res => {
            console.log(res, 'res ===>>> ')
            if (res.Code === 1) {
                let apiResult = res.Data;

                let result = new Array();
                let keys = Object.keys(apiResult);
                for (let i = 0; i < keys.length; i++) {
                    let key = keys[i];
                    let rt = routers.find(n2 => n2.path === key || n2.path === `/${key}`);
                    result.push({
                        ...apiResult[key],
                        name: (rt['meta'].title)[0],
                        path: rt.path
                    })
                }
                this.auditData = result;
            }
        })
    }
}
</script>

<style lang="less" scoped>
.welcome-content{
    width: 100%;
    height: 45px;
    line-height: 45px;
    padding-left: 20px;
    background-color: #11ccf6;
    font-size: 18px;
    font-weight: 400;    
}
.box-card {
    margin-bottom: 20px;
}
.one-info {
    margin-bottom: 20px;
}

.today_list {
    .top {
        width: 100%;
        height: auto;
        display: table;
        .content {
            width: 100%;
            height: 100px;
            text-align: center;
            vertical-align: middle;
            border-bottom: 1px #eaeaea solid;
            display: table-cell;
            p {
                font-size: 18px;
                vertical-align: middle;
            }
            span {
                font-size: 30px;
                color: #25ada3;
            }
        }
    }
    .bottom {
        width: 100%;
        height: auto;
        ul {
            width: 100%;
            height: auto;
            li {
                width: 50%;
                float: left;
                //text-align: center;
                margin-top: 20px;
            }
            &:after {
                clear: both;
                display: block;
                content: "";
            }
        }
    }
    &:after {
        clear: both;
        display: block;
        content: "";
    }
}
</style>
