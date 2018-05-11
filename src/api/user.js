import { wx } from 'common-mpvue'

export default {
  //获取用户状态
  getUserStatus (param) {
    return wx.httpRequest.httpJsonPost('/user/getUser', param)
  },
  //获取用户信息
  userData (param) {
    return wx.httpRequest.httpJsonPost('/user/userData', param)
  },
  //填写用户资料信息
  addUser (param) {
    return wx.httpRequest.httpJsonPost('/user/addUser', param)
  },
  //填写用户资料信息
  addFocus (param) {
    return wx.httpRequest.httpJsonPost('/user/addFocus', param)
  },
  //验证昵称是否存在
  checkNick (param) {
    return wx.httpRequest.httpJsonPost('/user/checkNick', param)
  },
  //修改手机号码
  checkPhone (param) {
    return wx.httpRequest.httpJsonPost('/user/checkPhone', param)
  },
  //获取个人中心
  userCenter (param) {
    return wx.httpRequest.httpJsonPost('/user/userCenter', param)
  }
}
