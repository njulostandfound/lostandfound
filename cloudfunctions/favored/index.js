// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  console.log(event)
  const db = cloud.database()
  const favor = db.collection('favorite')
  const oid = wxContext.OPENID
  try {
    return await favor.where({
      _openid: oid,
      postid: event.postid
    }).get()
  } catch (e) {
    console.log(e)
  }
}