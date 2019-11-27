// miniprogram/pages/add/add.js
const db = wx.cloud.database()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    title: '',
    start: '',
    imgList: [],
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
   * 选择图片
   */
  ChooseImage() {
    wx.chooseImage({
      count: 1, //默认9
      sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album'], //从相册选择
      success: res => {
        if (this.data.imgList.length != 0) {
          this.setData({
            imgList: this.data.imgList.concat(res.tempFilePaths)
          });
        } else {
          this.setData({
            imgList: res.tempFilePaths
          });
        }
      }
    });
  },
  /**
   * 预览图片
   */
  ViewImage(e) {
    console.log(this.data.imgList);
    wx.previewImage({
      urls: this.data.imgList,
      current: e.currentTarget.dataset.url
    });
  },
  /**
   * 删除图片
   */
  DelImg(e) {
    wx.showModal({
      title: '梦想家',
      content: '确定要删除这段回忆吗？',
      cancelText: '再看看',
      confirmText: '再见',
      success: res => {
        if (res.confirm) {
          this.data.imgList.splice(e.currentTarget.dataset.index, 1);
          this.setData({
            imgList: this.data.imgList
          });
        }
      }
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {},


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