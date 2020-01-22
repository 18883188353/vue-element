import Vue from 'vue'
import Vuex from 'vuex'
// import {getAdminInfo} from '@/api/getData'
import ModuleHost from './host/host';
import sheetData from './sheet/sheetData';
import ModuleMenu from './menu/menu';
import ModuleSocket from './socket/socket';
import ModuleAudit from './audit/audit';
import ModuleLog from './log/log'

Vue.use(Vuex)

const state = {
	adminInfo: {
		avatar: 'default.jpg'
	},
    sheetData
}

const mutations = {
	saveAdminInfo(state, adminInfo){
		state.adminInfo = adminInfo;
	}
}

const actions = {
	async getAdminData({commit}){
		try{
			const res = await getAdminInfo()
			if (res.status == 1) {
				commit('saveAdminInfo', res.data);
				console.log(res.data)
			}else{
				throw new Error(res.type)
			}
		}catch(err){
			// console.log(err.message)
		}
	}
}

export default new Vuex.Store({
	state,
	actions,
    mutations,
    modules: {
        host: ModuleHost,
        menu: ModuleMenu,
        socket: ModuleSocket,
        audit: ModuleAudit,
        log: ModuleLog
    }
    /*getters: {
        getTypeValueText(type,value){
            console.log(type,value,"getTypeValueText -> index");
            let _text = '';
            sheetData.type.map(item => {
                if (value === item.value){
                    _text = item.text;
                }
            });
            return _text;
        }
    }*/
})
