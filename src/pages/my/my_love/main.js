import {WrapPage} from 'common-mpvue'
import App from './index'

new WrapPage(App, {
  state: {
    list: ''
  },
  mutations: {
    setList(state) {
      state.list = [{name: 1}]
    }
  }
})

export default {
  config: {
    navigationBarTitleText: '我的爱情'
    // navigationBarTextStyle: '#fff',
    // navigationBarBackgroundColor: '#fff'
  }
}
