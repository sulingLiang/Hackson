// 云函数入口文件
const cloud = require('wx-server-sdk')

const getProfileList = async (event, context) => {
  return await db.collection(event.db).get().then(
    res => {
      return {
        profileList: res.data
      }
    }
  )
}
// const getDataFromStory = async (event, context) => {
//   return await db.collection(event.db).where({
//     _openid: event._openid,
//     _id: event._id
//   }).get().then(
//     res => {
//       return {
//         dataList: res.data
//       }
//     }
//   )
// }

const funMap = {
  getProfileList
  // getDataFromStory
}

cloud.init()
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  return await funMap[event.fun](event, context);
}