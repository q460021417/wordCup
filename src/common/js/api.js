import axios from "axios";
import qs from "qs"
let u = navigator.userAgent;
let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
let isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1; //android终端

var api = {
  isiOS: isiOS,
  isAndroid: isAndroid,
  setLocalStorage: (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  },
  getLocalStorage: value => {
    return JSON.parse(localStorage.getItem(value));
  },
  appWebTitle: value => {
    if (isAndroid) {
      // window.android.appWebTitle(value);
      document.title = value
    } else if (isiOS) {
      window.webkit.messageHandlers.changeTitle.postMessage(value);
    }
  },
  //这个是token失效
  tokenInvaild: () => {
    if (isAndroid) {
      window.Android.tokenInvaild();
    } else if (isiOS) {
      window.webkit.messageHandlers.tokenInvaild.postMessage(null);
    }
  },
  //是未登录跳到登录页的方法
  tokenEmpty: () => {
    if (isAndroid) {
      window.Android.tokenEmpty();
    } else if (isiOS) {
      window.webkit.messageHandlers.tokenEmpty.postMessage(null);
    }
  },
  //显示隐藏APP分享按钮
  /**
   * [getwxcode description]
   * @param  {[boolean]}
   * @return {}
   */
  showOrHideIcon: (value) => {
    if (isAndroid) {
      window.Android.showOrHideIcon(value);
    } else if (isiOS) {
      window.webkit.messageHandlers.showOrHideIcon.postMessage(value);
    }
  },
  //调用APP分享按钮
  /**
   * [getwxcode description]
   * @param  {[obj]}
   // shareData: {
   //   url: "https://www.baidu.com/", // 链接
   //   title: '测试分享标题', // 标题
   //   content: "测试分享内容", // 文字描述
   //   picUrl: "http://sjz-business-image.oss-cn-beijing.aliyuncs.com/2018/03/30/18519195020/fb408d76-e597-427e-9054-c7f9d5ecdda8.png" // 图片url
   //   type:'1' 1需要统计加分 2 不需要统计加分
   // },
   * @return {}
   */
  AppShare: (value) => {
    if (isAndroid) {
      window.Android.share(JSON.stringify(value))
    } else if (isiOS) {
      window.webkit.messageHandlers.share.postMessage(value);
    }
  },
  APPBigBack: () => {
    if (isAndroid) {
      window.Android.finish()
    } else {
      window.webkit.messageHandlers.finish.postMessage(null)
    }
  },


  //微信判断登录
  /**
   * [getwxcode description]
   * @param  {[string]} url         [加密encodeURIComponent(urlStr) url解密：decodeURIComponent(urlStr)]
   * @return {[type]}               [登录成功跳转回原来地址]
   */
  //url判断是否存在微信code
  GetQueryString: name => {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
  },
  getwxcode: url => {
    const nowurl = window.location.href;
    const wxcode = this.a.GetQueryString("code");
    // return false;
    if (wxcode == null || wxcode == "") {
      const wxcodeurl = window.wxCodeurl +
        encodeURIComponent(url) +
        "&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect";
      window.location.replace(wxcodeurl);
    } else {
      sessionStorage.wxcode = wxcode;
    }
  },
  /**
   * [serviceLogin 判断是否登录]
   * @return {[boolean]} [true,false]
   */
  // serviceLogin: () => {
  //   this.$http
  //     .post("/u/c/serviceLogin", {
  //       thirdCode: wxcode
  //     })
  //     .then(response => {
  //       const result = response.data;
  //       if (result.data == null || result == "") {
  //         return false;
  //       } else {
  //         sessionStorage.wxUserId = result.data.userId;
  //         return true;
  //       }
  //     });
  // }

  // 获取微信签名
  getweChatSign(that) {
    const makeid2 = this.randomMakeid();
    const timestamp = Date.parse(new Date());
    const noncestr = makeid2;
    const mqurl = location.href.split('#')[0];
    that.$http.post('/i/signature', { //        http://apidev.bianhk.com/i/signature
        timestamp: timestamp,
        noncestr: noncestr,
        url: mqurl
      })
      .then(res => {
        var result = res.data;
        var sign = result.data;
        if (sign == null || sign == "") {

        } else {
          localStorage.timestamp = timestamp;
          localStorage.noncestr = noncestr;
          localStorage.sign = sign;
        }
      })
  },
  randomMakeid() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < 10; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
  },
  buttonCount(button_id, button_desc, user_id, Phone_number) {
    var date = new Date();
    axios.get('http://tracklog.aipark.com/ok.json', {
      params: {
        project: 'sjz_sjb_event', //sjz_sjb_event
        environment: 'formal', //test/formal
        button_id: button_id,
        button_desc: button_desc,
        user_id: user_id,
        phone_number: Phone_number,
        touch_time: date.getTime()
      }
    }).then(reponse => {
      // console.log('buttonCount====' + reponse);
    })
  },
  shareButtonCount(button_id, button_desc, user_id, Phone_number) {
    var date = new Date();
    axios.get('http://tracklog.aipark.com/ok.json', {
      params: {
        project: 'sjz_sjb_event', //sjz_sjb_event
        environment: 'formal', //test/formal
        button_id: button_id,
        button_desc: button_desc,
        user_id: user_id,
        phone_number: Phone_number,
        touch_time: date.getTime(),
        is_ok: 'yes'
      }
    }).then(reponse => {
      // console.log('buttonCount====' + reponse);
    })
  },
  urlCount(page_id, page_desc, user_id, phone_number, touch_time, url) {
    var date = new Date();
    axios.get('http://tracklog.aipark.com/ok.json', {
      params: {
        project: 'sjz_sjb_url', //sjz_sjb_url
        environment: 'formal', //test/formal
        page_id: page_id,
        page_desc: page_desc,
        user_id: user_id,
        phone_number: phone_number,
        touch_time: touch_time,
        stay_time: 0,
        from_url: url
      }
    }).then(reponse => {
      // console.log('buttonCount====' + reponse);
    })
  },
  shareUrlCount(page_id, page_desc) {
    var date = new Date();
    axios.get('http://tracklog.aipark.com/ok.json', {
      params: {
        project: 'sjz_sjb', //sjz_sjb_url
        environment: 'formal', //test/formal
        analyze_goal: 'sjb_share_page',
        page_id: page_id,
        page_desc: page_desc, //首页分享/全民竞猜分享/相约足球宝贝分享
        touch_time: date.getTime(),
        ip: window.navigator.userAgent
      }
    }).then(reponse => {
      // console.log('buttonCount====' + reponse);
    })
  }
};

export default api;