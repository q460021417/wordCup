<template>
<div class="guess">
  <img src="./../img/share_guess_bg.png" alt="" class="share_guess_bg">
  <div class="pd30 match_details_wraper_absolute">
    <div class="match_details_wraper">
      <div class="match_details">
        <div class="war_state">
          <div class="fl">
            <img :src="item.team1Flag" alt="">
          </div>
          <div class="fr">
            <img :src="item.team2Flag" alt="">
          </div>
        </div>
        <div class="count_down">
          <flexbox :gutter="0">
            <flexbox-item>
              <div class="flex-demo">
                <p v-text="item.team1Name">葡萄牙</p>

              </div>
            </flexbox-item>
            <flexbox-item>
              <div class="flex-demo">
                <p class="userScore">我的积分 <span v-text='item.userScore' v-if="item.userScore!='null'">100</span><span v-else>0</span></p>
              </div>
            </flexbox-item>
            <flexbox-item>
              <div class="flex-demo">
                <p v-text="item.team2Name">意大利</p>
              </div>
            </flexbox-item>
          </flexbox>
          <div class="share_bottom_text">
            <div class="" v-if="item.activeItemIndex==2">
              <p>本场比赛我押的 <span>平局</span></p>
              <p>我觉得双方不分伯仲！</p>
            </div>
            <div class="" v-else>
              <p>本场比赛我押的 <span v-text="item.activeItemIndex==1?item.team1Name:item.team2Name">葡萄牙</span> </p>
              <p>我觉得 <span v-text="item.activeItemIndex==1?item.team1Name:item.team2Name">葡萄牙</span> 必胜</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class='scan_code'>
    <qrcode :value="url" type="img"></qrcode>
  </div>
</div>
</template>

<script>
export default {
  data() {
    return {
      onloadTime: '',
      select_active: 0,
      item: {},
      url: ''
    }
  },
  methods: {

  },
  created() {

  },
  mounted() {
    window.scrollTo(0, 1);
    document.title = '石家庄爱泊车·足球竞猜赢豪礼'
    this.url = "http://" + location.hostname + "/#/reminderPage"
    localStorage.from_url = "http://" + location.hostname + "/#/share_guess"
    this.item.activeItemIndex = this.$route.query.activeItemIndex
    this.item.userScore = this.$route.query.userScore
    this.item.team1Flag = this.$route.query.team1Flag
    this.item.team2Flag = this.$route.query.team2Flag
    this.item.team1Name = this.$route.query.team1Name
    this.item.team2Name = this.$route.query.team2Name

    $('.scan_code img').css({
      width: '2.306666666666667rem',
      height: '2.306666666666667rem'
    })
    // 隐藏音乐按钮
    setTimeout(function() {
      $('#open').hide()
      $('#stop').hide()
    }, 300)
    this.$api.shareUrlCount('share2', '全民竞猜分享')
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import "../../../../node_modules/stylus-px2rem"
    @import "../../../common/stylus/mixins.styl"
    //mock 代码
    .pd30 {
      padding: 30px;
    }
    .guess{
      position: relative;
      z-index: 1
      .share_guess_bg{
        width: 100%;
        position: absolute;
        z-index: -1;
      }
      margin-bottom: 20px;
      min-height: 1234px;
      .match_details_wraper_absolute{
        position: absolute;
        top: 422px;
        left: 0;
        width: 100%;
      }
      .my_integral{
        margin-top: -40px;
        position: relative
        height: 82px;
        line-height: 82px;
        padding-left: 92px;
        font-size: 26px;
        color: #fff;
        background: url('./../img/jfbg@2x.png') no-repeat;
        background-size: cover;
        p{
          text-align: left;
        }
        .ranking_list{
          position: absolute;
          right: 50px;
          top: 0
          color: #FFBF12
        }
      }
      .match_time{
        position: relative;
        font-size: 26px;
        .fr{
          position: absolute;
          right: 0px;
          top: 0;
          bottom: 0;
          img{
            width: 34px;
            height: 14px;
          }
        }
      }
    }
    .match_both_sides{
      padding:40px
    }
    .match_details{
      width: 100%;
      padding: 40px 40px 0;
      color: #fff;
      position: relative;
      .mask_wrap{
        position: absolute;
        top: 0;
        left: 0;
        z-index: 22;
        background:rgba(0,0,0,0.6);
        color: #fff;
        width: 100%;
        height: 100%;
        font-size: 34px;
        height: 612px;
        line-height: 612px;
        text-align: center;
        border-radius: 16px;
      }
    }
    .header_title{
      margin: 30px auto;
      width: 100%;
      height: 58px;
      line-height:58px;
      text-align: left;
      padding-left: 60px;
      color: #E6FBFF;
      background: url("./../img/btl@2x.png") no-repeat;
      background-size: cover;
      position: relative;
      .blue_text{
        color: #34A7FF
      }
      .more{
        position: absolute;
        right:30px;
        top: 0;
        display: inline-block;
        color: #34A7FF
      }
      .blue_text{
        a{
          color:#fff
        }
      }
    }
    .war_state{
      position: relative;
      width: 414px;
      height: 176px;
      background: url("./../img/vs.png") no-repeat;
      background-size: 100%;
      margin: 30px auto;
      .fl,.fr{
        position: absolute;
        border-radius: 50%
        width: 146px;
        height: 146px;
        border:8px solid #448ACA;
        overflow: hidden;
        background: #fff;
        img{
          width: 74%;
          transform: translate(19%,50%);
        }
      }
      .fl{
        top: 16px;
        left: -73px;
      }
      .fr{
        position: absolute;
        top: 16px;
        right: -73px;
        border-radius: 50%
      }
    }
    .count_down{
      text-align: center;
      color: #fff;
      position: relative;
      button{
        font-size: 30px;
        text-align: center;
        margin: 30px auto;
        width: 360px;
        height: 94px;
        color: #3C2D0A
        background: url('./../img/btn-yzon@2x.png') no-repeat;
        background-size: cover;
        span:nth-of-type(1){
          display: block;
          line-height: 0.6
          font-weight: bold;
        }
        span:nth-of-type(2){
          font-size: 20px;
          line-height: 1
        }
      }
      button.disable{
        color: #3C2D0A
        background: url('./../img/btn-yzh@2x.png') no-repeat;
        background-size: cover;
        color: #fff;
      }
      .flex-demo{
        text-align: center;
        p:nth-of-type(1){
          font-size: 28px;
          line-height: 60px;
        }
        .gift_name{
          padding-top: 14px;
          margin: 0 auto;
          width: 180px;
          height: 84px;
          line-height: 1.2
          border-radius: 4px;
          background: #0068B7;
          font-size: 30px;
          position: relative;
          .icon_select_active{
            width: 36px;
            height: 36px;
            background:url('./../img/xz@2x.png') no-repeat;
            background-size: cover;
            position: absolute;
            right: 0;
            bottom: 0;
          }
          p{
            color: #123D64
            font-size: 20px;
            line-height: 1.2
          }
        }
        .gift_name.active{
          background-color:#d41d3b;
          p{
            color: #FFBF12;
          }
        }
      }
      .vux-flexbox-item:nth-of-type(2) .gift_name{
        width: 140px;
      }
    }
    .active_rule{
      color: #6e97be;
      background: rgb(6, 34, 61);
      padding: 36px 30px;
      font-size: 24px;
      border-radius: 16px;
      h3{
        color: #D0E3F5;
        line-height: 1.8
        font-size: 32px;
      }
      p{
        margin-bottom: 40px;
      }
    }
    .bets_yes{
      img:nth-of-type(1){
        width:100%
      }
      img:nth-of-type(2){
        width: 310px;
        height: 94px;
        transform:  translate(0.2rem, -2.2rem);
      }
      img:nth-of-type(3){
        width: 40px;
        height: 40px;
        transform:  translate(1rem,-7.6rem);
      }

    }
    .lineHeight{
      line-height: 1
    }
    .share_bottom_text{
      padding-top: 50px;
      font-size: 34px;
      color: #724920
      text-align: left;
      padding-left: 80px;
      p{
        line-height: 60px;
      }
      p:nth-of-type(2){
        padding-left: 140px;
      }
      span{
        font-weight: 600;
      }
    }
    .userScore{
      color: #34A7FF
    }
    .scan_code{
      width: 173px;
      height: 173px;
      position: absolute;
      bottom:40px;
      right: 40px;
      backGround:#666;
      z-index: 2
    }
</style>
