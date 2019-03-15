// pages/index/related.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchPostList: [],
    isFromSearch: true,
    rescount: 20,
    searchLoading: false,
    searchLoadingComplete: false
  },

  fetchSearchList: function () {
    console.log("get data")
    var ids = []
    var tmp = []
    var self = this
    wx.cloud.callFunction({
      name: "stream",
      data: {
        searchKeyword: "related",
        rescount: self.data.rescount
      }
    }).then(res => {
      console.log(res)
      ids = res.result.data
      var i
      var count = 0
      for (i in ids) {
        console.log(i)
        console.log(res.result.data[i].postid)
        wx.cloud.callFunction({
          name: "stream",
          data: {
            searchKeyword: res.result.data[i].postid,
            rescount: 2
          },
          success(re) {
            console.log(re)
            console.log(i)
            console.log(count)
            tmp[count] = re.result.data[0]
            count += 1
            console.log(tmp)
          }
        })
      }
    }).then(res => {
      console.log("done")
      console.log(tmp)
      self.setData({
        searchPostList: tmp
      })
    })

  },

  searchScrollLower: function () {

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.fetchSearchList()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})