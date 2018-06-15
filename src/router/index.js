import Vue from "vue";
import VueRouter from "vue-router";
//世界杯竞猜活动
import world_cup_home from "@/components/worldCup/world_cup_home.vue";
import guess from "@/components/worldCup/guess.vue";
import match_list from "@/components/worldCup/match_list.vue";
import my_ranking_details from "@/components/worldCup/my_ranking_details.vue";
import ranking_list from "@/components/worldCup/ranking_list.vue";
import anchor_ranking from "@/components/worldCup/anchor_ranking.vue";
import prize_list from "@/components/worldCup/prize_list.vue";
import share_anchor_call from "@/components/worldCup/share/share_anchor_call.vue";
import share_anchor_call2 from "@/components/worldCup/share/share_anchor_call2.vue";
import share_anchor_call3 from "@/components/worldCup/share/share_anchor_call3.vue";
import share_guess from "@/components/worldCup/share/share_guess.vue";
import registerPage from "@/components/worldCup/registerPage.vue";
import reminderPage from "@/components/worldCup/reminderPage.vue";



Vue.use(VueRouter);
export default new VueRouter({
  linkActiveClass: "active",
  routes: [{
      path: "*", // 世界杯竞猜活动
      name: "world_cup_home",
      component: world_cup_home
    },
    {
      path: "/guess", //全民竞猜争霸赛
      name: "guess",
      component: guess
    },
    {
      path: "/match_list", // 对战表
      name: "match_list",
      component: match_list
    },
    {
      path: "/my_ranking_details", // 我的战绩
      name: "my_ranking_details",
      component: my_ranking_details
    },
    {
      path: "/ranking_list", // 积分排行榜
      name: "ranking_list",
      component: ranking_list
    },
    {
      path: "/anchor_ranking", // 主播排行，足球宝贝
      name: "anchor_ranking",
      component: anchor_ranking
    },
    {
      path: "/prize_list", // 奖品列表
      name: "prize_list",
      component: prize_list
    },
    {
      path: "/share_anchor_call", // 分享主播打call
      name: "share_anchor_call",
      component: share_anchor_call
    },
    {
      path: "/share_anchor_call2", // 首页分享
      name: "share_anchor_call2",
      component: share_anchor_call2
    },
    {
      path: "/share_anchor_call3", // 奖品列表
      name: "share_anchor_call3",
      component: share_anchor_call3
    },
    {
      path: "/share_guess", // 竞猜分享
      name: "share_guess",
      component: share_guess
    },
    {
      path: "/registerPage", // 注册
      name: "registerPage",
      component: registerPage
    },
    {
      path: "/reminderPage", // 注册
      name: "reminderPage",
      component: reminderPage
    }
  ]
});