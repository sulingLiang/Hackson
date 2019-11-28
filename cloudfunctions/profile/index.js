// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()

// 联合查询
const getDataFromStory = async (event, context) => {
  return await db.collection(event.db).aggregate().lookup({
    from: event.from,
    localField: event.localField,
    foreignField: event.foreignField,
    as: event.as
  }).end().then(res => {
    return res.list
  }).catch(err => {

  })
}

// 取消点赞
const cancelLike = async (event, context) => {
  return await db.collection(event.db).doc(event.id).remove()
}

const funMap = {
  getDataFromStory,
  cancelLike
}

// 云函数入口函数
exports.main = async (event, context) => {
  return await funMap[event.fun](event, context);
}