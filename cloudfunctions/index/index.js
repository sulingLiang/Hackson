// 云函数入口文件
const cloud = require('wx-server-sdk')

const searchStotyAll = async(event, context) => {
  return await db.collection(event.db).skip(event.start).limit(event.count).get().then(
    res => {
      return {
        storyList: res.data
      }
    }
  )
}

const searchAllStotyLike = async(event, context) => {
  console.log(event)
  return await db.collection(event.db).where({
    _openid: event._openid
  }).get().then(
    res => {
      return {
        mystorylike: res.data
      }
    }
  )
}
const funMap = {
  searchStotyAll,
  searchAllStotyLike
}
cloud.init()

export const db = cloud.database()
// 云函数入口函数
exports.main = async(event, context) => {
  return await funMap[event.fun](event, context);
}