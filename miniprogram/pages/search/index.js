// pages/search/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cardid:"等待查询",
    message:"等待查询"
  },
  formSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    const db = wx.cloud.database()
    const posts = db.collection('posts')
    const _ = db.command
    var self = this
    posts.where(_.or([
      {
        cardid: _.eq(e.detail.value.cardid)
      },
      {
        cardname: _.eq(e.detail.value.cardname)
      }
    ])).get({
      success(res){
        console.log(res.data[0].cardid)
        self.setData({
          cardid: res.data[0].cardid,
          message: res.data[0].message
        })
        console.log("changed data:",{self: data.cardid, self: data.message})
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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