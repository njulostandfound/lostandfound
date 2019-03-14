// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  console.log("进入云函数stream")
  console.log(event)
  const oid = wxContext.OPENID
  const db = cloud.database()
  const _ = db.command
  const posts = db.collection('posts')
  const fa = db.collection('favorite')
  try {
    if(event.searchKeyword == "all"){
      return await posts.orderBy("date", "desc").limit(event.rescount).get()
    }
    else if (event.searchKeyword == "related"){
      var res = await fa.where({ _openid: oid}).orderBy("date", "desc").limit(event.rescount).get({
        success(res){
          console.log("re suc")
          console.log(res)
        }
      });
      console.log(res)
      return res
      //return await posts.orderBy("date", "desc").limit(event.rescount).get();
    }
    else if(event.searchKeyword == "mine"){
      return await posts.where({
        _openid: oid
      }).orderBy("date", "desc").limit(event.rescount).get()
    }
    else if (event.searchKeyword == "lost" || event.searchKeyword == "found" ){
      return await posts.where({ type: event.searchKeyword }).orderBy("date", "desc").limit(event.rescount).get()
    }
    else{
      return await posts.where(_.or(
        { title: event.searchKeyword },
        { cardid: event.searchKeyword},
        { cardname: event.searchKeyword}
        )).orderBy("date", "desc").limit(event.rescount).get()
    }
  } catch (e) {
    console.log(e)
  }
}