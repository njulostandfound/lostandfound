// pages/index/mine.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchPostList: [],
    isFromSearch: true,
    rescount: 20,
    searchLoading: false,
    searchLoadingComplete: false,
    isLoaded:false
  },

  fetchSearchList: function () {
    wx.showLoading({
      title: 'Loading',
    })
    console.log("get data")
    var self = this
    wx.cloud.callFunction({
      name: "stream",
      data: {
        searchKeyword: "mine",
        rescount: self.data.rescount
      },
      success(res) {
        console.log(res)
        self.setData({
          searchPostList: res.result.data
        })
      }
    })
    wx.hideLoading()
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
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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