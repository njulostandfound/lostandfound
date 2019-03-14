  // pages/summit/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    radioItems: [
      { name: 'Lost', value: '0', type: "lost" ,checked: true},
      { name: 'Found', value: '1', type: "found"}
    ],

  },
  radioChange: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value);

    var radioItems = this.data.radioItems;
    for (var i = 0, len = radioItems.length; i < len; ++i) {
      radioItems[i].checked = radioItems[i].type == e.detail.value;
    }

    this.setData({
      radioItems: radioItems
    });
  },
  formSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    var that = this;
    if(e.detail.value.cardid==''||e.detail.value.cardname==''){
      this.setData({
        showTopTips: true
      });
      setTimeout(function () {
        that.setData({
          showTopTips: false
        });
      }, 3000);
    }
    else{
      console.log("成功提交")
      const db = wx.cloud.database()
      const posts = db.collection('posts')
      e.detail.value.date = db.serverDate()
      e.detail.value.title = "校园卡"
      e.detail.value.atten = ""
      e.detail.value.formid = e.detail.formId
      posts.add({
        data: e.detail.value,
        success(res) {
          console.log(res)
          wx.navigateTo({
            url: 'msg_success?postid='+res._id
          })
        }
      }),
      wx.cloud.callFunction({
        name: 'sendornot',
        data:e,
        success(res) {
          console.log("成功进入程序");
        },
        fail:console.error
      })
    }
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