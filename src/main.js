import {wrap} from 'common-mpvue'
import App from './App'

wrap(App, {
  // 小程序名称
  name: '活动',
  // 小程序版本
  version: 'v1.0.0',
  // 小程序工程package.json中的name
  pkgName: 'huodong',
  // 开发环境
  env: 'production' | 'development',
  // api域名
  domain: 'http://127.0.0.1',
  // 使用app.logger可上报信息的API
  reportDomain: 'http://127.0.0.1',
  // 用于展示H5的页面，例如/pages/webview/webview
  webviewSchema: ''
}, {
  // 拓展
})

export default {
  config: {
    pages: ['^pages/my/my_attention/attention_info/main'],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black'
    }
  }
}

