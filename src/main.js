import { wrap } from 'common-mpvue'
import App from './App'
import * as api from './api'

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
  domain: 'http://192.168.1.53',
  // 使用app.logger可上报信息的API
  reportDomain: 'http://127.0.0.1',
  // 用于展示H5的页面，例如/pages/webview/webview
  webviewSchema: ''
}, {
  api
  // 拓展
})

export default {
  config: {
    pages: ['^pages/my/main'],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black'
    },
    tabBar: {
      list: [
        {
          pagePath: 'pages/activity/main',
          text: '活动',
          iconPath: 'static/img/nav/activity.png',
          selectedIconPath: 'static/img/nav/activity-s.png'
        },
        {
          pagePath: 'pages/my/main',
          text: '个人中心',
          iconPath: 'static/img/nav/my.png',
          selectedIconPath: 'static/img/nav/my-s.png'
        },
        {
          pagePath: 'pages/talmud/main',
          text: '塔木德',
          iconPath: 'static/img/nav/comment.png',
          selectedIconPath: 'static/img/nav/comment-s.png'
        }
      ]
    }
  }
}
