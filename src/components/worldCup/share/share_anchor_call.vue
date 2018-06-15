<template>
<div class="share_anchor_call_wrap relative">
  <img src="./../img/player_share_bg.jpg" alt="" class="player_share_bg">
  <div class="anchor_img_wraper" v-if="activePlayerId">
    <img :src="activePlayerId.portrait2" alt="" class="anchor_img" v-if="activePlayerId.portrait2">
    <div class="bottom_titile">
      <p class="relative">
        <span v-text="activePlayerId.name">宣萱</span>

        <span class="fl" v-if="activePlayerId.playerRank=='-1'">未上榜</span>
        <span class="fl" v-else><span>最新排名NO.<span v-text="activePlayerId.playerRank" class="t_l">1</span></span><br/>
        <span v-text="activePlayerId.score">136464</span>票
        </span>

        <span class="fr"><span v-text="activePlayerId.platform">YY直播</span>
        <br/>房间号：<span v-text="activePlayerId.roomNum">8922</span></span>
      </p>
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
      activePlayerId: '',
      showPositionValue: false,
      showPositionValueText: '',
      disableBtn: false,
      showToast: false,
      url: ''
    }
  },
  methods: {
    participate() {
      this.$router.push({
        name: 'registerPage'
      })
    },
    //获取单个主播信息
    getPlayerById() {
      // COMBAK:
      // var playid = {
      //   "userPraiseCounts": 1,
      //   "platform": "快手",
      //   "ordernum": "8",
      //   "score": 27,
      //   "portrait2": "http://sjzapp.aipark.com/cupworld/image/player1/photo2.png",
      //   "portrait1": "http://sjzapp.aipark.com/cupworld/image/player1/photo1.png",
      //   "nickName": "开播8",
      //   "playerId": "d83a799b-6acb-11e8-92d0-6c92bf3bb2e5",
      //   "description": "开心最重要8",
      //   "roomNum": "8",
      //   "name": "开心主播8",
      //   "playerRank": 1,
      //   "homePage": "小鱼8",
      //   "userRank": 9,
      //   "portrait3": "http://sjzapp.aipark.com/cupworld/image/player1/photo3.png"
      // }
      // this.activePlayerId = playid
      // return false
      this.$http.post('/api/v1/player/getPlayerById', {
        param: JSON.stringify({
          'k': this.$route.query.token,
          'data': {
            'playerId': this.$route.query.playerId
          }
        })
      }).then(response => {
        this.activePlayerId = response.data.data.player
        // this.playerList = JSON.parse(response.data.data.playerList)
      })
    },
    //打call
    addVoteRecord() {
      if (this.disableBtn) {
        this.showPositionValue = true;
        this.showPositionValueText = '会员投票到达上限';
        return false
      }
      this.$http.post('/api/v1/voteRecord/friendAddVoteRecord', {
        param: JSON.stringify({
          'k': this.$route.query.token,
          'data': {
            'userId': this.$route.query.userId,
            'playerId': this.$route.query.playerId
          }
        })
      }).then(response => {
        this.disableBtn = true;
        window.localStorage.setItem('disableBtn', true)
        this.showToast = true;
        // this.showPositionValue = true;
        // this.showPositionValueText = response.data.msg;
      })
    },
  },
  created() {

  },
  mounted() {
    this.url = "http://" + location.hostname + "/#/reminderPage"
    localStorage.from_url = "http://" + location.hostname + "/#/share_anchor_call"
    if (window.localStorage.getItem('disableBtn')) {
      this.disableBtn = true
    }
    this.getPlayerById();
    //隐藏分享
    document.title = '石家庄爱泊车·美女邀您激情趴'
    // 隐藏音乐按钮
    setTimeout(function() {
      $('#open').hide()
      $('#stop').hide()
    }, 300)
    $('.scan_code img').css({
      width: '2.306666666666667rem',
      height: '2.306666666666667rem'
    })
    this.$api.shareUrlCount('share3', '相约足球宝贝')
  }
}
</script>
<style media="screen">
.weui-toast {
  width: 80% !important
}

.call_yes .weui-dialog {
  width: 7.653333333333333rem;
  height: 6rem;
  background: url('./../img/dacallBg.png') no-repeat center center;
  background-size: 7.653333333333333rem 100%;
  border-radius: 10px;
  color: #E438C0;
}

.call_yes .call_yes_text {
  height: 100px;
  font-size: 16px;
  padding: 2rem 0 1.6rem;
  font-weight: bold;
}

.call_yes .weui-dialog button {
  width: 6.08rem;
  height: 1.306666666666667rem;
  background: url('./../img/dacall4.png') no-repeat;
  background-size: cover;
  color: #fff;
}
</style>
<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import "../../../../node_modules/stylus-px2rem"
    @import "../../../common/stylus/mixins.styl"
    .share_anchor_call_wrap{
      min-height: 1202px;
      position: relative;
      .player_share_bg{
        width: 100%
      }
      // background: url('./../img/player_share_bg.png') no-repeat center center;
      // background-size: 100%;
      .scan_code{
        width: 173px;
        height: 173px;
        position: absolute;
        bottom: 40px;
        right: 40px;
        backGround:#666;
      }
      .share_call_bg02{
        position: absolute;
        top: -34px;
        left: 105px;
        width: 542px;
        height: 164px;
      }
      .share_call_bg01{
        position: absolute;
        top: 162px;
        left: 26px;
        width: 715px;
        height: 474px;
      }
      .share_call_bg03{
        position: absolute;
        bottom: 160px;
        left: 0px;
        width: 100%;
        height: 70px;
      }
      .share_call_btn{
        width: 455px;
        height: 98px;
        background: url(../img/share_call_btn_bg.png) no-repeat;
        background-size: cover;
        color: #fff
        font-size: 24px
        text-align: center;
      }
      .share_call_btn.disable{
        color:#fff
        background: url('./../img/button-h2.png') no-repeat;
        background-size: 100% 100%;
      }
      .anchor_img_wraper{
        width: 616px;
        height: 616px;
        position: absolute;
        top: 158px;
        left: 66px;
        z-index: 2;
      }
      .anchor_img{
        width: 616px;
        height: 616px;
        display: block;
        // background:#1b1b1b54;
        border-radius: 20px;
      }
      .bottom_titile{
        color: #fff
        position: absolute;
        bottom: 0
        left: 0
        width: 100%
        height: 180px
        padding: 0px 30px 0
        font-size: 38px
        p{
          height: 100%
          font-size: 48px;
          text-align: left;
          .fl{
            position: absolute;
            left: 0
            bottom: 20px
            color:#fff
            text-align: left;
            font-size: 24px
            display: block;
            color: #fff;
            span:nth-of-type(1){
              color: #f2499c
            }
          }
          .fr{
            position:absolute;
            right: 0;
            bottom: 20px
            text-align: right;
            font-size: 24px
            color: #fff;
            span:nth-child(1){
              color: #FFFF00
            }
          }
        }
        }
        .content_text{
          position: absolute;
          top: auto;
          left: 0;
          color: #fff;
          width: 100%;
          text-align: center;
          h2{
            font-size: 72px;
          }
          h3{
            font-size: 30px;
            font-weight: 300;
            letter-spacing:6px
          }
        }
        .colorZ{
          color: #f2499c;
        }
    }
</style>
