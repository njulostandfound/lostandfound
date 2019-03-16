// pages/post/post.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    postid: "",
    openid: "",
    title:"标题读取中",
    imgsrc: "",
    cardid: "ID读取中",
    cardname: "主人读取中",
    location: "位置读取中",
    contact: "联系方式读取中",
    atten: "联系人读取中",
    msg: "备注信息读取中",
    type: "失物状态读取中",
    filePath: "",
    numOfImages: 1,
    isFavored: false,
    disabled: false
  },

favor: function(){
  console.log("get in favor")
  const db = wx.cloud.database()
  const fav = db.collection('favorite')
  var self = this
  self.setData({ disabled: true })
  wx.cloud.callFunction({
    name:"favor",
    data: { postid: this.data.postid},
    success(res){
      console.log(res)
      self.checkFavored()
      wx.showToast({
        title: '收藏成功！',
        icon: 'success'
      })
    }
  })
},
unfavor: function(){
  console.log("get in unfavor")
  var self = this
  self.setData({ disabled: true })
  wx.cloud.callFunction({
    name:"unfavor",
    data:{
      postid: self.data.postid
    },
    success(res){
      console.log(res)

      self.checkFavored()
      wx.showToast({
        title: '取消收藏成功！',
        icon: 'success'
      })
    }
  })
},
checkFavored: function(){
  console.log("get in checkFavored")
  var self = this
  wx.cloud.callFunction({
    name:"favored",
    data:{postid: self.data.postid},
    success(res){
      console.log(self.data.postid)
      console.log(res)
      if(res.result.data.length){
        self.setData({
          isFavored: true,
          disabled: false
        })
      }
      else{
        self.setData({
          isFavored: false,
          disabled: false
        })
      }
      console.log("favored:", self.data.isFavored)
    }
  })
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({postid: options.postid})
    console.log('展示记录id:', options.postid)
    var self = this

    const db = wx.cloud.database()
    const posts = db.collection('posts')
      posts.where({
      _id: options.postid
    }).get({
      success(res) {
        console.log("查询成功")
        console.log(res)
        console.log(res.data[0].imgsrc)
        self.setData({
          openid: res.data[0]._openid,
          title: res.data[0].title,
          imgsrc: res.data[0].imgsrc,
          cardid: res.data[0].cardid,
          cardname: res.data[0].cardname,
          location: res.data[0].location,
          atten: res.data[0].atten,
          contact: res.data[0].contact,
          msg: res.data[0].msg,
          type: res.data[0].type
        })
        self.checkFavored()
      },
      fail: console.error
    })
  },
  preview:function(){
    var that = this;
    wx.previewImage({
      current: that.data.imgsrc, // 当前显示图片的http链接
      urls: that.data.imgsrc // 需要预览的图片http链接列表
    })
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