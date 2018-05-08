import { WrapPage } from 'common-mpvue'
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
    navigationBarTitleText: '竹芝林-温暖为你'
    // navigationBarTextStyle: '#fff',
    // navigationBarBackgroundColor: '#fff'
  }
}
