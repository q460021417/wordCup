<template>
<div class="match_list">
  <div class="banner">
    <img src="./img/match_list_bg1.png" alt="">
    <img src="./img/match_list_bg2.png" alt="">
  </div>
</div>
</template>

<script>
export default {
  data() {
    return {
      onloadTime: ''
    }
  },
  methods: {},
  created() {
    //隐藏分享
    this.$api.showOrHideIcon(false)
    this.$api.appWebTitle("2018世界杯赛程时间表")
    window.scrollTo(0, 1);
    //统计URL
    this.onloadTime = new Date().getTime();
    this.$api.urlCount('match_list', '2018世界杯赛程时间表', sessionStorage.userId, sessionStorage.mobile, this.onloadTime, location.href)
  },
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import "../../../node_modules/stylus-px2rem"
    @import "../../common/stylus/mixins.styl"
    .pd30{
      padding: 30px;
    }
    .match_list{
      background: #020f22
    }
    .banner{
      width: 100%;
      img{
        width: 100%
      }
    }
</style>
