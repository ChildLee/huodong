import {wx} from 'common-mpvue'

export default {
  //提现
  withdraw(param) {
    return wx.httpRequest.httpJsonPost('/user/withdraw', param)
  },
  recharge(param) {
    return wx.httpRequest.httpJsonPost('/user/recharge', param)
  }
}
