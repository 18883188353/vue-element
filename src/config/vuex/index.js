  import Vue from 'vue'
import Vuex from 'vuex'
import account from './state/account'
import txyChat from './state/txyChat'
import api from './state/api'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    account,
    api,
    txyChat
  }
})
