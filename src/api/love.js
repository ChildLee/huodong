import {wx} from 'common-mpvue'

export default {
  //我的爱情
  myLoves(param) {
    return wx.httpRequest.httpJsonPost('/user/myLoves', param)
  }
}
