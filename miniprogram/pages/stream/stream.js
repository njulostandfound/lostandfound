// pages/stream/stream.js
//credit: http://www.cnblogs.com/thebeauty/p/6599612.html
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchKeyword: '',
    searchPostList: [],
    isFromSearch: true,
    searchPageNum: 20, 
    rescount: 15,
    searchLoading: false,
    searchLoadingComplete: false
  },

  fetchSearchList: function () {
    console.log("get data")
    console.log(this.data.searchKeyword)
    var self = this
    wx.cloud.callFunction({
      name:"stream",
      data:{
        searchKeyword: self.data.searchKeyword,
        rescount: self.data.rescount
      },
      success(res){
        console.log(res)
        self.setData({
          searchPostList: res.result.data
        })
      }
    })
  },

  searchScrollLower: function () {

   },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({searchKeyword: options.key})
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