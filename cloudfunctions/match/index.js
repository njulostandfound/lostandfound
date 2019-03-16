// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  console.log(event) //cardid, type
  const db = cloud.database()
  const posts = db.collection("posts")
  try {
    if (event.type == "lost"){
      return await posts.orderBy("date","desc").where({
        cardid: event.cardid,
        type: "found"
      }).get()
    }
    else if (event.type == "found")
      return await posts.orderBy("date", "desc").where({
        cardid: event.cardid,
        type: "lost"
      }).get()
  } catch (e) {
    console.log(e)
  }
}