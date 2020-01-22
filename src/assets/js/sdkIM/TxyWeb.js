/*
 * @Descripttion: 腾讯云相关
 * @version: 1.0.0
 * @Author: Cheng
 * @Date: 2019-07-18 18:11:40
 * @LastEditors: Cheng
 * @LastEditTime: 2019-07-26 10:47:36
 */

/**
 * faceDatas key为输入框显示的表情文字 value为img文件对应的表情图片
 */
const faceDatas = {
  "[呲牙]": "f_static_000",
  "[调皮]": "f_static_001",
  "[流汗]": "f_static_002",
  "[偷笑]": "f_static_003",
  "[再见]": "f_static_004",
  "[敲打]": "f_static_005",
  "[擦汗]": "f_static_006",
  "[猪头]": "f_static_007",
  "[玫瑰]": "f_static_008",
  "[流泪]": "f_static_009",
  "[大哭]": "f_static_010",
  "[嘘]": "f_static_011",
  "[酷]": "f_static_012",
  "[抓狂]": "f_static_013",
  "[委屈]": "f_static_014",
  "[便便]": "f_static_015",
  "[炸弹]": "f_static_016",
  "[菜刀]": "f_static_017",
  "[可爱]": "f_static_018",
  "[色]": "f_static_019",
  "[害羞]": "f_static_020",
  "[得意]": "f_static_021",
  "[吐]": "f_static_022",
  "[微笑]": "f_static_023",
  "[发怒]": "f_static_024",
  "[尴尬]": "f_static_025",
  "[惊恐]": "f_static_026",
  "[冷汗]": "f_static_027",
  "[爱心]": "f_static_028",
  "[示爱]": "f_static_029",
  "[白眼]": "f_static_030",
  "[傲慢]": "f_static_031",
  "[难过]": "f_static_032",
  "[惊讶]": "f_static_033",
  "[疑问]": "f_static_034",
  "[睡]": "f_static_035",
  "[亲亲]": "f_static_036",
  "[憨笑]": "f_static_037",
  "[爱情]": "f_static_038",
  "[衰]": "f_static_039",
  "[撇嘴]": "f_static_040",
  "[阴险]": "f_static_041",
  "[奋斗]": "f_static_042",
  "[发呆]": "f_static_043",
  "[右哼哼]": "f_static_044",
  "[拥抱]": "f_static_045",
  "[坏笑]": "f_static_046",
  "[飞吻]": "f_static_047",
  "[鄙视]": "f_static_048",
  "[晕]": "f_static_049",
  "[大兵]": "f_static_050",
  "[可怜]": "f_static_051",
  "[强]": "f_static_052",
  "[弱]": "f_static_053",
  "[握手]": "f_static_054",
  "[胜利]": "f_static_055",
  "[抱拳]": "f_static_056",
  "[凋谢]": "f_static_057",
  "[饭]": "f_static_058",
  "[蛋糕]": "f_static_059",
  "[西瓜]": "f_static_060",
  "[啤酒]": "f_static_061",
  "[飘虫]": "f_static_062",
  "[勾引]": "f_static_063",
  "[OK]": "f_static_064",
  "[爱你]": "f_static_065",
  "[咖啡]": "f_static_066",
  "[钱]": "f_static_067",
  "[月亮]": "f_static_068",
  "[美女]": "f_static_069",
  "[刀]": "f_static_070",
  "[发抖]": "f_static_071",
  "[差劲]": "f_static_072",
  "[拳头]": "f_static_073",
  "[心碎]": "f_static_074",
  "[太阳]": "f_static_075",
  "[礼物]": "f_static_076",
  "[足球]": "f_static_077",
  "[骷髅]": "f_static_078",
  "[挥手]": "f_static_079",
  "[闪电]": "f_static_080",
  "[饥饿]": "f_static_081",
  "[困]": "f_static_082",
  "[咒骂]": "f_static_083",
  "[折磨]": "f_static_084",
  "[抠鼻]": "f_static_085",
  "[鼓掌]": "f_static_086",
  "[糗大了]": "f_static_087",
  "[左哼哼]": "f_static_088",
  "[哈欠]": "f_static_089",
  "[快哭了]": "f_static_090",
  "[吓]": "f_static_091",
  "[篮球]": "f_static_092",
  "[乒乓球]": "f_static_093",
  "[NO]": "f_static_094",
  "[跳跳]": "f_static_095",
  "[怄火]": "f_static_096",
  "[转圈]": "f_static_097",
  "[磕头]": "f_static_098",
  "[回头]": "f_static_099",
  "[跳绳]": "f_static_100",
  "[激动]": "f_static_101",
  "[街舞]": "f_static_102",
  "[献吻]": "f_static_103",
  "[左太极]": "f_static_104",
  "[右太极]": "f_static_105",
  "[闭嘴]": "f_static_106",

  "[mj咒骂]": "mj_face_27",
  "[mjYEAH]": "mj_face_30",
  "[mj调皮]": "mj_face_04",
  "[mj察汗]": "mj_face_28",
  "[mj发怒]": "mj_face_21",
  "[mj努力]": "mj_face_08",
  "[mj亲亲]": "mj_face_11",
  "[mj困]": "mj_face_22",
  "[mj愉快]": "mj_face_07",
  "[mj疑问]": "mj_face_19",
  "[mj色]": "mj_face_26",
  "[mj悠闲]": "mj_face_23",
  "[mj惊恐]": "mj_face_17",
  "[mj可怜]": "mj_face_12",
  "[mj难受]": "mj_face_18",
  "[mj尴尬]": "mj_face_20",
  "[mj哈欠]": "mj_face_29",
  "[mj晕]": "mj_face_16",
  "[mj委屈]": "mj_face_09",
  "[mj鼓掌]": "mj_face_10",
  "[mjOK]": "mj_face_13",
  "[mj得意]": "mj_face_15",
  "[mj糗大了]": "mj_face_24",
  "[mj偷笑]": "mj_face_14",
  "[mj微笑]": "mj_face_01",
  "[mj撇嘴]": "mj_face_02",
  "[mj衰]": "mj_face_25",
  "[mj呲牙]": "mj_face_05",
  "[mj流泪]": "mj_face_03",
  "[mj惊讶]": "mj_face_06"
}

/**
 * 函数节流
 * @param {function} fn - 要节流执行的方法 
 * @param {number} [interval=1000] - 节流设定的时间（多少时间内只执行一次）
 */
function throttle(fn, interval = 1000) {
  var last;
  var timer;
  var interval = interval || 200;
  return function () {
    var th = this;
    var args = arguments;
    var now = +new Date();
    if (last && now - last < interval) {
      clearTimeout(timer);
      timer = setTimeout(function () {
        last = now;
        fn.apply(th, args);
      }, interval);
    } else {
      last = now;
      fn.apply(th, args);
    }
  }
}

/**
 * 表情文字转图片
 * @param {string} message - 发送的消息
 */
function textChangeImg(message) {
  let msgArr = ('' + message).split(/(\[[^[\]]+\])/)
  Object.keys(faceDatas).forEach(res => {
    if (msgArr.includes(res)) {        
      msgArr = msgArr.map(item => {
        return item === res 
        ? (item = `<img style="width:32px" src="/static/face/${faceDatas[item]}.imageset/${faceDatas[item]}@2x.png"/>`) 
        : item
      })
    }
  })
  return msgArr.join('')
}

export {
  faceDatas,
  throttle,
  textChangeImg
}