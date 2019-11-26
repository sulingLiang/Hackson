//index.js
const app = getApp()

Page({
  data: {
    detail: [{
      id:1,
      title: '今天星期一',
      content: '今天星期一，干什么去？今天星期一，干什么去？今天星期一，干什么去？今天星期一，干什么去？今天星期一，干什么去？',
      author: 'Katy',
      time: '2019-11-26 10:56',
      likeCount: 1,
      likeCheck: true
    }, {
      id:2,
      title: '今天星期一',
      content: '今天星期一，干什么去？',
      author: 'Katy',
      time: '2019-11-26 10:56',
      likeCount: 11,
      likeCheck: false
    }, {
      id:3,
      title: '今天星期一',
      content: '今天星期一，干什么去？',
      author: 'Katy',
      time: '2019-11-26 10:56',
      likeCount: 10,
      likeCheck: false
    }, {
      id:4,
      title: '今天星期一',
      content: '今天星期一，干什么去？',
      author: 'Katy',
      time: '2019-11-26 10:56',
      likeCount: 2,
      likeCheck: true
    }],
    a: [{count:1}]
  },
  // 点赞
  handleLike: function(e) {
    const that = this
    const arr = that.data.detail;
    const index = that.data.detail.findIndex(item => item.id === e.currentTarget.dataset.id);
    const likeCheck = "detail[" + index + "].likeCheck";
    const likeCount = "detail[" + index + "].likeCount";
    if (arr[index]['likeCheck']) {
      that.setData({
        [likeCheck]: false,
        [likeCount]: that.data.detail[index]['likeCount'] - 1
      })
    } else {
      that.setData({
        [likeCheck]: true,
        [likeCount]: that.data.detail[index]['likeCount'] + 1
      })
    }
  }
})
