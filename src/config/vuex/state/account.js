export default {
  state: {
    storeName: '',  // 当前商家昵称
    pcLogo: '',     // 当前商家头像
    shopStatus: '', // 店铺状态 1正常 2冻结 3关闭
    protocolStatus: '', //0为不显示
  },
  mutations: {
    setShopInfo (state, res) {
      state.storeName = res.name;
      state.pcLogo = res.pcLogo
    },
    setShopStatus(state, shopStatus) {
      state.shopStatus = shopStatus;
    },
    setProtocolStatus(state, payload) {
      state.protocolStatus = payload.isShow;
    }
  },
  action: {}
}
