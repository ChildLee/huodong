import {wx} from 'common-mpvue'

export default {
  //我的爱情
  myLoves(param) {
    return wx.httpRequest.httpJsonPost('/user/myLoves', param)
  },
  //我的爱情
  love(param) {
    return wx.httpRequest.httpJsonPost('/user/love', param)
  },
  //我的爱情
  loveReview(param) {
    return wx.httpRequest.httpJsonPost('/user/loveReview', param)
  },
  //异路
  breakUp(param) {
    return wx.httpRequest.httpJsonPost('/user/breakUp', param)
  }
}
