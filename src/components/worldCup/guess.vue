<template>
<div class="guess">
  <div class="banner relative">
    <div class="absolute logo_wraper">
      <p><img src="./img/logo.png" alt="" class="logo "> <span>石家庄爱泊车</span> </p>
    </div>
    <img src="./img/banner@2x.png" alt="">
  </div>
  <div class="pd30 relative my_integral_wraper">
    <div class="my_integral">
      <p>我的积分：<span v-if="userScore" v-text="userScore">0</span><span v-else>0</span></p>
      <router-link :to="{ name: 'ranking_list', params: {} }" class="ranking_list" @click.native="to_ranking_list">查看积分榜</router-link>
    </div>
    <div class="match_details_wraper" v-for="(item,index) in scheduleByTime">
      <!-- {{item.level}} -->
      <div class="header_title" v-show="index=='0'">
        <span class="fl">  <span v-text="conputedLevel(item.level)">小组赛</span> <span class="blue_text">（<span v-text="item.score">10</span>分场）</span>
        </span>
        <span class="more blue_text"><router-link class="match_list" :to="{ name: 'match_list', params: {} }" @click.native="to_match_listt">对战表>></router-link></span>
      </div>
      <div class="match_details">
        <div class='match_end' v-show='item.metchEnd'>
          <div class='match_end_text'>本场投注已结束</div>
        </div>
        <div class="match_time">
          <span v-text="dateFormatFn(item.matchTime)"></span>
          <div class="fr"> <span v-text="item.team1Name">葡萄牙</span> <span> <img src="./img/vs-yz@2x.png" alt=""> </span> <span v-text="item.team2Name">意大利</span> </div>
        </div>
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
            <flexbox-item :span="1/4" @click.native="select_active_fun('1',index,item.winRate,item.score,item)">
              <div class="flex-demo">
                <p v-text="item.team1Name">葡萄牙</p>
                <!-- <div class="gift_name" :class="{active:flagArr[index] == 1}"> -->
                <div class="gift_name" :class="{active:flagArr[index] == 1}">
                  胜
                  <p v-text="item.winRate/10">1.3</p>
                  <i class="icon_select_active" v-show="flagArr[index]== 1"></i>
                </div>
              </div>
            </flexbox-item>
            <flexbox-item @click.native="select_active_fun('2',index,item.equalRate,item.score, item)">
              <div class="flex-demo">
                <p class="lineHeight relative">
                  <span class="absolute">倒计时</span>
                  <Clockerh :startTime="serverTime" :endTime="item.matchTime" :item='item' @clockFinish="clockFinish"></Clockerh>
                  <!-- <span>{{countTime(item.matchTime,index, item)}}</span> -->
                  <!-- <clocker @on-finish='clockFinish(index, item)' :time="item.matchTime" format="%D：%H：%M：%S"></clocker> -->
                </p>
                <div class="gift_name" v-show='item.level == 1' :class="{active:flagArr[index]== 2}">
                  平
                  <p v-text="item.equalRate/10">0.6</p>
                  <i class="icon_select_active" v-show="flagArr[index]== 2"></i>
                </div>
              </div>
            </flexbox-item>
            <flexbox-item :span="1/4" @click.native="select_active_fun('3',index,item.loseRate,item.score,item)">
              <div class="flex-demo">
                <p v-text="item.team2Name">意大利</p>
                <div class="gift_name" :class="{active:flagArr[index]== 3}">
                  胜
                  <p v-text="item.loseRate/10">0.8</p>
                  <i class="icon_select_active" v-show="flagArr[index]== 3"></i>
                </div>
              </div>
            </flexbox-item>
          </flexbox>
          <button type="button" name="button" @click='betOnCompetion(item.matchId, index,item)' :class="{active:flagArr[index]>-1 && item.betFlag == -1}" :disabled='flagArr[index]==-1 || item.betFlag != -1'>
            <span v-show='item.betFlag == -1'>{{item.metchEnd? '已结束':'确认下注'}}</span>
            <span v-show='item.betFlag != -1' class="disabled">已下注</span>
            <span v-show="flagArr[index]>-1 && item.betFlag == -1">（预计收入<b v-text="scoreArr[index]/10"></b>积分）</span>
          </button>
        </div>
        <div class="mask_wrap" v-show="maskShow" @click.stop @click.self.prevent>
          <p>本场比赛已结束</p>
        </div>
      </div>
    </div>
    <div class='adv'>
      <a href="https://wm.cib.com.cn/application/cardapp/newfast/ApplyCard/toSelectCard?id=65f89d088f024ad4bfee858fcdf65551"><img src="./img/gcbanner2.jpg" alt="" @clcik="toxybank"></a>
    </div>
    <div class="header_title">
      <span class="fl">活动规则</span> </span>
    </div>
    <div class="active_rule">
      <h3>竞猜玩法：</h3>
      <p>1. 小组赛（6月14日-6月29日）：每场比赛基础分为10分，您可对赛事最终结果（含伤停补时）进行竞猜。竞猜成功可获取积分奖励，竞猜失败无积分奖励；
        <br/>2. 淘汰赛（6月30日-7月14日）：每场比赛基础分为30分，您可对赛事最终结果（含伤停补时、点球大战）进行竞猜。竞猜成功可获取积分奖励，竞猜失败无积分奖励；
        <br/>3. 决赛 （7月15日）：每场比基础本分为100分，您可对赛事最终结果（含伤停补时、点球大战）进行竞猜，竞猜成功可获取积分奖励，竞猜失败无积分奖励；
      </p>
      <h3>积分获取规则：</h3>
      <p>1. 每场积分奖励=赛事基础分*赔率；
        <br/>例：小组赛，押A队胜，赔率为2，竞猜成功，则本场积分=10（基本积分）*2（赔率）=20积分；
        <br/>2. 分享每日拿积分：您可在足球竞猜页面进行竞猜分享，分享后可获得5积分，每人每场赛事可分享1次，分享获得积分不受竞赛胜负影响，直接累计进入个人积分；
        <br/><b>注意事项：</b><br/>为保证您的积分权益，请按照此操作方式完成竞猜分享增加积分：分享后在微信提示中点击“返回石家庄爱泊车”获得分享积分。
      </p>
      <h3>竞猜规则：</h3>
      <p>
        1.  每日中午12:00:00前更新前日赛事结果，并完成前日竞猜积分结算，刷新积分排名；
        <br/>2.  截止每日每场比赛开始时间前，可对本场比赛结果进行竞猜，比赛开始后无法参与该场赛事竞猜；
        <br/>3.  您可同时参加多场比赛竞猜，每场比赛仅限提交一次竞猜结果，提交竞猜后将无法进行变更；
        <br/>4.  足球竞猜中获取积分将列入竞猜积分排行榜，积分榜每日中午12:00:00更新，截止7月12日中午12:00:00前300名用户可直接获得巅峰之夜Party门票；
        <br/>5.  本活动最终解释权归石家庄爱泊车科技有限公司所有；
      </p>
    </div>
  </div>

  <!-- <div class="bets_yes" @click.stop @click.self.prevent>

  </div> -->
  <div class="bets_yes" @touchmove.prevent>
    <x-dialog v-model="showToast" class="dialog-demo" :hide-on-blur='true'>
      <img src="./img/xzcg@2x.png" alt="">
      <img src="./img/btn-fx@2x.png" alt="" @click="APPshare()">
      <img src="./img/close.png" alt="" @click="showToast=false">
    </x-dialog>
  </div>
  <toast v-model="showPositionValue" type="text" :time="800" is-show-mask :text="showPositionValueText" position="middle"></toast>
</div>
</template>

<script>
import {
  dateFormat
} from 'vux'
import Clockerh from "./clocker.vue"
export default {
  components: {
    Clockerh
  },
  data() {
    return {
      serverTime: '',
      onloadTime: '',
      flagArr: [],
      data: [],
      scoreArr: [],
      showToast: false,
      maskShow: false,
      select_active: 0,
      scheduleByTime: [],
      select_item: '',
      _index: null,
      showPositionValue: false,
      showPositionValueText: '',
      userScore: null,
      scoreCount: 0,
      activeMatchId: '',
      activeItem: {},
      activeMatchIndex: '',
      // dateD: '',
      dateH: '',
      dateM: '',
      dateS: ''
    }
  },
  methods: {
    // countTime(endTime, index, item) {
    //   console.log(endTime);
    //   //获取当前时间
    //   var nativeTime = new Date().getTime();
    //   //var date = new Date(newTime);
    //   //var now = date.getTime();
    //   //设置截止时间
    //   var endDate = new Date(endTime);
    //   var end = endDate.getTime();
    //   //时间差
    //   var leftTime = end - nativeTime;
    //   console.log(end);
    //   console.log(nativeTime);
    //
    //   function checkTime(i) {
    //     if (i < 10) {
    //       i = "0" + i;
    //     }
    //     return i;
    //   }
    //   //定义变量 d,h,m,s保存倒计时的时间
    //   if (leftTime >= 0) {
    //     this.dateH = Math.floor(leftTime / 1000 / 60 / 60);
    //     this.dateM = Math.floor(leftTime / 1000 / 60 % 60);
    //     this.dateS = Math.floor(leftTime / 1000 % 60);
    //   } else {
    //     if (!item.metchEnd) {
    //       item.metchEnd = true;
    //     }
    //     return false
    //   }
    //   //递归每秒调用countTime方法，显示动态时间效果
    //   setTimeout(() => {
    //     //this.countTime(endTime, index, item)
    //   }, 1000)
    //   return checkTime(this.dateH) + ':' + checkTime(this.dateM) + ':' + checkTime(this.dateS)
    // },
    toxybank() {
      this.$api.buttonCount(' guessToxybank ', '兴业银行信用卡', sessionStorage.userId, sessionStorage.mobile)
    },
    dateFormatFn(time) {
      return dateFormat(time, 'MM月DD日 HH:mm')
    },
    //选择胜负
    select_active_fun(index, item, loseRate, score, data) {
      if (data.betFlag != -1 || (data.level != 1 && index == 2)) {
        return;
      }
      this.$set(this.flagArr, item, index);
      this.scoreArr[item] = loseRate * score
      if (index == "1") {
        this.$api.buttonCount('buttonS', '押注选择按钮 ', sessionStorage.token, sessionStorage.mobile)
      } else if (index == "2") {
        this.$api.buttonCount('buttonP', '押注选择按钮 ', sessionStorage.token, sessionStorage.mobile)
      } else {
        this.$api.buttonCount('buttonF', '押注选择按钮 ', sessionStorage.token, sessionStorage.mobile)
      }
    },
    clockFinish(item) {
      if (item.metchEnd) {} else {
        item.metchEnd = true;
      }
    },
    APPshare() {
      //获取积分排行：
      this.$http.post('api/v1/userScore/getUserScores', {
        param: JSON.stringify({
          'k': sessionStorage.token,
          'data': {
            'userId': sessionStorage.userId
          }
        })
      }).then(response => {
        this.userScore = response.data.data.score
        let shareData = {
          url: "http://" + location.hostname + "/#/share_guess?" +
            "&activeItemIndex=" + this.flagArr[this.activeMatchIndex] +
            "&userScore=" + this.userScore +
            "&team1Flag=" + this.activeItem.team1Flag +
            "&team2Flag=" + this.activeItem.team2Flag +
            "&team1Name=" + this.activeItem.team1Name +
            "&team2Name=" + this.activeItem.team2Name,
          title: '石家庄爱泊车·足球竞猜赢豪礼', // 标题
          content: "精彩对战详情，一起竞猜下注赢积分，与同城百万球迷一起观比赛赢大奖，决战到天亮！", // 文字描述
          picUrl: "http://sjz.appcw.aipark.com/static/img/share_icon.PNG", // 图片url
          type: '1' //1 需要统计加分 2 不需要统计加分
        }
        this.$api.AppShare(shareData)
        this.$api.buttonCount(' APPshare ', '确定押注分享按钮', sessionStorage.userId, sessionStorage.mobile)
      })
    },

    //APP分享成功后回调函数
    appCallback(value) {
      this.showToast = false
      this.getUserScores();
      this.addShareRecordWithBet()
      this.$api.shareButtonCount(' APPshareAppCallback ', '确定押注分享成功', sessionStorage.userId, sessionStorage.mobile)
    },

    //获取我的积分-关联会员积分100
    getUserList() {
      this.$http.post('api/v1/userScore/getUserList', {
        param: JSON.stringify({
          'k': sessionStorage.token
        })
      }).then(response => {
        this.userList = response.data.data.playerUserList
        if (this.userList) {
          for (var i = 0; i < this.userList.length; i++) {
            if (this.userList[i].userId == sessionStorage.userId) {
              return this.userListIndex = i
            }
          }
        }
      })
    },
    //押注某场比赛
    betOnCompetion(matchId, index, item) {
      this.activeItem = item;
      this.activeMatchId = matchId;
      this.activeMatchIndex = index;
      this.$http.post('api/v1/bet/betOnCompetion', {
        param: JSON.stringify({
          'k': sessionStorage.token,
          'data': {
            matchId: matchId,
            matchResult: this.flagArr[index] * 1,
            'userId': sessionStorage.userId
          }
        })
      }).then(response => {
        if (response.status) {
          this.showToast = true
        } else {
          this.showPositionValue = true;
          this.showPositionValueText = response.data.msg
        }
        this.getScheduleByTime();
      })
      this.$api.buttonCount(' betOnCompetion ', '确定押注按钮', sessionStorage.userId, sessionStorage.mobile)
    },
    //跳转竞猜埋点统计
    to_match_listt() {
      this.$api.buttonCount(' to_match_listt ', '对战表 ', sessionStorage.userId, sessionStorage.mobile)
    },
    to_ranking_list() {
      this.$api.buttonCount(' to_ranking_list ', '跳转查看排行榜 ', sessionStorage.userId, sessionStorage.mobile)
    },
    getBetsByUserId() {
      this.$http.post('api/v1/bet/getBetsByUserId', {
        param: JSON.stringify({
          'k': sessionStorage.token,
          data: {
            userId: sessionStorage.userId,
            pageSize: 100,
            pageNum: 1
          }
        })
      }).then(response => {
        let dataArr = response.data.data.list;
        this.scheduleByTime.forEach((v, ind) => {
          v.betFlag = -1;
          this.flagArr.push(-1);
          this.scoreArr.push(0);
          dataArr.forEach(bet => {
            if (bet.gameId == v.matchId) {
              this.flagArr.pop();
              this.flagArr.push(bet.predictResult);
              if (bet.isSettled == 0) {
                v.betFlag = 0; // 还没出结果
              } else if (bet.isSettled == 1) {
                v.betFlag = 1; // 猜中
              } else if (bet.isSettled == 2) {
                v.betFlag = 2; // 没猜中
              }
            }
          })
        })
      })
    },
    setTime(time) {
      let diffTime = new Date(this.serverTime.replace(/-/g, '/')).getTime() - new Date().getTime();
      let newTime = new Date(time.replace(/-/g, '/')).getTime() - diffTime;
      return new Date(newTime).getTime(newTime);
    },
    getServerTime() {
      // COMBAK:
      // this.serverTime = '2018-06-14 00:40:22';
      // return false
      this.$http.post('api/v1/bet/getServerTime', {
        param: JSON.stringify({
          'k': sessionStorage.token
        })
      }).then(response => {
        let time = response.data.data.time;
        this.serverTime = time;
        this.scheduleByTime.forEach(v => {
          if (new Date(v.matchTime.replace(/-/g, '/')).getTime() < new Date(time.replace(/-/g, '/')).getTime()) {
            v.metchEnd = true;
          } else {
            v.metchEnd = false;
          }
          v.newTime = this.setTime(v.matchTime);
        })
        this.setList();
      })
    },
    sortMatch() {
      this.data = JSON.parse(JSON.stringify(this.scheduleByTime));
      let hasEnd = [];
      let noEnd = [];
      let len = this.data.length;
      for (let i = 0; i < len; i++) {
        if (this.data[i].metchEnd) {
          hasEnd.push(this.data[i])
        } else {
          noEnd.push(this.data[i])
        }
      }
      this.scheduleByTime = [...noEnd, ...hasEnd];
    },
    setList() {
      this.sortMatch();
      this.getBetsByUserId();
    },
    //获取当天比赛详情
    getScheduleByTime() {
      // COMBAK:
      // var res = [{
      //   "team1Name": "突尼斯",
      //   "equalRate": 0,
      //   "team2Name": "葡萄牙",
      //   "settlementState": 0,
      //   "winRate": 14,
      //   "score": 10,
      //   "resultDesc": null,
      //   "team2Flag": "http://tog-business-image.oss-cn-beijing.aliyuncs.com/2018/06/05/operationsActivity/1528190285392.png",
      //   "matchTime": "2018-06-17 00:00:00",
      //   "matchState": 0,
      //   "level": 6,
      //   "loseRate": 15,
      //   "matchId": "233e9cfb-6b91-11e8-92d0-6c92bf3bb2e1",
      //   "team1Flag": "http://tog-business-image.oss-cn-beijing.aliyuncs.com/2018/06/05/operationsActivity/1528191140972.png",
      //   "team1": "621a451b-68a3-11e8-a9c8-b2e9e004646f",
      //   "team2": "669ff240-68a1-11e8-a9c8-b2e9e004646f"
      // }, {
      //   "team1Name": "阿根廷",
      //   "equalRate": 0,
      //   "team2Name": "德国",
      //   "settlementState": 0,
      //   "winRate": 1000,
      //   "score": 10,
      //   "resultDesc": null,
      //   "team2Flag": "http://tog-business-image.oss-cn-beijing.aliyuncs.com/2018/06/05/operationsActivity/1528190931390.png",
      //   "matchTime": "2018-06-17 00:00:00",
      //   "matchState": 0,
      //   "level": 5,
      //   "loseRate": 2000,
      //   "matchId": "6266ec4b-6af0-11e8-92d0-6c92bf3bb2e1",
      //   "team1Flag": "http://tog-business-image.oss-cn-beijing.aliyuncs.com/2018/06/05/operationsActivity/1528190574373.png",
      //   "team1": "11cde6a6-68a2-11e8-a9c8-b2e9e004646f",
      //   "team2": "e63bb50b-68a2-11e8-a9c8-b2e9e004646f"
      // }]
      // this.scheduleByTime = res;
      // this.getServerTime();
      // return false
      this.$http.post('api/v1/game/scheduleByTime', {
        param: JSON.stringify({
          'k': sessionStorage.token
        })
      }).then(response => {
        this.scheduleByTime = response.data.data.list;
        this.getServerTime();
      })
    },
    addShareRecordWithBet() {
      this.$http.post('/api/v1/shareRecord/addShareRecordWithBet', {
        param: JSON.stringify({
          'k': sessionStorage.token,
          'data': {
            'userId': sessionStorage.userId
          }
        })
      }).then(response => {
        // this.activePlayerId = response.data.data.player
        // this.playerList = JSON.parse(response.data.data.playerList)
      })
    },
    getUserScores() {
      this.$http.post('api/v1/userScore/getUserScores', {
        param: JSON.stringify({
          'k': sessionStorage.token,
          'data': {
            'userId': sessionStorage.userId
          }
        })
      }).then(response => {
        this.userScore = response.data.data.score
      })
    },
    conputedLevel(level) {
      if (level == "1") {
        return '小组赛'
      } else if (level == "2") {
        return '八分之一决赛'
      } else if (level == "3") {
        return '四分之一决赛'
      } else if (level == "4") {
        return '半决赛'
      } else if (level == "5") {
        return '三四名决赛'
      } else if (level == "6") {
        return '决赛'
      }
    }
  },
  created() {
    //获取当前比赛安排
    this.getScheduleByTime();
    //获取积分排行：
    this.getUserScores();
    window.scrollTo(0, 1);
    window.appCallback = this.appCallback
    //隐藏分享
    this.$api.appWebTitle("全民竞猜争霸赛")
    this.$api.showOrHideIcon(false)
    //统计URL
    this.onloadTime = new Date().getTime();
    this.$api.urlCount('guess', '全民竞猜争霸赛', sessionStorage.userId, sessionStorage.mobile, this.onloadTime, location.href)
  },
}
</script>
<style media="screen">
.guess .weui-dialog {
  width: 100%;
  min-width: 100%;
  background: none
}

.guess .weui-mask {
  background: rgba(0, 0, 0, 0.8);
}
</style>
<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import "../../../node_modules/stylus-px2rem"
    @import "../../common/stylus/mixins.styl"
    //mock 代码
    .pd30 {
      padding: 30px;
    }
    .guess{
      background-color: #020f22;
      margin-bottom: 20px
      .banner{
        width: 100%;
        height: 376px;
        z-index: 1
        .logo_wraper{
          left: 20px;
          top: 20px;
          font-size: 26px;
          color: #fff;
          span{
            line-height: 40px
            height: 40px
            display: inline-block;
          }
        }
        img.logo{
          width:40px;
          height: 40px;
          line-height: 40px
          vertical-align: bottom;
        }
        img{
          width: 100%;
        }
      }
      .my_integral_wraper{
        z-index: 2
        margin-top: -38px;
      }
      .my_integral{
        margin-top: -40px;
        position: relative
        height: 82px;
        line-height: 82px;
        padding-left: 92px;
        font-size: 26px;
        color: #fff;
        background: url('./img/jfbg@2x.png') no-repeat;
        background-size: 100%;
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
      position: relative;
      margin-bottom: 40px;
      width: 100%;
      background: url('./img/yzbg@2x.png') no-repeat;
      background-size: 100% 100%;
      padding: 40px;
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
      background: url("./img/btl@2x.png") no-repeat;
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
      background: url("./img/yzdz@2x.png") no-repeat;
      background-size: cover;
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
      margin-top: 40px;
      button{
        font-size: 30px;
        text-align: center;
        margin: 30px auto 10px;
        width: 360px;
        height: 94px;
        color: #fff;
        background: url('./img/btn-yzh@2x.png') no-repeat;
        background-size: cover;
        .disabled{
          font-size: 30px!important
        }
        span:nth-of-type(1){
          display: block;
          height: 100%;
          line-height: 80px;
          font-weight: bold;
        }
        span:nth-of-type(2){
          font-size: 20px;
          line-height: 1
        }
      }
      button.active{
        background: url('./img/btn-yzon@2x.png') no-repeat;
        background-size: cover;
        color: #3C2D0A
        span:nth-of-type(1){
          display: block;
          height: auto;
          line-height: 20px;
          font-weight: bold;
        }
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
          // width: 180px;
          height: 84px;
          line-height: 1.2
          border-radius: 4px;
          background: #0068B7;
          font-size: 30px;
          position: relative;
          .icon_select_active{
            width: 36px;
            height: 36px;
            background:url('./img/xz@2x.png') no-repeat;
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
    .adv{
      margin-top: 30px;
        width:100%;
        height:160px;
        background:rgba(6,34,61,1);
        border-radius:16px;
        img{
          width:100%;
          height:100%;
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
    .match_end{
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      background: rgba(0,0,0,0.5);
      z-index: 100;
    }
    .lineHeight{
      .absolute{
        display: block;
        width: 100%;
        text-align: center;
        top: -30px;
      }
    }
    .match_end_text{
      color: white;
      margin: 194px auto;
      text-align:center;
      font-size:34px;
    }
</style>
