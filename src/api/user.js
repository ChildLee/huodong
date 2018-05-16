import {wx} from 'common-mpvue'

export default {
  //获取用户状态
  getUserStatus(param) {
    return wx.httpRequest.httpJsonPost('/user/getUser', param)
  },
  //获取用户信息
  userData(param) {
    return wx.httpRequest.httpJsonPost('/user/userData', param)
  },
  //保存微信头像
  avatatUrl(param) {
    return wx.httpRequest.httpJsonPost('/user/avatatUrl', param)
  },
  //填写用户资料信息
  addUser(param) {
    return wx.httpRequest.httpJsonPost('/user/addUser', param)
  },
  //我的关注
  myFocus(param) {
    return wx.httpRequest.httpJsonPost('/user/myFocus', param)
  },
  //添加/删除关注人
  addFocus(param) {
    return wx.httpRequest.httpJsonPost('/user/addFocus', param)
  },
  //验证昵称是否存在
  checkNick(param) {
    return wx.httpRequest.httpJsonPost('/user/checkNick', param)
  },
  //修改手机号码
  checkPhone(param) {
    return wx.httpRequest.httpJsonPost('/user/checkPhone', param)
  },
  //获取个人中心
  userCenter(param) {
    return wx.httpRequest.httpJsonPost('/user/userCenter', param)
  }
}
