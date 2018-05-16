import {WrapPage} from 'common-mpvue'
import App from './index'

let store = {
  state: {},
  getters: {},
  mutations: {},
  actions: {}
}

new WrapPage(App, store)

export default {
  config: {
    navigationBarTitleText: '往期活动'
    // navigationBarTextStyle: '#fff',
    // navigationBarBackgroundColor: '#fff'
  }
}
