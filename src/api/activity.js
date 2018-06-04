import {wx} from 'common-mpvue'

export default {
  //获取活动列表
  getActivitys(param) {
    return wx.httpRequest.httpJsonPost('/user/activitys', param)
  },
  //活动详细信息
  activity(param) {
    return wx.httpRequest.httpJsonPost('/user/activity', param)
  },
  //填写活动评价
  addComment(param) {
    return wx.httpRequest.httpJsonPost('/user/addComment', param)
  },
  //填写活动评价
  myComment(param) {
    return wx.httpRequest.httpJsonPost('/user/myComment', param)
  },
  //发布活动
  publishActivities(param) {
    return wx.httpRequest.httpJsonPost('/user/publishActivities', param)
  },
  //添加辅助人
  addInvitation(param) {
    return wx.httpRequest.httpJsonPost('/user/addInvitation', param)
  },
  //我组织的
  myOrganizations(param) {
    return wx.httpRequest.httpJsonPost('/user/myOrganizations', param)
  },
  //我组织的详情
  myOrganization(param) {
    return wx.httpRequest.httpJsonPost('/user/myOrganization', param)
  },
  //我的活动,他的活动
  myActivities(param) {
    return wx.httpRequest.httpJsonPost('/user/myActivities', param)
  },
  //取消活动
  quitActivity(param) {
    return wx.httpRequest.httpJsonPost('/user/quitActivity', param)
  },
  //我的邀约
  invite(param) {
    return wx.httpRequest.httpJsonPost('/user/invite', param)
  },
  //收藏
  collect(param) {
    return wx.httpRequest.httpJsonPost('/user/collect', param)
  },
  //公告
  placard(param) {
    return wx.httpRequest.httpJsonPost('/user/placard', param)
  },
  //活动介绍
  introduce(param) {
    return wx.httpRequest.httpJsonPost('/user/introduce', param)
  },
  //撤销
  undoInvitation(param) {
    return wx.httpRequest.httpJsonPost('/user/undoInvitation', param)
  },
  //撤销
  undoLove(param) {
    return wx.httpRequest.httpJsonPost('/user/undoLove', param)
  },
  //参与者答应
  promiseParticipate(param) {
    return wx.httpRequest.httpJsonPost('/user/promiseParticipate', param)
  },
  //辅助人答应
  promiseAssistant(param) {
    return wx.httpRequest.httpJsonPost('/user/promiseAssistant', param)
  },
  //爱情答应
  promiseLove(param) {
    return wx.httpRequest.httpJsonPost('/user/promiseLove', param)
  },
  //活动开始
  startActivity(param) {
    return wx.httpRequest.httpJsonPost('/user/startActivity', param)
  },
  //活动开始
  stopActivity(param) {
    return wx.httpRequest.httpJsonPost('/user/stopActivity', param)
  },
  //
  modifyActivity(param) {
    return wx.httpRequest.httpJsonPost('/user/modifyActivity', param)
  },
  //参加活动
  joinActivity(param) {
    return wx.httpRequest.httpJsonPost('/user/joinActivity', param)
  },
  //不邀约辅助人
  separateHosting(param) {
    return wx.httpRequest.httpJsonPost('/user/separateHosting', param)
  }
}
