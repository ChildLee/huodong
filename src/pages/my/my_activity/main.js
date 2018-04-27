import {WrapPage} from 'common-mpvue'
import App from './index'

new WrapPage(App)

export default {
  config: {
    navigationBarTitleText: '我的活动'
    // navigationBarTextStyle: '#fff',
    // navigationBarBackgroundColor: '#fff'
  }
}
