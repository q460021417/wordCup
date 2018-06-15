<template>
<div class="my_ranking_details">
  <header>
    <grid :cols="2" :show-lr-borders="false" class="match_both_sides">
      <grid-item>
        <div class="grid-center">
          <p>{{userPrizesCount}}场</p>
          <p>竞猜场次</p>
        </div>
      </grid-item>
      <grid-item>
        <div class="grid-center">
          <p>{{userLotteryNum}}场</p>
          <p>押中场次</p>
        </div>
      </grid-item>
    </grid>
  </header>
  <div class="pd30">
    <div class="my_ranking_details_content">
      <button-tab>
        <button-tab-item @on-item-click="onItemClick" selected @button-tab-border-width="0">竞猜记录</button-tab-item>
        <button-tab-item @on-item-click="onItemClick">积分记录</button-tab-item>
      </button-tab>
      <div class="guess_record" v-if="!onItemindex">
        <ul v-if="betList.length>0">
          <li v-for='value in betList' :key='value.country1'>
            <flexbox class="guess_record_title">
              <flexbox-item :span="0.3">
                <div class="flex-demo" v-text="conputedLevel(value.level)">小组赛</div>
              </flexbox-item>
              <flexbox-item>
                <div class="flex-demo" v-text="dateFormatFn(value.createTime)">6月23日 02:18</div>
              </flexbox-item>
              <flexbox-item>
                <div class="flex-demo">
                  <p v-if="value.score">+<span v-text="value.score/10"></span>积分</p>
                </div>
              </flexbox-item>
            </flexbox>
            <flexbox class=" vux-1px-b ">
              <flexbox-item>
                <div class="flex-demo ">
                  <div class="img imgposition">
                    <img class='countryImg' :src="value.flag" alt="">
                    <img src="./img/s@2x.png" alt="" v-if="value.matchState=='1'">
                    <img src="./img/ping.png" alt="" v-if="value.matchState=='2'">
                  </div>
                  <p>{{value.country}}</p>
                </div>
              </flexbox-item>
              <flexbox-item :span="0.1 ">
                <div class="flex-demo ">
                  <img src="./img/vs-yz@2x.png" alt="">
                </div>
              </flexbox-item>
              <flexbox-item>
                <div class="flex-demo ">
                  <div class="img imgposition">
                    <img class='countryImg' :src='value.flag1' />
                    <img src="./img/s@2x.png" alt="" v-if="value.matchState=='3'">
                    <img src="./img/ping.png" alt="" v-if="value.matchState=='2'">
                  </div>
                  <p>{{value.country1}}</p>
                </div>
              </flexbox-item>
              <flexbox-item>
                <div class="flex-demo">
                  <img v-if='value.isSettled == 1' src="./img/yz@2x.png" alt="">
                </div>
              </flexbox-item>
            </flexbox>
          </li>
        </ul>
        <div class="no_more" v-else>
          您还没有竞猜记录
        </div>
      </div>
      <div class="integral_record " v-else>
        <ul v-if="scoreFlowList.length>0">
          <li v-for='v in scoreFlowList' :key='v.scoreFlowId'>
            <flexbox class="vux-1px-b ">
              <flexbox-item>
                <div class="flex-demo ">
                  <p v-text="dateFormatFn(v.createTime)"></p>
                  <p v-if="v.type==1">竞猜押中</p>
                  <p v-else>分享成功</p>
                </div>
              </flexbox-item>
              <flexbox-item>
                <div class="flex-demo ">
                  <p v-if="v.score">+<span v-text="v.score"></span>积分</p>
                </div>
              </flexbox-item>
            </flexbox>
          </li>
        </ul>
        <div class="no_more" v-else>
          您还没有积分记录
        </div>
      </div>
    </div>
  </div>

</div>
</template>

<script>
import {
  dateFormat
} from 'vux'
export default {
  data() {
    return {
      userPrizesCount: '0',
      userLotteryNum: '0',
      betList: [],
      scoreFlowList: [],
      onItemindex: 0,
      onloadTime: ''
    }
  },
  methods: {
    dateFormatFn(time) {
      return dateFormat(time, 'MM月DD日 HH:mm')
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
    },
    onItemClick(index) {
      this.onItemindex = index
      if (index == '1') {
        this.$api.buttonCount(' onItemClick1', '竞猜记录 ', sessionStorage.userId, sessionStorage.mobile)
      } else {
        this.$api.buttonCount(' onItemClick2', '积分记录 ', sessionStorage.userId, sessionStorage.mobile)
      }
    },
    // 获取用户 竞猜
    getRankData() {
      //获取主播列表
      this.$http.post('/api/v1/bet/getUserBetsCount', {
        'param': JSON.stringify({
          'k': sessionStorage.token,
          data: {
            userId: sessionStorage.userId
          }
        })
      }).then(response => {
        let data = response.data.data;
        this.userLotteryNum = data.userLotteryNum;
        this.userPrizesCount = data.userPrizesCount;
      })
    },
    // 获取用户 竞猜
    getBetRecord() {
      // COMBAK:
      // var arr = [{
      //   "country1": "德国",
      //   "createTime": "2018-06-10 19:00:37",
      //   "isSettled": 0,
      //   "gameId": "e80dce8b-6b23-11e8-92d0-6c92bf3bb2e1",
      //   "score": null,
      //   "predictResult": 1,
      //   "flag1": "http://tog-business-image.oss-cn-beijing.aliyuncs.com/2018/06/05/operationsActivity/1528190931390.png",
      //   "betId": "81bbe4f2-6c9d-11e8-92d0-6c92bf3bb2e1",
      //   "country": "韩国",
      //   "matchState": 2,
      //   "flag": "http://tog-business-image.oss-cn-beijing.aliyuncs.com/2018/06/05/operationsActivity/1528191033166.png",
      //   "level": "1",
      //   "userId": "016bdb28_6ac8_11e8_92d0_6c92bf3bb2e1"
      // }, {
      //   "country1": "俄罗斯",
      //   "createTime": "2018-06-10 18:28:27",
      //   "isSettled": 0,
      //   "gameId": "78fb166a-6bf3-11e8-92d0-6c92bf3bb2e1",
      //   "score": null,
      //   "predictResult": 3,
      //   "flag1": "http://tog-business-image.oss-cn-beijing.aliyuncs.com/2018/06/05/operationsActivity/1528189943870.png",
      //   "betId": "0335030d-6c99-11e8-92d0-6c92bf3bb2e1",
      //   "country": "墨西哥",
      //   "matchState": 0,
      //   "flag": "http://tog-business-image.oss-cn-beijing.aliyuncs.com/2018/06/05/operationsActivity/1528190966763.png",
      //   "level": "2",
      //   "userId": "016bdb28_6ac8_11e8_92d0_6c92bf3bb2e1"
      // }, {
      //   "country1": "西班牙",
      //   "createTime": "2018-06-10 18:26:21",
      //   "isSettled": 0,
      //   "gameId": "6b036408-6bf3-11e8-92d0-6c92bf3bb2e1",
      //   "score": null,
      //   "predictResult": 1,
      //   "flag1": "http://tog-business-image.oss-cn-beijing.aliyuncs.com/2018/06/05/operationsActivity/1528190322518.png",
      //   "betId": "b82ef97b-6c98-11e8-92d0-6c92bf3bb2e1",
      //   "country": "墨西哥",
      //   "matchState": 1,
      //   "flag": "http://tog-business-image.oss-cn-beijing.aliyuncs.com/2018/06/05/operationsActivity/1528190966763.png",
      //   "level": "2",
      //   "userId": "016bdb28_6ac8_11e8_92d0_6c92bf3bb2e1"
      // }, {
      //   "country1": "巴拿马",
      //   "createTime": "2018-06-10 14:14:02",
      //   "isSettled": 2,
      //   "gameId": "103214fe-6bf3-11e8-92d0-6c92bf3bb2e1",
      //   "score": 0,
      //   "predictResult": 1,
      //   "flag1": "http://tog-business-image.oss-cn-beijing.aliyuncs.com/2018/06/05/operationsActivity/1528191106324.png",
      //   "betId": "78adf339-6c75-11e8-92d0-6c92bf3bb2e1",
      //   "country": "波兰",
      //   "matchState": 3,
      //   "flag": "http://tog-business-image.oss-cn-beijing.aliyuncs.com/2018/06/05/operationsActivity/1528191204718.png",
      //   "level": "2",
      //   "userId": "016bdb28_6ac8_11e8_92d0_6c92bf3bb2e1"
      // }]
      // this.betList = arr;
      // return false
      this.$http.post('/api/v1/bet/getBetRecordList', {
        'param': JSON.stringify({
          'k': sessionStorage.token,
          data: {
            userId: sessionStorage.userId
          },
          pageNum: '1',
          pageSize: '200'
        })
      }).then(response => {
        this.betList = response.data.data.betList || [];
      })
    },
    // 获取积分列表
    getScoreFlow() {
      //获取主播列表
      this.$http.post('/api/v1/score/getScoreFlowList', {
        'param': JSON.stringify({
          'k': sessionStorage.token,
          data: {
            userId: sessionStorage.userId
          },
          pageNum: '1',
          pageSize: '200'
        })
      }).then(response => {
        let data = response.data.data.scoreFlowList || [];
        // let arr = [];
        // data.forEach(v => {
        //   let tem = v.createTime.split(' ');
        //   let temT = '';
        //   tem[0].split('-').forEach((d, ind) => {
        //     temT += d
        //     if (ind == 0) {
        //       temT += '年'
        //     } else if (ind == 1) {
        //       temT += '月'
        //     }
        //   })
        //   temT += '日' + tem[1];
        //   v.createTime = temT
        // })
        this.scoreFlowList = data;
      })
    }
  },
  created() {
    this.getRankData();
    this.getBetRecord();
    this.getScoreFlow();
    //隐藏分享
    // this.$api.showOrHideIcon(false)
    this.$api.appWebTitle("我的")
    this.$api.showOrHideIcon(false)
    window.scrollTo(0, 1);
    //统计URL
    this.onloadTime = new Date().getTime();
    this.$api.urlCount('my_ranking_details', '我的', sessionStorage.userId, sessionStorage.mobile, this.onloadTime, location.href)
  }
}
</script>
<style media="screen">
/* .my_ranking_details .vux-button-group>a.vux-button-group-current {
  background: #f00
} */
</style>
<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import "../../../node_modules/stylus-px2rem"
    @import "../../common/stylus/mixins.styl"
    .pd30{
      padding: 30px;
    }
    .my_ranking_details{
      background: #020f22
      min-height: 1334px;
      .weui-grid:active{
        background:none;
      }
      header{
        margin-bottom: 30px;
        background: #00488a;
        text-align: center;
        .grid-center{
          font-size: 42px;
          color: #fff
          p:nth-of-type(2){
            color: #4996E2;
            font-size: 24px;
          }
        }
        .weui-grid:nth-of-type(2) .grid-center{
          color: #FFBF12
        }
        .weui-grid:before{
          border-right: 1px solid #003F79;
        }
        .weui-grid::after{
          border:none;
        }
      }
      .my_ranking_details_content{
        background: #00488a
        border-radius: 16px;
        .vux-button-group > a.vux-button-group-current{
          background: #00488a;
          color: #fff
        }
      }
      .vux-button-group > a.vux-button-tab-item-first:after{
        border:none
      }
      .vux-button-group > a.vux-button-tab-item-last:after{
        border:none;
      }
      .vux-button-group > a.vux-button-tab-item-last{
        color: #4996E2
        background: #06223D
      }
      .vux-button-group > a.vux-button-tab-item-first,.vux-button-group > a.vux-button-tab-item-last{
        border-radius:16px 16px 0px 0px;
      }
      .vux-button-group > a{
        background: #06223D
        color: #00488a
        font-weight: bold;
        height: 80px;
        line-height: 80px;
        margin-top: -32px;
      }
    }
    .countryImg{
      width: 100%
      height: 100%
    }
    .guess_record{
      padding:30px;
      color: #81C0FF

      ul{
        li{
          .vux-flex-row:nth-of-type(2){
            margin-bottom: 30px;
            height: 160px;
          }
          .vux-1px-b:after{
            border-bottom: 1px solid #06223D;
          }
          .img{
            width:60px;
            height: 40px;
            background: #ff0
            display: inline-block;
          }
          .vux-flexbox-item{
            text-align: center;
          }
          .vux-flex-row:nth-of-type(2) .vux-flexbox-item:nth-of-type(2){
            img{
              width: 34px;
              height: 14px;
            }
          }
          .vux-flex-row:nth-of-type(2) .vux-flexbox-item:nth-of-type(4){
            img{
              width: 106px;
              height: 90px;
            }
          }
        }
      }
      .guess_record_title{
        .vux-flex-row .vux-flexbox-item:nth-of-type(3){
          text-align: right;
          color: #FEB63E
        }
      }


    }

    .integral_record{
      padding:30px
      ul{
        li{
          padding:30px 30px 0
          height: 160px;
          .flex-demo:nth-of-type(1) p:nth-of-type(1){
            color: #81C0FF
            font-size: 24px;
          }
          .vux-flex-row .vux-flexbox-item:nth-of-type(2){
            color: #FEB63E
            font-size: 24px;
            text-align: right;
          }
          .vux-flexbox{
            height: 100%;
          }
          .flex-demo p:nth-of-type(2){
            color: #fff
            font-size: 30px;
          }
          .vux-1px-b:after{
            border-bottom: 1px solid #06223d;
          }
        }
      }
    }
    .no_more{
      padding: 40px;
      color: #fff;
      text-align: center;
      font-size: 30px;
    }

    .imgposition{
      position: relative;
      img:nth-of-type(2){
        width:40px;
        height: 40px;
        position: absolute;
        top: -16px;
        right: -16px;
      }
    }









</style>
