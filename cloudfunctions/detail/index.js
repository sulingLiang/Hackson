const cloud = require('wx-server-sdk')
cloud.init()
//声明数据库
const db = cloud.database()
// const _ = db.command
const getStoryDetail= async (event, context) => {
  return await db.collection(event.db).where({ _id: event.id }).get().then(
    res => {
      return {
        detail: res.data
      }
    }
  )
}
const updateStoryDetail= async (event, context) => {
  return await db.collection(event.db).where({ _id: event.id }).update({
    data: {
      content: db.command.push(event.data)
    },
    success: function(res) {
      return {
        result: res.data
      }
    }
  })
}
const funMap = {
  getStoryDetail,
  updateStoryDetail
}
// 云函数入口函数
exports.main = async(event, context) => {
  return await funMap[event.fun](event, context);
}