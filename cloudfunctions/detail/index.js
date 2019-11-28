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
// 获取当前用户对楼层的点赞
const getStoryFloorLike= async (event, context) => {
  return await db.collection(event.db).where({ storyid: event.storyid, _openid: event._openid }).get().then(
    res => {
      return {
        userFloorLike: res.data
      }
    }
  )
}
// 获取当前用户是否收藏该故事
const getStoryLike= async (event, context) => {
  return await db.collection(event.db).where({ storyid: event.storyid, _openid: event._openid }).get().then(
    res => {
      return {
        storyLike: res.data
      }
    }
  )
}
const updateStoryLike = async (event, context) => {
  if (!event.isStoryLike) {
    return await db.collection(event.db).add({
      data: {
        storyid: event.storyid,
        _openid: event._openid
      }
    })
  } else {
    return await db.collection(event.db).where({ 
      storyid: event.storyid,
      _openid: event._openid
    }).remove()
  }
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
// 更新floorlike
const updateFloorLike = async (event, context) => {
  if (event.isFloorLike) {
    return await db.collection(event.db).add({
      data: {
        storyid: event.storyid,
        floor: event.floor,
        _openid: event._openid
      }
    })
  } else {
    return await db.collection(event.db).where({ 
      storyid: event.storyid,
      floor: event.floor,
      _openid: event._openid
    }).remove()
  }
}
// 更新story表中的点赞总数，和楼层的点赞数
const updateStoryFloorLike = async (event, context) => {
  let index = event.floor - 1;
  return await db.collection(event.db).where({ _id: event.storyid }).update({
    data: {
      floorliketotal: event.floorliketotal,
      content: {
        [index]: {
          likeCount: event.likeCount
        }
      } 
    }
  })
}
const funMap = {
  getStoryDetail,
  updateStoryDetail,
  getUserOpenid,
  getStoryFloorLike,
  updateFloorLike,
  updateStoryFloorLike,
  getStoryLike
}
// 云函数入口函数
exports.main = async(event, context) => {
  return await funMap[event.fun](event, context);
}