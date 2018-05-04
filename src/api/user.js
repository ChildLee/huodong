import { wx } from 'common-mpvue'

//修改手机号码
export const checkPhone = param => {
  return wx.httpRequest.httpJsonPost('/user/checkPhone', param)
}
