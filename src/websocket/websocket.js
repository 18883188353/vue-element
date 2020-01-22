import SockJs from 'sockjs-client';
import Stomp from 'stompjs';
import $Vue from '../main'

export function initWebSocket() {

    let socket = new SockJs(window.mj.defaultWs + '/customer-socket');
    let stompClient = Stomp.over(socket);

    // 客户端心跳发送频率
    stompClient.heartbeat.outgoing = 60000;
    // 客户端心跳接收频率
    stompClient.heartbeat.incoming = 180000;

    // 自定义 debug 信息输出方法，这里不输出、如果不配置这个属性，则默认为在控制台输出 debug信息
    stompClient.debug = (debugInfo) => {
        // 这里可以对 DEBUG 信息进行处理
        //console.log('process.env.NODE_ENV', process.env.NODE_ENV)
        // 开发环境才打印日志
        if('development' === process.env.NODE_ENV){
            console.info(debugInfo);
        }
    };

    let authorization = window.sessionStorage.getItem('AUTHORIZATION');

    let header = {
        Authorization: authorization ? authorization : '',
        //'access-Control-Allow-Origin': '*', // 前后端分离项目需配置跨域请求
        //'Access-Control-Allow-Credentials': true
    };

    stompClient.connect(header, (frame) => {

        console.log('frame ===>>> ', frame);

        stompClient.subscribe('/topic' + $Vue.$store.state.socket.AUDIT, (response) => {
            console.log(response, '--->>> /topic');
            $Vue.$store.dispatch('setWaitAuditResult', JSON.parse(response.body));
        });

        // stompClient.subscribe('/topic' + $Vue.$store.state.socket.LOG, (response) => {
        //     console.log(response, '--->>> /topic');
        //     //console.log(response.body);
        //     $Vue.$store.dispatch('pushLog', response.body);
        // });

        // stompClient.subscribe('/user/Mh429109e82d48c30/oneToOneMsg/chat', (response) => {
        //     console.log(response, '--->>> /user');
        // });

    }, (error) => {
        console.log(error, ' ==>>> websocket 连接失败');
    });

    $Vue.$store.dispatch('setClient', stompClient);
    //$Vue.$store.state.socket.STOMP_CLIENT = stompClient;
}

export function closeWebSocket(callback = () => { }) {
    //console.log($Vue.$store.state.socket.STOMP_CLIENT, 'websocket client');
    console.log('websocket client', $Vue.$store.getters.getClient)

    if ($Vue.$store.getters.getClient) {

        $Vue.$store.getters.getClient.disconnect(() => {
            console.log(' ==>>> websocket 连接关闭');
            //$Vue.$store.state.socket.STOMP_CLIENT = null;
            $Vue.$store.dispatch('setClient', null);
            callback();
        });

    } else {
        console.error(' ==>>> websocket 连接已提前关闭')
    }

}

export function sendMessage(path, message) {
    console.log($Vue.$store.state.socket.STOMP_CLIENT, 'websocket client');
    if ($Vue.$store.state.socket.STOMP_CLIENT && $Vue.$store.state.socket.STOMP_CLIENT.connected) {
        $Vue.$store.state.socket.STOMP_CLIENT.send(path, {}, JSON.stringify(message));
    }else{
        console.error('===>>> websocket 连接已断开，尝试重新连接......');
        $Vue.$store.state.socket.STOMP_CLIENT = null;
        initWebSocket();
        // 2秒后重新发送消息
        setTimeout(() => {
            sendMessage(path, message);    
        }, 3000);
    }
}
