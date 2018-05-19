import {wx} from 'common-mpvue'

export default {
  //塔木德列表
  talmuds(param) {
    return wx.httpRequest.httpJsonPost('/user/talmuds', param)
  },
  //塔木德详情
  talmud(param) {
    return wx.httpRequest.httpJsonPost('/user/talmud ', param)
  },
  //添加同问
  addSameQuestion(param) {
    return wx.httpRequest.httpJsonPost('/user/addSameQuestion', param)
  },
  //提问
  addTalmud(param) {
    return wx.httpRequest.httpJsonPost('/user/addTalmud', param)
  }
}
