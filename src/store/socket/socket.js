export default{
    state: {
        STOMP_CLIENT: null,
        AUDIT: '/audit',
        LOG: '/log'
    },
    getters:{
        getResultCount(state, getters, rootState){
            return state.result.length;
        },
        getClient(state, getters, rootState){
            return state.STOMP_CLIENT;
        }
    },
    mutations:{
        setResult(state, result){
            state.result = result || new Array();
        },
        setClient(state, result){
            state.STOMP_CLIENT = result;
        }
    },
    actions:{
        setResult({ state, commit, rootState}, result){
            commit('setResult', result);
        },
        setClient({ state, commit, rootState}, result){
            commit('setClient', result);
        }
    }
}