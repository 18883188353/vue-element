export default {
    state: {
        HOST_URL: {
            /*defined: {
                defaultHost: 'http://192.168.0.97:8101',
                defaultWs: 'http://192.168.0.97:8101'
            },*/
            devIp: {
                defaultHost: 'http://192.168.0.30:8101',
                defaultWs: 'http://192.168.0.30:8101'
            },
            dev: {
                defaultHost: 'http://zuul.manjiwangdev.com/cusystem',
                defaultWs: 'http://192.168.0.30:8101'
            },
            test: {
                defaultHost: 'http://zuul.manjiwangtest.com/cusystem',
                defaultWs: 'http://192.168.0.176:8101'
            },
            pre: {
                defaultHost: 'http://prezuul.manjiwang.com/cusystem',
                defaultWs: 'http://prezuul.manjiwang.com/cusystem'
                // defaultWs: 'http://172.16.1.47:8101'
            },
            prod: {
                defaultHost: 'http://zuul.manjiwang.com/cusystem',
                defaultWs: 'http://zuul.manjiwang.com/cusystem'
                // defaultWs: 'http://172.16.1.38:8101'
            }
        }
    },
    getters: {
        getHostUrl: (state) => (model) => {
            return state.HOST_URL[model];
        }
    },
    mutations: {
        setResult(state, result) {

        }
    },
    actions: {
        setResult({ state, commit, rootState }, result) {
            //commit('setResult', result);
        }
    }
}