<template>
<div class="prize_list">
  <header>
    <router-link :to="{ name: 'guess', params: {} }">参与足球竞猜，赢天降豪礼！GO!</router-link>
  </header>
  <div class="prize_list_data">
    <grid :cols="3" :show-lr-borders="false" class="grid_wrap">
      <grid-item v-for="i in 6" :key="i">
        <span class="grid-center">
           <img src="" alt="">
          <span>NO.1</span>
        <span>iphoneX一部</span>
        <span>价值：8888元</span></span>
      </grid-item>
    </grid>
  </div>
</div>
</template>

<script>
export default {
  data() {
    return {
      showHideOnBlur: false
    }
  },
  methods: {
    dialog_show() {
      this.showHideOnBlur = true
    },
  },
  created() {
    //隐藏分享
    // this.$api.showOrHideIcon(false)
    this.$api.appWebTitle("相约足球宝贝")
    this.$api.showOrHideIcon(false);
    window.scrollTo(0, 1);
    //统计URL
    // this.$api.urlCount('prize_list', '相约足球宝贝', sessionStorage.token, sessionStorage.userInfo.mobile, this.onloadTime, location.href)
  },
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  *{
    text-align: center;
  }
    @import "../../../node_modules/stylus-px2rem"
    @import "../../common/stylus/mixins.styl"
    //mock 代码
    .banner{
      height: 400px;
      background-color: #75755a
    }
    .headr_img{
      width: 80px;
      height: 80px;
      background-color: #f00;
    }
    .dialog_header_img{
      height: 400px;
      overflow: hidden;
      position: relative;
    }
    .bottom_titile{
      background: #00000082
      color: #fff
      position: absolute;
      bottom: 0
      left: 0
      width: 100%
      height: 80px
      line-height: 80px
      padding: 0 20px
      font-size: 38px
      .fl{
        position: absolute;
        left: 0
        top: 0
      }
      .fr{
        position:absolute;
        right: 0;
        top: 0
      }
    }
    .contribution10{
      i{
        display: inline-block;
        width: 80px;
        height: 80px;
        overflow: hidden;
        border-radius: 50%;
        background-color: #f00
      }
    }
    .prize_list_data{
        .grid_wrap{
          text-align: center;
          img{
            width: 80px;
            height: 80px;
            background: #9c3131;
            display:inline-block;
          }
          span{
            padding: 10px
            display: block
          }
        }
    }

</style>
