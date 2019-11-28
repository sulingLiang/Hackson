// miniprogram/pages/profile/profile.js
//获取应用实例
const db = wx.cloud.database();
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    tabTitle: '我的收藏',
    tabTitleId: '0',
    dataList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getDataFromStory('storylike')
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },

  getUserInfo: function (e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },

  // 联合查询
  getDataFromStory (val) {
    wx.cloud.callFunction({
      name: 'profile',
      data: {
        fun: 'getDataFromStory',
        db: val,
        from: 'story',
        localField: 'storyid',
        foreignField: '_id',
        as: 'searchList'
      }
    }).then(res => {
      this.setData({
        dataList: res.result
      })
    })
  },

  // 标签导航切换
  tabSelect (e) {
    const tabId = e.currentTarget.dataset.id
    if (tabId === '0') {
      this.getDataFromStory('storylike')
      this.setData({
        tabTitle: '我的收藏',
        tabTitleId: '0'
      })
    } else if (tabId === '1') {
      this.getDataFromStory('storypartake')
      this.setData({
        tabTitle: '我的参与',
        tabTitleId: '1'
      })
    } else if (tabId === '2') {
      this.getDataFromStory('storypublish')
      this.setData({
        tabTitle: '我的发布',
        tabTitleId: '2'
      })
    }
  },

  // 取消点赞
  cancelLike (e) {
    const cancelId = e.currentTarget.dataset.id
    wx.cloud.callFunction({
      name: 'profile',
      data: {
        fun: 'cancelLike',
        db: 'storylike',
        id: cancelId
      }
    }).then(res => {
      this.getDataFromStory('storylike')
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 2
      })
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})