import {wx} from 'common-mpvue'

export default {
  //塔木德列表
  talmuds(param) {
    return wx.httpRequest.httpJsonPost('/user/talmuds', param)
  },
  //塔木德详情
  talmud(param) {
    return wx.httpRequest.httpJsonPost('/user/talmud', param)
  },
  //我的塔木德
  myTalmud(param) {
    return wx.httpRequest.httpJsonPost('/user/myTalmud', param)
  },
  //添加同问
  addSameQuestion(param) {
    return wx.httpRequest.httpJsonPost('/user/addSameQuestion', param)
  },
  //提问
  addTalmud(param) {
    return wx.httpRequest.httpJsonPost('/user/addTalmud', param)
  },
  //回答
  addReply(param) {
    return wx.httpRequest.httpJsonPost('/user/addReply', param)
  },
  //回答
  like(param) {
    return wx.httpRequest.httpJsonPost('/user/like', param)
  },
  //删除塔木德回答
  deleteReply(param) {
    return wx.httpRequest.httpJsonPost('/user/deleteReply', param)
  }
}
