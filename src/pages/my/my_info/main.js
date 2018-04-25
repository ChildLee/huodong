import {WrapPage} from 'common-mpvue'
import App from './index'

let store = {
  state: {
    count: 1
  }
}

new WrapPage(App, store)

export default {
  config: {
    navigationBarTitleText: '个人资料'
    // navigationBarTextStyle: '#fff',
    // navigationBarBackgroundColor: '#fff'
  }
}
