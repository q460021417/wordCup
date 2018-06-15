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
  APP_THIRD_SHARE,
  updateLoadingStatus
} from './types';

let u = navigator.userAgent;
const isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
const isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端

export default {
  updateLoadingStatus(state, payload) {
    state.isLoading = payload.isLoading
  },
  [CHANGE_USERID](state, userId) {
    state.userId = userId
  },

  [CHANGE_WORKERACTIVITYID](state, workerActivityId) {
    state.workerActivityId = workerActivityId
  },

  [CHANGE_IS_SHOW_MASK](state, Boolean) {
    state.isShowMask = Boolean
  },

  [APP_TITLE_CHANGE](state, titleName) {
    try {
      if (isAndroid) {
        window.android.appWebTitle(titleName)
      } else if (isiOS) {
        window.webkit.messageHandlers.appWebTitle.postMessage(titleName)
      }
    } catch (e) {
      document.title = titleName
    }
  },

  [GET_APP_DATA](state) {
    if (isAndroid) {
      state.appInfo = JSON.parse(window.android.getInitLocalStorage());
    } else if (isiOS) {
      state.appInfo = JSON.parse(localStorage.getItem('appSaveData'));
    }
    state.userId = state.appInfo.userId
  },

  [SHARE_BTN](state, isOpen) {
    if (isAndroid) {
      window.android.isShareBtn(isOpen)
    } else if (isiOS) {
      window.webkit.messageHandlers.isShareBtn.postMessage(isOpen)
    }
  },

  [APP_THIRD_SHARE](state, data) {
    if (isAndroid) {
      window.android.appThirdShare(JSON.stringify(data || '{}'))
    } else if (isiOS) {
      window.webkit.messageHandlers.appThirdShare.postMessage(data)
    }
  },

  [SET_SHARE_DATA](state, data) {
    if (isAndroid) {
      window.android.setShareData(JSON.stringify(data || '{}'))
    } else if (isiOS) {
      window.webkit.messageHandlers.setShareData.postMessage(data)
    }
  },

  [IS_IN_APP](state) {
    if (isAndroid) {
      try {
        console.log(typeof window.android.getInitLocalStorage)
        state.isApp = true
      } catch (e) {
        state.isApp = false
      }
    } else if (isiOS) {
      try {
        console.log(typeof window.webkit.messageHandlers.setShareData.postMessage)
        state.isApp = true
      } catch (e) {
        state.isApp = false
      }
    }
  },

  [GO_LOGIN](state) {
    if (isAndroid) {
      window.android.login()
    } else if (isiOS) {
      window.webkit.messageHandlers.login.postMessage(null)
    }
  },

  [BIG_BACK](state) {
    if (isAndroid) {
      window.android.appBackToRoot()
    } else if (isiOS) {
      window.webkit.messageHandlers.appBackToRoot.postMessage(null)
    }
  }



}