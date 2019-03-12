Page({
  data:{
    postid:0
  },
  check: function(){
    wx.redirectTo({
      url: '/pages/post/post?postid='+postid
    })
  },
  back:function(){
    wx.navigateBack({
      delta: 1
    })
  },
  onLoad: function (options) {
    this.setData({postid:options.postid})
  }
});