let initWxShare = function(WeChatData, that) {
  var makeid = randomMakeid();
  //link,shareTitle,shareImgUrl,sharedesc
  var timestamp = Date.parse(new Date());
  var noncestr = makeid;
  var mqurl = location.href.split('#')[0];
  var link = WeChatData.link;
  var shareTitle = WeChatData.shareTitle;
  var shareImgUrl = WeChatData.shareImgUrl;
  var sharedesc = WeChatData.sharedesc;

  that.$http.post('/i/signature', { //        http://apidev.bianhk.com/i/signature
      timestamp: timestamp,
      noncestr: noncestr,
      url: mqurl
    })
    .then(res => {
      var result = res.data;
      var sign = result.data;
      wx.config({
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，       仅在pc端时才会打印。
        appId: that.$http.weChatAppID, // 必填，公众号的唯一标识
        timestamp: timestamp, // 必填，生成签名的时间戳
        nonceStr: noncestr, // 必填，生成签名的随机串
        signature: sign, // 必填，签名，见附录1
        jsApiList: [
          "onMenuShareTimeline", "onMenuShareAppMessage", "onMenuShareQQ", "onMenuShareQZone"
        ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
      });
      wx.ready(function() {
        let config = {
          title: shareTitle, // 分享标题
          desc: sharedesc, // 分享描述
          link: link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          imgUrl: shareImgUrl, // 分享图标
          type: '', // 分享类型,music、video或link，不填默认为link
          dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
          success: function() {
            //              alert("确认分享盆友-----");
            // 用户确认分享后执行的回调函数
          },
          cancel: function() {
            //              alert("取消分享盆友-----");
            // 用户取消分享后执行的回调函数
          }
        }

        wx.onMenuShareTimeline(config);

        wx.onMenuShareAppMessage(config);

        wx.onMenuShareQQ(config);

        wx.onMenuShareQZone(config);
        // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
      });
      wx.error(function(res) {
        // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
      });
    })
    .catch(err => {
      console.log(err);
    })
}

function randomMakeid() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (var i = 0; i < 10; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  return text;
}

export default initWxShare;