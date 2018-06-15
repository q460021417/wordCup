import Vue from "vue";
import store from "./store";
import app from "./App.vue";
import router from "./router";
import $ from 'jquery'
import "./common/stylus/fonts.styl";
import "lib-flexible";
import axios from "common/config/http";
import api from "common/js/api";
//懒加载
// import VueLazyLoad from 'vue-lazyload';
Vue.prototype.$http = axios;
Vue.prototype.$api = api;
Vue.config.productionTip = false;
// Vue.use(VueLazyLoad, {
//   error: '', //加载错误时的显示图片
//   loading: '' //加载过程中的过渡图片
// })
//<img  alt="" v-lazy="video.img">//直接让图片的src为空或者不写，然后给img加v-lazy属性，
//v-lazy属性值为后台获取的图片路径

import {
  Flexbox,
  FlexboxItem,
  Grid,
  GridItem,
  XButton,
  Badge,
  ButtonTab,
  ButtonTabItem,
  XTable,
  XDialog,
  Toast,
  Clocker,
  Qrcode
} from 'vux'
Vue.component('clocker', Clocker)
Vue.component('Flexbox', Flexbox)
Vue.component('FlexboxItem', FlexboxItem)
Vue.component('Grid', Grid)
Vue.component('GridItem', GridItem)
Vue.component('XButton', XButton)
Vue.component('Badge', Badge)
Vue.component('button-tab', ButtonTab)
Vue.component('button-tab-item', ButtonTabItem)
Vue.component('x-table', XTable)
Vue.component('x-dialog', XDialog)
Vue.component('toast', Toast)
Vue.component('qrcode', Qrcode)


new Vue({
  el: "#app",
  store,
  router,
  render: h => h(app)
});