// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  console.log("进入云函数post")
  console.log(event)
  const db = cloud.database()
  const posts = db.collection('posts')
  try {
    return await posts.where({
      _id: event.postid
    }).get()
  } catch (e) {
    console.log(e)
  }
}