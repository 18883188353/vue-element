import { GetChatAcctount } from '@/api/Txy/GetAllChatAccount';
import account from './account'

const state = {
  identifier: '',
  userSig: '',
  isTxyLogin: false,
  newMsgRecord: 0,
  newMsgData: []
}

const getters = {
  // 当前商家身份
  loginInfo(state) {  
    return  {
      sdkAppID: 1400065004, //商家所属应用id,必填
      identifier: state.identifier, //当前商家ID,必须是否字符串类型，必填
      accountType: 22165, //商家所属应用帐号类型，必填
      userSig: state.userSig, //当前商家身份凭证，必须是字符串类型，必填
      identifierNick: account.state.storeName, //当前商家昵称，不用填写，登录接口会返回用户的昵称，如果没有设置，则返回用户的id
      headurl: account.state.pcLogo //当前商家默认头像，选填，如果设置过头像，则可以通过拉取个人资料接口来得到头像信息
    }
  },
}

const mutations = {
  setSimpleData(state, res) {
    state[res.name] = res.value
  }
}

const actions = {
  /**
   * 获取当前商家txy账号
   * @param {object} param 
   */
  getChatInfo({commit, dispatch}) {
    GetChatAcctount.call(this, `?clientTimespan=${eventBus.$Tool.formatDate(new Date)}`).then(res => {
      if (res.data.code === 1) {
        const { qc_account, qc_sign } = res.data.data
        commit('setSimpleData', {   //腾讯云账号
          name: 'identifier',
          value: qc_account
        })
        commit('setSimpleData', {   //用户签名
          name: 'userSig',
          value: qc_sign
        })   
        dispatch('txyLogin')
      } else {
        // eventBus.$message.error(res.data.desc)
      }
    })
  },

  /**
   * 登录txy
   * @param {object} param 
   */
  txyLogin({getters, commit}) {
    const listeners = {
      // 监听连接状态回调变化事件,必填
      onConnNotify: onConnNotify,  
      // IE9(含)以下浏览器用到的 jsonp 回调函数
      jsonpCallback: jsonpCallback,  
      // 监听新消息(私聊，普通群(非直播聊天室)消息，全员推送消息)事件，必填
      onMsgNotify: onMsgNotify,
    }

    webim.login(
      getters.loginInfo, listeners,
      {   // 控制台不要打印日志
        isLogOn: false,
      }, resp => {
        console.log(resp)
        commit('setSimpleData', {   //登陆成功
          name: 'isTxyLogin',
          value: true
        })
      }, () => {
        eventBus.$message.error('腾讯云聊天登录失败')
      }
    )
  }
}

/**
 * 连接状态
 */
function onConnNotify(resp) {   
  let info;
  switch (resp.ErrorCode) {
    case webim.CONNECTION_STATUS.ON:
      webim.Log.warn('建立连接成功: ' + resp.ErrorInfo);
      break;
    case webim.CONNECTION_STATUS.OFF:
      info = '连接已断开，无法收到新消息，请检查下您的网络是否正常: ' + resp.ErrorInfo;
      webim.Log.warn(info);
      break;
    case webim.CONNECTION_STATUS.RECONNECT:
      info = '连接状态恢复正常: ' + resp.ErrorInfo;
      webim.Log.warn(info);
      break;
    default:
      webim.Log.error('未知连接状态: =' + resp.ErrorInfo);
      break;
  }
}

/**
 * 兼容IE9
 */
function jsonpCallback(rspData) {   
  webim.setJsonpLastRspData(rspData);
}

function onMsgNotify(newMsgList) {
  state.newMsgRecord += newMsgList.length 
  state.newMsgData = newMsgList
}




export default {
  state,
  getters,
  mutations,
  actions
}
