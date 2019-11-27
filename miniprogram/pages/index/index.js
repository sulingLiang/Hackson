// miniprogram/pages/index/index.js
const db = wx.cloud.database()
Page({
  data: {
    storyList: [],
    mystorylike: []
  },
  detail: function (e) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../detail/detail?id=' + id
    })
  },
  onShow: async function () {
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 0
      })
    }
    await this.getStoryList()
    await this.getMystorylike()
  },
  getStoryList: function () {
    wx.showLoading({
      title: '加载中',
    })
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

  getMystorylike: function () {
    wx.cloud.callFunction({
      name: 'login'
    }).then(res => {
      wx.cloud.callFunction({
        name: 'index',
        data: {
          fun: "searchAllStotyLike",
          db: "storylike",
          _openid: res.result.openid
        }
      }).then(res => {
        var arrlist = []
        for (var item of res.result.mystorylike) {
          arrlist.push(item.storyid)
        }
        this.setData({
          mystorylike: arrlist
        });
      })
    })

  },

  onReachBottom: function () {
    this.getStoryList();
  }
})