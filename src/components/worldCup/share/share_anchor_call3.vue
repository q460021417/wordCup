<template>
<div class="share_anchor_call_wrap">
  <div class='share_header'>
  </div>
  <router-link class="guess" :to="{ name: 'guess', params: {} }" @click.native="to_guess_button_count">
    <img src="../img/jcbanner@2x.png" alt="">
  </router-link>
  <div class="support ">
    <div class='no_1'>
      <img :src='headerImg' v-show='headerImg' />
    </div>
    <router-link :to="{ name: 'anchor_ranking', params: {} } " @click.native="to_anchor_ranking_button_count">
      <img src="../img/dcall-banner@2x.png" alt="">
    </router-link>
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
  methods: {
    to_anchor_ranking_button_count() {
      this.$api.buttonCount(' to_anchor_ranking_button', '跳转到全名竞猜争霸赛', sessionStorage.userId, sessionStorage.mobile)
    },
    to_guess_button_count() {
      this.$api.buttonCount(' to_guess_button', '跳转到主播列表', sessionStorage.userId, sessionStorage.mobile)
    }
  },
  created() {
    window.scrollTo(0, 1);
    this.$api.showOrHideIcon(false)
    this.$api.appWebTitle("奖品区")
    this.onloadTime = new Date().getTime();
    this.$api.urlCount('prize_list', '奖品列表', sessionStorage.userId, sessionStorage.mobile, this.onloadTime, location.href)
  },
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import "../../../../node_modules/stylus-px2rem"
    @import "../../../common/stylus/mixins.styl"
    .share_anchor_call_wrap{
      background: black;
      height: 1580px;
    }
    .share_anchor_call_wrap .share_header{
      width:100%
      height: 1006px;
      background: url(./../img/gifts.png) no-repeat;
      background-size: 100%;
      position relative;
    }
    .race{
      padding: 0 30px;
      height: 230px;
    }
    .guess{
      height: 244px;
      padding: 0 20px;
      margin-top: 4px;
      margin-bottom: 20px
      display: block;
      img{
        width: 100%
      }
    }
    .support{
      height: 260px
      margin-bottom: 20px
      position: relative
      padding: 0 20px;
      img{
        width: 100%
      }
      .no_1{
        width: 50px
        height: 50px
        position: absolute
        left: 50%
        top: 50%
      }
    }
</style>
