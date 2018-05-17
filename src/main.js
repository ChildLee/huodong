import {wrap} from 'common-mpvue'
import App from './App'
import * as api from './api'
import * as storageStore from './store'

wrap(App, {
  name: '竹芝林',
  version: 'v1.0.0',
  pkgName: 'zzlSocial',
  // env: 'production' | 'development',
  env: 'production',
  // domain: 'https://zzlsocial.com'
  domain: 'http://192.168.1.53'
}, {
  api,
  storageStore
})

export default {
  config: {
    pages: ['^pages/my/my_attention/activity/main'],
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
