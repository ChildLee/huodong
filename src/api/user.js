import { wx } from 'common-mpvue'

export default {
  //获取用户状态
  getUserStatus (param) {
    return wx.httpRequest.httpJsonPost('/user/getUser', param)
  },
  //修改手机号码
  checkPhone (param) {
    return wx.httpRequest.httpJsonPost('/user/checkPhone', param)
  }
}
