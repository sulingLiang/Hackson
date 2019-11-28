// miniprogram/pages/profile/profile.js
//获取应用实例
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
    dataList: [],
    couponList: [
      {
        couponId: '101',
        couponImg: 'https://c-dev.weimobwmc.com/test/48f64b162ddc430ebaf129bd12f8d6d3.png'
      },
      {
        couponId: '102',
        couponImg: 'https://c-dev.weimobwmc.com/test/ed99a1c89647401193b989616541178b.png'
      },
      {
        couponId: '103',
        couponImg: 'https://c-dev.weimobwmc.com/test/b74c22f09d36414eaa4f71451ccb8771.png'
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function() {

  },

    /**
   * 生命周期函数--监听页面显示
   */
  onShow: function(options) {
    if (typeof this.getTabBar === 'function' &&
    this.getTabBar()) {
      this.getTabBar().setData({
        selected: 2
      })
    }

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
  getDataFromStory (val, tabTitle, tabTitleId) {
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
        dataList: res.result,
        tabTitle: tabTitle,
        tabTitleId: tabTitleId
        
      })
    })
  },

  // 标签导航切换
  tabSelect (e) {
    const tabId = e.currentTarget.dataset.id
    if (tabId === '0') {
      this.getDataFromStory('storylike', '我的收藏', '0')
      // this.setData({
      //   tabTitle: '我的收藏',
      //   tabTitleId: '0'
      // })
    } else if (tabId === '1') {
      this.getDataFromStory('storypartake', '我的参与', '1')
      // this.setData({
      //   tabTitle: '我的参与',
      //   tabTitleId: '1'
      // })
      
    } else if (tabId === '2') {
      this.getDataFromStory('storypublish', '我的发布', '2')
      // this.setData({
      //   tabTitle: '我的发布',
      //   tabTitleId: '2'
      // })
    } else if (tabId === '3') {
      // this.getDataFromStory('coupon')
      this.setData({
        tabTitle: '我的优惠券',
        tabTitleId: '3',
        dataList: this.data.couponList
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