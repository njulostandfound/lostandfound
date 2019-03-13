// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const rp = require('request-promise');

// 云函数入口函数
exports.main = async (event, context) => {

  var res = await rp(
    {
      method: 'post',
      uri: 'https://api.weixin.qq.com/cgi-bin/message/wxopen/template/send?access_token=',
      body: {"touser": "OPENID",
      "template_id": "yMIB6kHMY2wSTyvSfmosrCC6ETE_iqpYnOdZGRtlCEo",
      "form_id": "FORMID",
      "data": {
        "keyword1": {
          "value": "339208499"
        },
        "keyword2": {
          "value": "2015年01月05日 12:30"
        },
        "keyword3": {
          "value": "腾讯微信总部"
        },
        "keyword4": {
          "value": "广州市海珠区新港中路397号"
        }
      },
      },
      //参数
      json: true  //是否json数据
    }
  ).then((body) => {
    return body
  }).catch(err => {
    return err;
  })
  return res;

  const wxContext = cloud.getWXContext()
  return {
    event,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
  }
}