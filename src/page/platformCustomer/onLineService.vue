<template>
    <div class="fillcontain">

        <div class="main">

            <el-card class="box-card">
                <div
                    slot="header"
                    class="clearfix"
                >
                    <span>在线客服：</span>
                </div>
                <div class="text item">

                    <div class="onlineservrce">
                        <!--左侧列表-->
                        <div class="box_left">
                            <div class="user">
                                <h4>满集网</h4>
                                <div class="toux">
                                    <img
                                        src="../../assets/img/mj.png"
                                        alt=""
                                    >
                                    <p>{{this.userInfo.rel_name}} <br /> 工号：{{this.userInfo.id}}</p>
                                </div>
                                <div class="search">
                                    <el-input
                                        size="mini"
                                        placeholder="请输入关键词搜索"
                                        v-model="search"
                                    ><i
                                            slot="prefix"
                                            class="el-input__icon el-icon-search"
                                        ></i></el-input>
                                </div>
                            </div>
                            <div class="user_list">
                                <vue-scroll>
                                    <ul>

                                        <li
                                            :class="isUserShow === i ? 'active' : '' "
                                            v-for="(item,i) in leftUserList"
                                            :key="i"
                                            @click="changePersonBtn(item.from_account,i,item.name,item.from_role_type)"
                                        >
                                            <img
                                                :src="item.logo"
                                                alt=""
                                            >
                                            <p>
                                                <em>{{item.name}} <i v-if="item.noRead">{{item.noRead ? item.noRead : ''}}</i></em>
                                                <span>{{item.text}}</span>
                                                <i></i>
                                            </p>
                                        </li>

                                    </ul>
                                </vue-scroll>
                            </div>
                        </div>
                        <!--聊天内容-->
                        <div class="box_main">
                            <div class="top">{{this.titleName}}</div>
                            <div class="chat_content">
                                <div class="chat_srcoll">
                                    <div
                                        class="moreMsg"
                                        @click="moreMsgBtn"
                                        v-if="isShowMore === 0 "
                                    >查看更多历史消息</div>
                                    <div
                                        v-for="(item,i) in historyRecord"
                                        :key="i"
                                        :class="item.id === userInfo.tencentUser.tx_account ? 'right' : 'left' "
                                    >
                                        <div class="time">
                                            <p>
                                                <span>{{item.msg_timestamp}}</span>
                                            </p>
                                        </div>
                                        <div class="content">
                                            <div class="word">

                                                <span v-html="item.text"></span>

                                                <div class="img_cont">
                                                    <viewer :image="[item.img]">
                                                        <img
                                                            v-if="item.img"
                                                            :src="item.img"
                                                            class="img"
                                                        >
                                                    </viewer>
                                                </div>

                                                <div
                                                    class="custom_cont"
                                                    v-if="item.custom"
                                                >
                                                    <div class="custom">
                                                        <div class="pro_img"><img
                                                                :src='item.custom.ImgUrl'
                                                                alt=""
                                                            ></div>
                                                        <div class="details">
                                                            <p>{{item.custom.GoodsTitle}}</p>
                                                            <span>{{item.custom.SellPrice}}</span><del>{{item.custom.MarketPrice}}</del>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                            <div class="lt"></div>
                                            <div class="touxiang">
                                                <!--                                                <img :src="item.from_account !== userInfo.tencentUser.tx_account ? objectInformation.C2cImage : require('../../assets/img/mj.png')" alt="">-->
                                                <img
                                                    src="../../assets/img/mj.png"
                                                    alt=""
                                                >
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="chat_input">
                                <vue-scroll>
                                    <div class="">
                                        <el-input
                                            type="textarea"
                                            :rows="2"
                                            placeholder="请输入内容"
                                            v-model="myMessage"
                                            :autosize="{ minRows: 3, maxRows: 6}"
                                            maxlength="120"
                                            show-word-limit
                                            @keyup.enter.native="toSend()"
                                        ></el-input>
                                    </div>
                                </vue-scroll>
                                <div class="tr mt5">
                                    <el-button
                                        type="primary"
                                        size="medium"
                                        @click="toSend()"
                                    >发送</el-button>
                                </div>
                            </div>
                        </div>
                        <!--右侧用户信息-->
                        <div class="box_right">
                            <div class="user_information">
                                <!--<h3>用户信息</h3>-->
                                <!--<el-form label-position="right" label-width="80px" size="mini">-->
                                <!--<el-form-item label="用户名">张三</el-form-item>-->
                                <!--<el-form-item label="联系电话">123458562022</el-form-item>-->
                                <!--<el-form-item label="性别">男</el-form-item>-->
                                <!--<el-form-item label="年龄">25</el-form-item>-->
                                <!--<el-form-item label="区域">重庆</el-form-item>-->
                                <!--<el-form-item label="最近订单">男童沙滩裤XSS150</el-form-item>-->
                                <!--</el-form>-->
                                <!--<h3 class="mt20">订单信息</h3>-->
                                <!--<el-form label-position="right" label-width="80px" size="mini">-->
                                <!--<el-form-item label="订单名称">男童沙滩裤</el-form-item>-->
                                <!--<el-form-item label="购买店铺">满集旗舰店</el-form-item>-->
                                <!--<el-form-item label="订单编号">1234567890</el-form-item>-->
                                <!--<el-form-item label="订单状态">已发货</el-form-item>-->
                                <!--<el-form-item label="商品单价">2</el-form-item>-->
                                <!--<el-form-item label="商品数量">50</el-form-item>-->
                                <!--<el-form-item label="商品总价">100</el-form-item>-->
                                <!--</el-form>-->
                            </div>
                        </div>
                    </div>

                </div>
            </el-card>

        </div>

    </div>
</template>

<script>
import headTop from '../../components/headTop'
import { throttle, faceDatas, textChangeImg } from '../../assets/js/sdkIM/TxyWeb'
import { tool } from '../../assets/js/tool'
import { leftUserList, getHistory, } from '../../api/platformCustomer/GetAllChatAccount'
import { sendMessage } from '../../websocket/websocket'
export default {
    components: {
        headTop,
    },
    data() {
        return {
            userInfo: JSON.parse(sessionStorage.getItem('USER_INFO')),

            leftUserList: [],//左侧聊天列表
            titleName: '',//当前聊天对象头部名字
            custIdentifier: '',//聊天对象的的账户
            from_role_type: '',//聊天对象0用户，1商家，2客服
            objectInformation: {},//聊天对象的信息(头像和名字)
            isUserShow: '',//左侧当前聊天背景颜色
            historyRecord: [],//聊天历史记录
            isShowMore: 1,//是否显示更多历史记录按钮
            pageNum: 1,//聊天页码
            pageSize: 10,//聊天页码
            type: 0,//0：查询指定用户的所有聊天记录（包含和其他客服的聊天记录） 1：只查询当前客服和指定用户的聊天记录（to_account必传）
            moreMsg: "",//查看更多历史消息
            recentList: [],// 最近联系人列表
            search: '',//搜索
            myMessage: '',//发送消息内容
            isSend: true,// 是否为自己发送
            seq: -1,// 消息序列，-1表示sdk自动生成，用于去重
            information: '',//右侧用户信息内容

            subscribeClient: {} // 订阅对象，离开页面时需要取消订阅，不然会出现重复订阅
        }
    },
    computed: {
        txyloginparameter() {
            return {
                sdkAppID: 1400065004, //商家所属应用id,必填
                identifier: this.userInfo.tencentUser.tx_account, //当前客服ID,必须是否字符串类型，必填
                accountType: 22165, //客服所属应用帐号类型，必填
                userSig: this.userInfo.tencentUser.tx_sign, //当前客服身份凭证，必须是字符串类型，必填
                identifierNick: '', //当前客服昵称，不用填写，登录接口会返回用户的昵称，如果没有设置，则返回用户的id
                headurl: '', //当前客服默认头像，选填，如果设置过头像，则可以通过拉取个人资料接口来得到头像信息
            }
        },

        userValue() {   // 动态获取图片 名字
            return function (arr, Tag) {
                const obj = arr.find(res => res.Tag === Tag)
                return obj.Value
            }
        },
        selSess() {   // 聊天对象
            return new webim.Session('C2C', this.custIdentifier, this.userInfo.username, Math.round(new Date().getTime() / 1000))
        },
        listTime() {     // 比较消息时间与当前时间 比较上下两天消息时间 来判断是否显示 与显示格式
            return function (time, index) {
                let myDate = new Date()
                if (index) {
                    if (time - this.historyRecord[index - 1].time <= 180) {
                        return ''
                    }
                }
                if (this.$Tool.formatDate(myDate.getTime(), 'YYYY-MM-DD') === this.$Tool.formatDate(time * 1000, 'YYYY-MM-DD')) {
                    return this.$Tool.formatDate(time * 1000, 'hh:mm')
                } else {
                    return this.$Tool.formatDate(time * 1000, 'YYYY-MM-DD hh:mm')
                }
            }
        },

        faceDatas() {  // 全部聊天表情
            return faceDatas
        },

    },
    methods: {


        /**
         * 登录txy
         * @param {object} param
         */
        txyLogin() {
            const listeners = {
                // 监听连接状态回调变化事件,必填
                onConnNotify: this.onConnNotify,
                // IE9(含)以下浏览器用到的 jsonp 回调函数
                jsonpCallback: this.jsonpCallback,
                // 监听新消息(私聊，普通群(非直播聊天室)消息，全员推送消息)事件，必填
                onMsgNotify: this.onMsgNotify,
            }

            webim.login(
                this.txyloginparameter, listeners,
                {   // 控制台不要打印日志
                    isLogOn: false,
                }, resp => {
                    console.log(resp, "登录是否成功？")
                    this.getRecentList();

                    // 满惠消息订阅
                    let _this = this;
                    let subscribeCycle = setInterval(() => {
                        let stompClient = this.$store.getters.getClient;
                        if (stompClient && stompClient.connected === true) {
                            _this.subscribeClient = stompClient.subscribe('/topic/chat/mh/messageUpdate', (response) => {
                                _this.getRecentList();
                            });
                            clearInterval(subscribeCycle);
                            return;
                        }
                    }, 500);
                }, () => {
                    this.$message.error('腾讯云聊天登录失败')
                }
            )
        },

        /**
         * 连接状态
         */
        onConnNotify(resp) {
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
        },

        /**
         * 最新接受的消息
         */
        onMsgNotify(newMsgList) {
            console.log(newMsgList, '最新接受的消息');
            newMsgList.forEach(async msg => {
                if (msg.fromAccount === this.custIdentifier || msg.fromAccount === this.userInfo.tencentUser.tx_account) {   // 新消息来自当前聊天对象或自己
                    this.showMessage(msg)
                } else {
                    console.log(this.leftUserList, '11111111111111111111111111');
                    console.log(msg.fromAccount, '22222222222222222222');
                    if (this.leftUserList.every(res => res.from_account !== msg.fromAccount)) { // 新消息不属于联系人列表
                        const ProfileItem = await this.getUserInfo(msg.fromAccount)
                        if (ProfileItem) {
                            const newObj = {

                                logo: this.userValue(ProfileItem, 'Tag_Profile_IM_Image'),
                                name: this.userValue(ProfileItem, 'Tag_Profile_IM_Nick'),
                                time: Math.round(new Date().getTime() / 1000),
                                text: msg.elems[0].content.text,
                                noRead: 0,
                                from_account: msg.fromAccount,

                            }
                            this.leftUserList.unshift(newObj)
                        } else {
                            this.$message.error('收到一条新消息，但该用户信息获取失败')
                        }
                        this.getHistory()
                    }

                    const obj = this.leftUserList.find(res => res.from_account === msg.fromAccount) || {}
                    obj.noRead = (obj.noRead || 0) + 1
                    this.getHistory()
                }
            })
        },
        jsonpCallback(rspData) {
            webim.setJsonpLastRspData(rspData);
        },




        /**
         * 获取聊天最近会话联系人
         */
        getRecentList() {

            leftUserList.call(this, {
                pageNum: this.pageNum,
                pageSize: this.pageSize,
                Authorization: '',
                account: this.userInfo.tencentUser.tx_account,
            }).then(res => {
                console.log(res, '接口调用的聊天对象列表');
                if (res.Code === 1) {
                    let arr = res.Data.list.map(i => {
                        return {
                            logo: i.from_account_head,//头像
                            name: i.from_account_name,//名字
                            time: i.msg_time,//时间
                            text: JSON.parse(i.new_message).Text,//消息
                            noRead: '',//消息条数
                            from_account: i.from_account,//聊天对象腾讯云账户
                            from_role_type: i.from_role_type,//java接口发送消息需要拿到的参数
                        }
                    })
                    this.leftUserList = arr;
                } else {

                }
            })

            // webim.getRecentContactList({
            //     Count: 10
            // }, resp => {
            //     console.log(resp,'左侧的会话列表');
            //     this.leftUserList = resp.SessionItem;
            // }, err => {
            //     console.log(err)
            // })

        },


        /**
         * 点击左侧人物列表获取用户或者商家的账户
         * 第一个参数是聊天对象腾讯云账户，第二个聊天对象第几个，第三个是聊天对象名字
         */
        changePersonBtn(o, i, name, a) {
            if (this.custIdentifier === o) return
            this.custIdentifier = o;
            this.isUserShow = i;
            this.from_role_type = a;
            this.titleName = name;
            this.myMessage = '';
            this.objectInformation = this.leftUserList.find(val => {
                return val.To_Account === o
            })
            this.getHistory();
            //切换聊天对象时，消息记录条数清除
            const obj = this.leftUserList.find(res => o === res.from_account) || {};
            obj.noRead = 0;
            this.isShowMore = 0;

            console.log(o, i, name);

        },

        /**
         * 获取与聊天对象的历史记录
         */
        getHistory() {

            getHistory.call(this, {
                pageNum: this.pageNum,
                pageSize: this.pageSize,
                from_account: this.custIdentifier,
                to_account: '',
                type: this.type,
                msg_timestamp: new Date().getTime(),
            }).then(res => {
                if (res.Code === 1) {
                    console.log(res, '当前聊天对象的历史记录');

                    let arr = res.Data.list.reverse().map(i => {
                        return {

                            id: i.from_account,
                            time: i.msg_timestamp,
                            text: JSON.parse(i.msg_body)[0].MsgContent.Text,
                        }
                    });
                    this.historyRecord = arr

                } else {

                }
            })


            // webim.getC2CHistoryMsgs({
            //     Peer_Account: this.custIdentifier,
            //     MaxCnt: 15,
            //     LastMsgTime: 0,
            //     MsgKey: ''
            // }, resp => {
            //     console.log(resp,'聊天历史记录')
            //     resp.MsgList.forEach(msg => {
            //         this.showMessage(msg)
            //     });
            //     // this.historyRecord = resp.MsgList;
            // }, err => {
            //     console.log(err)
            // })

        },

        /**
         * 查看更多聊天历史记录
         */
        moreMsgBtn() {
            this.pageSize += 10;
            this.getHistory();
        },



        /**
         * 显示消息 两个场景：轮询监听到的新消息 切换聊天用户得到聊天记录
         * @param {array} newMsgList - 得到的消息列表
         * 根据返回的type id等信息拼接至historyRecord聊天窗口去
         */
        showMessage(msg) {
            let id = msg.from_Account || msg.fromAccount
            let time = msg.time ? new Date(msg.time).getTime() : msg.getTime();
            let type, content, text = '', img, custom;
            let elems = msg.elems;
            elems.forEach(i => {
                type = i.type;
                content = i.content;
                switch (type) {
                    case webim.MSG_ELEMENT_TYPE.TEXT://聊天记录类型是文字
                        text += textChangeImg(content.text || content.Text);
                        break;
                    case webim.MSG_ELEMENT_TYPE.FACE://聊天记录类型是表情
                        text += textChangeImg(content.data || content.Data)
                        break;
                    case webim.MSG_ELEMENT_TYPE.IMAGE://聊天记录类型是图片
                        console.log(content)
                        if (content.Image) {
                            img = content.Image
                        } else {
                            const obj = content.ImageInfoArray.find(val => {
                                return val.type === webim.IMAGE_TYPE.SMALL
                            }) || {}
                            img = obj.url || content.getImage(webim.IMAGE_TYPE.SMALL).getUrl()
                        }
                        break;
                    case webim.MSG_ELEMENT_TYPE.CUSTOM://聊天记录类型是自定义的
                        custom = JSON.parse(content.data || content.Data)
                        break;
                }
            });
            const obj = { id, time, text, img, custom }
            if (obj.custom && obj.custom.isOnlineMessage === 1) return
            this.historyRecord.push(obj)
        },

        /**
         * 获取聊天对象的信息（用户/商家）
         */
        getUserInfo(id) {
            const options = {
                'To_Account': [id || this.custIdentifier],
                'TagList': ['Tag_Profile_IM_Nick', 'Tag_Profile_IM_Image']
            }
            return new Promise((resolve, reject) => {
                webim.getProfilePortrait(
                    options, resp => {
                        console.log(resp)
                        const { ProfileItem } = resp.UserProfileItem[0]
                        resolve(ProfileItem)
                    }, err => {
                        console.log(err)
                        resolve(false)
                    }
                )
            })

        },

        /**
         * 发送消息将消息存入消息队列（后台记录用 不影响流程）
         * @param {object} msg - 消息对象
         */
        messageSendWebsocket(message) {
            sendMessage('/customer/insertChatRecord', {
                clientTimespan: this.$Tool.formatDate(new Date),
                fromRoleType: 2,
                from_Account: this.userInfo.tencentUser.tx_account,
                msgBody: [{
                    msgContent: {
                        text: message,
                    },
                    msgType: "TIMTextElem"
                }],
                msgTimestamp: Math.round(new Date().getTime() / 1000),
                toRoleType: this.from_role_type,
                to_Account: this.custIdentifier,
                sdkAppId: "1400065004"
            })
        },

        /**
         * 发送消息（腾讯云接口）
         * @param {string} msg - 文本框信息
         */
        sendMsg(msg) {
            return new Promise((reslove, reject) => {
                webim.sendMsg(msg, async resp => {
                    // 发送消息完毕 在左侧联系人列表更新最后一条消息和时间
                    const obj = this.leftUserList.find(res => res.id === this.custIdentifier) || {}
                    Object.assign(obj, {
                        lastMsg: this.showLastMsg(msg.getElems()) || '',
                        lastTime: (new Date().getTime()) / 1000 || '',
                    })
                    reslove(resp)
                }, err => {
                    this.$message.error('发送失败')
                    reslove(false)
                })
            })
        },

        /**
         *  发送消息（点击发送或回车） 引入了节流函数防止用户多次点击
         *  @param {string} type - 用户发送消息的方式
         *  不是用的设置的发送方式发不了
         */
        toSend: throttle(async function (type) {
            if (type && (type !== this.command)) {
                return false
            }
            this.myMessage = this.myMessage.trim()       //去除首位空白符
            let message = this.myMessage
            this.myMessage = ''
            if (message) {
                let random = Math.round(Math.random() * 4294967296);   //消息随机数，用于去重
                let msgTime = Math.round(new Date().getTime() / 1000); //消息时间戳
                let msg = new webim.Msg(this.selSess, this.isSend, this.seq, random, msgTime, this.userInfo.tencentUser.tx_account, 0, this.userInfo.username);
                let text_obj, face_obj;
                // 注释原因：用户端的聊天接受消息的格式并非将表情文字独立开来 但用户端的发送消息表情独立开来了 所以为了配合 发送消息就不独立了 但以后可能有用。
                // 查看消息中是否有表情文字
                // let expr = /\[[^[\]]{1,3}\]/mg;
                // let emotions = message.match(expr);
                // if (!emotions || emotions.length < 1) {   //消息中没有表情文字
                text_obj = new webim.Msg.Elem.Text(message);
                msg.addText(text_obj);
                // } else {
                //   let msgtosend = message;
                //   emotions.forEach(val => {
                //     let tmsg = msgtosend.substring(0, msgtosend.indexOf(val));
                //     if (tmsg) {
                //       text_obj = new webim.Msg.Elem.Text(tmsg);
                //       msg.addText(text_obj);
                //     }
                //     if (faceDatas[val]) {
                //       face_obj = new webim.Msg.Elem.Face(val)
                //       msg.addFace(face_obj)
                //     } else {
                //       face_obj = new webim.Msg.Elem.Text(val)
                //       msg.addText(face_obj)
                //     }
                //     let restMsgIndex = msgtosend.indexOf(val) + val.length;
                //     msgtosend = msgtosend.substring(restMsgIndex);
                //   })
                // }



                // msg.sending = 1;
                // msg.originContent = this.message;
                this.messageSendWebsocket(message)
                if (this.from_role_type != 3) {//判断如果聊天对象如果不是满惠的时候，才会同步发送消息调用腾讯云的。（java要求的）
                    const resp = await this.sendMsg(msg)
                    if (resp) {
                        // 发送成功的话 将信息显示到聊天列表里面
                        message = textChangeImg(message)
                        this.historyRecord.push({
                            id: this.userInfo.tencentUser.tx_account,
                            time: resp.MsgTime,
                            text: message
                        })
                    }
                }

            } else {
                this.$message.warning('不能发送空消息')
            }
        }, 1000),

        showLastMsg() { // 显示联系人列表的最后一条消息
            return lastMsg => {
                let message = ''
                lastMsg.forEach(i => {
                    // 前者为接收 后者为发送
                    let type = i.MsgType || i.getType()
                    let content = i.MsgContent || i.getContent()
                    switch (type) {
                        case webim.MSG_ELEMENT_TYPE.TEXT:
                            message = textChangeImg(content.text || content.Text)
                            break;
                        case webim.MSG_ELEMENT_TYPE.FACE:
                            message = '[表情]'
                            break;
                        case webim.MSG_ELEMENT_TYPE.IMAGE:
                            message = '[图片]'
                            break;
                        case webim.MSG_ELEMENT_TYPE.CUSTOM:
                            message = '[其它]'
                            break;
                    }
                })
                return message
            }
        }

    },

    watch: {

        // 发送新消息和接收新消息时，显示最底部消息
        historyRecord(val, oldval) {
            if (val.length) {
                let list = this.$el.querySelectorAll('.chat_srcoll')[0]
                this.$nextTick(() => {
                    list.scrollIntoView(false);
                })
            }
        }
    },

    created() {
        // this.txyRegister();
        this.txyLogin();
    },
    deactivated(){
        let stompClient = this.$store.getters.getClient;
        console.log('取消监听1 ===>>> ', stompClient)
        this.subscribeClient.unsubscribe();
    },
    destroyed(){
        let stompClient = this.$store.getters.getClient;
        console.log('取消监听2 ===>>> ',stompClient)
        this.subscribeClient.unsubscribe();
    }

}
</script>

<style lang="less" scoped>
.box-card {
    margin-bottom: 20px;
}

.onlineservrce {
    width: 1190px;
    height: 700px;
    border: 1px #ddd solid;
    display: table;
    .box_left {
        width: 200px;
        height: 700px;
        display: table-cell;
        vertical-align: middle;
        .user {
            width: 100%;
            height: 130px;
            background: #25ada4;
            color: #fff;
            padding: 10px;
            box-sizing: border-box;
            .toux {
                display: flex;
                margin-top: 10px;
                img {
                    width: 44px;
                    height: 44px;
                    border-radius: 50%;
                    margin-right: 10px;
                }
                p {
                    flex: 1;
                }
            }
            .search {
                margin-top: 5px;
            }
        }
        .user_list {
            width: 100%;
            height: 570px;
            overflow-y: auto;
            color: #fff;
            background: #363e47;
            ul {
                li {
                    width: 100%;
                    display: table;
                    padding: 10px;
                    box-sizing: border-box;
                    background: #333;
                    cursor: pointer;
                    border-bottom: 1px #3f3f3f solid;
                    img {
                        width: 40px;
                        height: 40px;
                        margin-right: 10px;
                        display: table-cell;
                        vertical-align: middle;
                    }
                    p {
                        display: table-cell;
                        vertical-align: middle;
                        position: relative;
                        em {
                            display: block;
                            font-style: normal;
                            font-size: 14px;
                            > i {
                                font-style: normal;
                                color: #fff;
                                position: absolute;
                                top: 0;
                                right: 0;
                                background-color: #f00;
                                border-radius: 7px;
                                display: inline-block;
                                font-size: 12px;
                                height: 14px;
                                margin-top: 0;
                                line-height: 13px;
                                padding: 0 3px;
                                text-align: center;
                                white-space: nowrap;
                                border: 1px solid #f00;
                            }
                        }
                        span {
                            width: 88px;
                            height: 21px;
                            line-height: 21px;
                            font-size: 12px;
                            overflow: hidden;
                            display: inline-block;
                        }
                        > i {
                            float: right;
                            font-style: normal;
                            font-size: 12px;
                            color: #ddd;
                            margin-top: 2px;
                        }
                    }
                }
                .active {
                    background: #5f5f5f;
                }
            }
        }
    }
    .box_main {
        width: 600px;
        height: 100%;
        display: table-cell;
        vertical-align: top;
        background: #fcfcfc;
        border-right: 1px #ccc solid;
        .top {
            width: 600px;
            height: 50px;
            line-height: 50px;
            border-bottom: 1px #ddd solid;
            padding-left: 30px;
            box-sizing: border-box;
        }
        .chat_content {
            width: 600px;
            height: 530px;
            overflow-y: auto;
            border-bottom: 1px #ddd solid;
            .moreMsg {
                text-align: center;
                color: #0074d9;
                font-size: 14px;
                cursor: pointer;
                margin: 10px 0;
            }
            .right {
                margin-top: 10px;
                .time {
                    text-align: center;
                    color: #666;
                }
                .content {
                    width: 100%;
                    height: auto;
                    padding: 10px;
                    box-sizing: border-box;
                    position: relative;
                    .touxiang {
                        position: absolute;
                        right: 10px;
                        top: 10px;
                        img {
                            width: 34px;
                            height: 34px;
                            border-radius: 50%;
                        }
                    }
                    .lt {
                        width: 7px;
                        height: 10px;
                        background: url("../../assets/img/lt.png") no-repeat;
                        background-size: 100%;
                        position: absolute;
                        right: 50px;
                        top: 20px;
                    }
                    .word {
                        width: 528px;
                        min-height: 30px;
                        text-align: right;
                        span {
                            display: inline-block;
                            padding: 10px;
                            background: #9eea6a;
                            border-radius: 5px;
                        }
                        .img_cont {
                            img {
                                border-radius: 5px;
                                padding: 10px;
                                background: #9eea6a;
                                width: 300px;
                            }
                        }
                        .custom_cont {
                            text-align: right;
                            .custom {
                                width: 300px;
                                height: auto;
                                display: inline-block;
                                background: #9eea6a;
                                border-radius: 5px;
                                padding: 10px;
                                box-sizing: border-box;
                                .pro_img {
                                    display: table-cell;
                                    vertical-align: middle;
                                    img {
                                        width: 60px;
                                        height: 60px;
                                        display: block;
                                    }
                                }
                                .details {
                                    display: table-cell;
                                    vertical-align: middle;
                                    text-align: left;
                                    p {
                                        height: 20px;
                                        padding: 0 10px;
                                        font-size: 14px;
                                        display: -webkit-box;
                                        -webkit-box-orient: vertical;
                                        -webkit-line-clamp: 1;
                                        overflow: hidden;
                                    }
                                    span {
                                        color: #f00;
                                        font-size: 16px;
                                    }
                                    del {
                                        color: #666;
                                        font-size: 12px;
                                    }
                                }
                            }
                        }
                    }
                }
            }
            .left {
                margin-top: 10px;
                .time {
                    text-align: center;
                    color: #666;
                }
                .content {
                    width: 100%;
                    height: auto;
                    padding: 10px;
                    box-sizing: border-box;
                    position: relative;
                    .touxiang {
                        position: absolute;
                        left: 10px;
                        top: 10px;
                        img {
                            width: 34px;
                            height: 34px;
                            border-radius: 50%;
                        }
                    }
                    .lt {
                        width: 7px;
                        height: 10px;
                        background: url("../../assets/img/lt2.png") no-repeat;
                        background-size: 100%;
                        position: absolute;
                        left: 50px;
                        top: 20px;
                    }
                    .word {
                        width: 528px;
                        min-height: 30px;
                        text-align: left;
                        float: right;
                        span {
                            display: inline-block;
                            padding: 10px;
                            background: #eaeaea;
                            border-radius: 5px;
                        }
                        .img_cont {
                            img {
                                border-radius: 5px;
                                padding: 10px;
                                background: #9eea6a;
                                width: 300px;
                            }
                        }
                        .custom_cont {
                            text-align: left;
                            .custom {
                                width: 300px;
                                height: auto;
                                display: inline-block;
                                background: #eaeaea;
                                border-radius: 5px;
                                padding: 10px;
                                box-sizing: border-box;
                                .pro_img {
                                    display: table-cell;
                                    vertical-align: middle;
                                    img {
                                        width: 60px;
                                        height: 60px;
                                        display: block;
                                    }
                                }
                                .details {
                                    display: table-cell;
                                    vertical-align: middle;
                                    text-align: left;
                                    p {
                                        height: 20px;
                                        padding: 0 10px;
                                        font-size: 14px;
                                        display: -webkit-box;
                                        -webkit-box-orient: vertical;
                                        -webkit-line-clamp: 1;
                                        overflow: hidden;
                                    }
                                    span {
                                        color: #f00;
                                        font-size: 16px;
                                    }
                                    del {
                                        color: #666;
                                        font-size: 12px;
                                    }
                                }
                            }
                        }
                    }
                    &:after {
                        content: "";
                        clear: both;
                        display: block;
                    }
                }
            }
        }
        .chat_input {
            overflow-y: auto;
        }
    }
    .box_right {
        display: table-cell;
        vertical-align: top;
        padding: 10px;
        .user_information {
            h3 {
                text-align: center;
            }
        }
    }
}

.el-form-item--mini.el-form-item,
.el-form-item--small.el-form-item {
    margin-bottom: 0;
}

::-webkit-scrollbar {
    width: 5px; /*滚动条宽度*/
    height: 5px; /*滚动条高度*/
}
/*定义滚动条轨道 内阴影+圆角*/
::-webkit-scrollbar-track {
    /*滚动条的背景区域的内阴影*/
    box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.3) inset;
    /*滚动条的背景区域的圆角*/
    border-radius: 2.5px;
    /*滚动条的背景颜色*/
    background-color: rgba(144, 147, 153, 0.3);
}

/*定义滑块 内阴影+圆角*/
::-webkit-scrollbar-thumb {
    /*滚动条的内阴影*/
    box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.3) inset;
    /*滚动条的圆角*/
    border-radius: 2.5px;
    /*滚动条的背景颜色*/
    background-color: #aaa;
}
</style>

<style>
.chat_input /deep/ .el-textarea__inner {
    border: 1px solid #fff;
}
.chat_input /deep/ .el-textarea__inner:hover {
    border-color: #fff;
}
</style>
