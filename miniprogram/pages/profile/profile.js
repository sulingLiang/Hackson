// miniprogram/pages/profile/profile.js
//获取应用实例
const app = getApp()

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
    profileList: [], 
    dataList: [],
    likeList: {
      tabTitle: '我的收藏',
      tabContent: [
        {
          imgUrl: '',
          title: 'Like',
          desc: 'hahaha, do you like this story'
        },
        {
          imgUrl: '',
          title: 'This is a funny story',
          desc: 'hahaha, do you like this story'
        },
        {
          imgUrl: '',
          title: 'This is a funny story',
          desc: 'hahaha, do you like this story'
        },
        {
          imgUrl: '',
          title: 'This is a funny story',
          desc: 'hahaha, do you like this story'
        }
      ]
    },
    partakeList: {
      tabTitle: '我的参与',
      tabContent: [
        {
          imgUrl: '',
          title: 'Partake',
          desc: 'hahaha, do you like this story'
        },
        {
          imgUrl: '',
          title: 'This is a funny story',
          desc: 'hahaha, do you like this story'
        },
        {
          imgUrl: '',
          title: 'This is a funny story',
          desc: 'hahaha, do you like this story'
        },
        {
          imgUrl: '',
          title: 'This is a funny story',
          desc: 'hahaha, do you like this story'
        }
      ]
    },
    publishList: {
      tabTitle: '我的发布',
      tabContent: [
        {
          imgUrl: '',
          title: 'Publish',
          desc: 'hahaha, do you like this story'
        },
        {
          imgUrl: '',
          title: 'This is a funny story',
          desc: 'hahaha, do you like this story'
        },
        {
          imgUrl: '',
          title: 'This is a funny story',
          desc: 'hahaha, do you like this story'
        },
        {
          imgUrl: '',
          title: 'This is a funny story',
          desc: 'hahaha, do you like this story'
        }
      ]
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      dataList: this.data.likeList
    })

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

    this.searchList()
  },

  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },

  // 获取收藏列表
  searchList () {
    wx.cloud.callFunction({
      // 云函数名称
      name: 'profile',
      // 传给云函数的参数
      data: {
        fun: "getProfileList",
        db: "storylike",
      }
    }).then(res => {
      this.setData({
        profileList: [...res.result.profileList],
      })
      console.log(this.data.profileList)
      // this.data.profileList.map(item => {
      //   const { _openid, storyid } = item;
      //   wx.cloud.callFunction({
      //     name: "profile",
      //     data: {
      //       fun: "getProfileList",
      //       db: "story",
      //       _openid: _openid,
      //       _id: storyid
      //     }
      //   }).then(res => {
      //     console.log('llll res', res)
      //   })
      // })
    }).catch(err => {

    })
  },

  // 标签导航切换
  tabSelect (e) {
    const tabId = e.currentTarget.dataset.id
    if (tabId === '0') {
      console.log('tabId', tabId)
      this.setData({
        dataList: this.data.likeList
      })
    } else if (tabId === '1') {
      console.log('tabId', tabId)
      this.setData({
        dataList: this.data.partakeList
      })
    } else if (tabId === '2') {
      console.log('tabId', tabId)
      this.setData({
        dataList: this.data.publishList
      })
    }
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