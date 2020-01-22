export default{
    state: {
        log: []
    },
    getters:{
        getLog: state => {
            return state.log;
        }
    },
    mutations:{
        pushLog(state, result){
            // '#/r/n#' 是分隔符
            let arr = result.split('#/r/n#');
            arr.forEach(e => {
                state.log.push(e);    
            });
        }
    },
    actions:{
        pushLog({ state, commit, rootState}, result){            
            commit('pushLog', result);
        }
    }
}