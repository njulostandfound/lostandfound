// pages/addLost/addLost.js
var util = require('../../utils.js');
Array.prototype.clone = function () {
  var a = [];
  for (var i = 0; i < this.length; i++) {
    a.push(this[i]);
  }
  return a;
};

var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置
Page({
  /**
   * 页面的初始数据
   */
  data: {
    tabs: ["校园卡", "一般物品"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    radioItems: [
      { name: 'Lost', value: '0', type: "lost", checked: true },
      { name: 'Found', value: '1', type: "found" }
    ],
    files: []
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
    if (e.detail.value.cardid == '' || e.detail.value.cardname == '' || e.detail.value.contact == '') {
      this.setData({
        showTopTips: true
      });
      setTimeout(function () {
        that.setData({
          showTopTips: false
        });
      }, 3000);
    }
    else {
      const db = wx.cloud.database()
      const posts = db.collection('posts')
      e.detail.value.date = db.serverDate()
      e.detail.value.title = '校园卡'
      e.detail.value.atten = ''
      e.detail.value.formid = e.detail.formId
      posts.add({
        data: e.detail.value,
        success(res) {
          console.log(res)
          wx.navigateTo({
            url: 'msg_success?postid=' + res._id
          })
        }
      })
    }
  }, 
  formSubmit2: function (e) {
    console.log('form发生了submit2事件，携带数据为：', e.detail.value)
    var that = this;
    if (e.detail.value.title == '' || e.detail.value.location == '' || e.detail.value.contact == '') {
      this.setData({
        showTopTips: true
      });
      setTimeout(function () {
        that.setData({
          showTopTips: false
        });
      }, 3000);
    }
    else {
      const db = wx.cloud.database()
      const posts = db.collection('posts')
      e.detail.value.date = db.serverDate()
      e.detail.value.cardid = ''
      e.detail.value.cardname = ''
      e.detail.value.formid = e.detail.formId
      e.detail.value.imgsrc = []

      //上传图片
      const time = String(util.formatTime(new Date)).replace(/\s?-?:?/g, '');
      const cloudPathPrefix = time + 'image';
      const absoluteCloudPathPrefix = 'cloud://lostandfound-ad2f70.6c6f-lostandfound-ad2f70-1258793279/';
      console.log(time);
      for (var i = 0; i < that.data.files.length; i ++) {
        wx.cloud.uploadFile({
          cloudPath: cloudPathPrefix + i + '.png',
          filePath: that.data.files[i],
          success: res => {
            console.log(res.fileID)
          },
          fail: err => {
            console.log(err)
          }
        })
      }

      for(var i=0;i<this.data.files.length;i+=1){
        e.detail.value.imgsrc[i] = absoluteCloudPathPrefix + cloudPathPrefix + i +'.png'
      }
      posts.add({
        data: {
          title: e.detail.value.title,
          imgsrc: e.detail.value.imgsrc,//absoluteCloudPathPrefix + cloudPathPrefix + '0.png',
          cardid: e.detail.value.cardid,
          cardname: e.detail.value.cardname,
          location: e.detail.value.location,
          contact: e.detail.value.contact,
          atten: e.detail.value.atten,
          msg: e.detail.value.msg,
          type: e.detail.value.type,
          filePath: cloudPathPrefix,
          numOfImages: that.data.files.length
        },
        success(res) {
          console.log(res)
          wx.navigateTo({
            url: 'msg_success?postid=' + res._id,
          })
        },
        fail(err) {
          console.log(err)
        }
      })
    }
  }, 
    /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
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

  },
  chooseImage: function (e) {
    var that = this;
    wx.chooseImage({
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        that.setData({
          files: that.data.files.concat(res.tempFilePaths)
        });
      }
    })
  },
  previewImage: function (e) {
    wx.previewImage({
      current: e.currentTarget.id, // 当前显示图片的http链接
      urls: this.data.files // 需要预览的图片http链接列表
    })
  }
})

/*
        const time = String(util.formatTime(new Date)).replace(/\s?-?:?/g, '');
        console.log(time);
        for(var i = 0; i < that.data.files.length; i ++){
          wx.cloud.uploadFile({
            cloudPath: time+'image'+i+'.png',
            filePath: that.data.files[i],
            success: res => {
              console.log(res.fileID)
            },
            fail: err => {
              console.log(err)
            }
          })
        }
*/