import {WrapPage} from 'common-mpvue'
import App from './index'

let store = {
  state: {
    wx: 'tx'
  },
  getters: {
    getWx(state) {
      return state.wx
    }
  },
  mutations: {
    setWx(state, data) {
      state.wx = data
    }
  },
  actions: {
    editWx(store) {
      store.commit('setWx', 10086)
    }
  }
}

new WrapPage(App, store)

export default {
  config: {
    navigationBarTitleText: '我组织的'
    // navigationBarTextStyle: '#fff',
    // navigationBarBackgroundColor: '#fff'
  }
}
