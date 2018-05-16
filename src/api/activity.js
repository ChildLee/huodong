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
  }
}
