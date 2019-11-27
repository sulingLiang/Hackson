// miniprogram/pages/add/add.js
const db = wx.cloud.database()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    title: '',
    start: '',
    image: ''
  },
  /**
   * 输入标题
   */
  titleInput(e) {
    this.setData({
      title: e.detail.value
    });
  },
  /**
   * 输入故事开头
   */
  startInput(e) {
    this.setData({
      start: e.detail.value
    });
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 1
      });
    }
  },

  upload: function() {
    const that = this
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        const tempFilePaths = res.tempFilePaths
        wx.cloud.uploadFile({
          cloudPath: new Date().getTime() + '.png',
          filePath: tempFilePaths[0],
          success: res => {
            that.setData({
              image: res.fileID,
            })
          },
          fail: console.error
        })
      }
    })
  }
});