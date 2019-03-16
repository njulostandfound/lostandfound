// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  console.log(event)
  const myoid = wxContext.OPENID
  const db = cloud.database()
  const fa = db.collection("favorite")
  await fa.add({
    data:{
      oid: myoid,
      postid: event.corpostid,
      date: db.serverDate()
    },
    success(res){
      console.log("my -> cor", res)
    },
    fail: console.error
  })
  await fa.add({
    data: {
      oid: event.coroid,
      postid: event.mypostid,
      date: db.serverDate()
    },
    success(res) {
      console.log("cor -> my", res)
    },
    fail: console.error
  })
  /*
  return {
    event,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
  }
  */
}