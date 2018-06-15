import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import getters from './getters'
import mutations from './mutations'

Vue.use(Vuex)

const state = {
  appInfo: null,
  // userId: 'efcf4e8e-6a96-4015-9a90-bf9f088a983b', test
  userId: 'b9b4d570-ef6b-46c7-b453-123071280bdf', //本机
  isApp: true,
  isShowMask: false,
  workerActivityId: '',
};

export default new Vuex.Store({
  state,
  actions,
  getters,
  mutations
})