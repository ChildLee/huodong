export default {
  setNavBar(title = '', backgroundColor = '#ffffff', frontColor = '#000000') {
    wx.setNavigationBarTitle({
      title
    })
    wx.setNavigationBarColor({
      frontColor,
      backgroundColor
    })
  }
}
