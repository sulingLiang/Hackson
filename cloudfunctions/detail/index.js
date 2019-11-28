const cloud = require('wx-server-sdk')
cloud.init()
//声明数据库
const db = cloud.database()
// const _ = db.command
// 获取故事详情
const getStoryDetail= async (event, context) => {
  return await db.collection(event.db).where({ _id: event.id }).get().then(
    res => {
      return {
        detail: res.data
      }
    }
  )
}
// 新增故事
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
// 获取用户 openid
const getUserOpenid= async (event, context) => {
  let { OPENID, APPID, UNIONID } = cloud.getWXContext()
  return {
    OPENID,
    APPID,
    UNIONID,
  }
}
const funMap = {
  getStoryDetail,
  updateStoryDetail,
  getUserOpenid
}
// 云函数入口函数
exports.main = async(event, context) => {
  return await funMap[event.fun](event, context);
}