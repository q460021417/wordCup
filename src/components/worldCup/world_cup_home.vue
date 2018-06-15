<template>
<div class="home">
  <div class="banner relative">
    <div class="absolute logo_wraper">
      <p><img src="./img/logo.png" alt="" class="logo "> <span>石家庄爱泊车</span> </p>
    </div>
  </div>
  <div class="time_slot">
  </div>
  <div class="pd30">
    <div class="header_title">
      <span class="fl">竞猜赢豪礼</span>
      <router-link :to="{ name: 'share_anchor_call3', params: {} }" class="more" @click.native="to_prize_list">更多奖品>></router-link>
    </div>
    <div class="gift_list">

      <flexbox :gutter="0">
        <flexbox-item>
          <div class="flex-demo">
            <div class="img"></div>
            <div class="gift_name"></div>
            <div class="gift_price"></div>
          </div>
        </flexbox-item>
        <flexbox-item>
          <div class="flex-demo">
            <div class="img">

            </div>
            <div class="gift_name">
              <!-- iphoneX一部 -->
            </div>
            <div class="gift_price">
              <!-- 价值：8888元 -->
            </div>
          </div>
        </flexbox-item>
        <flexbox-item>
          <div class="flex-demo">
            <div class="img"></div>
            <div class="gift_name">
              <!-- iphoneX一部 -->
            </div>
            <div class="gift_price">
              <!-- 价值：8888元 -->
            </div>
          </div>
        </flexbox-item>
      </flexbox>
    </div>
    <router-link class="guess" :to="{ name: 'guess', params: {} }" @click.native="to_guess_button_count">
      <img src="./img/jcbanner@2x.png" alt="">
    </router-link>
    <div class="support ">
      <div class='no_1'>
        <img :src='headerImg' v-show='headerImg' />
      </div>
      <router-link :to="{ name: 'anchor_ranking', params: {} } " @click.native="to_anchor_ranking_button_count">
        <img src="./img/dcall-banner@2x.png" alt="">
      </router-link>
    </div>
    <div class='adv'>
      <div class="top">
        <img src="./img/logos@2x.png" alt="">
      </div>
      <div class="top">
        <a href="https://j.youzan.com/OHYplY" @click="toBmyBtn"><img src="./img/gcbanner1.jpg" alt=""></a>
      </div>
      <div class="top">
        <a href="https://wm.cib.com.cn/application/cardapp/newfast/ApplyCard/toSelectCard?id=65f89d088f024ad4bfee858fcdf65551" @click="toxybank"><img src="./img/gcbanner2.jpg" alt=""></a>
      </div>
      <div class='middle'>
        <div class='left'>
          <a href="http://wx.ybren.com/index.php/Home/Yuyue/ActiveYuyue2?yuyue_id=502" @click="toybrBtn"><img src="./img/gcbanner3.jpg" alt=""></a>
        </div>
        <div class='right'>
          <a href="https://h5.youzan.com/v2/ump/promocard/fetch?alias=pzvrc4e4" @click="toyppshBtn"><img src="./img/gcbanner4.jpg" alt=""></a>
        </div>
      </div>
    </div>
    <div class="rule ">
      <div class="header_title ">
        <span class="fl ">活动规则</span>
      </div>
      <div class="rule_text ">
        <h3>激情竞猜世界杯，豪情大礼领取规则：</h3>
        <p><b>巅峰之夜party活动</b><br/> 参与规则：
          <br/> 7月12日中午12:00统计积分排名前300名用户，可获得巅峰之夜party活动门票1张；
          <br/> 7月12日中午12:00统计每位主播贡献榜的前10名用户，可获得巅峰之夜party活动门票1张；
          <br/> 符合参与资格的用户，我们会以电话及短信通知，凭借短信通知可在活动现场进入巅峰之夜party；
          <br/>活动现场有惊喜不断的抽奖环节，多位足球宝贝全程直播，与您零距离亲密接触；
          <br/>奖品信息：
          <br/>特等奖：iPhoneX
          <br/>一等奖：Apple AirPods 耳机
          <br/>二等奖：小米4A手机
          <br/>三等奖：中鸿记餐饮会员金卡
          <br/>阳光普照奖：受邀到场用户有机会获得石家庄爱泊车与本次活动联合冠名商共同提供的精美伴手礼先到先得送完为止；
          <br/>神秘奖品： 前三名主播的贡献榜前10名用户，将获得主播亲自准备的神秘大礼（现场发放）；
        </p>
        <h3>全民竞猜争霸赛积分兑奖规则</h3>
        <p>时间：7月16日中午12:00开始兑奖
          <br/>方式：短信+线下指定地点兑换
          <br/>奖品信息：
          <br/>积分排名前500名用户，将获得“比目鱼商城价值1000元RMB电子优惠券1张”；
          <br/>备注：巅峰之夜party门票及竞猜排名奖励以短信方式发放兑换码，实物奖励均以线下party抽奖形式或现场兑奖方式发放，如未到场视为自动弃权。
        </p>
      </div>
    </div>
  </div>

</div>
</template>

<script>
export default {
  data() {
    return {
      headerImg: '',
      onloadTime: ''
    }
  },
  methods: {
    //获取userID
    getUserId() {
      this.$http.post('/api/v1/userdetail/getUserDetail', {
        'param': JSON.stringify({
          'k': sessionStorage.token
        })
      }).then(response => {
        sessionStorage.userInfo = JSON.stringify(response.data.data.UserDetail)
        sessionStorage.userId = response.data.data.UserDetail.appUserId
        sessionStorage.mobile = response.data.data.UserDetail.mobile
        this.$api.urlCount('world_cup_home', '世界杯活动首页', sessionStorage.userId, sessionStorage.mobile, this.onloadTime, location.href)
      })
    },
    //跳转竞猜埋点统计
    to_guess_button_count() {
      this.$api.buttonCount(' to_guess ', '跳转全名竞猜争霸赛按钮 ', sessionStorage.userId, sessionStorage.mobile)
    },
    to_anchor_ranking_button_count() {
      this.$api.buttonCount(' to_anchor_ranking ', '跳转相约足球宝贝 ', sessionStorage.userId, sessionStorage.mobile)
    },
    to_prize_list() {
      this.$api.buttonCount(' to_prize_list ', '跳转奖品列表', sessionStorage.userId, sessionStorage.mobile)
    },
    toBmyBtn() {
      this.$api.buttonCount(' toBmyBtn ', '跳转比目鱼广告', sessionStorage.userId, sessionStorage.mobile)
    },
    toxybank() {
      this.$api.buttonCount(' toxybank ', '兴业银行信用卡', sessionStorage.userId, sessionStorage.mobile)
    },
    toybrBtn() {
      this.$api.buttonCount(' toybrBtn ', '跳转衣帮人广告', sessionStorage.userId, sessionStorage.mobile)
    },
    toyppshBtn() {
      this.$api.buttonCount(' toyppshBtn ', '跳转乒乓生活', sessionStorage.userId, sessionStorage.mobile)
    },
    GetQueryString(name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
      var r = window.location.search.substr(1).match(reg);
      if (r != null) return unescape(r[2]);
      return null;
    },
    //获取获取token
    getToken() {
      //预发布的id
      // sessionStorage.token = 'd4c78957-2cf5-4422-a371-e829bb5731e6'; //我的
      //王文东本地
      // sessionStorage.token = '55f85aaa-519b-41de-8dbb-a1bf861630d2'
      //生产ID
      // sessionStorage.token = 'a44a8aac-a771-4e3c-b60f-1204fb2ac028'
      // sessionStorage.userId = 'adf34240_c89e_11e6_84da_6c92bf2c0ba5'
      if (this.GetQueryString('token')) {
        sessionStorage.token = this.GetQueryString('token')
        this.getUserId()
      } else {
        this.$api.tokenEmpty()
      }
    }
  },

  created() {
    let playerId = {
      "245cf983-6ae6-11e8-92d0-6c92bf3bb2e1": false,
      "d83a799b-6acb-11e8-92d0-6c92bf3bb2e5": false,
      "d83a799b-6acb-11e8-92d0-6c92bf3bb2e1": false,
      "d83a799b-6acb-11e8-92d0-6c92bf3bb2e3": false,
      "4a6b1f8e-6ae6-11e8-92d0-6c92bf3bb2e1": false,
      "1986484d-6ae6-11e8-92d0-6c92bf3bb2e1": false,
      "d83a799b-6acb-11e8-92d0-6c92bf3bb2e8": false,
      "d83a799b-6acb-11e8-92d0-6c92bf3bb2e6": false,
      "d83a799b-6acb-11e8-92d0-6c92bf3bb2e2": false,
      "54beec4e-6ae6-11e8-92d0-6c92bf3bb2e1": false
    };
    if (!sessionStorage.playerCallState) {
      sessionStorage.playerCallState = JSON.stringify(playerId)
    }
  },
  mounted() {
    this.getToken();
    this.onloadTime = new Date().getTime();
    window.scrollTo(0, 1);
    this.$api.appWebTitle("玩转2018世界杯")
    this.$api.showOrHideIcon(true)
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import "../../../node_modules/stylus-px2rem"
    @import "../../common/stylus/mixins.styl"
    .pd30{
      padding: 30px;
    }
    .home{
      background: rgb(2, 15, 34);
      .banner{
        height: 572px;
        background: url('./img/home_banner@2x-2.png') no-repeat;
        background-size: cover;
        position: relative;
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
      }
      .time_slot{
        width: 690px;
        height: 268px;
        background:url('./img/scrq@2x.png') no-repeat;
        background-size: cover;
        margin: -36px auto 0;
        position: relative;
        z-index: 2
      }
    }
    .header_title{
      width: 100%;
      height: 58px;
      line-height:58px;
      text-align: left;
      padding-left: 60px;
      color: #fff;
      background: url("./img/btl@2x.png") no-repeat;
      background-size: cover;
      position: relative;
      .more{
        position: absolute;
        right:30px;
        top: 0;
        display: inline-block;
        color: #fff;
      }
    }
    .gift_list{
      height: 370px;
      margin: 20px 0;
      background: url('./img/jpzs@2x.png') no-repeat;
      background-size: cover;
      color: #fff;
      padding:0 38px;
      .vux-flex-row{
        height: 100%;
      }
      .vux-flexbox-item{
        position: relative;
        height: 100%;
      }
      .gift_name{
        text-align: center;
        position: absolute;
        bottom: 106px;
        left: 0;
        right: 0;
      }
      .gift_price{
        text-align: center;
        position: absolute;
        bottom: 68px;
        left: 0;
        right: 0;
      }

    }

    .flex-demo{
      padding:0.2rem
      border-radius: 10px;
    }
    .guess{
      height: 244px
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
    .ad001,.ad002{
      width: 100%
      height: 300px
      margin-bottom: 20px
    }
    .ad001{
      background-color: #654949
    }
    .ad002{
      background-color: #883c49
    }
    .adv {
      .top {
        width:100%;
        border-radius:16px;
        margin-bottom: 15px;
        img {
          width:100%;
          height:100%
        }
      }
      .middle{
        img {
          width:100%;
          height:100%
        }
        margin-bottom: 20px;
        overflow hidden;
        .left{
          float: left;
          width:340px;
          height:159px;
          background:rgba(6,34,61,1);
          border-radius:16px;
        }
        .right{
          float: right;
          width:340px;
          height:159px;
          background:rgba(6,34,61,1);
          border-radius:16px;
        }
      }
      .bottom{
        margin-top: 10px;
        margin-bottom: 30px;
      }
    }
    .rule{
      color: #6E97BE;
      text-align: left;
      font-size: 24px;
      h3{
        color: #D0E3F5;
        font-size: 32px;
        margin-bottom: 10px;
        line-height: 60px;
      }
      .rule_text{
        border-radius: 16px;
        margin-top: 30px;
        padding:30px;
        background: #06223D;
      }
    }
</style>
