<template>
<div class="registerTot">
  <div class="registerTit1"></div>
  <div class="colRegister">
    <!--<div class="registerTit1">Hi~等你好久了，快点注册一起参加2018世界杯狂欢派对吧！</div>-->
  </div>
  <div class="inputMobile">
    <div class="inputMob">
      <input type="text" maxlength="11" placeholder="请输入手机号码" class="getMobile">
      <span class="getVerif"></span>
    </div>
    <div>
      <input type="text" maxlength="6" placeholder="请输入验证码" class="getNum">
    </div>
    <toast v-model="showMsg" width="200px">{{msg}}</toast>
    <div id="getCode1"></div>
    <div id="getCode">
      <div>
        <span class="getCodeText">请输入图形验证码</span>
        <img src="../../../src/common/img/icon-close.png" alt="" class="close" style="width: 0.4rem;height: 0.4rem;position: relative;right: -1rem;"> </div>

      <div style="padding-top: 0.2rem;" class="relative">
        <input type="text" id="code" placeholder="" style="margin-top: -0.3rem;height: 0.9rem;">
        <img src="" id="codePath" alt="" class="change" style="width: 1.7rem;height: 0.9rem;vertical-align:bottom">
      </div>
      <div class="getResult">
        <span class="getSure">确定</span>
      </div>
    </div>
    <div>
      <!--<input type="button" class="colAccept" value="注册"/>-->
      <span class="colAccept">立即参加</span>
    </div>
  </div>
</div>
</template>

<script>
export default {
  data() {
    return {
      msg: '',
      showMsg: false,
    }
  },
  methods: {
    registerUrlCount() {
      var date = new Date();
      this.$http.get('http://tracklog.aipark.com/ok.json', {
        params: {
          project: 'sjz_sjb_register', //sjz_sjb_url
          environment: 'formal', //test/formal
          button_id: location.href,
          from_url: localStorage.from_url,
          touch_time: date.getTime()
        }
      }).then(reponse => {})
    },
    registerBtnCount() {
      var date = new Date();
      this.$http.get('http://tracklog.aipark.com/ok.json', {
        params: {
          project: 'sjz_sjb_register', //sjz_sjb_url
          environment: 'formal', //test/formal
          button_id: 'colAccept',
          phone_number: $('.getMobile').val(),
          from_url: localStorage.from_url,
          touch_time: date.getTime()
        }
      }).then(reponse => {})
    },
  },
  created() {

  },
  mounted() {
    // 隐藏音乐按钮
    setTimeout(function() {
      $('#open').hide()
      $('#stop').hide()
    }, 300)
    this.registerUrlCount()
    document.title = '注册页面'
    var that = this;
    $('.getVerif').html('获取验证码')
    var isTrue = false;
    $(".getMobile").keyup(function() {
      var plateNumber = $('.getMobile').val();
      if (plateNumber) {
        if (!/^1[3456789]\d{9}$/.test(plateNumber)) {
          if (plateNumber.length == 11) {
            that.showMsg = true;
            that.msg = '手机号格式不正确';
            $('.getVerif').addClass('forbidStyle').attr('disabled', true);
          }
          if (plateNumber.length < 11) {
            $('.getVerif').removeClass('showStle').addClass('forbidStyle').attr('disabled', true);
          }
        } else {
          if (isTrue) {
            return;
          } else {
            $('.getVerif').addClass('showStle').removeClass('forbidStyle').attr('disabled', false);
          }
        }
      }
    });
    // //
    function requestData(opt) {
      var msg = {
        "version": "",
        'data': opt.data
      }
      var params = 'param' + JSON.stringify(msg);
      var param = {
        'param': JSON.stringify(msg)
      }

      $.ajax({
        method: opt.method,
        url: opt.url,
        dataType: "json",
        data: param,
        success: opt.success,
        fail: opt.fail
      })
    };
    //
    //
    $('.change').click(function() {
      changeCode();
    });
    //
    var getTime = String(new Date().getTime());

    function changeCode() {
      var opt = {
        url: '/api/v1/verify/getVerifyCode',
        method: 'post',
        data: {
          verifyCodeId: getTime
        },
        success: function(res) {
          if (res.code == '0000') {
            $('#codePath').attr('src', 'data:image/gif;base64,' + res.data.verifyCodeImage);
          }
        }
      }
      requestData(opt)
    }

    //获取验证码
    $('.getVerif').click(function() {
      //      that.showMsg = true;
      //      console.log(that)
      //      return false
      var seconds = 59;
      if ($('.getMobile').val() == '' || $('.getMobile').val().length < 11 || $('.getVerif').hasClass('forbidStyle')) {
        return;
      };
      $('.getVerif').html(seconds + 's').attr("disabled", true).removeClass('showStle').addClass('forbidStyle');
      $('#getCode1,#getCode').show();
      $('#code').val('');
      changeCode();
    });

    $('.close').click(function() {
      $('.getVerif').attr("disabled", false).html('获取验证码').removeClass('forbidStyle').addClass('showStle');
      $('#getCode1,#getCode').hide();
    })
    $(".getResult").click(function() {
      var opt = {
        url: '/api/v1/passcode/send',
        method: 'post',
        data: {
          phoneNumber: $('.getMobile').val(),
          verifyCodeId: getTime,
          verifyCode: $('#code').val()
        },
        success: function(res) {
          if (res.code == '0000') {
            $('#getCode1,#getCode').hide();
            var second = 59;
            that.msg = res.msg;
            that.showMsg = true;
            var interTime = setInterval(function() {
              isTrue = true;
              $('.getVerif').html(--second + 's');
              if (second == 0) {
                $('.getVerif').attr("disabled", false).html('获取验证码').removeClass('forbidStyle').addClass('showStle');
                isTrue = false;
                clearInterval(interTime)
              }
            }, 1000);
          } else if (res.code == '0001' || res.code == '0009' || res.code == '0010' || res.code == '9999') {
            that.showMsg = true;
            that.msg = res.msg;
            //            layer.msg(res.msg);
            changeCode();
          }
        }
      }
      requestData(opt)
    })

    $('.getNum,.inputMob').keyup(function() {
      if ($('.getMobile').val().length == 11 && $('.getNum').val().length >= 4) {
        $('.colAccept').addClass('showStle').attr("disabled", false);
      } else {
        $('.colAccept').removeClass('showStle').attr("disabled", true);
      }
    });

    (function($) {
      $.getUrlParam = function(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
      }
    })(jQuery);
    var offlineUserId = $.getUrlParam('userId');
    var channelId = $.getUrlParam('channelId');


    $('.colAccept').click(function() {
      that.registerBtnCount()
      if ($('.colAccept').hasClass('showStle')) {
        $('.colAccept').attr("disabled", false);
      } else {
        $('.colAccept').attr("disabled", true);
        return;
      }
      if ($(".colAccept").hasClass("a")) {
        return;
      }
      $(".colAccept").prop("disabled", true).addClass("a");

      setTimeout(function() {
        $(".colAccept").prop("disabled", false).removeClass("a");
      }, 1000);
      var opt = {
        url: '/api/v1/rsAppUser/rsAppuserRegister',
        method: 'post',
        data: {
          //                offlineUserId:sessionStorage.getItem('offlineUserId'),
          //                channelId:sessionStorage.getItem('channelId'),
          //          offlineUserId: offlineUserId,
          //          channelId: channelId,
          //          offlineUserId: '',
          //          channelId: '',
          passcode: $('.getNum').val(),
          phoneNumber: $('.getMobile').val(),
          verifyCodeId: getTime,
          verifyCode: $('#code').val()
        },
        success: function(res) {
          if (res.code == '0000') {
            that.showMsg = true;
            that.msg = res.msg;
            that.$router.push({
              path: '/reminderPage'
            })
          } else if (res.code == '0002') {
            that.showMsg = true;
            that.msg = res.msg;
          } else if (res.code == '0003') {
            that.showMsg = true;
            that.msg = '验证码错误！'
          } else {
            that.showMsg = true;
            that.msg = res.msg;
          }
        },
        error: function(res) {
          if (res.state == -1) {
            that.showMsg = true;
            that.msg = '手机号格式不正确';
          }
        }
      };
      requestData(opt);
      this.$api.registerButtonCount('colAccept', $('.getMobile').val(), localStorage.from_url)
    })
  }
}
</script>

<style>
.registerTot .weui-toast {
  min-height: 30px !important;
  margin-top: 80px !important;
}
</style>
<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import "../../../node_modules/stylus-px2rem"
    @import "../../common/stylus/mixins.styl"
.registerTot {
  min-height: 1334px;
  padding-top: 1rem;
  background-image:url('../../../src/common/img/bj.png') ;
  background-size: cover;
  width: 100%;
  height: 100%

  /*background-color #c12121*/
}
.registerTit1{
  background: url('../../../src/common/img/bjlogo.png') no-repeat center;
  background-size: 100%;
  width 86%;
  height 630px;
  margin-left 10%;
}
.colRegister {
  padding: 0 1.2rem;
  font-size: 0.55rem;

  text-align: center;
  color: #ffc009;
  font-weight: bold;
}

.registerTit2 {
  margin-top: 0.08rem;
}

input {
  border-radius: 0.2rem;
  border: none;
}

.getVerif {
  display: inline-block;
  width: 194px;
  height: 68px;
  line-height: 68px;
  color: white;

  font-size: 0.26rem;
  text-align: center;
  background-color: #ADADAD;
  -moz-box-shadow: 0px 4px 1px #878787;
  /*firefox*/
  -webkit-box-shadow: 0px 4px 1px #878787;
  /*webkit*/
  /*safari或chrome*/
  box-shadow: 0px 4px 1px #878787;
  /*opera或ie9*/
  border-radius: 0.2rem;
  margin-right: -0.35rem;
  margin-left: 0.2rem;
}
.getMobile {
  padding: 0.2rem 0.35rem;
  font-size: 0.36rem;
  width: 438px;
  display: inline-block;
  background: #fff;
  margin-left -0.35rem;
}

.getNum {
  padding: 0.2rem 0.35rem;
  font-size: 0.36rem;
  background: #fff;
  width: 656px;
  margin-top: 32px;
}

.getNum1 {
  padding: 0.2rem 0.35rem;
  font-size: 0.36rem;
  width: 5.6rem;
  margin-top: 32px;
}

.inputMobile {
  text-align center;
}

.colAccept {
  display: inline-block;
  padding: 0.15rem 0.35rem;
  width: 656px;
  height: 74px;
  line-height: 62px;
  color: white;
  text-align: center;
  font-size: 0.36rem;
  border-radius: 0.2rem;
  margin-top: 32px;
  background-color: #ADADAD;
  /*box-shadow: 0px 4px 1px #878787;*/
  -moz-box-shadow: 0px 4px 1px #878787;
  /*firefox*/
  -webkit-box-shadow: 0px 4px 1px #878787;
  /*webkit*/
  /*safari或chrome*/
  box-shadow: 0px 4px 1px #878787;
  /*opera或ie9*/
}

.showStle {
  background-color: #ffc009;
  color :#38231C;
  -moz-box-shadow: 0px 4px 1px #c79403;
  /*firefox*/
  -webkit-box-shadow: 0px 4px 1px #c79403;
  /*webkit*/
  /*safari或chrome*/
  box-shadow: 0px 4px 1px #c79403;
  /*opera或ie9*/
}

.forbidStyle {
  background-color: #ADADAD;
}

#getCode {
  padding:30px 0;
  display: none;
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  /*color: #333333;*/
  /*background: rgba(0,0,0,0.8);*/
  background: #FFFFFF;
  width: 520px;
  height: 310px;
  text-align: center;
  margin: auto;
  z-index: 999;
  border-radius:16px;
}

#getCode1 {
  display: none;
  position: fixed;
  left: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.3);
  opacity: 0.8
  width: 100%;
  height: 100%;
  z-index: 990;
}

.getResult {
  /*text-align: center;*/
  background: #ffc009;
  width: 376px;
  height: 80px;
  line-height: 80px;
  font-size: 34px;
  margin: 20px auto;
  color: white;
  border-radius: 80px;
}

.getResult span {
  text-align: center;
}

#code {
  background-color: #EEEEEE;
  font-size: 34px;
  padding: 0px 30px;
  border-radius: 66px;
  width: 236px;
}
.getCodeText{
  color: #333;
  font-size:32px;
  margin-top: 0.3rem
}
</style>
