<template>
<div class="anchor_ranking">
  <div class="banner relative">
    <p class="absolute">给宝贝打CALL与小姐姐相约 <span>面对面</span> </p>
  </div>
  <dl class="anchor_ranking_list">
    <dt class="relative">
      <h2 class="heaader_hit_call_text_h2">最新排行</h2>
      <!-- <p>最新排名</p> -->
      <p class="heaader_hit_call_text">Pick你喜欢的主播，为她打call！ <span class="heaader_hit_call_number">今日可投：<span v-text=userCount>5</span>  票</span> </p>
    </dt>
    <dd v-for="(item,index) in playerList">
      <flexbox class="ranking_lists_rows" :gutter='0'>
        <flexbox-item :span="0.1">
          <div class="flex-demo">
            <div class="top_number" v-if="item.playerRank=='999999'" v-text="playerList[index-1].playerRank+2">
            </div>
            <div class="top_number" v-text="item.playerRank+1" v-else>
            </div>
          </div>
        </flexbox-item>
        <flexbox-item :span="0.2">
          <div class="flex-demo relative">
            <div class="icon_top1"></div>
            <img :src="item.portrait1" alt="" class="header_img" @click="dialog_show(item.playerId,index)">
          </div>
        </flexbox-item>
        <flexbox-item @click.native="dialog_show(item.playerId,index)">
          <div class="flex-demo">
            <p v-text="item.nickName">Prayer@</p>
            <p v-text="item.description">人气颜值小太阳 </p>
          </div>
        </flexbox-item>
        <flexbox-item :span="0.275">
          <div class="flex-demo">
            <p><span v-text="item.userPraiseCounts">34949</span> 票</p>
            <button v-if="item.callState" type="button" name="button" class="hit_call_btn" @click="addVoteRecord(item.playerId,index)" :class="{disable:disableBtn}">继续打call</button>
            <button v-else type="button" name="button" class="hit_call_btn" @click="addVoteRecord(item.playerId,index)" :class="{disable:disableBtn}">打call</button>
          </div>
        </flexbox-item>
      </flexbox>
    </dd>
  </dl>
  <div class="activity_rules">
    <img src="./img/Activity_Rules@2x.png" alt="">
    <h2>活动规则</h2>
    <div class="activity_rules_text">1.每用户每日可获得10次打CALL机会，分享喜欢的主播，可额外获得5次打CALL机会，每日总计15次打CALL机会；
      <br/><b>注意事项：</b><br/>为保证您的投票权益，请按照此操作方式完成主播分享增加投票次数：分享后在微信提示中点击“返回石家庄爱泊车”获得分享投票次数。
      <br/>2.各主播粉丝贡献榜前10名用户可获得线下“巅峰之夜”party门票，亲临现场与网红主播近距离互动，更可获得主播精心准备的特别大礼；
      <br/>3.打CALL有效期截止7月12日中午12:00:00，届时我们将关闭打CALL通道；
      <br/>4.本活动最终解释权归石家庄爱泊车科技有限公司所有；
    </div>
  </div>
  <x-dialog v-model="showHideOnBlur" @touchmove.native.prevent @touchmove.native.stop class="dialog_wraper" hide-on-blur>
    <div class="dialog_header_img">
      <img :src="activePlayerId.portrait2" style="max-width:100%">
      <div @click="showHideOnBlur=false">
        <span class="vux-close"></span>
      </div>
      <div class="bottom_titile">
        <p class="relative">
          <span v-text="activePlayerId.name">宣萱</span>
          <span class="fl" v-if="activePlayerId.playerRank=='-1'">未上榜</span>
          <span class="fl" v-else>最新排名NO.<span v-text="activePlayerId.playerRank" class="t_l">1</span></span>
          <span class=" fr "><span  v-text="activePlayerId.score ">136464</span>票</span>
        </p>
      </div>
    </div>
    <div class="anchor_details ">
      <div class="anchor_details_header ">
        <span v-text="activePlayerId.platform ">YY直播</span>
        <span>房间号：<span  v-text="activePlayerId.roomNum ">5938</span></span><br/>
        <div class="player_sina ">
          <span v-if="activePlayerId.homePage "> <i class="icon_sina "></i> <span>微博id：</span><span v-text="activePlayerId.homePage " class="c333">小可爱小可爱小可爱小可爱小可爱小可爱小可爱</span> </span>
        </div>
      </div>
      <div class="contribution10 ">
        <h2>贡献TOP10</h2>
        <img :src="!item.photo? '/static/img/morentu_touxiang.png':item.photo " alt=" " v-for="item in playerUserLists ">
      </div>
      <flexbox>
        <flexbox-item>
          <div class="flex-demo ">
            <div class="my_contribution ">
              <span class="c333 " v-text="activePlayerId.userPraiseCounts ">289</span>
              <span class="c999 ">我的贡献</span>
              <x-button @click.native="share(activePlayerId.playerId,activePlayerId.portrait1) ">分享</x-button>
            </div>
          </div>
        </flexbox-item>
        <flexbox-item>
          <div class="flex-demo ">
            <div class="bottom_btn ">
              <span class="c333 " v-text="activePlayerId.userRank=='-1' ? '未上榜':activePlayerId.userRank ">289</span>
              <span class="c999 ">我的排名</span>
              <x-button v-if="activePlayerId.callState" @click.native="add_call(activePlayerId.playerId) " @button-default-bg-color="[ '#f00'] " :class="{disable:disableBtn} ">继续打call</x-button>
              <x-button v-else @click.native="add_call(activePlayerId.playerId) " @button-default-bg-color="[ '#f00'] " :class="{disable:disableBtn} ">打call</x-button>
            </div>
          </div>
        </flexbox-item>
      </flexbox>
    </div>
  </x-dialog>
  <div class="vux-toast vux-toast2" wdith="200px ">
    <div class="weui-mask_transparent weui-mask_transparent2" style="display: none;"></div>
  </div>
  <toast v-model="showPositionValue " type="text " wdith="200px " :time="2000 " is-show-mask :text="showPositionValueText " position="middle "></toast>

</div>
</template>

<script>
import {
  mapGetters
} from 'vuex'
export default {
  data() {
    return {
      userCount: 0,
      showHideOnBlur: false,
      playerList: [],
      activePlayerId: '',
      playerUserLists: [],
      showPositionValue: false,
      showPositionValueText: '',
      disableBtn: false,
      onloadTime: '',
      playerCallState: {}
    }
  },
  methods: {
    //获取主播列表
    getPlayerList() {
      // // COMBAK:
      // var arr = [{
      //   "userPraiseCounts": 1,
      //   "platform": "网易",
      //   "ordernum": "2",
      //   "score": 0,
      //   "portrait2": "http://sjzapp.aipark.com/cupworld/image/player1/photo2.png",
      //   "portrait1": "http://sjzapp.aipark.com/cupworld/image/player1/photo1.png",
      //   "nickName": "开播2",
      //   "playerId": "1986484d-6ae6-11e8-92d0-6c92bf3bb2e1",
      //   "description": "开心最重要2",
      //   "roomNum": "2",
      //   "name": "开心主播2",
      //   "playerRank": 7,
      //   "homePage": "小鱼2",
      //   "userRank": 0,
      //   "portrait3": "http://sjzapp.aipark.com/cupworld/image/player1/photo3.png"
      // }, {
      //   "userPraiseCounts": 10,
      //   "platform": "快手",
      //   "ordernum": "8",
      //   "score": 0,
      //   "portrait2": "http://sjzapp.aipark.com/cupworld/image/player1/photo2.png",
      //   "portrait1": "http://sjzapp.aipark.com/cupworld/image/player1/photo1.png",
      //   "nickName": "开播8",
      //   "playerId": "d83a799b-6acb-11e8-92d0-6c92bf3bb2e5",
      //   "description": "开心最重要8",
      //   "roomNum": "8",
      //   "name": "开心主播8",
      //   "playerRank": 999999,
      //   "homePage": "小鱼8",
      //   "userRank": 0,
      //   "portrait3": "http://sjzapp.aipark.com/cupworld/image/player1/photo3.png"
      // }]
      // for (var key in this.playerCallState) {
      //   for (var i = 0; i < arr.length; i++) {
      //     if (this.playerCallState.hasOwnProperty(key)) {
      //       if (arr[i].playerId == key) {
      //         arr[i].callState = this.playerCallState[key]
      //       }
      //     }
      //   }
      // }
      // this.playerList = arr
      // return false
      this.$http.post('api/v1/player/getPlayerList', {
        param: JSON.stringify({
          'k': sessionStorage.token
        })
      }).then(response => {
        let playerList = response.data.data.playerList
        for (var key in this.playerCallState) {
          for (var i = 0; i < playerList.length; i++) {
            if (this.playerCallState.hasOwnProperty(key)) {
              if (playerList[i].playerId == key) {
                playerList[i].callState = this.playerCallState[key]
              }
            }
          }
        }
        this.playerList = playerList
      })
    },
    //获取投票次数
    getUserCount() {
      this.$http.post('api/v1/player/getUserCount', {
        param: JSON.stringify({
          'k': sessionStorage.token,
          'data': {
            'userId': sessionStorage.userId
          }
        })
      }).then(response => {
        this.userCount = response.data.data.userCount
        if (this.userCount == 0) {
          this.disableBtn = true
        } else {
          this.disableBtn = false
        }
        // this.playerList = JSON.parse(response.data.data.playerList)
      })
    },
    //查询主播投票会员top10
    getPlayerUserList(playerId) {
      // COMBAK:
      // var arr = [{
      //     "sex": null,
      //     "score": 0,
      //     "synStatus": false,
      //     "voteCount": 11,
      //     "photo": " http://sjzapp.aipark.com/cupworld/image/player1/photo3.png",
      //     "registerTime": null,
      //     "userdetailId": null,
      //     "rank": 1,
      //     "username": null,
      //     "age": null,
      //     "appUserId": "d99cc29b_6aff_11e8_92d0_6c92bf3bb2e1",
      //     "mobile": "13391970525"
      //   },
      //   {
      //     "sex": null,
      //     "score": 0,
      //     "synStatus": false,
      //     "voteCount": 11,
      //     "photo": "",
      //     "registerTime": null,
      //     "userdetailId": null,
      //     "rank": 1,
      //     "username": null,
      //     "age": null,
      //     "appUserId": "d99cc29b_6aff_11e8_92d0_6c92bf3bb2e1",
      //     "mobile": "13391970525"
      //   },
      //   {
      //     "sex": null,
      //     "score": 0,
      //     "synStatus": false,
      //     "voteCount": 11,
      //     "photo": null,
      //     "registerTime": null,
      //     "userdetailId": null,
      //     "rank": 1,
      //     "username": null,
      //     "age": null,
      //     "appUserId": "d99cc29b_6aff_11e8_92d0_6c92bf3bb2e1",
      //     "mobile": "13391970525"
      //   }
      // ]
      // this.playerUserLists = arr;
      // return false
      this.$http.post('api/v1/player/getPlayerUserList', {
        param: JSON.stringify({
          'k': sessionStorage.token,
          'data': {
            'playerId': playerId
          }
        })
      }).then(response => {
        this.playerUserLists = response.data.data.playerUserList
      })
    },
    //获取单个主播信息
    getPlayerById(playerId, index) {
      // COMBAK:
      // var playid = {
      //   "userPraiseCounts": 0,
      //   "platform": "网易",
      //   "ordernum": "2",
      //   "score": 56,
      //   "portrait2": "http://sjzapp.aipark.com/cupworld/image/player1/photo2.png",
      //   "portrait1": "http://sjzapp.aipark.com/cupworld/image/player1/photo1.png",
      //   "nickName": "开播2",
      //   "playerId": "1986484d-6ae6-11e8-92d0-6c92bf3bb2e1",
      //   "description": "开心最重要",
      //   "name": "开心主播2",
      //   "playerRank": "2",
      //   "homePage": '1111',
      //   "userRank": 8,
      //   "portrait3": "http://sjzapp.aipark.com/cupworld/image/player1/photo3.png"
      // }
      // var playerInfo = () => {
      //   for (var i = 0; i < this.playerList.length; i++) {
      //     if (this.playerList[i].playerId == playerId) {
      //       return this.playerList[i]
      //     }
      //   }
      // }
      // return this.activePlayerId = playerInfo()
      this.$http.post('/api/v1/player/getPlayerById', {
        param: JSON.stringify({
          'k': sessionStorage.token,
          'data': {
            'playerId': playerId
          }
        })
      }).then(response => {
        let player = response.data.data.player
        for (var key in this.playerCallState) {
          if (player.playerId == key) {
            player.callState = this.playerCallState[key]
          }
        }
        this.activePlayerId = player;
        this.activePlayerId.index = index;
      })
    },
    //分享后加分
    addShareRecord() {
      this.$http.post('/api/v1/shareRecord/addShareRecord', {
        param: JSON.stringify({
          'k': sessionStorage.token,
          'data': {
            'userId': sessionStorage.userId
          }
        })
      }).then(response => {})
    },
    dialog_show(playerId, index) {
      this.activePlayerId = '';
      this.showHideOnBlur = true
      this.getPlayerUserList(playerId)
      this.$api.buttonCount('dialog_show', '查看主播详情', sessionStorage.userId, sessionStorage.mobile)
      this.getPlayerById(playerId, index)
    },
    //APP分享成功后回调函数
    appCallback() {
      this.addShareRecord()
      setTimeout(() => {
        //更新投票次数
        this.getUserCount();
        //更新主播列表s
        this.getPlayerList();
      }, 500)
      this.$api.shareButtonCount('appShareCallback', '分享主播成功', sessionStorage.userId, sessionStorage.mobile)
    },
    share(playerId, imgUrl) {
      let shareData = {
        url: "http://" + location.hostname + "/#/share_anchor_call?token=" +
          sessionStorage.token + "&userId=" + sessionStorage.userId + "&playerId=" + playerId, // 链接
        title: '石家庄爱泊车·美女邀您激情趴', // 标题
        content: "为最美足球宝贝打call，赢取豪华大礼，参与主播零距离互动！", // 文字描述
        picUrl: imgUrl, // 图片url
        type: '1'
      };
      this.$api.AppShare(shareData)
      this.$api.ButtonCount('shareBtn', '分享按钮', sessionStorage.userId, sessionStorage.mobile)
    },
    //打call
    addVoteRecord(playerId, index) {
      $('.vux-toast2 .weui-mask_transparent2').show()
      setTimeout(function() {
        $('.vux-toast2 .weui-mask_transparent2').hide()
      }, 2000)
      if (this.disableBtn) {
        this.showPositionValueText = '每天首次分享+5票';
        this.showPositionValue = true;
        return false
      }
      //存localStorage
      for (var key in this.playerCallState) {
        if (this.playerCallState.hasOwnProperty(key)) {
          if (playerId == key) {
            this.playerCallState[key] = true
          }
        }
      }
      sessionStorage.playerCallState = JSON.stringify(this.playerCallState)
      for (var key in this.playerCallState) {
        for (var i = 0; i < this.playerList.length; i++) {
          if (this.playerCallState.hasOwnProperty(key)) {
            if (this.playerList[i].playerId == key) {
              this.playerList[i].callState = this.playerCallState[key]
              if (index == i) {
                this.playerList[i].userPraiseCounts += 1;
              }
            }
          }
        }
      }
      this.$http.post('/api/v1/voteRecord/addVoteRecord', {
        param: JSON.stringify({
          'k': sessionStorage.token,
          'data': {
            'userId': sessionStorage.userId,
            'playerId': playerId
          }
        })
      }).then(response => {
        if (response.data.status) {
          this.showPositionValueText = response.data.msg;
          this.showPositionValue = true;
          //获取次数
          this.getUserCount();
          this.getPlayerById(playerId, index)
        }
      })
      this.$api.buttonCount('list_add_call', '列表为主播打call', sessionStorage.userId, sessionStorage.mobile)
    },
    add_call(playerId) {
      if (this.disableBtn) {
        this.showPositionValueText = '每天首次分享+5票';
        this.showPositionValue = true;
        return false
      }
      for (var i = 0; i < this.playerList.length; i++) {
        if (this.playerList[i].playerId == playerId) {
          this.$set(this.playerList[i], 'callState', true)
          break;
        }
      }
      this.$set(this.activePlayerId, 'callState', true)
      this.$set(this.playerCallState, playerId, true)
      sessionStorage.playerCallState = JSON.stringify(this.playerCallState)
      this.addVoteRecord(playerId, this.activePlayerId.index)
      this.$api.buttonCount('add_call', '为主播打call', sessionStorage.userId, sessionStorage.mobile)
    }
  },
  created() {
    window.scrollTo(0, 1);
    this.playerCallState = JSON.parse(sessionStorage.playerCallState)
    //获取主播列表
    this.getPlayerList();
    //获取次数
    this.getUserCount();
    window.appCallback = this.appCallback
    //隐藏分享
    this.$api.appWebTitle("相约足球宝贝")
    this.$api.showOrHideIcon(false)
    //统计URL
    this.onloadTime = new Date().getTime();
    this.$api.urlCount('anchor_ranking', '相约足球宝贝', sessionStorage.userId, sessionStorage.mobile, this.onloadTime, location.href)
  }
}
</script>
<style media="screen">
.anchor_ranking .weui-btn_default:not(.weui-btn_disabled):active {
  background-color: rgba(255, 0, 0, 0);
  color: #fff
}



.anchor_ranking .weui-dialog {
  border-radius: 9px
}

.anchor_ranking .weui-mask_transparent {
  z-index: 5002 !important;
}

.anchor_ranking .weui-toast {
  z-index: 5003 !important;
}
</style>
<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import "../../../node_modules/stylus-px2rem"
    @import "../../common/stylus/mixins.styl"

    .anchor_ranking{
      background:url('./img/anchor_rankingBg.png') no-repeat;
      background-size: cover;
    }
    .anchor_ranking_list{
      width: 696px;
      background: #241262;
      margin: 0 auto;
      padding:60px 28px 28px 10px;
      border-radius: 6px;
      border-top: 4px solid #EB39BC
      dt{
        color: #FFFF00;
        margin-bottom: 10px;
        .heaader_hit_call_number{
          color: #fff
          span{
            color: #FFFF00
          }
        }
      }
      dd{
        padding: 10px 0;
        height: 174px;
        .vux-flexbox-item:nth-child(1) {
          font-size: 32px;
          color: #9983E6;
          .flex-demo,.top_number{
            height: 100%;
            line-height: 144px;
          }
        }
        .vux-flexbox-item:nth-child(n+2){
          border-bottom: solid 1px  #574593;
        }
         .ranking_lists_rows{
           height: 100%;
         }
        .vux-flexbox-item{
          height: 100%;
        }

        .ranking_lists_rows .vux-flexbox-item:nth-child(1){
          text-align: center;
          height: 100%
        }
        .ranking_lists_rows .vux-flexbox-item:nth-child(2){
          padding-top: 16px;
          height: 100%
          line-height: 100%;
        }
        .ranking_lists_rows .vux-flexbox-item:nth-child(3){
          color: #fff;
          font-size: 28px;
          p:nth-child(1){
            line-height: 54px
          }
          p:nth-child(2){
            color: #D999FF;
            font-size: 22px;
          }
        }
        .ranking_lists_rows .vux-flexbox-item:nth-child(4){
          font-size: 22px;
          color: #fff
            padding-top: 10px;
          p{
            text-align: right
            margin-bottom: 4px;
          }
          span{
              color: #FFFF00
              font-size: 30px;
          }
          button{
            width: 176px;
            height: 70px;
            background: url('./img/buttonBg.png') no-repeat;
            background-size: cover;
            color: #fff;
            text-align: center;
            line-height: 70px;
            margin-left: 20px;
          }
          button.disable{
            color:#fff
            background: url('./img/button_h.png') no-repeat;
            background-size: cover;
          }
        }
      }
      dd:nth-of-type(1){
        .ranking_lists_rows:nth-child(1) .vux-flexbox-item:nth-child(2){
          .icon_top1{
            width: 60px;
            height: 34px;
            background: url('./img/top01Bg.png') no-repeat;
            background-size: cover;
            position: absolute;
            top: -26px;
            left: 24px;
          }
        }
      }
      dd:nth-of-type(1) .vux-flexbox-item:nth-child(1) {
        text-indent: -999px
        background: url('./img/top1.png') no-repeat center center;
        background-size: 0.733333333333333rem 0.6rem
      }
      dd:nth-of-type(2) .vux-flexbox-item:nth-child(1) {
        text-indent: -999px
        background: url('./img/top2.png') no-repeat center center;
        background-size: 0.733333333333333rem 0.6rem

      }
      dd:nth-of-type(3) .vux-flexbox-item:nth-child(1) {
        text-indent: -999px
        background: url('./img/top3.png') no-repeat center center;
        background-size: 0.733333333333333rem 0.6rem
      }
    }
    .banner{
      width: 100%;
      height: 598px;
      background: url("./img/jqyx.jpg") no-repeat;
      background-size: 100% auto;
      margin-bottom: 40px;
      .absolute{
        top: auto;
        bottom: 0;
        left: 0;
        right: 0;
        text-align: center;
        font-size: 36px;
        color: #fff
        span{
          color: #EB39BC
          font-weight: bold
        }
      }
    }
    .heaader_hit_call_text_h2{
      position: absolute;
      top: -90px;
      left: 0;
      text-align: center;
      width: 100%;
      background: url('./img/jx@2x.png') no-repeat center center;
      background-size: 4.586666666666667rem 1.04rem;
      color: #fff;
    }
    .heaader_hit_call_text{
      font-size: 24px;
      color: #FFFF00;
      position: relative;
      padding-left: 10px;
      .heaader_hit_call_number{
        position: absolute;
        right: 0;
        top: 0;
        text-align: right;
      }
    }
    .header_img{
      width:107px;
      height: 107px;
      border-radius: 50%;
      border:solid #AC5FDA 1px;
      background: #1c0d4e;
      display: block;
    }
    .dialog_header_img{
      width: 616px;
      height: 616px;
      overflow: hidden;
      position: relative;
      .vux-close{
        width: 50px;
        height: 50px;
        background: url('./img/close.png') no-repeat;
        background-size: cover;
        position: absolute;
        right:20px;
        top: 20px;
      }
    }
    .bottom_titile{
      color: #fff
      position: absolute;
      bottom: 0
      left: 0
      width: 100%
      height: 152px
      padding: 20px 30px 0
      font-size: 38px
      background:url('./img/playerTitleBg.png') no-repeat center center;
      background-size: 100%;
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
          color: #F2499C
          font-size: 24px
          display: block;
        }
        .fr{
          position:absolute;
          right: 0;
          bottom: 20px
          text-align: right;
          font-size: 24px
        }
      }
    }
    .contribution10{
      margin-bottom: 34px;
      text-align: left;
      h2{
        font-size: 22px;
        color: #333;
        text-align: left;
        margin-bottom: 16px;
      }
      img{
        display: inline-block;
        width: 48px;
        height: 48px;
        overflow: hidden;
        border-radius: 50%;
        // background: url('./img/morentu_touxiang.png') no-repeat center center;
        // background-size: cover;
        margin-right: 6px
      }
    }
    .my_contribution,.bottom_btn{
      text-align: center;
      span{
        display: block;
        height: 38px;
        line-height: 38px;
      }
      b{
        font-weight: normal;
      }
    }
    .anchor_details{
      padding:30px;
      button{
        width: 228px;
        height: 88px;
        background:url('./img/icon_share_btn_bg.png') no-repeat;
        background-size: cover;
        color: #fff;
        font-size: 24px;
      }
      button.disable{
        color:#fff
        background: url('./img/button_h.png') no-repeat;
        background-size: cover;
      }
      button:after{
        border: none
      }
    }
    .anchor_details_header{
      line-height: 40px;
      text-align: left;
      padding: 20px 0px
      span{
        height: 40px;
        line-height: 40px;
        display: inline-block;
        margin-right: 10px
      }
      span:nth-child(1){
        color: #FFC000
      }
      span:nth-child(2),span:nth-child(3){
        color: #999
        margin-right: 0;
      }
      span:nth-child(2) span,span:nth-child(3) span{
        color: #333
        border: none;
      }
      span:nth-child(4) span{
        height: 40px;
        line-height: 40px;
        max-width: 100px;
        overflow: hidden;
        display: inline-block;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .player_sina{
        margin-top: 10px;
      }
      .icon_sina{
        width: 27px;
        height: 27px;
        background: url('../../common/img/icon_sina.png') no-repeat;
        background-size: cover;
        display: inline-block;
        vertical-align: text-top;
      }
    }
    .c333{
      color: #333!important;
    }
    .c999{
      color: #999!important;
    }
    .reward_rules,.activity_rules{
      font-size: 22px;
      color:#E6D9EF;
      padding:30px;
      margin-top: 40px;
    }
    .reward_rules h2,.activity_rules h2{
      font-size: 26px;
      color: #F0499B;
      text-align: center;
      margin: 16px auto;
    }
    .reward_rules img:nth-of-type(1),.activity_rules img:nth-of-type(1){
      width: 100%;
    }
    .reward_rules{
      overflow: hidden;
      .reward_rules_content_text{
        img{
         width: 262px;
         height: 202px;
         float: left;
         margin-right: 30px;
       }
      }
    }

</style>
