// miniprogram/pages/index/index.js
const db = wx.cloud.database()

Page({
  data: {
    storyList: []
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
  getStoryList: function () {
    wx.showLoading({
      title: '加载中',
    })
    console.log(this.data.storyList)
    wx.cloud.callFunction({
      name: 'index',
      data: {
        fun: "searchStotyAll",
        db: "story",
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

  onReachBottom: function () {
    this.getStoryList();
  }
})