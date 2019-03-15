// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  console.log(event)
  const db = cloud.database()
  const favor = db.collection('favorite')
  try {
    return await favor.where({
      postid: event.postid,
      _openid: wxContext.OPENID
    }).remove()
  } catch (e) {
    console.error(e)
  }
}