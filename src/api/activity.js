import { wx } from 'common-mpvue'

export default {
  //获取活动列表
  getActivitys (param) {
    return wx.httpRequest.httpJsonPost('/user/activitys', param)
  },
  //活动详细信息
  activity (param) {
    return wx.httpRequest.httpJsonPost('/user/activity', param)
  },
  //填写活动评价
  addComment (param) {
    return wx.httpRequest.httpJsonPost('/user/addComment', param)
  }
}
