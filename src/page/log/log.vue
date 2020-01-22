<template>
    <div class="log-body color">
        <ul class="log-body gd">
            <li v-for="(n, idx) in logs" :key="idx">{{ n }}</li>
        </ul>
    </div>
</template>
<script>
export default {
    data(){
        return {
            
        }
    },
    computed:{
        logs(){
            return this.$store.getters.getLog;
        }
    }
}
</script>
<style lang="less" scoped>
.color{
    background-color: #272323;
    color: #36aa21;
}
.log-body{
    width: 100%;
    height: 100%;
}
.gd{
    overflow-x: auto
}
    li{
        white-space:nowrap;
    }
</style>