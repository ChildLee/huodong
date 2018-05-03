import { wrap } from 'common-mpvue'
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
  domain: 'https://www.easy-mock.com/mock/5ae3daf55d7eee05a132b8bc/zzl',
  // 使用app.logger可上报信息的API
  reportDomain: 'http://127.0.0.1',
  // 用于展示H5的页面，例如/pages/webview/webview
  webviewSchema: ''
}, {
  // 拓展
})

export default {
  config: {
    pages: ['^pages/my/my_organize/organize_info/main'],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black'
    },
    tabBar: {
      list: [
        {
          pagePath: 'pages/my/main',
          text: '个人中心'
        }, {
          pagePath: 'pages/talmud/main',
          text: '塔木德'
        }]
    }
  }
}

