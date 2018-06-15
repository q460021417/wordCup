<template>
<div class="reminderPage">
  <!--<h2>您已成功注册会员啦！赢豪礼，-->

  <!--与足球宝贝面对面，-->

  <!--更多精彩快下载APP一起参与吧！</h2>-->
  <div class="reminderTi">
  </div>
  <button type="button" name="button" @click="downApp('ios')"></button>
  <button type="button" name="button" @click="downApp()"></button>
</div>
</template>

<script>
export default {
  data() {
    return {}
  },
  methods: {
    downApp(ios) {
      if (ios) {
        window.location.href = 'https://itunes.apple.com/cn/app/石家庄爱泊车/id1324442772?mt=8'
      } else {
        window.location.href = 'http://sjzapp.aipark.com/download/sjzAipark.apk';
      }
    }
  },
  created() {

  },
  mounted() {
    // 隐藏音乐按钮
    setTimeout(function() {
      $('#open').hide()
      $('#stop').hide()
    }, 300)
    document.title = '下载APP'
    this.onloadTime = new Date().getTime();
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import "../../../node_modules/stylus-px2rem"
    @import "../../common/stylus/mixins.styl"
    .reminderPage{
      position: relative;
      text-align: center;
      min-height: 1334px;
      background: url('./img/appDownBg.jpg') #031308 no-repeat;
      background-size: 100% 100%;
      width: 100%;
      height: 100%
      h2{
        font-size: 42px;
        color: #D7921B;
        padding: 60px
      }
      button:nth-of-type(1){
        margin-right: 40px;
      }
      button{
        width: 240px;
        height: 80px;
        line-height: 80px;
        color: #fff;
        background: #D7921B;
        border-radius: 80px;
      }
      button:nth-of-type(1){
        background:url(./img/iosAppdown.png) no-repeat;
        background-size: 100%;
      }
      button:nth-of-type(2){
        background:url(./img/androidAppDown.png) no-repeat;
        background-size: 100%;
      }
      .reminderTi{
        // background: url('../../../src/common/img/successbj.png') no-repeat center;
        background-size: 100%;
        width 86%;
        height 920px;
        margin-left 10%;
      }
    }
</style>
