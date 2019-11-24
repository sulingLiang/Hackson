// miniprogram/pages/index/index.js
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    storyList: []
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 0
      })
    }

    this.getStoryList()
  },

  add:function(){
    db.collection('story').add({
      data: {
        title: "大话西游",
        author: "hey",
        avatar: "bbb",
        creatTime: new Date(),
        heart: "134543"
      },
      success: function (res) {
        console.log(res)
      }
    })
  },
  getStoryList: function() {
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
      console.error("err", err);
      wx.hideLoading();
    });
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
    this.getStoryList();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})