// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  return {
    console.log('form发生了submit.search事件，携带数据为：', e.detail.value)
    if(e.detail.value.type== "lost") {
    mydata = { "cardid": e.detail.value.cardid, "type": "found" }
  }
    else {
    mydata = { "cardid": e.detail.value.cardid, "type": "lost" }
  }
  wx.cloud.callFunction({
    // 云函数名称
    name: 'search2',
    // 传给云函数的参数
    data: mydata,
    success(res) { //返回查询结果postid
      console.log(res)
      if (res.result.data.length) {//返回有效结果
        //在这里可能要修改为搜索结果长页
        console.log("成功匹配！！！！")
        thisdata = {
          "keyword1": {
            "value": res.result.data.value.location
          },
          "keyword2": {
            "value": res.result.data.value.contact
          },
          "keyword3": {
            "value": res.result.data.value.cardid
          },
          "keyword4": {
            "value": "校园卡"
          }
        }
        const wxMiniUser = new WXMINIUser({ appId, secret });
        const access_token = wxMiniUser.getAccessToken();

        const wxMiniMessage = new WXMINIMessage({ openId: res.result.data.value._openid, formId: res.result.data.value.formid, templateId });

        return wxMiniMessage.sendMessage({
          access_token,
          thisdata,
          page
        });
      }
      else {
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
    },
    fail: console.error
  })


    event,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
  }
}