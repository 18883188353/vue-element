window.mj = {
    /**
     * 运行环境
     * defined 自定义 - 本地开发环境适用
     * devIp 开发环境 IP 访问
     * dev 开发环境网关访问
     * test 测试环境
     * pre 预发布环境
     * prod 正式环境
     */
    model: 'defined',
    /**
     * 自定义接口地址， model不设值 或 值 = defined 时必须有这两个值
     * 线上环境请删除
     */
    defaultHost: 'http://192.168.0.30:8101',
    defaultWs: 'http://192.168.0.30:8101'

}

