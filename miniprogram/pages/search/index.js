// pages/search/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  formSubmit: function (e) {
    if (!(e.detail.value.cardid == "" || e.detail.value.cardname == "")) {
      console.log('form发生了submit.search事件，携带数据为：', e.detail.value)
      const db = wx.cloud.database()
      const posts = db.collection('posts')
      const _ = db.command
      var self = this
      posts.where(_.and(
        {
          cardid: _.eq(e.detail.value.cardid),
          cardname: _.eq(e.detail.value.cardname)
        },
        {
          cardid: _.neq(''),
          cardname: _.neq('')
        }
      )).get({
        success: function (res) {
          console.log(res)
          if (res.data.length) {
            console.log("query success")
            wx.navigateTo({
              url: '/pages/post/post?postid=' + res.data[0]._id
            })
          }
          else {
            console.log("failed to get")
            wx.showModal({
              content: '没有找到失物信息。',
              showCancel: false,
              success: function (res) {
                if (res.confirm) {
                  console.log('用户点击确定')
                }
              }
            })
          }
        }
      })
    }
    else{
      console.log("exists empty item")
      wx.showToast({
        title: '表单不能为空',
        icon: 'loading',
      })
    }
  },

  formReset: function () {
    console.log("查询表单发出reset动作")
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