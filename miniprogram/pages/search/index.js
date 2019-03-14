// pages/search/index.js
var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: ["Lost", "Found", "Search"],
    lostList: [],
    foundList: [],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
  },

  getLostList: function () {
    console.log("get lost data")
    var self = this
    wx.cloud.callFunction({
      name: "stream",
      data: {
        searchKeyword: "lost",
        rescount: 20
      },
      success(res) {
        console.log(res)
        self.setData({
          lostList: res.result.data
        })
      }
    })
  },

  getFoundList: function () {
    console.log("get found data")
    var self = this
    wx.cloud.callFunction({
      name: "stream",
      data: {
        searchKeyword: "found",
        rescount: 20
      },
      success(res) {
        console.log(res)
        self.setData({
          foundList: res.result.data
        })
      }
    })
  },

  formSubmit: function (e) {
    if (e.detail.value.key != "") {
      wx.showToast({
        title: '跳转中',
        icon: 'loading',
        duration: 700
      })
      console.log('form发生了submit.search事件，携带数据为：', e.detail.value)
      wx.navigateTo({
        url: '/pages/stream/stream?key=' + e.detail.value.key
      })
    }
    else{
      console.log("exists empty item")
      wx.showToast({
        title: '表单不能为空',
        icon: 'none',
      })
    }
  },

  formReset: function () {
    console.log("查询表单发出reset动作")
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    this.getLostList()
    this.getFoundList()
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
        });
      }
    });
  },
  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
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