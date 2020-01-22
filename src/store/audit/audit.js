export default{
    state: {
        historyQueryCondition: {
            entityId: '',
            taskTypeName: '',
            Auditor: '',
            AuditUserName: ''
        }
    },
    getters:{
        // getResultCount(state, getters, rootState){
        //     return state.result.length;
        // }
        getHistoryQueryCondition: state => {
            return state.historyQueryCondition;
        }
    },
    mutations:{
        setHistoryQueryCondition(state, result){
            state.historyQueryCondition.entityId = result.entityId || '';
            state.historyQueryCondition.taskTypeName = result.taskTypeName || '';
        }
    },
    actions:{
        setHistoryQueryCondition({ state, commit, rootState}, result){
            commit('setHistoryQueryCondition', result);
        }
    }
}