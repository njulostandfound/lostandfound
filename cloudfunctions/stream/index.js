// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  console.log("进入云函数stream")
  console.log(event)
  const db = cloud.database()
  const posts = db.collection('posts')
  try {
    if(event.searchKeyword == "all"){
      return await posts.orderBy("date", "desc").limit(event.rescount).get()
    }
    else if (event.searchKeyword == "lost" || event.searchKeyword == "found" ){
      return await posts.where({ type: event.searchKeyword }).orderBy("date", "desc").limit(event.rescount).get()
    }
    else{
      return await posts.where({ title: event.searchKeyword }).orderBy("date", "desc").limit(event.rescount).get()
    }
  } catch (e) {
    console.log(e)
  }
}