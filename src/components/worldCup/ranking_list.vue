<template>
<div class="ranking_list">
  <header class="my_ranking">
    <div class="my_ranking_details">
      <flexbox class="ranking_lists_rows" :gutter='0'>
        <flexbox-item :span="0.2">
          <div class="flex-demo">
            <img src="./img/ranking_list01.png" alt="">
          </div>
        </flexbox-item>
        <flexbox-item>
          <div class="flex-demo">
            <p>我的积分： <span v-if="userScore" v-text="userScore">0</span><span v-else>0</span></p>
            <p>排名： <span v-if="userRank" v-text="userRank"></span><span v-else>0</span></p>
            <router-link class="my_ranking_details_btn" :to="{ name: 'my_ranking_details', params: {} }" @click.native="to_my_ranking_details">查看竞猜记录</router-link>
          </div>
        </flexbox-item>
      </flexbox>
    </div>
  </header>
  <div class="ranking_lists">
    <h2 class="ranking_lists_title">积分Top100</h2>
    <ul>
      <li v-for="item in userList">
        <flexbox class="ranking_lists_rows">
          <flexbox class="ranking_lists_rows" :gutter='0'>
            <flexbox-item :span="0.14063">
              <div class="flex-demo">
                <div class="top_number" v-text="item.rank">
                </div>
              </div>
            </flexbox-item>
            <flexbox-item :span="0.2">
              <div class="flex-demo relative">
                <div class="icon_top1"></div>
                <!-- <img :src="item.photo" alt="" class="header_img"> -->
                <img :src="!item.photo? '/static/img/morentu_touxiang.png':item.photo " class="header_img">
              </div>
            </flexbox-item>
            <flexbox-item>
              <div class="flex-demo">
                <p v-text="item.mobile.substr(0, 3) + '****' + item.mobile.substr(7)">Prayer@</p>
                <p>
                  <span v-if="item.age" v-text="item.age"></span>
                  <span v-else>80后</span>
                  <span class="sex_img">
                    <img src="./img/icon_man@2x.png" alt=""  v-if="!item.sex">
                    <img src="./img/icon_man@2x.png" alt=""  v-else-if="item.sex==0">
                    <img src="./img/women@2x.png" alt="" v-else>
                  </span>
                </p>
              </div>
            </flexbox-item>
            <flexbox-item :span="0.275">
              <div class="flex-demo">
                <p>累计积分</p>
                <p><span v-text="item.score">34949</span></p>
              </div>
            </flexbox-item>
          </flexbox>
        </flexbox>
      </li>
      <div class="no_list_tip">
        狂欢豪礼，虚位以待
      </div>
    </ul>
  </div>

</div>
</template>

<script>
import {
  mapGetters
} from 'vuex'
export default {
  data() {
    return {
      userList: [],
      scoreFlowList: '',
      userListIndex: '',
      userScore: null,
      userRank: '',
      onloadTime: ''
    }
  },
  methods: {
    //我的积分
    getScoreFlowList() {
      // COMBAK:
      // var arr = [{
      //   "createTime": "2018-06-11 19:59:38",
      //   "userId": "362aa034_6d2b_11e8_92d0_6c92bf3bb2e1",
      //   "score": 15,
      //   "type": 1,
      //   "scoreFlowId": "ea7d1cf4-6d6e-11e8-92d0-6c92bf3bb2e1",
      //   "date": "2018-06-11 00:00:00"
      // }, {
      //   "createTime": "2018-06-11 16:18:22",
      //   "userId": "362aa034_6d2b_11e8_92d0_6c92bf3bb2e1",
      //   "score": 5,
      //   "type": 2,
      //   "scoreFlowId": "014b281a-6d50-11e8-92d0-6c92bf3bb2e1",
      //   "date": "2018-06-11 00:00:00"
      // }]
      // this.scoreFlowList = arr;
      // return false
      this.$http.post('api/v1/score/getScoreFlowList', {
        param: JSON.stringify({
          'k': sessionStorage.token,
          'data': {
            'pageSize': '1',
            'pageNum': '1',
            'userId': sessionStorage.userId
          }
        })
      }).then(response => {
        this.scoreFlowList = response.data.data.scoreFlowList

        // console.log('ScoreFlowList====' + JSON.stringify(response.data.data));
      })
    },
    //获取我的积分-关联会员积分100
    getUserList() {
      // COMBAK:
      // var arr = [{
      //   "sex": 1,
      //   "score": 628,
      //   "synStatus": false,
      //   "voteCount": 0,
      //   "photo": "http://sjz-business-image.oss-cn-beijing.aliyuncs.com/2018/06/11/13522575620/da9a060f-3559-4a2b-8fcb-2265003f28ba.png",
      //   "registerTime": null,
      //   "userdetailId": "03f6b19b_6d50_11e8_92d0_6c92bf3bb2e1",
      //   "rank": 1,
      //   "username": "xxx",
      //   "age": "90后",
      //   "appUserId": "38efcdf0_6d4a_11e8_92d0_6c92bf3bb2e1",
      //   "mobile": "13522575620"
      // }, {
      //   "sex": null,
      //   "score": 5,
      //   "synStatus": false,
      //   "voteCount": 0,
      //   "photo": null,
      //   "registerTime": null,
      //   "userdetailId": null,
      //   "rank": 16,
      //   "username": null,
      //   "age": null,
      //   "appUserId": "2399995c_6d25_11e8_92d0_6c92bf3bb2e1",
      //   "mobile": "18155555510"
      // }]
      // this.userList = arr;
      // return false;
      this.$http.post('api/v1/userScore/getUserList', {
        param: JSON.stringify({
          'k': sessionStorage.token
        })
      }).then(response => {
        this.userList = response.data.data.voteUserVOList
        console.log(this.userList);
        if (this.userList) {
          for (var i = 0; i < this.userList.length; i++) {
            if (this.userList[i].userId == sessionStorage.userId) {
              return this.userListIndex = i
            }
          }
        }
      })
    },
    to_my_ranking_details() {
      this.$api.buttonCount(' to_my_ranking_details ', '查看竞猜记录 ', sessionStorage.userId, sessionStorage.mobile)
    },
    //获取我的积分
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
        if (response.data.data.rank == '-1') {
          return this.userRank = '未上榜'
        } else {
          this.userRank = response.data.data.rank
        }
      })
    },
  },
  created() {
    this.getUserList()
    this.$api.appWebTitle('积分排行榜')
    this.$api.showOrHideIcon(false)
    this.getScoreFlowList();
    this.getUserScores();
    //统计URL
    this.onloadTime = new Date().getTime();
    this.$api.urlCount('ranking_list', '积分排行榜', sessionStorage.userId, sessionStorage.mobile, this.onloadTime, location.href)
  },
  mounted() {},
  computed: mapGetters(['userId'])
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import "../../../node_modules/stylus-px2rem"
    @import "../../common/stylus/mixins.styl"

    .ranking_list{
      background: #020F22;
      padding-bottom: 40px;
      min-height: 1334px;
    }
    .my_ranking{
      padding:30px 20px 0;
      overflow: hidden;
    }
    .my_ranking_details{
      position:relative;
      width: 690px;
      height: 120px;
      margin: 0 auto;
      background:url('./img/ranking_list02.png') no-repeat;
      background-size: cover;
      padding: 20px 34px;
      color: #fff;
      font-size: 24px;
      img{
        width: 72px;
        height: 79px;
      }
    }
    .my_ranking_details_btn{
      position: absolute;
      right: 30px;
      top: 28px;
      display: block;
      border-radius: 64px;
      width: 200px;
      height: 64px;
      line-height: 64px;
      color: #fff;
      background-color: #0F73CF;
      text-align: center;
    }

    .ranking_lists{
      .ranking_lists_title{
        background: url('./img/ranking_list03.png') no-repeat;
        background-size: 9.2rem 0.773333333333333rem;
        text-indent: -999px;
        margin:20px 30px
      }
    }
    .ranking_lists{
      ul{
        background: #00488A;
        color: #fff;
        width: 690px;
        margin: 0 auto;
        border-radius:14px;
        padding:30px 30px 30px 0;
        li{
          padding-bottom: 30px;
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
          .header_img{
            width:107px;
            height: 107px;
            border-radius: 50%;
            border:solid #AC5FDA 1px;
            // background: #1c0d4e;
            // background:url('./img/morentu_touxiang.png') no-repeat center center;
            // background-size: cover;
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
              line-height: 80px
            }
            p:nth-child(2){
              color: #D999FF;
              font-size: 22px;
            }
          }
          .ranking_lists_rows .vux-flexbox-item:nth-child(4){
            font-size: 22px;
            color: #fff
              padding-top: 30px;
            p{
              text-align: right
            }
            span{
                color: #FFFF00
                font-size: 30px;
            }
          }
        }
        li:nth-of-type(1){
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
        li:nth-of-type(1) .vux-flexbox-item:nth-child(1) {
          text-indent: -999px
          background: url('./img/top1.png') no-repeat center center;
          background-size: 0.733333333333333rem 0.6rem

        }
        li:nth-of-type(2) .vux-flexbox-item:nth-child(1) {
          text-indent: -999px
          background: url('./img/top2.png') no-repeat center center;
          background-size: 0.733333333333333rem 0.6rem

        }
        li:nth-of-type(3) .vux-flexbox-item:nth-child(1) {
          text-indent: -999px
          background: url('./img/top3.png') no-repeat center center;
          background-size: 0.733333333333333rem 0.6rem
        }
      }
    }
    .no_list_tip{
      font-size: 24px;
      color: #5292CE;
      line-height: 40px;
      text-align: center;
    }
    .sex_img{
      padding-top: 18px;
      img{
        margin-left: 10px;
        width: 22px;
        height: 22px;
      }
    }

</style>
