import { wx } from 'common-mpvue'

export default {
  //获取活动列表
  getActivitys (param) {
    return wx.httpRequest.httpJsonPost('/user/activitys', param)
  },
  //活动详细信息
  activity (param) {
    return wx.httpRequest.httpJsonPost('/user/activity', param)
  }
}
