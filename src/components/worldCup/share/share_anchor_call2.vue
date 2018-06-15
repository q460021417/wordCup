<template>
<div class="share_anchor_call_wrap">
  <div class='share_header'>
    <img src="../img/shaer_bg1.png" alt="" class="shaer_bg1">
    <div class='scan_code'>
      <qrcode :value="url" type="img"></qrcode>
    </div>
  </div>
</div>
</template>

<script>
export default {
  data() {
    return {
      url: '',
    }
  },
  methods: {

  },
  created() {

  },
  mounted() {
    // 隐藏音乐按钮
    setTimeout(function() {
      $('#open').hide()
      $('#stop').hide()
    }, 300)
    document.title = '石家庄爱泊车·带你玩转世界杯'
    this.url = "http://" + location.hostname + "/#/reminderPage"
    localStorage.from_url = "http://" + location.hostname + "/#/share_anchor_call2"
    $('.scan_code img').css({
      width: '2.306666666666667rem',
      height: '2.306666666666667rem'
    })
    this.$api.shareUrlCount('share1', '首页分享')
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import "../../../../node_modules/stylus-px2rem"
    @import "../../../common/stylus/mixins.styl"
    .share_anchor_call_wrap{
      position relative
      .shaer_bg1{
        width: 100%;
      };
    }
    .scan_code{
      width: 173px;
      height: 173px;
      position: absolute;
      bottom: 40px;
      right: 40px;
      backGround:#666;
    }
</style>
