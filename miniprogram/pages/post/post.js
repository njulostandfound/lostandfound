// pages/post/post.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:"标题读取中",
    imgsrc:"card.png",
    cardid: "ID读取中",
    cardname: "主人读取中",
    location: "位置读取中",
    contact: "联系方式读取中",
    atten: "联系人读取中",
    msg:"备注信息读取中",
    type:"失物状态读取中"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options.postid == -1){
      console.log('展示最新的记录')
      const db = wx.cloud.database()
      const posts = db.collection('posts')
      const _ = db.command
      var self = this
      posts.orderBy("date","desc").limit(5)
        .get({
        success(res) {
          console.log(res.data)
          self.setData({
            title: "校园卡",
            cardid: res.data[0].cardid,
            cardname: res.data[0].cardname,
            location: res.data[0].location,
            contact: res.data[0].contact,
            msg: res.data[0].msg
          })
        }
      })
    }
    else{
      console.log('展示记录id:', options.postid)
      var self = this
      wx.cloud.callFunction({
        // 云函数名称
        name: 'post',
        // 传给云函数的参数
        data: {postid: options.postid},
        success(res) { 
          console.log("查询成功")
          console.log(res)
          res = res.result
          console.log(res.data[0].cardid)
          self.setData({
            title: res.data[0].title,
            cardid: res.data[0].cardid,
            cardname: res.data[0].cardname,
            location: res.data[0].location,
            atten: res.data[0].atten,
            contact: res.data[0].contact,
            msg: res.data[0].msg,
            type: res.data[0].type
          })
        },
        fail: console.error
      })
    }
 
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