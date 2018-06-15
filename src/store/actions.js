import {
  CHANGE_USERID,
  CHANGE_WORKERACTIVITYID,
  APP_TITLE_CHANGE,
  GET_APP_DATA,
  SHARE_BTN,
  SET_SHARE_DATA,
  IS_IN_APP,
  GO_LOGIN,
  BIG_BACK,
  CHANGE_IS_SHOW_MASK,
  APP_THIRD_SHARE
} from './types'

export default {
  // changeWorkerActivityId({commit}, workerActivityId) {
  //   commit(CHANGE_WORKERACTIVITYID, workerActivityId)
  // },
  changeUserId({
    commit
  }, userId) {
    commit(CHANGE_USERID, userId)
  },

  changeWorkerActivityId({
    commit
  }, workerActivityId) {
    commit(CHANGE_WORKERACTIVITYID, workerActivityId)
  },

  changeIsShowMask({
    commit
  }, Boolean) {
    commit(CHANGE_IS_SHOW_MASK, Boolean)
  },

  appTitleChange({
    commit
  }, titleName) {
    commit(APP_TITLE_CHANGE, titleName)
  },

  getAppData({
    commit
  }) {
    commit(GET_APP_DATA)
  },

  shareBtn({
    commit
  }, isOpen) {
    commit(SHARE_BTN, isOpen)
  },

  appThirdShare({
    commit
  }, data) {
    commit(APP_THIRD_SHARE, data)
  },

  setShareData({
    commit
  }, data) {
    commit(SET_SHARE_DATA, data)
  },

  isInApp({
    commit
  }) {
    commit(IS_IN_APP)
  },

  goLogin({
    commit
  }) {
    commit(GO_LOGIN)
  },

  bigBack({
    commit
  }) {
    commit(BIG_BACK)
  }
}