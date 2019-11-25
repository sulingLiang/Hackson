// miniprogram/pages/index/index.js
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    storyList: [],
    backgroud: ["red", "orange", "green", "blue", "purple", "pink"]
  },

  upper(e) {
    console.log(e)
  },

  lower(e) {
    console.log(e)
  },

  onShow: function () {
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 0
      })
    }

    this.getStoryList()
  },

  add: function () {
    db.collection('story').add({
      data: {
        title: "大话西游",
        author: "hey",
        avatar: "https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTL1KKwd6lasoFGGCibDYN9MbYNbY39U7D1mic7mIwn19RZRcsaGicH33BxVXcQk5JXRNgZISMicT6EdSw/132",
        creatTime: new Date(),
        heart: "134543"
      },
      success: function (res) {
        console.log(res)
      }
    })
  },
  getStoryList: function () {
    wx.showLoading({
      title: '加载中',
    })
    console.log(this.data.storyList.length)
    wx.cloud.callFunction({
      name: 'searchStory',
      data: {
        start: this.data.storyList.length,
        count: 10
      }
    }).then(res => {
      this.setData({
        storyList: this.data.storyList.concat(res.result.storyList)
      });
      wx.hideLoading();
    }).catch(err => {
      wx.hideLoading();
    });
  },

  onPullDownRefresh: function () {

  },

  onReachBottom: function () {
    this.getStoryList();
  },

  onShareAppMessage: function () {

  }
})